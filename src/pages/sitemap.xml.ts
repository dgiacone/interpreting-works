export const prerender = true;

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const root = site?.href.replace(/\/$/, '') ?? 'https://interpreting.works';

  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const staticPages = [
    { loc: `${root}/`,         priority: '1.0', changefreq: 'weekly'  },
    { loc: `${root}/about/`,   priority: '0.8', changefreq: 'monthly' },
    { loc: `${root}/faq/`,     priority: '0.7', changefreq: 'monthly' },
    { loc: `${root}/contact/`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${root}/blog/`,    priority: '0.8', changefreq: 'weekly'  },
  ];

  const blogPages = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map(post => ({
      loc:        `${root}/blog/${post.id}/`,
      priority:   '0.6',
      changefreq: 'monthly',
      lastmod:    post.data.pubDate.toISOString().split('T')[0],
    }));

  const pages = [...staticPages, ...blogPages];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(p => [
      '  <url>',
      `    <loc>${p.loc}</loc>`,
      `    <changefreq>${p.changefreq}</changefreq>`,
      `    <priority>${p.priority}</priority>`,
      ...('lastmod' in p ? [`    <lastmod>${p.lastmod}</lastmod>`] : []),
      '  </url>',
    ].join('\n')),
    '</urlset>',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
