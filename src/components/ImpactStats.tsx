"use client";

import { useEffect, useState } from "react";

interface StatItemProps {
  label: string;
  target: number;
  suffix?: string;
}

function Counter({ label, target, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 2000; // 2 seconds animation
    const fps = 60;
    const totalFrames = Math.round(duration / (1000 / fps));
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Quadratic ease-out formula
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * target);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(currentCount);
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [target]);

  // Always use "en-US" locale to keep server/client consistent
  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(num);

  if (!mounted) {
    return (
      <div className="text-center md:text-left space-y-1">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
          &mdash;
        </div>
        <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-foreground-sub">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center md:text-left space-y-1">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary break-words">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-foreground-sub">
        {label}
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const [stats, setStats] = useState({
    actions: 0,
    trees: 0,
    trash: 0,
    countries: 0
  });

  useEffect(() => {
    // Fetch live actions dynamically from both localStorage and API
    const loadStats = async () => {
      try {
        const res = await fetch("/api/actions");
        let serverActions = [];
        if (res.ok) {
          serverActions = await res.json();
        }

        // Get local actions to merge (filter duplicates)
        let localActions = [];
        if (typeof window !== "undefined") {
          try {
            const stored = localStorage.getItem("earthlog_actions");
            if (stored) {
              localActions = JSON.parse(stored);
            }
          } catch (e) {}
        }

        // Merge actions by unique ID
        const allActionsMap = new Map();
        [...serverActions, ...localActions].forEach((act) => {
          if (act && act.id) {
            allActionsMap.set(act.id, act);
          }
        });
        const mergedActions = Array.from(allActionsMap.values());

        // Count logic starting from 0
        let addedActions = mergedActions.length;
        let addedTrees = 0;
        let addedTrash = 0;
        const newCountries = new Set<string>();

        mergedActions.forEach((act) => {
          const countryClean = act.country?.trim().toLowerCase();
          if (countryClean && countryClean !== "unknown") {
            newCountries.add(countryClean);
          }

          const findNumber = (text: string) => {
            const match = text?.match(/(\d+)/);
            return match ? parseInt(match[1], 10) : null;
          };

          const parsedNum = findNumber(act.story) || findNumber(act.title) || 1;

          if (act.category === "Plant Tree") {
            addedTrees += parsedNum;
          } else if (act.category === "Cleanup") {
            addedTrash += parsedNum;
          }
        });

        setStats({
          actions: addedActions,
          trees: addedTrees,
          trash: addedTrash,
          countries: newCountries.size
        });
      } catch (err) {
        console.error("Failed to load statistics:", err);
      }
    };

    loadStats();
  }, []);

  return (
    // Redesigned responsive layout to prevent overlapping on mobile (1 col on mobile, 2 on tablet, 4 on desktop)
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 bg-white border border-border rounded-xl px-8 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <Counter label="Actions Logged" target={stats.actions} />
      <Counter label="Trees Planted" target={stats.trees} />
      <Counter label="Trash Collected (kg)" target={stats.trash} />
      <Counter label="Countries Involved" target={stats.countries} />
    </div>
  );
}
