"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, Settings, FlaskConical, GitBranch, BookOpen, Compass, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor page scroll to apply styling adjustments
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Keyboard Shortcut handler for CMD/CTRL + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { name: "Equipment", href: "/category/equipment", icon: <Settings className="h-4 w-4" /> },
    { name: "Process Chemicals", href: "/category/process-chemicals", icon: <FlaskConical className="h-4 w-4" /> },
    { name: "Process Systems", href: "/category/process-systems", icon: <GitBranch className="h-4 w-4" /> },
    { name: "Learning Path", href: "/learning-path", icon: <Compass className="h-4 w-4" /> },
    { name: "Glossary", href: "/category/glossary", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-card/85 backdrop-blur-md border-b border-border/80 shadow-sm" 
          : "bg-background/90 backdrop-blur-sm border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-[84px] w-[84px] relative flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <Image 
                src="/icon-garudaloka-navbar.png" 
                alt="Garudaloka Logo" 
                fill 
                className="object-contain transition-all duration-300 dark:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.25))]" 
                sizes="84px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-sans tracking-tight text-foreground leading-tight">
                Garudaloka
              </span>
              <span className="text-[9px] font-bold text-accent tracking-widest uppercase -mt-0.5 leading-none">
                Engineering
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-semibold text-muted hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-lg hover:bg-background-alt transition-all duration-150 flex items-center gap-2"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Block (Search, Theme, Mobile Hamburger) */}
          <div className="flex items-center gap-2.5">
            
            {/* Search Box Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center sm:justify-start gap-2.5 p-2 sm:px-3 sm:py-2 border border-border bg-card hover:bg-background-alt text-muted rounded-lg transition-all duration-200 w-10 h-10 sm:w-56 text-left cursor-pointer shadow-sm text-sm"
              aria-label="Cari pengetahuan"
            >
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <span className="hidden sm:inline-flex flex-1 truncate text-xs font-medium text-muted/80">Cari pengetahuan...</span>
              <span className="hidden sm:inline-flex items-center text-[9px] font-bold border border-border/80 px-1.5 py-0.5 rounded bg-background shrink-0">
                ⌘K
              </span>
            </button>

            {/* Light/Dark Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg border border-border bg-card text-foreground hover:bg-background-alt transition-colors cursor-pointer flex items-center justify-center w-10 h-10 shadow-sm"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden animate-in fade-in duration-200">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <nav className="fixed top-16 right-0 bottom-0 w-4/5 max-w-sm bg-card border-l border-border p-6 shadow-2xl flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-right duration-250">
            <div className="text-xs font-bold uppercase tracking-wider text-muted border-b border-border pb-2">
              Menu Navigasi
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border hover:bg-background-alt text-foreground text-sm font-semibold transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="p-2 bg-background border border-border rounded text-muted">
                      {link.icon}
                    </span>
                    {link.name}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </div>
            <div className="mt-auto border-t border-border pt-4 flex flex-col gap-2 text-center text-[11px] text-muted">
              <span>Garudaloka Engineering &copy; 2026</span>
              <span>Bahasa Indonesia-first</span>
            </div>
          </nav>
        </div>
      )}

      {/* Global Search Dialog Modal overlay */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
