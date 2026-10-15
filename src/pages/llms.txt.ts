export const prerender = true;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const SITE = 'https://interpreting.works';

  const lines: string[] = [
    '# interpretingWorks',
    '',
    '> Professional interpreter scheduling and language access management platform for healthcare, legal, and business organizations across the United States.',
    '',
    'interpretingWorks by Language Link Corporation helps hospitals, courts, clinics, schools, and enterprises book and manage qualified interpreters in 200+ languages — on-site, OPI (Over-the-Phone Interpreting), and VRI (Video Remote Interpreting) — with built-in HIPAA compliance, credential tracking, geo-verified check-in/out, and unlimited audit reporting. Founded 2011. Branford, CT.',
    '',
    '## Main Pages',
    '',
    `- [Home](${SITE}/): Interpreter scheduling platform overview — features, screenshot walkthrough, mobile app, demo request`,
    `- [About Us](${SITE}/about/): Company history, founding team, and mission — 203+ languages, 100k+ appointments per year, 50% cost reduction vs traditional agencies`,
    `- [FAQ](${SITE}/faq/): Common questions for healthcare requesters and professional interpreters — onboarding, billing, compliance, scheduling`,
    `- [Contact Us](${SITE}/contact/): Request a demo or reach the team — 420 East Main St. Suite 7, Branford CT 06405`,
    `- [Blog](${SITE}/blog/): Language access insights — HIPAA compliance, OPI vs VRI, interpreter scheduling best practices`,
    '',
    '## Services',
    '',
    `- [For Organizations](${SITE}/services/organizations/): Scheduling platform for hospitals, courts, schools, and businesses needing on-demand interpreter access`,
    `- [For Language Service Providers](${SITE}/services/language-service-providers/): Access Point — interpreter management, credentialing, and dispatch tools for agencies`,
    '',
    '## Blog Posts',
    '',
    ...posts.map(p =>
      `- [${p.data.title}](${SITE}/blog/${p.id}/): ${p.data.description}`
    ),
    '',
    '## Key Concepts',
    '',
    '- OPI (Over-the-Phone Interpreting): remote audio interpretation, connects in under 30 seconds, works on any phone, ideal for urgent or walk-in encounters',
    '- VRI (Video Remote Interpreting): live video interpretation, required for ASL (American Sign Language), adds visual cues for sensitive or pediatric encounters',
    '- HIPAA compliance: all data encrypted in transit and at rest, role-based access control, full session audit trail, HI-TECH compliant',
    '- Language access law: Title VI Civil Rights Act, Section 1557 ACA, CLAS Standards — federal requirements for organizations receiving federal funding',
    '- Credential tracking: interpreter certifications, background checks, document expiration alerts managed automatically by the platform',
    '',
    '## Organization',
    '',
    'Company: interpretingWorks (Language Link Corporation)',
    'Founded: 2011',
    'Headquarters: 420 East Main St. Suite 7, Branford, CT 06405, United States',
    'Market: United States',
    'Languages: 200+',
    `Website: ${SITE}`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
