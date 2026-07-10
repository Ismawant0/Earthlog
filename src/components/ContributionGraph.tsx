"use client";

import { useMemo } from "react";

export default function ContributionGraph() {
  // Generate deterministic but organic-looking data for a 365-day year (53 weeks * 7 days)
  const gridData = useMemo(() => {
    const data = [];
    const colors = [
      "bg-[#E6EDE8]", // Level 0: default bg
      "bg-[#C7DEC8]", // Level 1: light green
      "bg-[#A3C6A5]", // Level 2: medium-light green
      "bg-[#7DAA81]", // Level 3: medium-dark green
      "bg-[#2F6B45]", // Level 4: dark brand green
    ];

    // Seeded random-like generation to look like a realistic contribution pattern
    for (let col = 0; col < 53; col++) {
      const week = [];
      for (let row = 0; row < 7; row++) {
        // Create an organic distribution: higher activity in winter/spring, clusters of high activity
        const factor = Math.sin(col / 5) * Math.cos(row / 2) + Math.random();
        let level = 0;
        if (factor > 1.2) level = 4;
        else if (factor > 0.8) level = 3;
        else if (factor > 0.4) level = 2;
        else if (factor > 0.0) level = 1;

        week.push({
          level,
          colorClass: colors[level],
          actions: level === 0 ? "No actions logged" : `${level} action${level > 1 ? "s" : ""} logged`,
        });
      }
      data.push(week);
    }
    return data;
  }, []);

  return (
    <div className="w-full bg-white border border-border rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground">Your Earth Contribution</h3>
          <p className="text-sm text-foreground-sub">Small actions create a lifetime of impact.</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-foreground-sub select-none">
          <span>Less</span>
          <div className="w-3.5 h-3.5 rounded-sm bg-[#E6EDE8]" />
          <div className="w-3.5 h-3.5 rounded-sm bg-[#C7DEC8]" />
          <div className="w-3.5 h-3.5 rounded-sm bg-[#A3C6A5]" />
          <div className="w-3.5 h-3.5 rounded-sm bg-[#7DAA81]" />
          <div className="w-3.5 h-3.5 rounded-sm bg-[#2F6B45]" />
          <span>More</span>
        </div>
      </div>

      {/* Grid container with horizontal scroll on mobile */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="min-w-[640px] flex flex-col gap-[3px]">
          <div className="flex gap-[3px]">
            {gridData.map((week, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-[3px]">
                {week.map((day, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] rounded-[1.5px] ${day.colorClass} transition-colors duration-300 hover:ring-1 hover:ring-primary/40`}
                    title={day.actions}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
