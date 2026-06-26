import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LocalArticleFallback from "@/components/LocalArticleFallback";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleToc from "@/components/ArticleToc";
import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { mdxComponents } from "@/components/MdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  Tag, 
  BookOpen, 
  Share2, 
  Bookmark,
  Flame
} from "lucide-react";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
}

// Helper to generate a content-based description fallback
function generateDescription(article: { title: string; description: string; tags: string[]; keywords?: string[]; content?: string }): string {
  if (article.description && article.description.length > 50) {
    return article.description;
  }
  
  if (article.content) {
    const cleanContent = article.content
      .replace(/^---[\s\S]*?---\n/m, '')
      .replace(/<[^>]*>/g, '')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\n{2,}/g, ' ')
      .trim();
    
    const firstParagraph = cleanContent.split(/\n{2,}/).find(p => p.trim().length > 80);
    if (firstParagraph) {
      return firstParagraph.trim().slice(0, 320) + (firstParagraph.length > 320 ? '...' : '');
    }
  }
  
  const tagStr = article.tags?.length ? article.tags.slice(0, 3).join(', ') : '';
  const keywordStr = article.keywords?.length ? article.keywords.slice(0, 3).join(', ') : '';
  return `Read ${article.title}. ${keywordStr ? `Topics: ${keywordStr}.` : ''} ${tagStr ? `Category: ${tagStr}.` : ''} Elite tech publication at PGDOWN.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const article = await getArticleBySlug(categorySlug, slug);
  if (!article) return {};

  const description = generateDescription(article);
  const canonicalUrl = `https://pgdown.vercel.app/${categorySlug}/${slug}`;
  const ogImage = article.cover || "https://pgdown.vercel.app/favicon.ico";

  return {
    title: `${article.title} — PGDOWN`,
    description,
    keywords: article.keywords?.length ? article.keywords.join(", ") : 
              article.tags?.length ? article.tags.join(", ") : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} — PGDOWN`,
      description,
      url: canonicalUrl,
      siteName: "PGDOWN",
      locale: "en_US",
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
      tags: [...new Set([...(article.tags || []), ...(article.keywords || [])])],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — PGDOWN`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export const dynamic = 'force-dynamic';

// Helper to extract markdown headings for Table of Contents
function getHeadings(content: string) {
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings = [];
  const idCounts: Record<string, number> = {};
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[\*\_]/g, "").trim();
    const baseId = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    
    let id = baseId;
    if (idCounts[baseId] !== undefined) {
      idCounts[baseId]++;
      id = `${baseId}-${idCounts[baseId]}`;
    } else {
      idCounts[baseId] = 0;
    }
    
    headings.push({ level, text, id });
  }
  
  return headings;
}

export default async function ArticlePage({ params }: PageProps) {
  const { categorySlug, slug } = await params;
  const article = await getArticleBySlug(categorySlug, slug);

  if (!article) {
    return <LocalArticleFallback categorySlug={categorySlug} slug={slug} />;
  }

  const allArticles = await getAllArticles();
  
  // Get 2 Related Articles
  const relatedArticles = allArticles
    .filter((a) => a.categorySlug === categorySlug && a.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.tags?.filter(t => article.tags?.includes(t)).length || 0;
      const bMatch = b.tags?.filter(t => article.tags?.includes(t)).length || 0;
      return bMatch - aMatch;
    })
    .slice(0, 2);

  // Get 2 Trending Articles (Featured)
  const trendingArticles = allArticles
    .filter((a) => a.featured && a.slug !== slug)
    .slice(0, 2);

  const headings = getHeadings(article.content);
  const wordCount = article.content.split(/\s+/).filter(Boolean).length;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "PGDOWN",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pgdown.vercel.app/favicon.ico"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "image": article.cover || "https://pgdown.vercel.app/favicon.ico",
    "keywords": article.keywords?.join(", ") || article.tags?.join(", "),
    "wordCount": wordCount,
    "educationalLevel": article.difficulty,
    "learningResourceType": "Article",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pgdown.vercel.app/${categorySlug}/${slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pgdown.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.category.split(',')[0] || categorySlug,
        "item": `https://pgdown.vercel.app/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://pgdown.vercel.app/${categorySlug}/${slug}`
      }
    ]
  };

  const faqSchema: any = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };

  const faqRegex = /<FAQAccordion\s+items="([^"]+)"\s*><\/FAQAccordion>/;
  const faqMatch = article.content.match(faqRegex);
  if (faqMatch) {
    try {
      const decodedItems = JSON.parse(faqMatch[1].replace(/&quot;/g, '"'));
      faqSchema.mainEntity = decodedItems.map((item: any) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }));
    } catch (e) {
      console.error("Failed to parse FAQ schema:", e);
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema.mainEntity.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Navbar />

      <div className="flex-grow bg-background py-8 md:py-12 transition-colors duration-200">
        <div className="max-w-[1280px] mx-auto px-6">
          
          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* COLUMN 1: Main Article content reader */}
            <article className="lg:col-span-8 space-y-8 max-w-[760px] mx-auto w-full">
              
              {/* Header block following exact requested order */}
              <header className="space-y-4 border-b border-border/65 pb-6">
                
                {/* 1. Category */}
                <div className="flex flex-wrap gap-1.5 select-none">
                  {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                    const catName = article.category.split(',')[i]?.trim() || catSlug;
                    return (
                      <Link 
                        key={catSlug}
                        href={`/category/${catSlug}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all select-none capitalize"
                      >
                        {catName}
                      </Link>
                    );
                  })}
                </div>

                {/* 2. Headline */}
                <h1 className="text-3xl md:text-[42px] font-extrabold text-foreground leading-[1.2] tracking-tighter">
                  {article.title}
                </h1>

                {/* 3. Summary */}
                <p className="text-base text-muted leading-relaxed font-semibold">
                  {article.description}
                </p>

                {/* 4. Author details & meta details bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-more pt-2 select-none">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    By {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={article.date}>{article.date}</time>
                  </span>
                </div>

                {/* 5. Hero Image (if cover is defined) */}
                {article.cover && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-background-alt border border-border/40 mt-6 select-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={article.cover} 
                      alt={article.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </header>

              {/* MDX Compiled content output */}
              <div className="article-body prose dark:prose-invert text-[18px] md:text-[20px] leading-[1.9] text-foreground/90 max-w-[760px] mx-auto select-text">
                <MDXRemote 
                  source={article.content} 
                  components={mdxComponents} 
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm, remarkMath],
                      rehypePlugins: [rehypeKatex],
                    }
                  }}
                />
              </div>

              {/* Article Footer (Tags and Actions) */}
              <footer className="border-t border-border/50 mt-12 pt-6 space-y-4 select-none">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/search?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold border border-border px-2.5 py-1 rounded bg-background text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all select-none"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <Link 
                    href={`/category/${categorySlug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Category
                  </Link>

                  <div className="flex gap-2">
                    <button className="p-2 border border-border bg-background-alt/50 rounded-xl hover:bg-background-alt text-muted hover:text-foreground cursor-pointer text-xs font-semibold flex items-center gap-1">
                      <Bookmark className="h-4 w-4" /> Save
                    </button>
                    <button className="p-2 border border-border bg-background-alt/50 rounded-xl hover:bg-background-alt text-muted hover:text-foreground cursor-pointer text-xs font-semibold flex items-center gap-1">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>
                </div>
              </footer>

              {/* Bottom recommendations section: Related & Trending (Side-by-Side) */}
              <div className="border-t border-border/40 mt-12 pt-10 space-y-8 select-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Column 1: Related Articles */}
                  {relatedArticles.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" /> Related Articles
                      </h3>
                      <div className="flex flex-col gap-4">
                        {relatedArticles.map((ra) => (
                          <div 
                            key={ra.slug}
                            className="p-4 rounded-2xl hover:bg-background-alt/40 transition-all group border border-border/30"
                          >
                            <span className="text-[10px] uppercase font-bold text-primary">{ra.category}</span>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug tracking-tight mt-0.5">
                              <Link href={`/${ra.categorySlug}/${ra.slug}`}>{ra.title}</Link>
                            </h4>
                            <p className="text-xs text-muted line-clamp-2 leading-relaxed mt-1">{ra.description}</p>
                            <div className="text-[10px] text-muted-more/80 font-semibold mt-2.5 flex items-center justify-between">
                              <span>{ra.date}</span>
                              <span>{ra.readTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Column 2: Trending Articles */}
                  {trendingArticles.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Flame className="h-4 w-4" /> Trending Articles
                      </h3>
                      <div className="flex flex-col gap-4">
                        {trendingArticles.map((ta) => (
                          <div 
                            key={ta.slug}
                            className="p-4 rounded-2xl hover:bg-background-alt/40 transition-all group border border-border/30"
                          >
                            <span className="text-[10px] uppercase font-bold text-primary">{ta.category}</span>
                            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug tracking-tight mt-0.5">
                              <Link href={`/${ta.categorySlug}/${ta.slug}`}>{ta.title}</Link>
                            </h4>
                            <p className="text-xs text-muted line-clamp-2 leading-relaxed mt-1">{ta.description}</p>
                            <div className="text-[10px] text-muted-more/80 font-semibold mt-2.5 flex items-center justify-between">
                              <span>{ta.date}</span>
                              <span>{ta.readTime}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </article>

            {/* COLUMN 2: Sticky Sidebar (Desktop Only) - ONLY TABLE OF CONTENTS */}
            <aside className="lg:col-span-4 sticky top-24 hidden lg:block">
              <ArticleToc headings={headings} />
            </aside>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
