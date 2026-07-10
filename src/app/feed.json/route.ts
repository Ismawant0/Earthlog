import { getAllArticles } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getAllArticles();
  const now = new Date();
  
  const items = articles.map(article => ({
    id: `https://earthlog.org/${article.categorySlug}/${article.slug}`,
    url: `https://earthlog.org/${article.categorySlug}/${article.slug}`,
    title: article.title,
    content_text: article.description,
    content_html: `<p>${article.description}</p>`,
    summary: article.description,
    date_published: new Date(article.date).toISOString(),
    date_modified: new Date(article.date).toISOString(),
    authors: [{ name: article.author }],
    tags: article.tags || [],
    ...(article.cover ? {
      image: article.cover.startsWith('http') ? article.cover : `https://earthlog.org${article.cover}`
    } : {}),
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Earthlog - Global Environmental Movement",
    home_page_url: "https://earthlog.org",
    feed_url: "https://earthlog.org/feed.json",
    description: "Elite technology publication covering AI, Linux, Windows, Open Source, and Security.",
    language: "en-US",
    authors: [{ name: "Earthlog", url: "https://earthlog.org" }],
    items,
  };

  return new NextResponse(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}