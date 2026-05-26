import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllArticles, getLearningPaths, CATEGORIES } from "@/lib/content";
import { 
  Settings, 
  FlaskConical, 
  GitBranch, 
  BookOpen, 
  Compass, 
  ShieldAlert, 
  Droplet, 
  Wrench, 
  Gauge,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Library,
  Factory,
  AlertTriangle
} from "lucide-react";

export const revalidate = 3600; // ISR - revalidate every hour

// 0. SUBTLE INTRICATE PLANT & PROCESS SILHOUETTE BLUEPRINT BACKDROP (Full width, extremely low contrast)
function IndustrialBlueprintBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.11] transition-opacity duration-300">
      <svg 
        className="w-full h-full stroke-slate-500 dark:stroke-slate-400 fill-none" 
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800/80" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        
        {/* Intricate background refinery plant & process tower lines */}
        <g strokeWidth="0.75" className="stroke-slate-400/80 dark:stroke-slate-600/70">
          {/* Distillation Column Silhouette (Far Left) */}
          <path d="M 120 750 L 120 200 C 120 180 180 180 180 200 L 180 750" />
          <line x1="120" y1="260" x2="180" y2="260" strokeDasharray="3 3" />
          <line x1="120" y1="320" x2="180" y2="320" strokeDasharray="3 3" />
          <line x1="120" y1="380" x2="180" y2="380" strokeDasharray="3 3" />
          <line x1="120" y1="440" x2="180" y2="440" strokeDasharray="3 3" />
          <line x1="120" y1="500" x2="180" y2="500" strokeDasharray="3 3" />
          <line x1="120" y1="560" x2="180" y2="560" strokeDasharray="3 3" />
          <line x1="120" y1="620" x2="180" y2="620" strokeDasharray="3 3" />
          
          {/* Overhead vapor pipeline to reboiler */}
          <path d="M 150 185 L 150 120 L 420 120 L 420 250" />
          <circle cx="285" cy="120" r="15" className="fill-background" />
          <path d="M 275 110 L 295 130 M 275 130 L 295 110" />
          
          {/* Right-side process equipment outlines */}
          <rect x="1100" y="280" width="160" height="80" rx="40" />
          <line x1="1180" y1="280" x2="1180" y2="190" />
          <path d="M 1180 190 L 1260 190 L 1260 480" />
          <g transform="translate(1210, 185)" strokeWidth="0.8">
            <polygon points="0,0 12,4 12,-4" className="fill-background" />
            <polygon points="24,0 12,4 12,-4" className="fill-background" />
            <line x1="12" y1="0" x2="12" y2="-6" />
          </g>

          {/* Detailed piping loops & valve instrumentation */}
          <path d="M 420 350 L 420 490 L 820 490 L 820 350" />
          <path d="M 540 490 L 540 550 L 700 550 L 700 490" />
          <circle cx="540" cy="550" r="10" className="fill-background" />
          <circle cx="700" cy="550" r="10" className="fill-background" />
          
          {/* Text Annotations */}
          <text x="135" y="245" className="fill-slate-400 dark:fill-slate-500 font-mono text-[8px] stroke-none select-none">T-102 PROCESS TOWER</text>
          <text x="1125" y="325" className="fill-slate-400 dark:fill-slate-500 font-mono text-[8px] stroke-none select-none">V-106 ACCUMULATOR</text>
          <text x="285" y="152" textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 font-mono text-[7px] stroke-none select-none">E-103 CONDENSER</text>
        </g>
      </svg>
    </div>
  );
}

// 0.2 PREMIUM HIGH-PRECISION CAD PROCESS COMPOSITION (Replaces generic illustrations with structured blueprints)
function TechnicalVisualComposition() {
  return (
    <div className="w-full max-w-[480px] aspect-[4/3] rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-[6px] shadow-[0_12px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.2)] p-6 relative overflow-hidden select-none group transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
      {/* CAD technical borders */}
      <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-dashed border-slate-200/50 dark:border-slate-800/50 pointer-events-none" />
      
      {/* Header telemetry info bar */}
      <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-slate-500 mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-2">
        <span className="font-bold">SYSTEM SCHEMATIC: V-102</span>
        <span>SCALE: NTS</span>
        <span>REV: 02C</span>
      </div>
      
      {/* CAD Process vessel rendering */}
      <div className="relative w-full h-[185px] flex items-center justify-center">
        <svg 
          className="w-full h-full stroke-slate-500 dark:stroke-slate-400 fill-none" 
          viewBox="0 0 400 180" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Separator Vessel shell */}
          <rect x="80" y="40" width="240" height="90" rx="45" strokeWidth="1.5" className="stroke-slate-500 dark:stroke-slate-400" />
          
          {/* Internal Weir Plate */}
          <line x1="220" y1="75" x2="220" y2="130" strokeWidth="1.2" />
          
          {/* Mist Extractor pad */}
          <rect x="250" y="42" width="25" height="15" className="fill-slate-100 dark:fill-slate-800/80 stroke-slate-400" strokeWidth="0.8" />
          <line x1="250" y1="42" x2="275" y2="57" strokeWidth="0.5" />
          <line x1="275" y1="42" x2="250" y2="57" strokeWidth="0.5" />
          
          {/* Inlet Deflector */}
          <path d="M 95 65 C 105 65 110 75 110 85" strokeWidth="1.2" />
          
          {/* Inlets & Outlets */}
          {/* 1. Feed Inlet */}
          <path d="M 40 85 L 80 85" strokeWidth="1.5" />
          <polygon points="76,82 82,85 76,88" className="fill-slate-500 dark:fill-slate-400" />
          {/* 2. Gas Outlet (Top) */}
          <path d="M 262 15 L 262 40" strokeWidth="1.5" />
          {/* 3. Oil Outlet (Bottom Right) */}
          <path d="M 270 130 L 270 165" strokeWidth="1.5" />
          {/* 4. Water Outlet (Bottom Left) */}
          <path d="M 140 130 L 140 165" strokeWidth="1.5" />

          {/* Liquid Levels lines */}
          <line x1="110" y1="88" x2="220" y2="88" strokeDasharray="3 3" className="stroke-blue-400/40 dark:stroke-blue-500/25" strokeWidth="1" />
          <line x1="110" y1="112" x2="220" y2="112" strokeDasharray="3 3" className="stroke-emerald-400/30 dark:stroke-emerald-500/20" strokeWidth="1" />
          <line x1="220" y1="102" x2="300" y2="102" strokeDasharray="3 3" className="stroke-blue-400/40 dark:stroke-blue-500/25" strokeWidth="1" />

          {/* Technical labels */}
          <g className="fill-slate-400 dark:fill-slate-500 font-mono text-[7px] stroke-none select-none">
            <text x="35" y="78">FEED INLET</text>
            <text x="262" y="10" textAnchor="middle">GAS OUT</text>
            <text x="270" y="174" textAnchor="middle">OIL OUT</text>
            <text x="140" y="174" textAnchor="middle">WATER OUT</text>
            
            <text x="160" y="75" className="fill-slate-300 dark:fill-slate-600">GAS ZONE</text>
            <text x="160" y="100" className="fill-slate-400 dark:fill-slate-500 font-bold">LIGHT OIL</text>
            <text x="160" y="123" className="fill-slate-300 dark:fill-slate-600">FREE WATER</text>
          </g>
        </svg>
      </div>
      
      {/* Bottom info section with integrated brand signature logo */}
      <div className="flex justify-between items-end mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 font-mono">
        <div className="text-left space-y-0.5 text-[8px] text-slate-400 dark:text-slate-500">
          <div>ASME COMPLIANT SEPARATING VESSEL</div>
          <div>DESIGN: 45.0 barg @ 120°C</div>
          <div>TAG: V-102 (3-PHASE HORIZONTAL)</div>
        </div>
        
        {/* Brand Stamp Signature */}
        <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-800/80 pl-4 h-9 select-none">
          <div className="relative w-6 h-6">
            <Image 
              src="/icon-garudaloka.png" 
              alt="Garudaloka Logo" 
              fill 
              className="object-contain filter grayscale opacity-40 dark:opacity-55"
              sizes="24px"
            />
          </div>
          <div className="text-left leading-none">
            <span className="block text-[8px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">GARUDALOKA</span>
            <span className="block text-[6px] text-slate-300 dark:text-slate-650 uppercase font-medium">TECHNICAL PORTAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const articles = await getAllArticles();
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const recentArticles = articles.filter(a => a.slug !== featuredArticle?.slug).slice(0, 3);
  const learningPaths = getLearningPaths();

  // Get icons dynamically based on string name
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Settings": return <Settings className="h-5 w-5" />;
      case "FlaskConical": return <FlaskConical className="h-5 w-5" />;
      case "GitBranch": return <GitBranch className="h-5 w-5" />;
      case "Gauge": return <Gauge className="h-5 w-5" />;
      case "Wrench": return <Wrench className="h-5 w-5" />;
      case "ShieldAlert": return <ShieldAlert className="h-5 w-5" />;
      case "Droplet": return <Droplet className="h-5 w-5" />;
      case "Map": return <Compass className="h-5 w-5" />;
      case "Library": return <Library className="h-5 w-5" />;
      case "Factory": return <Factory className="h-5 w-5" />;
      case "AlertTriangle": return <AlertTriangle className="h-5 w-5" />;
      case "BookOpen":
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-1 transition-colors duration-200">
        
        {/* 1. HERO SECTION — Premium Engineering Platform, Corporate-Grade, Clean */}
        <section className="relative overflow-hidden pt-20 pb-24 md:py-36 bg-gradient-to-b from-background-alt via-background to-background border-b border-border/40">
          <IndustrialBlueprintBackdrop />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

              {/* LEFT COLUMN: Authoritative Engineering Copywriting */}
              <div className="lg:col-span-7 text-left space-y-8 pr-0 lg:pr-8">
                {/* Platform Category Label — Mono, clean, understated */}
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary dark:text-primary-light font-bold select-none opacity-90">
                  Sains Rekayasa Proses &amp; Standardisasi Industri
                </span>

                {/* Authoritative Main Headline */}
                <h1 className="text-[38px] md:text-[52px] font-bold font-serif text-foreground leading-[1.1] tracking-tight">
                  Sains Proses &amp; Dokumentasi Teknik untuk{" "}
                  <span className="text-primary dark:text-primary-light">Ekselensi Operasional</span>
                </h1>

                {/* Concise Technical Description */}
                <p className="text-sm md:text-[15px] text-muted leading-relaxed max-w-xl antialiased">
                  Dokumentasi terstruktur, visualisasi diagram alir proses (PFD), panduan instrumen peralatan, dan referensi standar rekayasa industri (API, ASME, ISO) untuk profesional teknik.
                </p>

                {/* Single CTA — Mono uppercase, engineering credibility */}
                <div className="flex items-center pt-2">
                  <Link
                    href="#categories"
                    className="inline-flex items-center gap-2.5 px-7 py-4 bg-primary hover:bg-primary-light text-white text-xs font-mono uppercase tracking-widest font-bold rounded-sm transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-primary-light/10 cursor-pointer"
                  >
                    Jelajahi Pengetahuan
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: Large Garudaloka Brand Logo */}
              <div className="hidden lg:flex lg:col-span-5 relative w-full justify-center items-center py-6">
                <div className="relative flex items-center justify-center w-full">
                  {/* Dark mode ambient glow blob — sits behind the logo */}
                  <div className="absolute inset-0 hidden dark:block pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-white/[0.04] blur-3xl" />
                  </div>
                  {/* Logo */}
                  <div className="relative w-[460px] h-[460px] max-w-full transition-transform duration-500 hover:scale-105">
                    <Image
                      src="/icon-garudaloka.png"
                      alt="Garudaloka Logo"
                      fill
                      className="object-contain dark:[filter:drop-shadow(0_0_24px_rgba(255,255,255,0.15))] transition-all duration-500"
                      sizes="460px"
                      priority
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. CATEGORY EXPLORER */}
        <section id="categories" className="py-16 bg-background border-t border-border/60 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div className="space-y-3">
              <span className="text-[11px] uppercase font-bold tracking-widest text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                Sistematika Keilmuan
              </span>
              <h2 className="section-heading text-foreground">Eksplorasi Kategori Teknik</h2>
              <p className="text-sm md:text-base text-muted max-w-xl mx-auto leading-relaxed">
                Pilih cabang keilmuan untuk mempelajari komponen, diagram alir, dan aspek operasinya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "learning-path" ? "/learning-path" : `/category/${cat.slug}`}
                  className="flex items-start p-5 rounded-xl border border-border bg-card hover:bg-background-alt hover:border-primary/40 shadow-sm transition-all duration-200 group text-left"
                >
                  <div className="p-3 bg-background border border-border rounded-lg mr-4 text-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-inner">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary dark:group-hover:text-primary-light">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted mt-1.5 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. FEATURED KNOWLEDGE SECTION */}
        {featuredArticle && (
          <section className="py-16 bg-background-alt border-y border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-primary bg-primary/10 dark:bg-primary/20 dark:text-primary-light px-2.5 py-0.5 rounded-full">
                    Kajian Teknis Utama
                  </span>
                  <h2 className="section-heading text-foreground">Featured Knowledge</h2>
                </div>
                <Link 
                  href="/category/equipment" 
                  className="text-xs font-bold text-primary dark:text-primary-light hover:underline flex items-center gap-1"
                >
                  Lihat Semua Equipment 
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Visual preview column */}
                <div className="lg:col-span-5 border border-border rounded-xl bg-card p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] bg-[size:1rem_1rem] dark:bg-[radial-gradient(#60A5FA_1px,transparent_1px)]" />
                  
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-muted mb-4">
                    <span>COVER: {featuredArticle.slug.toUpperCase()}</span>
                    <span className="flex items-center gap-1 text-accent font-bold">
                      <TrendingUp className="h-3 w-3" /> Populer
                    </span>
                  </div>

                  <div className="relative z-10 w-full aspect-video flex justify-center items-center rounded-lg overflow-hidden bg-muted/30 border border-border">
                    {featuredArticle.cover ? (
                      <img 
                        src={featuredArticle.cover} 
                        alt={featuredArticle.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted">
                        <BookOpen className="h-10 w-10 opacity-30 mb-2" />
                        <span className="text-xs">No Image Provided</span>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 mt-4 space-y-2.5">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                      {featuredArticle.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {featuredArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Article description column */}
                <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 border border-border rounded-xl bg-card shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted font-semibold">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredArticle.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredArticle.readTime}</span>
                      <span className="text-accent font-bold">{featuredArticle.difficulty}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground leading-snug">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-sm md:text-base text-muted leading-relaxed text-justify antialiased">
                      {featuredArticle.description}
                    </p>

                    {featuredArticle.takeaways && featuredArticle.takeaways.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Pokok Pembahasan:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-muted">
                          {featuredArticle.takeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-border/80 flex items-center justify-between">
                    <span className="text-xs text-muted">Ditulis oleh: <strong className="text-foreground">{featuredArticle.author}</strong></span>
                    <Link 
                      href={`/${featuredArticle.categorySlug}/${featuredArticle.slug}`}
                      className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      Mulai Belajar 
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. LEARNING PATH / TRACKS SECTION */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[11px] uppercase font-bold tracking-widest text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                Kurikulum Mandiri
              </span>
              <h2 className="section-heading text-foreground">Jalur Belajar Terstruktur</h2>
              <p className="text-sm md:text-base text-muted max-w-xl mx-auto leading-relaxed">
                Kuasai topik industri dari dasar hingga mahir mengikuti kurikulum terarah kami.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div 
                  key={path.slug}
                  className="border border-border bg-card rounded-xl p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {path.level}
                      </span>
                      <span className="text-xs text-muted font-bold flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {path.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {path.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed text-justify">
                      {path.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {path.tags.map((t) => (
                        <span key={t} className="text-[9px] font-bold border border-border px-1.5 py-0.5 rounded bg-background text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                    <span className="text-muted font-bold">{path.modulesCount} Modul Materi</span>
                    <Link 
                      href={`/learning-path/${path.slug}`}
                      className="text-primary dark:text-primary-light hover:underline font-bold flex items-center gap-1"
                    >
                      Buka Kurikulum 
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. LATEST ARTICLES LIST */}
        <section className="py-16 bg-background-alt border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2.5">
                <span className="text-[11px] uppercase font-bold tracking-widest text-primary bg-primary/10 dark:bg-primary/20 dark:text-primary-light px-2.5 py-0.5 rounded-full">
                  Materi Terbaru
                </span>
                <h2 className="section-heading text-foreground">Artikel & Glosari Terkini</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <article 
                  key={article.slug}
                  className="border border-border bg-card rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow transition-all group"
                >
                  <div>
                    {/* Cover Thumbnail Image */}
                    {article.cover ? (
                      <div className="relative w-full h-44 overflow-hidden bg-muted border-b border-border select-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={article.cover} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-44 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-900/60 border-b border-border flex items-center justify-center text-muted select-none">
                        <BookOpen className="h-10 w-10 opacity-30 group-hover:scale-110 transition-transform duration-350" />
                      </div>
                    )}

                    <div className="p-5 space-y-3.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase">
                        <div className="flex flex-wrap gap-1">
                          {(article.categories || [article.categorySlug]).map((catSlug, i) => {
                            const catName = article.category.split(',')[i]?.trim() || catSlug;
                            return (
                              <span 
                                key={catSlug} 
                                className="px-2 py-0.5 rounded bg-background border border-border text-primary dark:text-primary-light capitalize font-bold text-[9px] shrink-0"
                              >
                                {catName}
                              </span>
                            );
                          })}
                        </div>
                        <span className="shrink-0">{article.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                        <Link href={`/${article.categorySlug}/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-muted leading-relaxed line-clamp-3 text-justify">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 border-t border-border/60 bg-background-alt/30 flex items-center justify-between text-[11px]">
                    <span className="text-muted font-medium">{article.date}</span>
                    <Link 
                      href={`/${article.categorySlug}/${article.slug}`}
                      className="text-primary dark:text-primary-light hover:underline font-bold flex items-center gap-1"
                    >
                      Baca Lengkap 
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. NEWSLETTER SECTION */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 border border-border bg-card p-8 md:p-12 rounded-2xl shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#1E3A5F_10%,transparent_10%)] bg-[size:10px_10px] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-accent">
                Newsletter Industri
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                Dapatkan Update Ilmu Teknik Berkala
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                Bergabunglah dengan ribuan mahasiswa dan profesional teknik di Indonesia untuk mendapatkan kiriman visual diagram, glosari, dan artikel teknik gratis langsung ke email Anda.
              </p>
            </div>

            <form className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="email"
                required
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground outline-none focus:border-primary/50 text-sm"
                placeholder="Masukkan alamat email Anda..."
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-light text-white text-sm font-bold rounded-lg cursor-pointer transition-all shadow-md shrink-0"
              >
                Langganan Sekarang
              </button>
            </form>
            
            <p className="relative z-10 text-[10px] text-muted flex items-center justify-center gap-1">
              <Award className="h-3.5 w-3.5 text-accent" /> Tanpa spam. Batalkan langganan kapan saja dalam satu klik.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
