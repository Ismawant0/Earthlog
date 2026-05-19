"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X, BookOpen, Settings, FlaskConical, HelpCircle, FileText } from "lucide-react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
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

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === "Enter") {
        if (results[selectedIndex]) {
          e.preventDefault();
          const target = results[selectedIndex];
          const url = target.slug 
            ? `/${target.categorySlug}/${target.slug}`
            : `/category/${target.categorySlug}`;
          window.location.href = url;
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "equipment":
        return <Settings className="h-4 w-4 text-primary dark:text-primary-light" />;
      case "chemical":
        return <FlaskConical className="h-4 w-4 text-accent" />;
      case "glossary":
        return <BookOpen className="h-4 w-4 text-success" />;
      default:
        return <FileText className="h-4 w-4 text-muted" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "equipment":
        return "Alat";
      case "chemical":
        return "Kimia";
      case "glossary":
        return "Glosari";
      case "category":
        return "Kategori";
      default:
        return "Artikel";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 md:px-0">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] animate-in fade-in zoom-in duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border bg-background-alt h-14">
          <Search className="h-5 w-5 text-muted mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder-muted text-base w-full h-full py-3"
            placeholder="Cari alat, chemical, sistem proses, glosari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-1 hover:bg-background rounded text-muted hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <span className="hidden md:inline-flex items-center text-xs text-muted border border-border px-1.5 py-0.5 rounded bg-card ml-2">
            ESC
          </span>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-2 min-h-[200px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-sm">Mencari dengan Orama...</p>
            </div>
          ) : query === "" ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <HelpCircle className="h-10 w-10 text-muted mb-3 opacity-60" />
              <h3 className="text-base font-semibold text-foreground mb-1">
                Pencarian Instan Garudaloka
              </h3>
              <p className="text-sm text-muted max-w-sm">
                Ketik kata kunci untuk mencari di seluruh library teknik, alat industri, chemical, and istilah glosari.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 px-4 text-center text-muted">
              <p className="text-sm font-medium">Tidak ada hasil ditemukan untuk &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Coba gunakan istilah teknik lainnya seperti &ldquo;separator&rdquo; atau &ldquo;emulsi&rdquo;.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-muted uppercase tracking-wider">
                Hasil Pencarian ({results.length})
              </div>
              {results.map((item, idx) => {
                const url = item.slug 
                  ? `/${item.categorySlug}/${item.slug}`
                  : `/category/${item.categorySlug}`;
                const isSelected = idx === selectedIndex;
                
                return (
                  <Link
                    key={item.id}
                    href={url}
                    onClick={onClose}
                    className={`flex items-start p-3 rounded-lg transition-all duration-150 ${
                      isSelected 
                        ? "bg-primary text-white dark:bg-primary dark:text-white" 
                        : "hover:bg-background-alt text-foreground"
                    }`}
                  >
                    <div className={`p-2 rounded-md mr-3 ${
                      isSelected ? "bg-white/20 text-white" : "bg-background border border-border"
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold truncate">
                          {item.title}
                        </h4>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          isSelected 
                            ? "bg-white/30 text-white" 
                            : "bg-background border border-border text-muted"
                        }`}>
                          {getTypeBadge(item.type)}
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

        {/* Footer info */}
        <div className="px-4 py-3 bg-background-alt border-t border-border flex items-center justify-between text-xs text-muted">
          <div className="flex gap-4">
            <span>↑↓ Navigasi</span>
            <span>↵ Buka</span>
          </div>
          <div>Powered by Orama Search</div>
        </div>
      </div>
    </div>
  );
}
