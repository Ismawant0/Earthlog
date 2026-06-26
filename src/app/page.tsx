import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/content";
import { Calendar, Clock, User, Flame } from "lucide-react";

export const revalidate = 3600; // ISR - revalidate every hour

export default async function Home() {
  const articles = await getAllArticles();

  // Find Featured Story
  const featuredArticle = articles.find(a => a.featured) || articles[0];

  // Find Supporting Stories (excluding featured)
  const supportingArticles = articles
    .filter(a => a.slug !== featuredArticle?.slug)
    .slice(0, 4);

  // Find Latest News (excluding featured)
  const latestArticles = articles
    .filter(a => a.slug !== featuredArticle?.slug)


  return (
    <>
      <Navbar />

      <main className="flex-1 py-8 md:py-12" style={{ backgroundColor: "var(--canvas-bg)", color: "var(--foreground)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col gap-8 md:gap-10">

          {/* SECTION: ARTICLE LIST */}
          <section className="max-w-4xl mx-auto w-full">
            <div className="flex flex-col gap-8">
              {articles.map((art) => (
                <article
                  key={art.slug}
                  className="flex flex-col sm:flex-row gap-5 group items-start"
                >
                  {/* Thumbnail */}
                  <Link href={`/${art.categorySlug}/${art.slug}`} className="block relative w-full sm:w-48 sm:h-32 rounded-2xl overflow-hidden shrink-0 select-none bg-surface-alt aspect-video sm:aspect-auto">
                    {art.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={art.cover}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        style={{ transitionTimingFunction: "var(--joy-bezier, cubic-bezier(0.34, 1.56, 0.64, 1))" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted">
                        PGDOWN
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col py-1 flex-1 min-w-0 gap-1.5">

                    {/* 1. Title */}
                    <h3 className="text-xl md:text-2xl font-bold leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary text-foreground">
                      <Link href={`/${art.categorySlug}/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    {/* 2. Description */}
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                      {art.description}
                    </p>

                    {/* 3. Category pill | Date */}
                    <div className="flex items-center gap-2 mt-1">
                      <Link
                        href={`/category/${art.categorySlug}`}
                        className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{
                          backgroundColor: "var(--primary-subtle)",
                          color: "var(--primary)",
                        }}
                      >
                        {art.category}
                      </Link>
                      <span className="text-[11px] text-muted-more">{art.date}</span>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 3: NEWSLETTER — pill-shaped container */}
          <section id="newsletter" className="py-8">
            <div className="max-w-4xl mx-auto p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center space-y-6"
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: "var(--primary)" }}>
                  Newsletter Subscription
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Get Technical Updates Weekly
                </h2>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Join thousands of software engineers, Linux administrators, and cloud architects who receive our highly curated technical analysis directly in their inbox.
                </p>
              </div>

              <form className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  required
                  className="flex-1 px-4 py-2.5 outline-none text-sm placeholder:text-muted"
                  style={{
                    backgroundColor: "var(--surface-alt)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Enter your email address..."
                />
                <button
                  type="submit"
                  className="interactive px-6 py-2.5 text-white text-xs font-bold uppercase tracking-wider shrink-0"
                  style={{
                    backgroundColor: "var(--btn-primary-bg)",
                    borderRadius: "var(--radius-pill)",
                  }}
                >
                  Subscribe
                </button>
              </form>

              <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                Zero spam. Unsubscribe at any time with a single click.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
