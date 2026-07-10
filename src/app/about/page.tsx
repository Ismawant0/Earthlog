import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TreeDeciduous, BookOpen, Compass, Shield } from "lucide-react";

export const metadata = {
  title: "About Earthlog",
  description: "Learn about Our Story, The Initiator, Transparency, and Future Vision of Earthlog.org.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-16 md:py-24">
        <div className="max-w-[740px] mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              Organizational Identity
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About Earthlog</h1>
            <p className="text-lg text-foreground-sub leading-relaxed">
              Quietly documenting the actions that keep our planet green.
            </p>
          </div>

          {/* Section: Our Story */}
          <section id="our-story" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Our Story</h2>
            <div className="space-y-4 text-sm text-foreground-sub leading-relaxed">
              <p>
                Earthlog was conceptualized in mid-2026. The initial idea arose from a simple realization: while millions of people want to help protect the environment, they are often deterred by the scale of the challenge or the commercialized nature of modern campaigns.
              </p>
              <p>
                We wanted to build an online space where action itself is the only metric. Not likes, not follower counts, and not donations. By focusing purely on documentable environmental actions, we aim to build a global archive of quiet, collective stewardship.
              </p>
            </div>
          </section>

          {/* Section: The Initiator */}
          <section id="initiator" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">The Initiator</h2>
            <div className="space-y-4 text-sm text-foreground-sub leading-relaxed">
              <p>
                Earthlog was initiated by a global consortium of software designers, writers, and conservationists. Rather than forming a traditional hierarchy, the project is run as an open-source decentralized community. 
              </p>
              <p>
                The initiation team designed the template to operate autonomously on static hosting structures, keeping server costs minimal and ensuring the project can continue to run without relying on advertising networks or commercial donations.
              </p>
            </div>
          </section>

          {/* Section: Transparency */}
          <section id="transparency" className="space-y-4 border-t border-border pt-8">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="w-5 h-5" />
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Transparency Code</h2>
            </div>
            <div className="space-y-4 text-sm text-foreground-sub leading-relaxed">
              <p>
                We believe that trust is built through complete visibility.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Open Source Base:</strong> All website code is open-source and hosted publicly on GitHub. Anyone can examine our logic, suggest improvements, or deploy their own version.
                </li>
                <li>
                  <strong>No Tracking Cookies:</strong> Earthlog does not use advertising tracking cookies. We measure general pageviews using privacy-respecting analytics and do not compile user profiles.
                </li>
                <li>
                  <strong>Zero-Commercialization:</strong> Earthlog does not sell products, serve ads, or charge users. We do not maintain any bank accounts. The project is sustained purely by volunteer contributors donating hosting resources.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Future Vision */}
          <section id="future-vision" className="space-y-4 border-t border-border pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Future Vision</h2>
            <div className="space-y-4 text-sm text-foreground-sub leading-relaxed">
              <p>
                In the coming years, we plan to scale the movement by enabling automated third-party verification of actions (such as verifying tree plantings via satellite coordinates) and establishing localized offline action groups.
              </p>
              <p>
                Our ultimate goal is for Earthlog to become a standard tool in environmental curricula worldwide, encouraging students and communities to document their ecological habits.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
