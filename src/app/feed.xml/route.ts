import { getAllArticles } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getAllArticles();
  
  const itemsXml = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://earthlog.org/${article.categorySlug}/${article.slug}</link>
      <guid>https://earthlog.org/${article.categorySlug}/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
      ${article.cover ? `<enclosure url="${article.cover.startsWith('http') ? article.cover : `https://earthlog.org${article.cover}`}" type="image/jpeg" />` : ''}
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Earthlog - Global Environmental Movement</title>
    <link>https://earthlog.org</link>
    <description>Elite technology publication covering AI, Linux, Windows, Open Source, and Security.</description>
    <language>en-US</language>
    <atom:link href="https://earthlog.org/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
