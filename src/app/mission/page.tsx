import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TreeDeciduous, Heart, ShieldAlert, Sparkles } from "lucide-react";

export const metadata = {
  title: "Our Mission",
  description: "Why Earthlog exists: mission first, collective action, and quiet environmental stewardship.",
};

export default function MissionPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-background text-foreground py-16 md:py-24">
        <div className="max-w-[740px] mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none">Mission First</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Mission</h1>
            <p className="text-lg text-foreground-sub leading-relaxed">
              Earthlog exists to inspire, log, and remember the millions of small actions that keep our planet alive.
            </p>
          </div>

          {/* Intro Section */}
          <div className="space-y-6 text-foreground text-[18px] leading-relaxed">
            <p>
              For decades, the environmental narrative has been dominated by two extremes: high-level geopolitical treaties that move too slowly, or catastrophic news stories that leave us feeling powerless. 
            </p>
            <p>
              We are told that the earth needs saving, yet the solutions presented to us often feel distant or corporate. We are asked for donations, or prompted to sign petitions, but we rarely see the physical, cumulative results of our own hands.
            </p>
            <p className="font-medium text-primary border-l-2 border-primary pl-4 py-1 italic">
              "The Earth doesn't need heroes. It needs millions of people doing small things."
            </p>
            <p>
              Earthlog is founded on a simple design philosophy: **Every small action leaves a mark.** We believe that systemic change is built from the bottom up. A single tree planted, a piece of trash picked up, a reuseable cup carried—each is a micro-vote for the future of our biosphere.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="space-y-8 pt-6">
            <h2 className="text-2xl font-bold tracking-tight">The Three Pillars of Earthlog</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <TreeDeciduous className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">1. Absolute Simplicity</h3>
                  <p className="text-sm text-foreground-sub leading-relaxed">
                    No likes, no algorithms, and no comment sections. Earthlog is not a social network built to harvest attention. It is a quiet registry where you can document actions without social pressure or distraction.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">2. Radical Transparency</h3>
                  <p className="text-sm text-foreground-sub leading-relaxed">
                    Our platform is open-source and publicly verifiable. We publish impact datasets openly so that everyone can audit the progress, counts, and countries mapped within our ecosystem.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">3. Collective Accountability</h3>
                  <p className="text-sm text-foreground-sub leading-relaxed">
                    By listing actions in a shared timeline, we create a living archive of human care. Seeing a pin drop on the map in Indonesia, Kenya, or Canada reminds us that we are part of a global community quietly doing the work.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="space-y-6 pt-6 border-t border-border">
            <h2 className="text-2xl font-bold tracking-tight">Systemic Shifts</h2>
            <p className="text-sm text-foreground-sub leading-relaxed">
              We do not claim that planting a single tree solves climate change. But we know that a person who plants a tree, carries a reusable bottle, and cycles to work starts viewing themselves as a steward of the environment. That shift in identity is contagious. It changes how we vote, how we consume, and how we build our communities.
            </p>
            <p className="text-sm text-foreground-sub leading-relaxed">
              Earthlog is the quiet canvas for those who want to act rather than talk.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
