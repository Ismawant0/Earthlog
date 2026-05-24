import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticlesByCategory, CATEGORIES } from "@/lib/content";
import { ChevronRight, ArrowLeft, Settings, FlaskConical, GitBranch, BookOpen, Clock, Calendar } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};

  const title = `Materi Teknik ${category.name} — Garudaloka`;
  const description = `Pelajari topik, peralatan, dan penjelasan teknis mendalam tentang ${category.name} di Garudaloka. Platform edukasi engineering & industri terpercaya.`;
  const canonicalUrl = `https://garudaloka.vercel.app/category/${categorySlug}`;

  return {
    title,
    description,
    keywords: [`${category.name}`, "engineering", "oil and gas", "teknik", "industri"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Garudaloka",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: "https://garudaloka.vercel.app/icon.png",
          width: 800,
          height: 600,
          alt: `Kategori ${category.name} - Garudaloka`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    categorySlug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  
  console.log(`[DEBUG CategoryPage] categorySlug: "${categorySlug}", found category:`, !!category);

  if (!category) {
    return notFound();
  }

  const articles = await getArticlesByCategory(categorySlug);
  console.log(`[DEBUG CategoryPage] getArticlesByCategory("${categorySlug}") returned ${articles.length} articles`);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Settings": return <Settings className="h-6 w-6 text-primary dark:text-primary-light" />;
      case "FlaskConical": return <FlaskConical className="h-6 w-6 text-accent" />;
      case "GitBranch": return <GitBranch className="h-6 w-6 text-primary" />;
      case "BookOpen":
      default:
        return <BookOpen className="h-6 w-6 text-success" />;
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-8 md:py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-8 select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold capitalize">
              Kategori: {category.name}
            </span>
          </nav>

          {/* Category Jumbotron */}
          <div className="border border-border rounded-2xl bg-card p-6 md:p-10 shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1C1917_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-background border border-border rounded-xl shadow-inner">
                  {getCategoryIcon(category.icon)}
                </span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-accent">
                  Cabang Keilmuan
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-foreground">
                Kategori: {category.name}
              </h1>
              <p className="text-sm text-muted max-w-xl leading-relaxed">
                {category.desc}
              </p>
            </div>
            
            <div className="relative z-10 bg-background-alt border border-border px-5 py-4 rounded-xl text-center md:text-right shrink-0">
              <span className="block text-3xl font-black text-primary dark:text-primary-light">
                {articles.length}
              </span>
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                Dokumen Tersedia
              </span>
            </div>
          </div>

          {/* Articles Listing Grid */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Materi Pembelajaran ({articles.length})
            </h2>

            {articles.length === 0 ? (
              <div className="border border-dashed border-border p-12 text-center rounded-xl bg-card">
                <BookOpen className="h-10 w-10 text-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-sm font-bold text-foreground">Kajian Belum Tersedia</h3>
                <p className="text-xs text-muted max-w-xs mx-auto mt-1">
                  Tim insinyur kami sedang menyusun diagram visual dan dokumen teknis terpercaya untuk kategori ini.
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mt-4 hover:underline"
                >
                  <ArrowLeft className="h-4.5 w-4.5" /> Kembali ke Beranda
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
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
