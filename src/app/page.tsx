import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStats from "@/components/ImpactStats";
import CommunityFeedPreview from "@/components/CommunityFeedPreview";
import ContributionGraph from "@/components/ContributionGraph";
import WorldMap from "@/components/WorldMap";
import { getAllArticles } from "@/lib/content";
import { TreeDeciduous, Trash2, Droplet, Bike, ShieldCheck, Heart, Sparkles, Users, ArrowRight, Calendar, Clock } from "lucide-react";

export const revalidate = 3600; // ISR - revalidate every hour

export default async function Home() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, 3);

  const countsAsActions = [
    {
      icon: TreeDeciduous,
      title: "Plant a Tree",
      desc: "Plant a native sapling to help sequester carbon dioxide and support local wildlife.",
    },
    {
      icon: Trash2,
      title: "Pick Up Trash",
      desc: "Remove plastics and other waste from beaches, forests, or local roadsides.",
    },
    {
      icon: Droplet,
      title: "Save Water",
      desc: "Reduce domestic waste or construct simple rainwater collection systems.",
    },
    {
      icon: Bike,
      title: "Bike Instead",
      desc: "Cycle or walk instead of using fossil-fueled vehicles for short journeys.",
    },
    {
      icon: ShieldCheck,
      title: "Reduce Plastic",
      desc: "Opt for reusable alternatives and completely refuse single-use packaging.",
    },
    {
      icon: Heart,
      title: "Protect Wildlife",
      desc: "Build nesting boxes, feed pollinators, or support native animal habitats.",
    },
    {
      icon: Sparkles,
      title: "Plant Flowers",
      desc: "Grow native wild flowers on your balcony or yard to feed declining bees.",
    },
    {
      icon: Users,
      title: "Community Cleanup",
      desc: "Mobilize neighbors to clean up and restore local parks, trails, or coastlines.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-background text-foreground">
        
        {/* ================= SECTION 1: HERO ================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
          {/* Full-width morning sunlight forest photograph background */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-forest.png"
              alt="Lush forest morning sunlight filtering through trees"
              className="w-full h-full object-cover object-center select-none"
            />
            {/* Minimal overlay to maintain readability and Stripe-like sophistication */}
            <div className="absolute inset-0 bg-white/40 mix-blend-lighten" />
            <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/70" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-20 text-center flex flex-col items-center gap-8">
            <div className="max-w-4xl space-y-4">
              <h1 className="hero-title text-foreground tracking-tight font-bold">
                The Earth doesn't need heroes.<br />
                It needs millions of people doing small things.
              </h1>
              <p className="text-lg md:text-xl text-foreground font-medium max-w-xl mx-auto leading-relaxed select-none">
                Every action matters. Every action is remembered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 select-none">
              <Link
                href="/submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-primary text-white font-medium text-sm rounded-md shadow-sm hover:bg-primary-hover transition-colors text-center"
              >
                Start Your First Action
              </Link>
              <Link
                href="/community"
                className="w-full sm:w-auto px-6 py-3.5 bg-white border border-border text-foreground font-medium text-sm rounded-md shadow-xs hover:bg-border/30 transition-colors text-center"
              >
                Explore Community
              </Link>
            </div>
          </div>
        </section>

        {/* Outer content container */}
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 flex flex-col gap-20 md:gap-32">
          
          {/* ================= SECTION 2: IMPACT STATS ================= */}
          <section className="space-y-4">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Live Impact Statistics</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our collective progress in real-time</h2>
            </div>
            <ImpactStats />
          </section>

          {/* ================= SECTION 3: WHAT COUNTS AS ACTION ================= */}
          <section className="space-y-10">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">What Counts as an Action</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Simple ways you can take part</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {countsAsActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <div 
                    key={i}
                    className="bg-white border border-border p-6 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">{action.title}</h3>
                      <p className="text-xs text-foreground-sub leading-relaxed">{action.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= SECTION 4: COMMUNITY FEED PREVIEW ================= */}
          <section className="space-y-10">
            <div className="text-center md:text-left space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Community Feed</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recent actions around the globe</h2>
            </div>
            <CommunityFeedPreview />
          </section>

          {/* ================= SECTION 5: CONTRIBUTION GRAPH ================= */}
          <section className="space-y-4">
            <ContributionGraph />
          </section>

          {/* ================= SECTION 6: INTERACTIVE WORLD MAP ================= */}
          <section className="space-y-4">
            <WorldMap />
          </section>

          {/* ================= SECTION 7: LATEST ARTICLES ================= */}
          <section className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Latest Articles</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Environmental Education</h2>
              </div>
              <Link 
                href="/articles" 
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((art) => (
                <article key={art.slug} className="flex flex-col gap-4 group">
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

                  <div className="space-y-2 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase select-none">
                        <span>{art.category}</span>
                        <span className="text-border">&bull;</span>
                        <span className="flex items-center gap-1 text-foreground-sub">
                          <Clock className="w-3 h-3" /> {art.readTime}
                        </span>
                      </div>

                      <h3 className="font-bold text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/articles/${art.slug}`}>
                          {art.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-foreground-sub leading-relaxed line-clamp-2">
                        {art.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-foreground-sub/80 border-t border-border/60 pt-3 mt-2 select-none">
                      <Calendar className="w-3 h-3" />
                      <span>{art.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ================= SECTION 8: MISSION ================= */}
          <section className="bg-white border border-border rounded-xl p-8 md:p-12 max-w-4xl mx-auto w-full text-center space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none">Our Purpose</span>
            <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed max-w-2xl mx-auto">
              "Earthlog believes that meaningful change begins with ordinary people.<br />
              One tree. One cleanup. One bike ride. One reusable bottle. One action. Millions of people. One better Earth."
            </blockquote>
          </section>

          {/* ================= SECTION 9: CALL TO ACTION ================= */}
          <section className="text-center py-8 max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to leave your mark?</h2>
            <p className="text-sm text-foreground-sub leading-relaxed max-w-md mx-auto">
              Join millions of people in registering simple actions that make our planet a little better. Quietly, day by day.
            </p>
            <div className="select-none pt-2">
              <Link 
                href="/submit" 
                className="inline-block px-6 py-3.5 bg-primary text-white font-medium text-sm rounded-md shadow-sm hover:bg-primary-hover transition-colors"
              >
                Start Your First Action
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
