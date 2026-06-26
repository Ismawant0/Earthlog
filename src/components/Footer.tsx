"use client";

import Link from "next/link";
import { Cpu, Terminal, Monitor, GitBranch, Code, Shield, Code2, CloudSun, ArrowUpRight, Zap } from "lucide-react";

export default function Footer() {
  const categoryLinks = [
    { name: "Artificial Intelligence", href: "/category/ai", icon: <Cpu className="h-3.5 w-3.5" /> },
    { name: "Linux Systems", href: "/category/linux", icon: <Terminal className="h-3.5 w-3.5" /> },
    { name: "Windows", href: "/category/windows", icon: <Monitor className="h-3.5 w-3.5" /> },
    { name: "Open Source", href: "/category/open-source", icon: <GitBranch className="h-3.5 w-3.5" /> },
    { name: "Software Engineering", href: "/category/software", icon: <Code className="h-3.5 w-3.5" /> },
    { name: "Cyber Security", href: "/category/cyber-security", icon: <Shield className="h-3.5 w-3.5" /> },
  ];

  return (
    <footer
      className="site-footer mt-auto select-none pb-[88px] md:pb-0"
      style={{ backgroundColor: "var(--footer-bg)", borderTop: "1px solid var(--footer-divider)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span
                className="text-xl font-bold tracking-tight transition-all duration-200"
                style={{ color: "var(--footer-heading)", transitionTimingFunction: "var(--joy-bezier, cubic-bezier(0.34, 1.56, 0.64, 1))" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--footer-heading)"; }}
              >
                PGDOWN
              </span>
              <span className="text-[9px] font-medium rounded-full px-2 py-0.5 uppercase tracking-wide"
                style={{ backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}>
                Beta
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--footer-text)" }}>
              A friendly technology publication for developers, sysadmins, and open source enthusiasts. Curated daily.
            </p>

            {/* Tech stack card — surface card */}
            <div className="inline-flex flex-col gap-1 text-[11px] font-mono surface-card px-3 py-2.5"
              style={{ border: "1px solid var(--footer-divider)" }}>
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3" style={{ color: "var(--primary)" }} />
                <span>Next.js 16 · Tailwind CSS 4 · MDX · Orama</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
              Topics
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="interactive flex items-center gap-2 text-xs font-medium rounded-lg px-2 -mx-2 py-1"
                    style={{ color: "var(--footer-link)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "var(--footer-link-hover)";
                      el.style.backgroundColor = "var(--btn-ghost-hover)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "var(--footer-link)";
                      el.style.backgroundColor = "transparent";
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { name: "Programming", href: "/category/programming", icon: <Code2 className="h-3.5 w-3.5" /> },
                { name: "Cloud Computing", href: "/category/cloud", icon: <CloudSun className="h-3.5 w-3.5" /> },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="interactive flex items-center gap-2 rounded-lg px-2 -mx-2 py-1"
                    style={{ color: "var(--footer-link)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "var(--footer-link-hover)";
                      el.style.backgroundColor = "var(--btn-ghost-hover)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "var(--footer-link)";
                      el.style.backgroundColor = "transparent";
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--footer-divider)", color: "var(--caption)" }}>
                <span>Developer Tools</span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}>Soon</span>
              </li>
              <li className="flex items-center justify-between" style={{ color: "var(--caption)" }}>
                <span>Interactive Terminal</span>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}>Soon</span>
              </li>
            </ul>
          </div>

          {/* Status card */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              System
            </h4>
            <div className="surface-card p-4 space-y-3" style={{ border: "1px solid var(--footer-divider)" }}>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--success)", boxShadow: "0 0 6px rgba(52,168,83,0.6)" }} />
                <span className="text-xs font-medium" style={{ color: "var(--footer-text)" }}>All systems normal</span>
              </div>
              <div className="text-[11px] font-mono space-y-1.5" style={{ color: "var(--text-muted)" }}>
                <div className="flex justify-between">
                  <span>Articles indexed</span>
                  <span style={{ color: "var(--footer-heading)" }}>Live</span>
                </div>
                <div className="flex justify-between">
                  <span>Search engine</span>
                  <span style={{ color: "var(--footer-heading)" }}>Orama</span>
                </div>
                <div className="flex justify-between">
                  <span>Deploy</span>
                  <span style={{ color: "var(--footer-heading)" }}>Vercel Edge</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid var(--footer-divider)", color: "var(--text-muted)" }}>
          <span>© {new Date().getFullYear()} PGDOWN · Made with care for developers</span>
          <span className="interactive flex items-center gap-1 cursor-pointer rounded-lg px-2 py-1"
            style={{ color: "var(--footer-link)" }}>
            Developer Hub <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </footer>
  );
}
