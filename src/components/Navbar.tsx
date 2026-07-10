"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Mission", href: "/mission" },
    { name: "Community", href: "/community" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
  ];

  const isLinkActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b
        ${scrolled 
          ? "bg-white/95 border-border/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]" 
          : "bg-transparent border-transparent"
        }
      `}
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 select-none font-semibold text-xl tracking-tight text-foreground group">
          <span>Earthlog</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B45] transition-transform duration-300 group-hover:scale-125" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 py-1.5 relative
                    ${active 
                      ? "text-primary font-semibold" 
                      : "text-foreground-sub hover:text-foreground"
                    }
                  `}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="w-px h-4 bg-border" />

          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 border border-transparent text-foreground-sub hover:text-foreground hover:bg-border/30"
          >
            Login
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-foreground-sub hover:text-foreground cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-border p-6 shadow-md flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base py-2 transition-colors
                ${isLinkActive(link.href)
                  ? "text-primary font-semibold border-l-2 border-primary pl-2"
                  : "text-foreground-sub hover:text-foreground pl-2"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-border my-1" />
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base py-2 text-foreground-sub hover:text-foreground pl-2"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
