"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActions, UserAction } from "@/lib/actions";
import { ArrowRight, MapPin, Calendar, Globe } from "lucide-react";

export default function CommunityFeedPreview() {
  const [actions, setActions] = useState<UserAction[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActions = async () => {
      try {
        const res = await fetch("/api/actions");
        let serverActions = [];
        if (res.ok) {
          serverActions = await res.json();
        }

        // Get local actions for instant feedback
        const localActions = getActions();
        
        // Merge list based on unique ID
        const mergedMap = new Map();
        [...serverActions, ...localActions].forEach((act) => {
          if (act && act.id) {
            mergedMap.set(act.id, act);
          }
        });

        const mergedList = Array.from(mergedMap.values()) as UserAction[];
        // Sort newest first
        mergedList.sort((a, b) => b.id.localeCompare(a.id));

        // Take only top 3 latest
        setActions(mergedList.slice(0, 3));
      } catch (err) {
        console.error("Failed to load preview community feed:", err);
        setActions(getActions().slice(0, 3));
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    fetchRecentActions();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="py-12 text-center text-xs font-mono text-foreground-sub animate-pulse">
        Loading recent actions...
      </div>
    );
  }

  if (actions.length === 0) {
    return (
      <div className="border border-dashed border-border py-12 text-center rounded-xl bg-white space-y-3 max-w-[480px] mx-auto select-none">
        <Globe className="w-8 h-8 text-primary/30 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">No actions logged yet</h3>
        <p className="text-xs text-foreground-sub max-w-xs mx-auto leading-relaxed">
          Every movement starts with a single step. Be the first person to leave a positive mark on Earth.
        </p>
        <div className="pt-2">
          <Link
            href="/submit"
            className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm hover:bg-primary-hover transition-colors"
          >
            Log Your First Action
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((act) => (
          <div 
            key={act.id}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-card flex flex-col justify-between group h-full"
          >
            <div className="space-y-4">
              {/* Photo */}
              <Link 
                href={`/action/${act.id}`} 
                className="block aspect-[4/3] w-full overflow-hidden bg-background border-b border-border relative select-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={act.photo} 
                  alt={act.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-border/40 shadow-xs">
                  {act.category}
                </span>
              </Link>

              {/* Card Meta & Story */}
              <div className="px-5 pb-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-foreground-sub/80 select-none">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {act.location ? `${act.location}, ${act.country}` : act.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {act.date}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-[15px] leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    <Link href={`/action/${act.id}`}>
                      {act.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-foreground-sub leading-relaxed font-sans line-clamp-3 italic">
                    "{act.story}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center select-none pt-4">
        <Link 
          href="/community"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover group transition-colors"
        >
          Explore Community Feed
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
