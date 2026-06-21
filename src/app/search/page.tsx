import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/content";
import { BookOpen, Calendar, Clock, Tag, X, ArrowLeft, Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    tag?: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q, tag } = await searchParams;
  const term = tag ? `Tag: ${tag}` : (q ? `"${q}"` : "Search");
  return {
    title: `Search ${term} — PGDOWN`,
    description: `Find technical articles, guides, and documentations in PGDOWN publication.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, tag } = await searchParams;
  const allArticles = await getAllArticles();

  // Filter based on query or tag
  const filteredArticles = allArticles.filter((article) => {
    if (tag) {
      const lowerTag = tag.toLowerCase();
      return article.tags.some(t => t.toLowerCase() === lowerTag);
    }
    if (q) {
      const query = q.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some(t => t.toLowerCase().includes(query)) ||
        (article.keywords && article.keywords.some(k => k.toLowerCase().includes(query)))
      );
    }
    return true;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-8 md:py-12 transition-colors duration-200 min-h-[70vh]">
        <div className="max-w-[1280px] mx-auto px-6 space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted-more select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold">Search</span>
          </nav>

          {/* Search Banner - Clean & Soft */}
          <div className="bg-background-alt/40 border border-border/30 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden select-none">
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#E95420_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-background border border-border/30 rounded-xl text-primary shadow-xs">
                  <Search className="h-4 w-4" />
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  PGDOWN Search Engine
                </span>
              </div>

              {tag ? (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-foreground flex flex-wrap items-center gap-2 tracking-tight">
                    <span>Showing Tag:</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-xl text-lg font-bold">
                      <Tag className="h-4 w-4" />
                      {tag}
                      <Link href="/search" className="hover:bg-primary/10 p-0.5 rounded-full text-primary/70 hover:text-primary transition-colors inline-flex items-center justify-center font-bold">
                        <X className="h-4 w-4" />
                      </Link>
                    </span>
                  </h1>
                  <p className="text-sm text-muted">
                    Showing all articles tagged with <strong className="text-foreground font-semibold">#{tag}</strong>.
                  </p>
                </div>
              ) : q ? (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                    Search Results for: &ldquo;{q}&rdquo;
                  </h1>
                  <p className="text-sm text-muted">
                    Found {filteredArticles.length} relevant articles matching your query.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                    Search PGDOWN Library
                  </h1>
                  <p className="text-sm text-muted">
                    Enter keywords, topic names, or tag labels to search our technical database.
                  </p>
                </div>
              )}
            </div>

            {/* Dynamic Inline Search Field */}
            <form action="/search" method="GET" className="relative z-10 max-w-xl flex items-stretch gap-2 mt-1">
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Search AI, Linux, Windows, Programming, Open Source..."
                className="flex-1 bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground outline-none focus:border-primary/40 placeholder:text-muted-more transition shadow-sm"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl px-5 py-2.5 shadow-sm transition cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Results Grid */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-more border-b border-border/30 pb-3 flex items-center gap-2 select-none">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              Articles Found ({filteredArticles.length})
            </h2>

            {filteredArticles.length === 0 ? (
              <div className="border border-dashed border-border/40 p-12 text-center rounded-3xl bg-background-alt/25">
                <BookOpen className="h-8 w-8 text-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-sm font-bold text-foreground">No Results Found</h3>
                <p className="text-xs text-muted max-w-xs mx-auto mt-1">
                  Try using more general keywords or check your spelling.
                </p>
                <Link 
                  href="/search" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-4 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" /> Clear Filter & Restart Search
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="flex flex-col justify-between rounded-2xl group transition-all duration-200"
                  >
                    <div className="space-y-3">
                      {/* Thumbnail */}
                      <Link href={`/${article.categorySlug}/${article.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden bg-background-alt border border-border/40 select-none">
                        {article.cover ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={article.cover} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 flex items-center justify-center text-xs text-muted-more font-bold">
                            PGDOWN
                          </div>
                        )}
                      </Link>

                      <div className="p-1 space-y-2.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-background-alt border border-border/30 text-accent capitalize font-bold text-[9px] shrink-0">
                              {article.difficulty}
                            </span>
                            {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                              const catName = article.category.split(',')[i]?.trim() || catSlug;
                              return (
                                <span 
                                  key={catSlug} 
                                  className="px-2 py-0.5 rounded bg-background-alt border border-border/30 text-primary capitalize font-bold text-[9px] shrink-0"
                                >
                                  {catName}
                                </span>
                              );
                            })}
                          </div>
                          <span className="flex items-center gap-1 shrink-0 font-semibold text-muted-more">
                            <Clock className="h-3 w-3" /> {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 tracking-tight">
                          <Link href={`/${article.categorySlug}/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-muted leading-relaxed line-clamp-3">
                          {article.description}
                        </p>

                        {/* Tag Chips */}
                        <div className="flex flex-wrap gap-1 pt-2">
                          {article.tags.map(t => (
                            <Link
                              key={t}
                              href={`/search?tag=${encodeURIComponent(t)}`}
                              className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded border border-border/50 transition-colors select-none ${
                                tag && tag.toLowerCase() === t.toLowerCase()
                                  ? "bg-primary/10 border-primary/20 text-primary"
                                  : "bg-background-alt text-muted hover:text-primary hover:border-primary/25"
                              }`}
                            >
                              <Tag className="h-2.5 w-2.5 shrink-0" />
                              {t}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/30 mt-4 pt-3 text-[10px] font-semibold text-muted-more select-none">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {article.date}
                      </span>
                      <Link
                        href={`/${article.categorySlug}/${article.slug}`}
                        className="text-primary hover:underline font-bold"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

// Simple ChevronRight icon fallback
function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
