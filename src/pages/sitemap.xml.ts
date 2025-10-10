import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const pages = [
    '',
    'services',
    'portfolio',
    'blog',
    'contact',
  ];

  const blogFiles = await import.meta.glob('../content/blog/*.json');
  const blogPosts = await Promise.all(
    Object.entries(blogFiles).map(async ([, loader]) => {
      const post = await loader();
      return (post as any).default.slug;
    })
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
  <url>
    <loc>${site}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${blogPosts.map((slug) => `
  <url>
    <loc>${site}blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
