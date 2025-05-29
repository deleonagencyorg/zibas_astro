import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { languages } from '../i18n/config';

const staticPages = ['/', '/menu', '/nosotros', '/contacto'];

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  
  const pages = staticPages.flatMap(page => 
    languages.map(lang => `/${lang.code}${page}`)
  );

  const blogPosts = posts.map(post => 
    `/${post.slug.split('/')[0]}/blog/${post.slug.split('/')[1]}`
  );

  const allUrls = [...pages, ...blogPosts];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls.map(url => `
        <url>
          <loc>https://taqueritos.com${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};
