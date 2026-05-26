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
  Bookmark 
} from "lucide-react";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    slug: string;
  }>;
}

// Helper to generate a content-based description fallback
function generateDescription(article: { title: string; description: string; tags: string[]; keywords?: string[]; content?: string }): string {
  // Use explicit description first
  if (article.description && article.description.length > 50) {
    return article.description;
  }
  
  // Try to extract first meaningful paragraph from content
  if (article.content) {
    const cleanContent = article.content
      .replace(/^---[\s\S]*?---\n/m, '') // Remove frontmatter
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/#{1,6}\s+/g, '') // Remove markdown headings
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remove markdown links
      .replace(/\n{2,}/g, ' ') // Normalize whitespace
      .trim();
    
    const firstParagraph = cleanContent.split(/\n{2,}/).find(p => p.trim().length > 80);
    if (firstParagraph) {
      return firstParagraph.trim().slice(0, 320) + (firstParagraph.length > 320 ? '...' : '');
    }
  }
  
  // Fallback: construct from title, category and tags
  const tagStr = article.tags?.length ? article.tags.slice(0, 3).join(', ') : '';
  const keywordStr = article.keywords?.length ? article.keywords.slice(0, 3).join(', ') : '';
  return `Pelajari ${article.title}. ${keywordStr ? `Topik: ${keywordStr}.` : ''} ${tagStr ? `Kategori: ${tagStr}.` : ''} Panduan teknik engineering terpercaya di Garudaloka.`;
}

// 1. DYNAMIC METADATA GENERATION FOR technical SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const article = await getArticleBySlug(categorySlug, slug);
  if (!article) return {};

  const description = generateDescription(article);
  const canonicalUrl = `https://garudaloka.vercel.app/${categorySlug}/${slug}`;
  const ogImage = article.cover || "https://garudaloka.vercel.app/garudaloka-logo.png";

  return {
    title: `${article.title} — Garudaloka`,
    description,
    keywords: article.keywords?.length ? article.keywords.join(", ") : 
              article.tags?.length ? article.tags.join(", ") : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${article.title} — Garudaloka`,
      description,
      url: canonicalUrl,
      siteName: "Garudaloka",
      locale: "id_ID",
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
      title: `${article.title} — Garudaloka`,
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
    other: {
      'article:published_time': article.date,
      'article:modified_time': article.date,
      'article:author': article.author,
      'article:section': article.category?.split(',')[0] || categorySlug,
    },
  };
}

export const dynamic = 'force-dynamic';

// Helper to extract markdown headings for Table of Contents
function getHeadings(content: string) {
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 for h2, 3 for h3
    const text = match[2].replace(/[\*\_]/g, "").trim();
    // Generate clean slug ID identical to the element renderer
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
    
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
  const relatedArticles = allArticles
    .filter((a) => a.categorySlug === categorySlug && a.slug !== slug)
    // Semantic boost: prioritize articles with matching tags
    .sort((a, b) => {
      const aMatch = a.tags?.filter(t => article.tags?.includes(t)).length || 0;
      const bMatch = b.tags?.filter(t => article.tags?.includes(t)).length || 0;
      return bMatch - aMatch;
    })
    .slice(0, 2);

  const headings = getHeadings(article.content);

  // Helper: compute word count from content
  function getWordCount(content: string): number {
    const clean = content
      .replace(/^---[\s\S]*?---\n/m, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*_`~\[\]()>|]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return clean.split(/\s+/).filter(Boolean).length;
  }

  // Helper: get first meaningful heading as about topic
  function getAboutTopic(content: string, _title: string, keywords?: string[], tags?: string[], fallbackSlug?: string): string {
    const headingMatch = content.match(/^##\s+(.*)$/m);
    if (headingMatch) {
      return headingMatch[1].replace(/[\*\_]/g, '').trim();
    }
    // Fallback to first keyword or category
    return keywords?.[0] || tags?.[0] || fallbackSlug || 'engineering';
  }

  // Layer 5: Structured Data - enhanced with wordCount, about, learningResourceType
  const wordCount = getWordCount(article.content);
  const aboutTopic = getAboutTopic(article.content, article.title, article.keywords, article.tags, categorySlug);

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
      "name": "Garudaloka",
      "logo": {
        "@type": "ImageObject",
        "url": "https://garudaloka.vercel.app/garudaloka-logo.png"
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "image": article.cover || "https://garudaloka.vercel.app/garudaloka-logo.png",
    "keywords": article.keywords?.join(", ") || article.tags?.join(", "),
    "wordCount": wordCount,
    "about": {
      "@type": "Thing",
      "name": aboutTopic
    },
    "educationalLevel": article.difficulty,
    "learningResourceType": "Article",
    "inLanguage": "id-ID",
    "isAccessibleForFree": true,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://garudaloka.vercel.app/${categorySlug}/${slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://garudaloka.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.category.split(',')[0] || categorySlug,
        "item": `https://garudaloka.vercel.app/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://garudaloka.vercel.app/${categorySlug}/${slug}`
      }
    ]
  };

  const faqSchema: any = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  };

  // Safe MDX parsing for FAQ Schema
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

      <div className="flex-grow bg-background transition-colors duration-200 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* A. BREADCRUMBS BAR */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-6 md:mb-10 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <div className="flex items-center gap-1">
              {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                const catName = article.category.split(',')[i]?.trim() || catSlug;
                return (
                  <span key={catSlug} className="inline-flex items-center gap-1.5">
                    {i > 0 && <span className="text-muted/65">/</span>}
                    <Link href={`/category/${catSlug}`} className="hover:text-primary transition-colors capitalize">
                      {catName}
                    </Link>
                  </span>
                );
              })}
            </div>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground font-bold truncate max-w-[240px]">
              {article.title}
            </span>
          </nav>

          {/* B. MAIN TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Main Article content reader (1xl size: 9/12 width) */}
            <article className="xl:col-span-9 space-y-6">
              
              {/* Header block */}
              <header className="space-y-4 border-b border-border/60 pb-6">
                <div className="flex flex-wrap gap-1.5">
                  {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                    const catName = article.category.split(',')[i]?.trim() || catSlug;
                    return (
                      <Link 
                        key={catSlug}
                        href={`/category/${catSlug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/15 tracking-wide hover:bg-primary/20 transition-all select-none capitalize"
                      >
                        {catName}
                      </Link>
                    );
                  })}
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-foreground leading-[1.2] tracking-tight">
                  {article.title}
                </h1>

                {/* Meta details bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted pt-2 select-none">
                  <span className="flex items-center gap-1.5" title="Penulis Ahli">
                    <User className="h-3.5 w-3.5" />
                    By {article.author}
                  </span>
                  <span className="flex items-center gap-1.5" title="Diperbarui Pada">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={article.date}>{article.date}</time>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} Bacaan
                  </span>
                  <span className="text-accent font-extrabold" title="Tingkat Kesulitan Materi">
                    Tingkat: {article.difficulty}
                  </span>
                </div>
              </header>

              {/* MDX Compiled content output */}
              <div className="article-container article-body py-4 prose dark:prose-invert">
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

              {/* Article Footer (Tags and Socials) */}
              <footer className="border-t border-border mt-12 pt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/search?tag=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold border border-border px-2.5 py-1 rounded bg-background text-muted hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all select-none"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40 select-none">
                  <Link 
                    href={`/category/${categorySlug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Kategori
                  </Link>

                  <div className="flex gap-2">
                    <button className="p-2 border border-border bg-card rounded-lg hover:bg-background-alt text-muted hover:text-foreground cursor-pointer shadow-sm text-xs font-semibold flex items-center gap-1">
                      <Bookmark className="h-4 w-4" /> Simpan
                    </button>
                    <button className="p-2 border border-border bg-card rounded-lg hover:bg-background-alt text-muted hover:text-foreground cursor-pointer shadow-sm text-xs font-semibold flex items-center gap-1">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>
                </div>
              </footer>

              {/* Related Articles card group */}
              {relatedArticles.length > 0 && (
                <div className="border-t border-border mt-12 pt-10 space-y-6">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Kajian Terkait
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedArticles.map((ra) => (
                      <div 
                        key={ra.slug}
                        className="border border-border bg-card p-5 rounded-xl flex flex-col justify-between hover:border-primary/40 shadow-sm transition-all"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase font-extrabold text-accent">
                            {ra.category}
                          </span>
                          <h4 className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                            <Link href={`/${ra.categorySlug}/${ra.slug}`}>
                              {ra.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                            {ra.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-border/55 flex items-center justify-between text-[10px] text-muted">
                          <span>{ra.date}</span>
                          <Link 
                            href={`/${ra.categorySlug}/${ra.slug}`}
                            className="text-primary dark:text-primary-light font-bold hover:underline"
                          >
                            Baca Materi →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </article>

            {/* COLUMN 2: Sticky Table of Contents (xl size: 3/12 width) */}
            <div className="xl:col-span-3">
              <ArticleToc headings={headings} />
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
