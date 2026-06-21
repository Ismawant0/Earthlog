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
    .slice(0, 9); // Display 9 items in a 3-column layout

  const categoriesToShow = [
    { name: "AI", slug: "ai" },
    { name: "Linux", slug: "linux" },
    { name: "Windows", slug: "windows" },
    { name: "Open Source", slug: "open-source" },
    { name: "Cyber Security", slug: "cyber-security" },
    { name: "Programming", slug: "programming" },
    { name: "Software", slug: "software" },
    { name: "Cloud", slug: "cloud" }
  ];

  return (
    <>
      <Navbar />
      
      <main className="flex-1 bg-background text-foreground transition-colors duration-200 py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-16">
          
          {/* Top Category Chips (Explore Topics) */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none select-none border-b border-border/30">
            <span className="text-xs font-bold text-muted-more uppercase tracking-wider mr-2 shrink-0">Explore Topics:</span>
            <div className="flex items-center gap-1.5">
              {categoriesToShow.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-background-alt hover:bg-primary/10 hover:text-primary border border-border/40 hover:border-primary/20 transition-all whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 1: TOP STORIES */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider select-none">
              <Flame className="h-4 w-4" />
              <span>Featured Stories</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Featured Story (Left Column) - Borderless & Clean */}
              {featuredArticle && (
                <div className="lg:col-span-7 flex flex-col justify-between group rounded-2xl transition-all duration-200">
                  <div className="space-y-4">
                    {/* Thumbnail */}
                    <Link href={`/${featuredArticle.categorySlug}/${featuredArticle.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden bg-background-alt border border-border/40 select-none">
                      {featuredArticle.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={featuredArticle.cover} 
                          alt={featuredArticle.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 flex items-center justify-center text-muted-more text-xs font-bold">
                          PGDOWN Premium
                        </div>
                      )}
                    </Link>

                    {/* Metadata & Title */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-xs font-bold uppercase">
                        <Link href={`/category/${featuredArticle.categorySlug}`} className="text-primary hover:underline">{featuredArticle.category}</Link>
                        <span className="text-muted-more/40">&bull;</span>
                        <span className="text-muted-more font-semibold">{featuredArticle.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
                        <Link href={`/${featuredArticle.categorySlug}/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>
                      
                      <p className="text-sm text-muted leading-relaxed line-clamp-3 font-normal">
                        {featuredArticle.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/30 mt-6 pt-4 text-xs text-muted-more select-none">
                    <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-muted-more/70" /> By {featuredArticle.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-muted-more/70" /> {featuredArticle.date}</span>
                  </div>
                </div>
              )}

              {/* Supporting Stories (Right Column Stacked) - Clean List */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {supportingArticles.map((art) => (
                  <div 
                    key={art.slug}
                    className="flex gap-4 p-2 rounded-2xl hover:bg-background-alt/50 transition-all duration-200 group"
                  >
                    {/* Thumbnail */}
                    <Link href={`/${art.categorySlug}/${art.slug}`} className="block relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-background-alt border border-border/40 shrink-0 select-none">
                      {art.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={art.cover} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 flex items-center justify-center text-[10px] text-muted-more font-bold">
                          PGDOWN
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
                          <Link href={`/category/${art.categorySlug}`} className="text-primary hover:underline">{art.category}</Link>
                          <span className="text-muted-more/30">&bull;</span>
                          <span className="text-muted-more font-semibold">{art.readTime}</span>
                        </div>
                        <h3 className="text-[15px] font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 tracking-tight">
                          <Link href={`/${art.categorySlug}/${art.slug}`}>
                            {art.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-more mt-1">
                        <span>{art.date}</span>
                        <span>&bull;</span>
                        <span>By {art.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* SECTION 2: LATEST STORIES (Clean 3-Column Grid) */}
          <section className="space-y-6">
            <div className="border-b border-border/30 pb-3 flex items-center justify-between">
              <h2 className="section-heading text-foreground">Latest Updates</h2>
              <span className="text-xs font-mono text-muted-more uppercase tracking-wider">Chronological Feed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestArticles.map((art) => (
                <article 
                  key={art.slug}
                  className="flex flex-col justify-between rounded-2xl group transition-all duration-200"
                >
                  <div className="space-y-3">
                    {/* Thumbnail */}
                    <Link href={`/${art.categorySlug}/${art.slug}`} className="block relative aspect-video rounded-2xl overflow-hidden bg-background-alt border border-border/40 select-none">
                      {art.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={art.cover} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 flex items-center justify-center text-xs text-muted-more font-bold">
                          PGDOWN Tech
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                        <Link href={`/category/${art.categorySlug}`} className="hover:underline">{art.category}</Link>
                        <span className="text-muted-more/30">&bull;</span>
                        <span className="text-muted-more font-semibold">{art.readTime}</span>
                      </div>
                      
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 tracking-tight">
                        <Link href={`/${art.categorySlug}/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h3>
                      
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">
                        {art.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/30 mt-4 pt-3 text-[10px] font-semibold text-muted-more select-none">
                    <span>By {art.author}</span>
                    <span>{art.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 3: NEWSLETTER */}
          <section id="newsletter" className="py-8">
            <div className="max-w-4xl mx-auto bg-background-alt/40 border border-border/30 p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col items-center text-center space-y-6">
              <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(45deg,#E95420_10%,transparent_10%)] bg-[size:10px_10px] pointer-events-none" />
              
              <div className="max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  Newsletter Subscription
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                  Get Technical Updates Weekly
                </h2>
                <p className="text-xs md:text-sm text-muted leading-relaxed">
                  Join thousands of software engineers, Linux administrators, and cloud architects who receive our highly curated technical analysis directly in their inbox.
                </p>
              </div>

              <form className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  required
                  className="flex-1 px-4 py-2.5 border border-border/60 rounded-xl bg-background text-foreground outline-none focus:border-primary/40 text-sm placeholder:text-muted-more"
                  placeholder="Enter your email address..."
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-sm shrink-0"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-[9px] text-muted-more">
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
