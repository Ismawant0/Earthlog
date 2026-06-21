"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Search, 
  Cpu, 
  Terminal, 
  Monitor, 
  GitBranch, 
  Code, 
  Shield, 
  Code2, 
  CloudSun, 
  User, 
  Mail,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SearchDialog from "./SearchDialog";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (currentY < 80) {
        // Near the top — always show
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        // Scrolling UP — show
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        // Scrolling DOWN — hide (small threshold to avoid jitter)
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update HTML class for scroll status so CSS can move components (like the progress bar)
  useEffect(() => {
    if (visible) {
      document.documentElement.classList.remove("navbar-hidden");
    } else {
      document.documentElement.classList.add("navbar-hidden");
    }
    return () => {
      document.documentElement.classList.remove("navbar-hidden");
    };
  }, [visible]);

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
    { name: "AI", href: "/category/ai", icon: <Cpu className="h-4 w-4" /> },
    { name: "Linux", href: "/category/linux", icon: <Terminal className="h-4 w-4" /> },
    { name: "Windows", href: "/category/windows", icon: <Monitor className="h-4 w-4" /> },
    { name: "Open Source", href: "/category/open-source", icon: <GitBranch className="h-4 w-4" /> },
    { name: "Software", href: "/category/software", icon: <Code className="h-4 w-4" /> },
    { name: "Cyber Security", href: "/category/cyber-security", icon: <Shield className="h-4 w-4" /> },
    { name: "Programming", href: "/category/programming", icon: <Code2 className="h-4 w-4" /> },
    { name: "Cloud", href: "/category/cloud", icon: <CloudSun className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Sticky Header with hide/show on scroll - Always Black/Dark background */}
      <header
        className={`fixed top-0 left-0 right-0 z-45 w-full h-[64px] flex items-center transition-all duration-300
          bg-slate-950/95 border-b border-white/10 shadow-md backdrop-blur-xl
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between gap-4">
          
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 select-none">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black font-sans tracking-tighter text-white">
                PG<span className="text-primary">DOWN</span>
              </span>
              <span className="text-[9px] font-mono border border-primary/30 bg-primary/10 text-primary rounded px-1 py-0.5 uppercase tracking-wide">
                PRO
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Block */}
          <div className="flex items-center gap-2">
            
            {/* Search Box Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all duration-200 w-10 h-9 lg:w-44 text-left cursor-pointer text-sm"
              aria-label="Cari artikel"
            >
              <Search className="h-4 w-4 shrink-0 mr-0 lg:mr-2 text-slate-400" />
              <span className="hidden lg:inline-flex flex-1 truncate text-xs text-slate-400/80">Search...</span>
              <span className="hidden lg:inline-flex items-center text-[9px] font-bold border border-white/15 px-1.5 py-0.5 rounded bg-white/10 text-slate-300 shrink-0 select-none">
                ⌘K
              </span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle 
              className="flex items-center justify-center w-9 h-9 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer shadow-sm relative"
            />

            {/* Newsletter Link */}
            <Link 
              href="#newsletter"
              className="hidden sm:flex items-center justify-center w-9 h-9 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Newsletter"
            >
              <Mail className="h-4 w-4" />
            </Link>

            {/* User Profile */}
            <button
              className="flex items-center justify-center w-9 h-9 border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
              aria-label="User Menu"
            >
              <User className="h-4 w-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Spacer to push content below fixed header */}
      <div className="h-[64px]" />

      {/* Global Search Dialog palette */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
