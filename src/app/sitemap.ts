import { MetadataRoute } from 'next';
import { getAllArticles, CATEGORIES, getLearningPaths } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const learningPaths = getLearningPaths();
  
  const baseUrl = 'https://pgdown.vercel.app';
  const now = new Date();
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/feed.json`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/learning-path`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Add editor route (noindex, but include for completeness)
  routes.push({
    url: `${baseUrl}/editor`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.1,
  });

  CATEGORIES.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  learningPaths.forEach((lp) => {
    routes.push({
      url: `${baseUrl}/learning-path/${lp.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  articles.forEach((article) => {
    const articleUrl = `${baseUrl}/${article.categorySlug}/${article.slug}`;
    routes.push({
      url: articleUrl,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}