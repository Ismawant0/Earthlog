import { create, insert, search, type AnyOrama } from "@orama/orama";
import { getAllArticles, CATEGORIES } from "./content";

let dbInstance: AnyOrama | null = null;

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  slug: string;
  type: "article" | "glossary" | "category" | "equipment";
}

export async function initSearch(): Promise<AnyOrama> {
  if (dbInstance) return dbInstance;

  // Initialize Orama instance
  const db = await create({
    schema: {
      title: "string",
      description: "string",
      category: "string",
      type: "string",
    },
  });

  // Get articles to seed the search
  const articles = await getAllArticles();

  // Index articles
  for (const article of articles) {
    const type = article.categorySlug === "glossary" ? "glossary" : 
                 article.categorySlug === "equipment" ? "equipment" : "article";

    await insert(db, {
      title: article.title,
      description: article.description,
      category: article.category,
      type: type,
      // Store reference metadata inside the record
      meta: {
        id: `${article.categorySlug}/${article.slug}`,
        categorySlug: article.categorySlug,
        slug: article.slug,
      }
    } as any);
  }

  // Index static categories to let users discover branches of engineering
  for (const cat of CATEGORIES) {
    await insert(db, {
      title: `Kategori: ${cat.name}`,
      description: cat.desc,
      category: cat.name,
      type: "category",
      meta: {
        id: `category/${cat.slug}`,
        categorySlug: cat.slug,
        slug: "",
      }
    } as any);
  }

  dbInstance = db;
  return db;
}

export async function searchContent(term: string): Promise<SearchResultItem[]> {
  if (!term || term.trim() === "") return [];
  
  try {
    const db = await initSearch();
    const results = await search(db, {
      term: term,
      properties: ["title", "description", "category"],
      tolerance: 1, // Fuzzy search tolerance
      limit: 10,
    });

    return results.hits.map((hit) => {
      const doc = hit.document as any;
      return {
        id: doc.meta.id,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        categorySlug: doc.meta.categorySlug,
        slug: doc.meta.slug,
        type: doc.type as any,
      };
    });
  } catch (error) {
    console.error("Error performing Orama search", error);
    // Simple client-side search fallback if Orama initialization fails
    const articles = await getAllArticles();
    const lowercaseTerm = term.toLowerCase();
    
    const matchedArticles = articles
      .filter(a => a.title.toLowerCase().includes(lowercaseTerm) || a.description.toLowerCase().includes(lowercaseTerm))
      .map(a => ({
        id: `${a.categorySlug}/${a.slug}`,
        title: a.title,
        description: a.description,
        category: a.category,
        categorySlug: a.categorySlug,
        slug: a.slug,
        type: (a.categorySlug === "glossary" ? "glossary" : a.categorySlug === "equipment" ? "equipment" : "article") as any
      }));

    return matchedArticles.slice(0, 10);
  }
}
