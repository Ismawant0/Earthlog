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
  const term = tag ? `Tag: ${tag}` : (q ? `"${q}"` : "Pencarian");
  return {
    title: `Pencarian ${term} — Garudaloka`,
    description: `Temukan artikel, glosari, dan panduan teknis yang cocok untuk pencarian Anda di Garudaloka.`,
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <span className="text-muted">/</span>
            <span className="text-foreground font-bold">Pencarian</span>
          </nav>

          {/* Search Jumbotron */}
          <div className="border border-border rounded-2xl bg-card p-6 md:p-10 shadow-sm relative overflow-hidden flex flex-col gap-6">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1C1917_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-background border border-border rounded-xl shadow-inner text-primary">
                  <Search className="h-5 w-5" />
                </span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-accent">
                  Mesin Pencari Garudaloka
                </span>
              </div>

              {tag ? (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-foreground flex flex-wrap items-center gap-2">
                    <span>Menampilkan Tag:</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-xl text-lg font-bold">
                      <Tag className="h-4.5 w-4.5" />
                      {tag}
                      <Link href="/search" className="hover:bg-primary/10 p-0.5 rounded-full text-primary/70 hover:text-primary transition-colors inline-flex items-center justify-center font-bold">
                        <X className="h-4 w-4" />
                      </Link>
                    </span>
                  </h1>
                  <p className="text-sm text-muted">
                    Menampilkan seluruh materi teknik yang ditandai dengan label <strong className="text-foreground font-semibold">#{tag}</strong>.
                  </p>
                </div>
              ) : q ? (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-foreground">
                    Hasil Pencarian untuk: &ldquo;{q}&rdquo;
                  </h1>
                  <p className="text-sm text-muted">
                    Ditemukan {filteredArticles.length} artikel yang relevan dengan kata kunci pencarian Anda.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-foreground">
                    Cari Seluruh Library Garudaloka
                  </h1>
                  <p className="text-sm text-muted">
                    Masukkan kata kunci, nama peralatan, atau nama tag untuk menyaring basis pengetahuan teknik.
                  </p>
                </div>
              )}
            </div>

            {/* Dynamic Inline Search Field for premium experience */}
            <form action="/search" method="GET" className="relative z-10 max-w-xl flex items-stretch gap-2 mt-2">
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Cari separator, pompa, amine, glycol..."
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/5 placeholder:text-muted transition shadow-sm"
              />
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white text-xs font-bold rounded-xl px-5 py-2.5 shadow transition cursor-pointer"
              >
                Cari
              </button>
            </form>
          </div>

          {/* Results Grid */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Hasil Materi ({filteredArticles.length})
            </h2>

            {filteredArticles.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center rounded-xl bg-card">
                <BookOpen className="h-10 w-10 text-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-sm font-bold text-foreground">Tidak Ada Hasil Ditemukan</h3>
                <p className="text-xs text-muted max-w-xs mx-auto mt-1">
                  Coba gunakan istilah penelusuran yang lebih umum atau periksa ejaan kata kunci Anda.
                </p>
                <Link 
                  href="/search" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-4 hover:underline"
                >
                  <ArrowLeft className="h-4.5 w-4.5" /> Bersihkan Filter & Cari Ulang
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="border border-border bg-card rounded-xl overflow-hidden flex flex-col justify-between hover:border-primary/40 shadow-sm transition-all group"
                  >
                    <div>
                      {/* Cover Thumbnail Image */}
                      {article.cover ? (
                        <div className="relative w-full h-44 overflow-hidden bg-muted border-b border-border select-none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={article.cover} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 border-b border-border flex items-center justify-center text-muted select-none">
                          <BookOpen className="h-10 w-10 opacity-30 group-hover:scale-110 transition-transform duration-350" />
                        </div>
                      )}

                      <div className="p-5 space-y-3.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase">
                          <div className="flex flex-wrap gap-1">
                            <span className="px-2 py-0.5 rounded bg-background border border-border text-accent capitalize font-bold text-[9px] shrink-0">
                              {article.difficulty}
                            </span>
                            {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                              const catName = article.category.split(',')[i]?.trim() || catSlug;
                              return (
                                <span 
                                  key={catSlug} 
                                  className="px-2 py-0.5 rounded bg-background border border-border text-primary dark:text-primary-light capitalize font-bold text-[9px] shrink-0"
                                >
                                  {catName}
                                </span>
                              );
                            })}
                          </div>
                          <span className="flex items-center gap-1 shrink-0">
                            <Clock className="h-3 w-3" /> {article.readTime}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                          <Link href={`/${article.categorySlug}/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-muted leading-relaxed line-clamp-3 text-justify">
                          {article.description}
                        </p>

                        {/* Clickable tags rendering inside search list cards */}
                        <div className="flex flex-wrap gap-1 pt-2">
                          {article.tags.map(t => (
                            <Link
                              key={t}
                              href={`/search?tag=${encodeURIComponent(t)}`}
                              className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded border border-border/80 transition-colors select-none ${
                                tag && tag.toLowerCase() === t.toLowerCase()
                                  ? "bg-primary/10 border-primary/30 text-primary"
                                  : "bg-background text-muted hover:text-primary hover:border-primary/30"
                              }`}
                            >
                              <Tag className="h-2 w-2 shrink-0" />
                              {t}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 border-t border-border/60 bg-background-alt/30 flex items-center justify-between text-[11px] select-none">
                      <span className="text-muted font-medium flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {article.date}
                      </span>
                      <Link
                        href={`/${article.categorySlug}/${article.slug}`}
                        className="text-primary dark:text-primary-light hover:underline font-bold"
                      >
                        Pelajari Materi →
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
