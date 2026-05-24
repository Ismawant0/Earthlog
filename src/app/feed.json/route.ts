import { getAllArticles } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getAllArticles();
  const now = new Date();
  
  const items = articles.map(article => ({
    id: `https://garudaloka.com/${article.categorySlug}/${article.slug}`,
    url: `https://garudaloka.com/${article.categorySlug}/${article.slug}`,
    title: article.title,
    content_text: article.description,
    content_html: `<p>${article.description}</p>`,
    summary: article.description,
    date_published: new Date(article.date).toISOString(),
    date_modified: new Date(article.date).toISOString(),
    authors: [{ name: article.author }],
    tags: article.tags || [],
    ...(article.cover ? {
      image: article.cover.startsWith('http') ? article.cover : `https://garudaloka.com${article.cover}`
    } : {}),
  }));

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Garudaloka - Platform Pengetahuan Teknik",
    home_page_url: "https://garudaloka.com",
    feed_url: "https://garudaloka.com/feed.json",
    description: "Platform edukasi engineering & industri modern.",
    language: "id-ID",
    authors: [{ name: "Garudaloka", url: "https://garudaloka.com" }],
    items,
  };

  return new NextResponse(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}