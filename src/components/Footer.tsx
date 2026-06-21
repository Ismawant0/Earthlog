import Link from "next/link";
import { Cpu, Terminal, Monitor, GitBranch, Code, Shield, Code2, CloudSun, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const categoryLinks = [
    { name: "Artificial Intelligence", href: "/category/ai", icon: <Cpu className="h-3.5 w-3.5" /> },
    { name: "Linux Systems", href: "/category/linux", icon: <Terminal className="h-3.5 w-3.5" /> },
    { name: "Windows Development", href: "/category/windows", icon: <Monitor className="h-3.5 w-3.5" /> },
    { name: "Open Source", href: "/category/open-source", icon: <GitBranch className="h-3.5 w-3.5" /> },
    { name: "Software Engineering", href: "/category/software", icon: <Code className="h-3.5 w-3.5" /> },
    { name: "Cyber Security", href: "/category/cyber-security", icon: <Shield className="h-3.5 w-3.5" /> },
  ];

  return (
    <footer className="bg-background-alt border-t border-border mt-auto transition-colors duration-200 select-none pb-[88px] md:pb-0">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-xl font-black tracking-tighter text-foreground">
                PG<span className="text-primary">DOWN</span>
              </span>
              <span className="text-[9px] font-mono border border-primary/20 bg-primary/5 text-primary rounded px-1 py-0.2 uppercase tracking-wide">
                PRO
              </span>
            </Link>
            
            <p className="text-xs md:text-sm text-muted leading-relaxed max-w-sm antialiased">
              PGDOWN is a premium technology publication built for serious developers, system architects, and open source enthusiasts. Delivering curated insights, deep technical guides, and curated news daily.
            </p>
            
            <div className="border-l-2 border-primary pl-3 text-xs italic text-muted-more max-w-xs">
              &ldquo;Content is the product. Reading is the experience. Navigation is effortless.&rdquo;
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Sections
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-muted">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Pages */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Platform Info
            </h4>
            <ul className="space-y-2.5 text-xs text-muted font-medium">
              <li>
                <Link href="/category/programming" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5" /> Programming
                </Link>
              </li>
              <li>
                <Link href="/category/cloud" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <CloudSun className="h-3.5 w-3.5" /> Cloud Computing
                </Link>
              </li>
              <li className="flex items-center justify-between text-muted/65 pt-1.5 border-t border-border/50">
                <span>Developer Tools</span>
                <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
              <li className="flex items-center justify-between text-muted/65">
                <span>Interactive Terminal</span>
                <span className="text-[9px] bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
            </ul>
          </div>

          {/* Platform Spec details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
              System Specifications
            </h4>
            <div className="border border-border p-3 rounded-xl bg-card space-y-1.5 text-[10px] font-mono text-muted">
              <div className="flex justify-between">
                <span>Core Engine:</span>
                <span className="text-foreground">Next.js 16 (App)</span>
              </div>
              <div className="flex justify-between">
                <span>Styling framework:</span>
                <span className="text-foreground">Tailwind CSS 4</span>
              </div>
              <div className="flex justify-between">
                <span>Search indexer:</span>
                <span className="text-foreground">Orama Search</span>
              </div>
              <div className="flex justify-between">
                <span>Content engine:</span>
                <span className="text-foreground">SSG + MDX Remote</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright divider */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted">
          <div>
            &copy; {new Date().getFullYear()} PGDOWN. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success animate-ping" />
              Observability Status: Normal
            </span>
            <span className="text-muted/60 flex items-center gap-1">
              Developer Hub <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
