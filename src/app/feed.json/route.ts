import { getAllArticles } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getAllArticles();
  const now = new Date();
  
  const items = articles.map(article => ({
    id: `https://pgdown.vercel.app/${article.categorySlug}/${article.slug}`,
    url: `https://pgdown.vercel.app/${article.categorySlug}/${article.slug}`,
    title: article.title,
    content_text: article.description,
    content_html: `<p>${article.description}</p>`,
    summary: article.description,
    date_published: new Date(article.date).toISOString(),
    date_modified: new Date(article.date).toISOString(),
    authors: [{ name: article.author }],
    tags: article.tags || [],
    ...(article.cover ? {
      image: article.cover.startsWith('http') ? article.cover : `https://pgdown.vercel.app${article.cover}`
    } : {}),
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "PGDOWN - Elite Technology Publication",
    home_page_url: "https://pgdown.vercel.app",
    feed_url: "https://pgdown.vercel.app/feed.json",
    description: "Elite technology publication covering AI, Linux, Windows, Open Source, and Security.",
    language: "en-US",
    authors: [{ name: "PGDOWN", url: "https://pgdown.vercel.app" }],
    items,
  };

  return new NextResponse(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}