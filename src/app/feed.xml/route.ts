import { getAllArticles } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getAllArticles();
  
  const itemsXml = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://garudaloka.com/${article.categorySlug}/${article.slug}</link>
      <guid>https://garudaloka.com/${article.categorySlug}/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
      ${article.cover ? `<enclosure url="${article.cover.startsWith('http') ? article.cover : `https://garudaloka.com${article.cover}`}" type="image/jpeg" />` : ''}
    </item>
  `).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Garudaloka - Platform Pengetahuan Teknik</title>
    <link>https://garudaloka.com</link>
    <description>Platform edukasi engineering &amp; industri modern.</description>
    <language>id-ID</language>
    <atom:link href="https://garudaloka.com/feed.xml" rel="self" type="application/rss+xml" />
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
