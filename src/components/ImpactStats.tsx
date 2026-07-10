"use client";

import { useEffect, useState } from "react";
import { getActions } from "@/lib/actions";

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
        <div className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          &mdash;
        </div>
        <div className="text-xs uppercase font-bold tracking-wider text-foreground-sub">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center md:text-left space-y-1">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-xs uppercase font-bold tracking-wider text-foreground-sub">
        {label}
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const [stats, setStats] = useState({
    actions: 1482920,
    trees: 824310,
    trash: 412980,
    countries: 142
  });

  useEffect(() => {
    // Fetch live user actions from localStorage
    const actions = getActions();
    
    // Baseline numbers
    let addedActions = actions.length;
    let addedTrees = 0;
    let addedTrash = 0;
    
    // Default list of major baseline countries to check uniqueness
    const baselineCountries = new Set([
      "indonesia", "united states", "germany", "japan", "canada", "kenya",
      "australia", "united kingdom", "france", "brazil", "india", "china"
    ]);
    const newCountries = new Set<string>();

    actions.forEach((act) => {
      const countryClean = act.country.trim().toLowerCase();
      if (countryClean && !baselineCountries.has(countryClean)) {
        newCountries.add(countryClean);
      }

      // Parse helper: look for numbers in title or story text
      const findNumber = (text: string) => {
        const match = text.match(/(\d+)/);
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
      actions: 1482920 + addedActions,
      trees: 824310 + addedTrees,
      trash: 412980 + addedTrash,
      countries: 142 + newCountries.size
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 bg-white border border-border rounded-xl px-8 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <Counter label="Actions Logged" target={stats.actions} />
      <Counter label="Trees Planted" target={stats.trees} />
      <Counter label="Trash Collected (kg)" target={stats.trash} />
      <Counter label="Countries Involved" target={stats.countries} />
    </div>
  );
}
