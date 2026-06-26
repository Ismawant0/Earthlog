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
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.classList.remove("navbar-hidden");
    } else {
      document.documentElement.classList.add("navbar-hidden");
    }
    return () => document.documentElement.classList.remove("navbar-hidden");
  }, [visible]);

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
    { name: "📰 News", href: "/category/news" },
    { name: "💻 Software", href: "/category/software" },
    { name: "📱 Hardware", href: "/category/hardware" },
    { name: "⭐ Reviews", href: "/category/reviews" },
  ];

  return (
    <>
      {/* Navbar — 60px, glass morphism, Material You */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full h-[60px] flex items-center transition-all duration-300 ease-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
          ${scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : ""}
        `}
        style={{
          backgroundColor: "var(--navbar-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "none" : "none",
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">

          {/* Logo — morphs from neutral → blue on hover */}
          <Link
            href="/"
            className="logo-link flex items-center gap-2 group shrink-0 select-none"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="logo-text text-[20px] font-bold font-sans tracking-tight transition-all duration-200"
                style={{ color: "var(--logo-color)", transitionTimingFunction: "var(--joy-bezier, cubic-bezier(0.34, 1.56, 0.64, 1))" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--logo-hover)";
                  el.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--logo-color)";
                  el.style.transform = "scale(1)";
                }}
              >
                PG
                <span
                  className="transition-all duration-200"
                  style={{ color: "inherit" }}
                >
                  DOWN
                </span>
              </span>
              <span className="text-[9px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5 tracking-wide uppercase">
                Beta
              </span>
            </div>
          </Link>

          {/* Center Nav — desktop only, pill hover */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-[13px] font-medium px-3.5 py-1.5 rounded-2xl transition-all duration-200 cursor-pointer"
                style={{ color: "var(--navbar-text)", transitionTimingFunction: "var(--joy-bezier, cubic-bezier(0.34, 1.56, 0.64, 1))" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--primary)";
                  el.style.backgroundColor = "var(--primary-subtle)";
                  el.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--navbar-text)";
                  el.style.backgroundColor = "transparent";
                  el.style.transform = "scale(1)";
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">

            {/* Search trigger — pill shape */}
            <button
              id="navbar-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="interactive flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer w-10 h-8 lg:w-44 text-left"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "var(--surface)";
                el.style.boxShadow = "var(--shadow-sm)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "var(--surface-alt)";
                el.style.boxShadow = "none";
              }}
              aria-label="Search articles"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden lg:inline-flex flex-1 text-[12px] truncate">Search anything...</span>
              <span
                className="hidden lg:inline-flex items-center text-[10px] font-semibold border px-1.5 py-0.5 rounded-md shrink-0 select-none"
                style={{ borderColor: "var(--border)", color: "var(--caption)" }}
              >
                ⌘K
              </span>
            </button>

            {/* Theme toggle — pill shape */}
            <ThemeToggle
              className="interactive flex items-center justify-center w-8 h-8 rounded-full border cursor-pointer"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-muted)",
              }}
            />

            {/* Newsletter — pill */}
            <Link
              href="#newsletter"
              className="interactive hidden sm:flex items-center justify-center w-8 h-8 rounded-full border cursor-pointer"
              title="Newsletter"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-muted)",
              }}
            >
              <Mail className="h-3.5 w-3.5" />
            </Link>

            {/* User — pill */}
            <button
              id="navbar-user-menu"
              className="interactive flex items-center justify-center w-8 h-8 rounded-full border cursor-pointer"
              aria-label="User Menu"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface-alt)",
                color: "var(--text-muted)",
              }}
            >
              <User className="h-3.5 w-3.5" />
            </button>

          </div>
        </div>
      </header>

      {/* Spacer — 60px to match navbar height */}
      <div className="h-[60px]" />

      {/* Search dialog */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
