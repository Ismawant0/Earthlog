"use client";

import { useEffect, useState } from "react";

interface StatItemProps {
  label: string;
  target: number;
  suffix?: string;
}

function Counter({ label, target, suffix = "" }: StatItemProps) {
  const [count, setCount] = useState(Math.floor(target * 0.9));

  useEffect(() => {
    let start = Math.floor(target * 0.9);
    const duration = 2000; // 2 seconds
    const increment = (target - start) / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 bg-white border border-border rounded-xl px-8 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <Counter label="Actions Logged" target={1482920} />
      <Counter label="Trees Planted" target={824310} />
      <Counter label="Trash Collected (kg)" target={412980} />
      <Counter label="Countries Involved" target={142} />
    </div>
  );
}
