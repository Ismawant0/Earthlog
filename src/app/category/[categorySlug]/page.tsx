import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticlesByCategory, CATEGORIES } from "@/lib/content";
import { ChevronRight, ArrowLeft, BookOpen, Clock, Calendar } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};

  const title = `${category.name} Articles — Earthlog`;
  const description = `Read environmental guides and educational articles on ${category.name} from Earthlog.`;
  const canonicalUrl = `https://earthlog.org/category/${categorySlug}`;

  return {
    title,
    description,
    keywords: [category.name, "environment", "conservation", "sustainability"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Earthlog",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://earthlog.org/icon.png",
          width: 512,
          height: 512,
          alt: `${category.name} — Earthlog`,
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

  if (!category) {
    return notFound();
  }

  const articles = await getArticlesByCategory(categorySlug);

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
            <span className="text-foreground font-bold capitalize">
              {category.name}
            </span>
          </nav>

          {/* Category Banner Card - Light & Soft */}
          <div className="bg-background-alt/40 border border-border/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden select-none">
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#E95420_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  Category Section
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm text-muted max-w-xl leading-relaxed">
                {category.desc}
              </p>
            </div>
            
            <div className="relative z-10 bg-background border border-border/30 px-5 py-3.5 rounded-2xl text-center md:text-right shrink-0 shadow-xs">
              <span className="block text-3xl font-black text-primary leading-none mb-1">
                {articles.length}
              </span>
              <span className="text-[9px] font-bold text-muted-more uppercase tracking-wider">
                Articles Available
              </span>
            </div>
          </div>

          {/* Articles Listing Grid */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-more border-b border-border/30 pb-3 flex items-center gap-2 select-none">
              <BookOpen className="h-4.5 w-4.5 text-primary" />
              Publications List
            </h2>

            {articles.length === 0 ? (
              <div className="border border-dashed border-border/40 p-12 text-center rounded-3xl bg-background-alt/25">
                <BookOpen className="h-8 w-8 text-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-sm font-bold text-foreground">No Articles Available Yet</h3>
                <p className="text-xs text-muted max-w-xs mx-auto mt-1">
                  Our editorial team is compiling technical documentation for this section. Check back soon.
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-4 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
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
                          <div className="w-full h-full bg-[#E6EDE8] flex items-center justify-center text-xs text-primary font-bold">
                            Earthlog
                          </div>
                        )}
                      </Link>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                          <span>{article.difficulty}</span>
                          <span className="text-muted-more/30">&bull;</span>
                          <span className="flex items-center gap-1 text-muted-more font-semibold">
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
