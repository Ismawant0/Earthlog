import Image from "next/image";
import Link from "next/link";
import { Compass, BookOpen, Settings, FlaskConical, Shield, Terminal, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background-alt border-t border-border mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-16 w-16 relative flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                <Image 
                  src="/icon-garudaloka.png" 
                  alt="Garudaloka Logo" 
                  fill 
                  className="object-contain transition-all duration-300 dark:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.25))]" 
                  sizes="64px"
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
            
            <p className="text-xs md:text-sm text-muted leading-relaxed max-w-sm antialiased text-justify">
              Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya. Platform edukasi teknik industri terdepan di Indonesia.
            </p>
            
            <blockquote className="border-l-2 border-accent pl-3 text-xs italic text-muted max-w-xs">
              &ldquo;Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya.&rdquo;
            </blockquote>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-primary dark:text-primary-light" />
              Eksplorasi Ilmu
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-muted">
              <li>
                <Link href="/category/equipment" className="hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <Settings className="h-3 w-3" /> Equipment Industri
                </Link>
              </li>
              <li>
                <Link href="/category/process-chemicals" className="hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <FlaskConical className="h-3 w-3" /> Process Chemicals
                </Link>
              </li>
              <li>
                <Link href="/category/process-systems" className="hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> Process Systems
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" /> Learning Path
                </Link>
              </li>
              <li>
                <Link href="/category/glossary" className="hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" /> Glosari Istilah Teknik
                </Link>
              </li>
            </ul>
          </div>

          {/* Future Readiness Projects */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-accent" />
              Prospek V2/V3
            </h4>
            <ul className="space-y-2.5 text-xs text-muted font-medium">
              <li className="flex items-center justify-between text-muted/65">
                <span>Engineering AI Assistant</span>
                <span className="text-[9px] bg-accent/15 text-accent font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
              <li className="flex items-center justify-between text-muted/65">
                <span>Mini LMS & Kuis</span>
                <span className="text-[9px] bg-accent/15 text-accent font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
              <li className="flex items-center justify-between text-muted/65">
                <span>Kalkulator Teknik</span>
                <span className="text-[9px] bg-accent/15 text-accent font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
              <li className="flex items-center justify-between text-muted/65">
                <span>Sertifikasi Profesional</span>
                <span className="text-[9px] bg-accent/15 text-accent font-bold px-1.5 py-0.5 rounded">Soon</span>
              </li>
            </ul>
          </div>

          {/* Technical specifications info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
              Spesifikasi Sistem
            </h4>
            <div className="border border-border p-3 rounded-lg bg-card space-y-1.5 text-[10px] font-mono text-muted">
              <div className="flex justify-between">
                <span>Core Frame:</span>
                <span className="text-foreground">Next.js v16 (App)</span>
              </div>
              <div className="flex justify-between">
                <span>Styles:</span>
                <span className="text-foreground">Tailwind v4</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-foreground">Supabase ready</span>
              </div>
              <div className="flex justify-between">
                <span>Search:</span>
                <span className="text-foreground">Orama Core</span>
              </div>
              <div className="flex justify-between">
                <span>Content:</span>
                <span className="text-foreground">SSG + MDX Engine</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base divider */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-muted">
          <div>
            &copy; {new Date().getFullYear()} Garudaloka. Semua Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success animate-ping" />
              Bahasa Indonesia-first
            </span>
            <span className="text-muted/60 flex items-center gap-1">
              English localization <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
