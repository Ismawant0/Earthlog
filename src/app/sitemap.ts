import { MetadataRoute } from 'next';
import { getAllArticles, CATEGORIES, getLearningPaths } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const learningPaths = getLearningPaths();
  
  const baseUrl = 'https://garudaloka.com';
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/learning-path`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  ];

  CATEGORIES.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  learningPaths.forEach((lp) => {
    routes.push({
      url: `${baseUrl}/learning-path/${lp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  articles.forEach((article) => {
    routes.push({
      url: `${baseUrl}/${article.categorySlug}/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return routes;
}
