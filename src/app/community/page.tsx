"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getActions, UserAction, ACTION_CATEGORIES } from "@/lib/actions";
import { MapPin, Calendar, ArrowRight, Filter, Leaf, Globe } from "lucide-react";

export default function CommunityFeedPage() {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const res = await fetch("/api/actions");
        let serverActions = [];
        if (res.ok) {
          serverActions = await res.json();
        }

        // Merge with temporary localStorage actions (instant local feedback)
        const localActions = getActions();
        const mergedMap = new Map();
        
        // Let server actions take precedence, or combine them
        [...serverActions, ...localActions].forEach((act) => {
          if (act && act.id) {
            mergedMap.set(act.id, act);
          }
        });
        
        const mergedList = Array.from(mergedMap.values()) as UserAction[];
        // Sort newest first
        mergedList.sort((a, b) => b.id.localeCompare(a.id));

        setActions(mergedList);
      } catch (err) {
        console.error("Failed to fetch community feed actions:", err);
        // Fallback to local storage if API fails
        setActions(getActions());
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    fetchActions();
  }, []);

  const filteredActions = actions.filter((act) => {
    if (selectedCategory === "All") return true;
    return act.category === selectedCategory;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background text-foreground py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-6 space-y-10">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Community Registry
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Community Actions</h1>
              <p className="text-sm text-foreground-sub leading-relaxed max-w-xl">
                Small actions documented by people around the world. No likes. No comments. No algorithms. Just quiet evidence of positive change.
              </p>
            </div>

            <div className="shrink-0 select-none">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm hover:bg-primary-hover transition-colors"
              >
                <Leaf className="w-3.5 h-3.5" />
                Log a New Action
              </Link>
            </div>
          </div>

          {/* Only show filters when there's data */}
          {mounted && actions.length > 0 && (
            <div className="space-y-3 select-none">
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
          )}

          {/* Content Area */}
          {!mounted || loading ? (
            <div className="py-20 text-center text-sm font-mono text-foreground-sub animate-pulse">
              Loading community registry...
            </div>
          ) : filteredActions.length === 0 ? (
            /* ── Beautiful Empty State ── */
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 select-none">
              <div className="w-20 h-20 rounded-full border border-border bg-white flex items-center justify-center shadow-card">
                <Globe className="w-9 h-9 text-primary/40" />
              </div>

              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  {selectedCategory === "All"
                    ? "No actions have been logged yet."
                    : `No "${selectedCategory}" actions logged yet.`}
                </h2>
                <p className="text-sm text-foreground-sub leading-relaxed">
                  {selectedCategory === "All"
                    ? "Every movement starts with a single step. Be the first person to leave a positive mark on Earth."
                    : "Be the first to log a positive action in this category."}
                </p>
              </div>

              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-hover transition-colors"
              >
                <Leaf className="w-4 h-4" />
                Log Your First Action
              </Link>

              <p className="text-[11px] text-foreground-sub/60 italic font-medium">
                "Every small action leaves a mark."
              </p>
            </div>
          ) : (
            /* ── Action Cards Grid ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
              {filteredActions.map((act) => (
                <article
                  key={act.id}
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-card flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo */}
                    <Link
                      href={`/action/${act.id}`}
                      className="block aspect-[4/3] w-full overflow-hidden bg-background border-b border-border relative select-none"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={act.photo}
                        alt={act.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category badge over photo */}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border/60 shadow-sm">
                        {act.category}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      {/* Country */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground-sub select-none">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {act.location ? `${act.location}, ${act.country}` : act.country}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-base text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
                        <Link href={`/action/${act.id}`}>{act.title}</Link>
                      </h3>

                      {/* Story preview */}
                      <p className="text-sm text-foreground-sub leading-relaxed line-clamp-3 italic">
                        "{act.story}"
                      </p>
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-border/60 select-none">
                    <span className="flex items-center gap-1.5 text-[11px] text-foreground-sub font-semibold">
                      <Calendar className="w-3 h-3" /> {act.date}
                    </span>
                    <Link
                      href={`/action/${act.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover transition-colors group/link"
                    >
                      View
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
