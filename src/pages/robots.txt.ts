export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const host  = request.headers.get('host') ?? '';
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  const root  = host ? `${proto}://${host}` : 'https://interpreting.works';

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${root}/sitemap.xml\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
};
