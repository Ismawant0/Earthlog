"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, Cpu, Terminal, Monitor, GitBranch, Code, Shield, Code2, CloudSun, HelpCircle, FileText, Bookmark, Flame } from "lucide-react";
import { type SearchResultItem } from "@/lib/search";
import Link from "next/link";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pgdown_recent_searches");
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isOpen]);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      setSelectedCategoryFilter(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Execute Orama Search via Server API
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const searchRes = await response.json();
        if (Array.isArray(searchRes)) {
          setResults(searchRes);
        } else {
          setResults([]);
        }
        setSelectedIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 150); // Small debounce

    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const filtered = getFilteredResults();

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
      } else if (e.key === "Enter") {
        if (filtered[selectedIndex]) {
          e.preventDefault();
          const target = filtered[selectedIndex];
          const url = target.slug 
            ? `/${target.categorySlug}/${target.slug}`
            : `/category/${target.categorySlug}`;
          
          // Save to recents
          if (query.trim()) {
            const updated = [query.trim(), ...recentSearches.filter(s => s !== query.trim())].slice(0, 5);
            localStorage.setItem("pgdown_recent_searches", JSON.stringify(updated));
          }

          window.location.href = url;
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, query, selectedCategoryFilter, recentSearches]);

  if (!isOpen) return null;

  const categories = [
    { name: "AI", slug: "ai" },
    { name: "Linux", slug: "linux" },
    { name: "Windows", slug: "windows" },
    { name: "Open Source", slug: "open-source" },
    { name: "Software", slug: "software" },
    { name: "Cyber Security", slug: "cyber-security" },
    { name: "Programming", slug: "programming" },
    { name: "Cloud", slug: "cloud" },
  ];

  const trendingTopics = [
    "Fine-tuning LLM",
    "eBPF Observability",
    "Zero Trust identity",
    "TypeScript Generics"
  ];

  const popularArticles = [
    { title: "Getting Started with LLM Fine-Tuning", url: "/ai/getting-started-with-llm-fine-tuning" },
    { title: "Mastering eBPF: Linux Kernel Observability", url: "/linux/mastering-ebpf-linux-observability" }
  ];

  const getFilteredResults = () => {
    if (!selectedCategoryFilter) return results;
    return results.filter(item => item.categorySlug === selectedCategoryFilter);
  };

  const filteredResults = getFilteredResults();

  const getIcon = (type: string, categorySlug?: string) => {
    const slug = categorySlug || type;
    switch (slug) {
      case "ai":
        return <Cpu className="h-4 w-4 text-purple" />;
      case "linux":
        return <Terminal className="h-4 w-4 text-success" />;
      case "windows":
        return <Monitor className="h-4 w-4 text-blue" />;
      case "open-source":
        return <GitBranch className="h-4 w-4 text-success" />;
      case "software":
        return <Code className="h-4 w-4 text-blue" />;
      case "cyber-security":
        return <Shield className="h-4 w-4 text-red" />;
      case "programming":
        return <Code2 className="h-4 w-4 text-blue" />;
      case "cloud":
        return <CloudSun className="h-4 w-4 text-blue" />;
      default:
        return <FileText className="h-4 w-4 text-muted" />;
    }
  };

  const handleRecentClick = (text: string) => {
    setQuery(text);
    inputRef.current?.focus();
  };

  const handleClearRecents = () => {
    localStorage.removeItem("pgdown_recent_searches");
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0 select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-[4px] transition-opacity" 
        onClick={onClose} 
      />

      {/* Command Palette Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in zoom-in duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border bg-background-alt/50 h-14">
          <Search className="h-5 w-5 text-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted-more text-sm w-full h-full py-3"
            placeholder="Search articles, topics, keywords... (Press Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => { setQuery(""); setSelectedIndex(0); }}
              className="p-1 hover:bg-background rounded-lg text-muted hover:text-foreground cursor-pointer mr-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <span className="hidden md:inline-flex items-center text-[10px] font-bold border border-border px-2 py-0.5 rounded bg-card select-none text-muted-more shadow-xs">
            ESC
          </span>
        </div>

        {/* Category Filters Bar */}
        <div className="px-4 py-2 border-b border-border bg-card flex items-center gap-1.5 overflow-x-auto scrollbar-none select-none">
          <span className="text-[10px] uppercase font-bold text-muted-more mr-2 shrink-0">Filter:</span>
          <button
            onClick={() => { setSelectedCategoryFilter(null); setSelectedIndex(0); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              selectedCategoryFilter === null
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-border hover:bg-background-alt text-muted"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setSelectedCategoryFilter(cat.slug); setSelectedIndex(0); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                selectedCategoryFilter === cat.slug
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "border-border hover:bg-background-alt text-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Command Panel Content */}
        <div className="flex-1 overflow-y-auto p-2 min-h-[300px] max-h-[50vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs font-medium">Querying search index...</p>
            </div>
          ) : query === "" ? (
            <div className="p-4 space-y-6">
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-muted-more px-1">
                    <span>Recent Searches</span>
                    <button 
                      onClick={handleClearRecents}
                      className="hover:underline text-[9px] lowercase hover:text-primary transition-colors cursor-pointer"
                    >
                      clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((text) => (
                      <button
                        key={text}
                        onClick={() => handleRecentClick(text)}
                        className="px-2.5 py-1 text-xs border border-border rounded-lg text-muted hover:border-primary/35 hover:bg-primary/5 transition-all cursor-pointer font-medium"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Topics */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-more px-1 flex items-center gap-1.5 select-none">
                  <Flame className="h-3.5 w-3.5 text-primary" /> Trending Topics
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {trendingTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => handleRecentClick(topic)}
                      className="px-2.5 py-1 text-xs border border-border rounded-lg text-muted hover:border-primary/35 hover:bg-primary/5 transition-all cursor-pointer font-medium"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-more px-1 flex items-center gap-1.5 select-none">
                  <Bookmark className="h-3.5 w-3.5 text-primary" /> Popular Articles
                </h4>
                <div className="space-y-1">
                  {popularArticles.map((art) => (
                    <Link
                      key={art.title}
                      href={art.url}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-background-alt text-sm font-semibold text-foreground transition-all"
                    >
                      <FileText className="h-4 w-4 text-muted" />
                      <span>{art.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-16 px-4 text-center text-muted">
              <HelpCircle className="h-10 w-10 mx-auto text-muted-more mb-3 opacity-60" />
              <p className="text-sm font-semibold text-foreground">No matches found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-more mt-1">Try another keyword or remove the active category filter.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-muted-more uppercase tracking-wider">
                Matches ({filteredResults.length})
              </div>
              {filteredResults.map((item, idx) => {
                const url = item.slug 
                  ? `/${item.categorySlug}/${item.slug}`
                  : `/category/${item.categorySlug}`;
                const isSelected = idx === selectedIndex;
                
                return (
                  <Link
                    key={item.id}
                    href={url}
                    onClick={onClose}
                    className={`flex items-start p-3 rounded-xl transition-all duration-150 ${
                      isSelected 
                        ? "bg-primary text-white" 
                        : "hover:bg-background-alt text-foreground"
                    }`}
                  >
                    <div className={`p-2 rounded-lg mr-3 ${
                      isSelected ? "bg-white/20 text-white" : "bg-background border border-border"
                    }`}>
                      {getIcon(item.type, item.categorySlug)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold truncate">
                          {item.title}
                        </h4>
                        <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded tracking-wide shrink-0 ${
                          isSelected 
                            ? "bg-white/30 text-white" 
                            : "bg-background border border-border text-muted-more"
                        }`}>
                          {item.categorySlug}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 line-clamp-1 ${
                        isSelected ? "text-white/80" : "text-muted"
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info instructions */}
        <div className="px-4 py-3 bg-background-alt border-t border-border flex items-center justify-between text-[11px] text-muted-more">
          <div className="flex gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div>Powered by PGDOWN indexer</div>
        </div>
      </div>
    </div>
  );
}
