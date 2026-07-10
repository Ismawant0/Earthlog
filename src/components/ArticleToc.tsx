"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

interface ArticleTocProps {
  headings: HeadingItem[];
}

export default function ArticleToc({ headings }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll for Table of Contents highlighting and top progress bar
  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Determine active heading section
      const headingElements = headings.map((h) => document.getElementById(h.id));
      const scrollPosition = window.scrollY + 110; // offset for sticky navbar + spacing

      let currentActiveId = "";
      
      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          currentActiveId = headings[i].id;
        }
      }

      // Fallback to first heading if scrolled near the top
      if (window.scrollY < 200 && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Earthlog Reading Progress Bar — Amber accent per design spec */}
      <div className="progress-bar-container fixed top-[64px] left-0 right-0 h-[3px] z-50 pointer-events-none"
        style={{ backgroundColor: 'rgba(245,158,11,0.12)' }}>
        <div 
          className="h-full transition-all duration-75 ease-out rounded-r-full" 
          style={{ width: `${scrollProgress}%`, backgroundColor: 'var(--progress-bar)' }}
        />
      </div>

      {/* Sidebar Table of Contents Container */}
      <nav className="sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 block select-none scrollbar-none">
        <div className="flex items-center gap-2 text-foreground font-bold text-[10px] uppercase tracking-wider mb-4">
          <List className="h-4 w-4 text-primary" />
          <span>Table of Contents</span>
        </div>
        
        <ul className="space-y-1.5 border-l border-border pl-0.5">
          {headings.map((heading, index) => {
            const isActive = heading.id === activeId;
            return (
              <li 
                key={`${heading.id}-${index}`} 
                className="transition-all duration-150"
                style={{ paddingLeft: `${(heading.level - 2) * 10}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-xs font-semibold block py-1 transition-colors relative border-l-2 pl-3 -ml-0.5 ${
                    isActive 
                      ? "border-primary text-primary font-extrabold bg-primary/5" 
                      : "border-transparent text-muted hover:text-foreground hover:border-border/80"
                  }`}
                >
                  <span className="line-clamp-1 flex items-center gap-1">
                    {heading.level > 2 && <ChevronRight className="h-3 w-3 opacity-60 inline" />}
                    {heading.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
