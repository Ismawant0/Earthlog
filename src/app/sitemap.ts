import { MetadataRoute } from "next";
import { getAllArticles, CATEGORIES } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://garudaloka.com";

  // Base paths
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/learning-path`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Category branches
  for (const cat of CATEGORIES) {
    routes.push({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  try {
    // Dynamic MDX Articles
    const articles = await getAllArticles();
    for (const article of articles) {
      routes.push({
        url: `${baseUrl}/${article.categorySlug}/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap paths", error);
  }

  return routes;
}
