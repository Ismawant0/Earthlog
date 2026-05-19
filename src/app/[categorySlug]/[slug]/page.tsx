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

// 1. DYNAMIC METADATA GENERATION FOR technical SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, slug } = await params;
  const article = await getArticleBySlug(categorySlug, slug);
  if (!article) return {};

  const cleanCategory = article.category;

  return {
    title: `${article.title} — Garudaloka`,
    description: article.description,
    alternates: {
      canonical: `/${categorySlug}/${slug}`,
    },
    openGraph: {
      title: `${article.title} — Garudaloka`,
      description: article.description,
      url: `https://garudaloka.com/${categorySlug}/${slug}`,
      siteName: "Garudaloka",
      locale: "id_ID",
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} — Garudaloka`,
      description: article.description,
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
    .slice(0, 2);

  const headings = getHeadings(article.content);

  return (
    <>
      <Navbar />

      <div className="flex-grow bg-background transition-colors duration-200 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* A. BREADCRUMBS BAR */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-6 md:mb-10 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href={`/category/${categorySlug}`} className="hover:text-primary transition-colors capitalize">
              {article.category}
            </Link>
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
              <div className="space-y-4 border-b border-border/60 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/15 tracking-wide capitalize">
                  {article.category}
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-foreground leading-[1.2] tracking-tight">
                  {article.title}
                </h1>

                {/* Meta details bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted pt-2 select-none">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    By {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} Bacaan
                  </span>
                  <span className="text-accent font-extrabold">
                    Tingkat: {article.difficulty}
                  </span>
                </div>
              </div>

              {/* MDX Compiled content output */}
              <div className="article-container article-body py-4 prose dark:prose-invert">
                <MDXRemote 
                  source={article.content} 
                  components={mdxComponents} 
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                    }
                  }}
                />
              </div>

              {/* Article Footer (Tags and Socials) */}
              <div className="border-t border-border mt-12 pt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 text-[11px] font-bold border border-border px-2.5 py-1 rounded bg-background text-muted"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
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
              </div>

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
