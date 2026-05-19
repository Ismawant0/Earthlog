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
      // Check which heading is currently closest to the top of the viewport
      const headingElements = headings.map((h) => document.getElementById(h.id));
      const scrollPosition = window.scrollY + 120; // offset for sticky navbar + headroom

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
    // Initial run
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* 1. TOP READING PROGRESS BAR */}
      <div className="fixed top-16 left-0 right-0 h-1 z-40 bg-border/20 pointer-events-none">
        <div 
          className="h-full bg-accent transition-all duration-75 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. SIDEBAR TABLE OF CONTENTS CONTAINER */}
      <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 hidden xl:block select-none">
        <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider mb-4">
          <List className="h-4 w-4 text-primary dark:text-primary-light" />
          <span>Daftar Isi Halaman</span>
        </div>
        
        <ul className="space-y-2 border-l border-border/80 pl-0.5">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li 
                key={heading.id} 
                className="transition-all duration-150"
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-xs font-semibold block py-1.5 transition-colors relative border-l-2 pl-3 -ml-0.5 ${
                    isActive 
                      ? "border-accent text-accent dark:text-accent-light bg-accent/5 font-bold" 
                      : "border-transparent text-muted hover:text-foreground hover:border-border"
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
