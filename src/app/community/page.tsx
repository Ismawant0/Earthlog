"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getActions, UserAction, ACTION_CATEGORIES } from "@/lib/actions";
import { MapPin, Calendar, ArrowRight, Sparkles, Filter } from "lucide-react";

export default function CommunityFeedPage() {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setActions(getActions());
  }, []);

  const filteredActions = actions.filter((act) => {
    if (selectedCategory === "All") return true;
    return act.category === selectedCategory;
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-background text-foreground py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 space-y-12">
          
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none">Community Registry</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Community Feed</h1>
            <p className="text-sm text-foreground-sub leading-relaxed max-w-xl">
              A chronological archive of environmental actions logged by people around the world. No likes. No comments. No algorithms. Just quiet evidence of positive change.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="space-y-4 select-none">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-sub">
              <Filter className="w-3.5 h-3.5 text-primary" />
              <span>Filter by Category</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer
                  ${selectedCategory === "All"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-border text-foreground-sub hover:text-foreground hover:bg-border/30"
                  }
                `}
              >
                All
              </button>
              {ACTION_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer
                    ${selectedCategory === cat
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-border text-foreground-sub hover:text-foreground hover:bg-border/30"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Feed Cards */}
          {filteredActions.length === 0 ? (
            <div className="border border-dashed border-border py-16 text-center rounded-xl bg-white space-y-3">
              <Sparkles className="w-8 h-8 text-primary/30 mx-auto" />
              <h3 className="text-sm font-bold text-foreground">No Actions Logged Under This Category Yet</h3>
              <p className="text-xs text-foreground-sub max-w-xs mx-auto">
                Be the first to log a new positive environmental action in this category!
              </p>
              <div className="pt-2">
                <Link
                  href="/submit"
                  className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md shadow-xs hover:bg-primary-hover transition-colors"
                >
                  Log Your Action
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActions.map((act) => (
                <article 
                  key={act.id} 
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-card flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <Link href={`/action/${act.id}`} className="block aspect-[4/3] w-full overflow-hidden bg-background border-b border-border relative select-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={act.photo} 
                        alt={act.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                      />
                    </Link>

                    {/* Metadata & Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-foreground-sub/80 border-b border-border/60 pb-3 select-none">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {act.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {act.date}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-bold text-base text-foreground leading-snug tracking-tight hover:text-primary transition-colors">
                          <Link href={`/action/${act.id}`}>
                            {act.title || act.category}
                          </Link>
                        </h3>

                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground-sub flex items-center gap-1 select-none">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {act.location || act.country}
                        </h4>

                        <p className="text-sm text-foreground leading-relaxed italic line-clamp-3">
                          "{act.story}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Read detail button */}
                  <div className="px-6 pb-6 pt-3 select-none">
                    <Link
                      href={`/action/${act.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover group/link transition-colors"
                    >
                      Read Action Details 
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
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
