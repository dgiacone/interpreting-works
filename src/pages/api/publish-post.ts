export const prerender = false;

import type { APIRoute } from 'astro';

const REPO    = 'dgiacone/interpreting-works';
const BRANCH  = 'main';
const GH_API  = 'https://api.github.com';

// ── helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 60);
}

function buildMarkdown(fields: {
  title: string;
  pubDate: string;
  description: string;
  author: string;
  image?: string;
  tags: string[];
  body: string;
}): string {
  const fm = [
    '---',
    `title: "${fields.title.replace(/"/g, '\\"')}"`,
    `pubDate: ${fields.pubDate}`,
    `description: "${fields.description.replace(/"/g, '\\"')}"`,
    `author: "${fields.author}"`,
    ...(fields.image  ? [`image: "${fields.image}"`] : []),
    ...(fields.tags.length ? [`tags: [${fields.tags.map(t => `"${t}"`).join(', ')}]`] : []),
    'draft: false',
    '---',
    '',
  ].join('\n');
  return fm + fields.body;
}

// Get current SHA of a file (needed for updates)
async function getFileSha(path: string, token: string): Promise<string | undefined> {
  const res = await fetch(`${GH_API}/repos/${REPO}/contents/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) return undefined;
  const data = await res.json() as { sha: string };
  return data.sha;
}

async function commitFile(
  path: string,
  contentBase64: string,
  message: string,
  token: string,
): Promise<void> {
  const sha = await getFileSha(path, token);
  const body: Record<string, string> = { message, content: contentBase64, branch: BRANCH };
  if (sha) body.sha = sha;

  const res = await fetch(`${GH_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
}

async function fetchImageAsBase64(url: string): Promise<{ base64: string; ext: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status} ${url}`);
  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const contentType = res.headers.get('content-type') ?? 'image/jpeg';
  const ext = contentType.includes('png') ? 'png'
            : contentType.includes('webp') ? 'webp'
            : contentType.includes('gif') ? 'gif'
            : 'jpg';
  return { base64, ext };
}

// ── route ────────────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request }) => {
  const token  = import.meta.env.GITHUB_TOKEN as string | undefined;
  const secret = import.meta.env.PUBLISH_API_SECRET as string | undefined;

  if (!token || !secret) {
    return json({ error: 'Server misconfiguration: env vars missing' }, 500);
  }

  // Auth
  const auth = request.headers.get('authorization') ?? '';
  if (auth !== `Bearer ${secret}`) {
    return json({ error: 'Unauthorized' }, 401);
  }

  // Parse body
  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const title       = str(payload.title);
  const description = str(payload.description);
  const body        = str(payload.body);
  const author      = str(payload.author) || 'interpretingWorks';
  const image_url   = str(payload.image_url);
  const tags        = Array.isArray(payload.tags)
    ? (payload.tags as unknown[]).map(t => String(t))
    : [];

  if (!title || !description || !body) {
    return json({ error: 'Required: title, description, body' }, 400);
  }

  try {
    const slug    = slugify(title);
    const pubDate = new Date().toISOString().split('T')[0];

    // Handle image
    let imagePath: string | undefined;
    if (image_url) {
      const { base64, ext } = await fetchImageAsBase64(image_url);
      const imgFile = `public/img/blog/${slug}.${ext}`;
      await commitFile(imgFile, base64, `Add blog image: ${slug}`, token);
      imagePath = `/img/blog/${slug}.${ext}`;
    }

    // Build and commit markdown
    const markdown = buildMarkdown({ title, pubDate, description, author, image: imagePath, tags, body });
    const mdFile   = `src/content/blog/${slug}.md`;
    await commitFile(mdFile, Buffer.from(markdown).toString('base64'), `Add blog post: ${title}`, token);

    return json({ success: true, slug, url: `/blog/${slug}/`, file: mdFile }, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return json({ error: msg }, 500);
  }
};

// GET — quick health check
export const GET: APIRoute = () =>
  json({ status: 'ok', endpoint: 'POST /api/publish-post' }, 200);

// ── util ─────────────────────────────────────────────────────────────────────

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}
