"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "GitHub", href: "https://github.com/Ismawant0/PGDown" },
    { name: "Contact", href: "/contact" },
    { name: "Transparency", href: "/about#transparency" },
  ];

  return (
    <footer className="bg-[#FAFAF7] border-t border-border mt-auto select-none">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
          {/* Logo & Tagline */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-1 font-semibold text-lg tracking-tight text-foreground group">
              <span>Earthlog</span>
              <span className="w-1 h-1 rounded-full bg-[#2F6B45]" />
            </Link>
            <p className="text-sm text-foreground-sub italic">
              "Every small action leaves a mark."
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-foreground-sub hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-foreground-sub/80 font-mono">
          <span>&copy; {currentYear} Earthlog. All rights reserved.</span>
          <span>A quiet place for collective environmental action.</span>
        </div>
      </div>
    </footer>
  );
}
