import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles } from "@/lib/content";
import { Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Environmental Education",
  description: "Read educational articles and guides on biodiversity, climate action, conservation, and sustainable living.",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Educational Center
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Environmental Articles</h1>
            <p className="text-sm text-foreground-sub leading-relaxed max-w-xl">
              Curated guides and research on key ecological issues. Learn about carbon sequestration, habitat rewilding, plastic reduction, and collective climate shifts.
            </p>
          </div>

          {/* Grid of Articles */}
          {articles.length === 0 ? (
            <div className="border border-dashed border-border py-16 text-center rounded-xl bg-white select-none">
              <BookOpen className="w-8 h-8 text-primary/30 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-foreground">No Articles Available</h3>
              <p className="text-xs text-foreground-sub max-w-xs mx-auto mt-1">
                Our environmental education writers are compiling materials. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <article key={art.slug} className="flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Thumbnail */}
                    <Link 
                      href={`/articles/${art.slug}`} 
                      className="block aspect-video rounded-xl overflow-hidden bg-background border border-border select-none"
                    >
                      {art.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={art.cover} 
                          alt={art.title} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#E6EDE8] flex items-center justify-center font-bold text-xs text-primary">
                          Earthlog
                        </div>
                      )}
                    </Link>

                    {/* Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase select-none">
                        <span>{art.category}</span>
                        <span className="text-border">&bull;</span>
                        <span className="flex items-center gap-1 text-foreground-sub">
                          <Clock className="w-3.5 h-3.5" /> {art.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/articles/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-foreground-sub leading-relaxed line-clamp-3">
                        {art.description}
                      </p>
                    </div>
                  </div>

                  {/* Date & Link */}
                  <div className="flex items-center justify-between border-t border-border/60 mt-4 pt-3 text-[10px] text-foreground-sub select-none font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {art.date}
                    </span>
                    <Link 
                      href={`/articles/${art.slug}`}
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
      </main>

      <Footer />
    </>
  );
}
