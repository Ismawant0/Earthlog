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
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Library,
  Factory,
  AlertTriangle
} from "lucide-react";

export const revalidate = 3600; // ISR - revalidate every hour

// 0. SUBTLE INTRICATE P&ID ENGINEERING BLUEPRINT DRAWING (SVG-based for instant loading & dark/light responsive)
function PandIDBlueprint() {
  return (
    <svg 
      className="w-full h-full stroke-slate-400/50 dark:stroke-slate-600/40 fill-none pointer-events-none select-none transition-colors duration-200" 
      viewBox="0 0 600 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Distillation Column C-101 */}
      <g strokeWidth="1.2">
        {/* Column body */}
        <rect x="180" y="60" width="70" height="260" rx="8" className="stroke-slate-400 dark:stroke-slate-500" />
        {/* Internal trays */}
        <line x1="180" y1="100" x2="250" y2="100" strokeDasharray="3 3" />
        <line x1="180" y1="140" x2="250" y2="140" strokeDasharray="3 3" />
        <line x1="180" y1="180" x2="250" y2="180" strokeDasharray="3 3" />
        <line x1="180" y1="220" x2="250" y2="220" strokeDasharray="3 3" />
        <line x1="180" y1="260" x2="250" y2="260" strokeDasharray="3 3" />
        
        {/* Column Labels */}
        <text x="215" y="165" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[9px] font-bold stroke-none select-none">C-101</text>
        <text x="215" y="177" textAnchor="middle" className="fill-slate-400/70 dark:fill-slate-600/70 font-mono text-[7px] stroke-none select-none">SPLITTER</text>
      </g>

      {/* 2. Three-Phase Separator Vessel V-102 */}
      <g strokeWidth="1.2">
        {/* Vessel body */}
        <rect x="360" y="200" width="130" height="60" rx="30" className="stroke-slate-400 dark:stroke-slate-500" />
        {/* Internal baffle / weir */}
        <line x1="440" y1="210" x2="440" y2="260" strokeDasharray="2 2" />
        <line x1="420" y1="200" x2="420" y2="245" />
        
        {/* Vessel Labels */}
        <text x="400" y="235" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[9px] font-bold stroke-none select-none">V-102</text>
      </g>

      {/* 3. Heat Exchanger (Condenser) E-101 */}
      <g strokeWidth="1.2">
        <circle cx="340" cy="80" r="20" className="stroke-slate-400 dark:stroke-slate-500" />
        <path d="M 326 70 L 354 90 M 326 90 L 354 70" />
        <text x="340" y="115" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[8px] stroke-none select-none">E-101</text>
      </g>

      {/* 4. Pumps P-101A/B */}
      <g strokeWidth="1.2">
        {/* Pump A */}
        <circle cx="100" cy="280" r="14" className="stroke-slate-400 dark:stroke-slate-500" />
        <polygon points="94,272 106,280 94,288" className="fill-none" />
        <text x="100" y="310" textAnchor="middle" className="fill-slate-400 dark:fill-slate-600 font-mono text-[8px] stroke-none select-none">P-101A</text>
      </g>

      {/* 5. Process Pipelines (Thicker and cleaner) */}
      <g strokeWidth="1.5" className="stroke-slate-300 dark:stroke-slate-700">
        {/* Feed Line to split */}
        <path d="M 30 280 L 86 280" />
        <path d="M 114 280 L 180 280" />
        
        {/* Splitter Bottoms Line */}
        <path d="M 215 320 L 215 380 L 360 380" />
        
        {/* Column Overhead to Condenser */}
        <path d="M 215 60 L 215 30 L 340 30 L 340 60" />
        
        {/* Condenser to Separator V-102 */}
        <path d="M 340 100 L 340 150 L 410 150 L 410 200" />
        
        {/* Separator Gas Outlet */}
        <path d="M 425 200 L 425 120 L 540 120" />
        
        {/* Separator Liquid Outlet */}
        <path d="M 465 260 L 465 320 L 540 320" />

        {/* Control Valve Symbol */}
        <g transform="translate(140, 275)" strokeWidth="1.2">
          <polygon points="0,0 12,5 12,-5" className="fill-background" />
          <polygon points="24,0 12,5 12,-5" className="fill-background" />
          <line x1="12" y1="0" x2="12" y2="-8" />
          <circle cx="12" cy="-10" r="2.5" className="fill-none" />
        </g>
      </g>

      {/* 6. Control Signals & Instruments (Dotted primary indicator lines) */}
      <g strokeWidth="0.8" strokeDasharray="3 3" className="stroke-primary/30 dark:stroke-primary/45">
        {/* Transmitter to Control Valve */}
        <path d="M 215 240 L 142 240 L 142 265" />
        {/* Bubble Tag PT-101 */}
        <circle cx="142" cy="230" r="10" className="fill-background stroke-primary/30 dark:stroke-primary/45" />
        <text x="142" y="233" textAnchor="middle" className="fill-primary dark:fill-primary-light font-mono text-[7px] stroke-none select-none">PT</text>

        {/* Separator Level Control loop */}
        <path d="M 480 230 L 515 230 L 515 280" />
        <circle cx="515" cy="292" r="10" className="fill-background stroke-primary/30 dark:stroke-primary/45" />
        <text x="515" y="295" textAnchor="middle" className="fill-primary dark:fill-primary-light font-mono text-[7px] stroke-none select-none">LIC</text>
      </g>
    </svg>
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
        
        {/* 1. HERO SECTION (Redesigned: Clean, Professional, P&ID visual backdrop, adapt dark/light mode) */}
        <section className="relative overflow-hidden pt-16 pb-20 md:py-32 bg-gradient-to-b from-background-alt via-background to-background">
          <div className="absolute inset-0 z-0 opacity-60 dark:opacity-40 pointer-events-none select-none">
            {/* Grid Pattern overlay for engineering blueprint feeling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F0EE_1px,transparent_1px),linear-gradient(to_bottom,#F1F0EE_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Copywriting */}
              <div className="lg:col-span-7 text-left space-y-7 pr-0 lg:pr-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/15 tracking-wide select-none">
                  <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                  Edukasi Visual Engineering #1 di Indonesia
                </span>
                
                <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-foreground leading-[1.12] tracking-tight">
                  Kuasai Ilmu Teknik secara <span className="text-primary dark:text-primary-light">Visual & Presisi</span>
                </h1>
                
                <p className="text-base md:text-[18px] text-muted leading-relaxed max-w-2xl antialiased">
                  Menyederhanakan konsep teknik kimia, instrumen proses, peralatan industri, dan keselamatan pabrik menjadi diagram alir interaktif yang presisi dan tepercaya.
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link 
                    href="#categories" 
                    className="px-6 py-4 bg-primary hover:bg-primary-light text-white text-center text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-primary-light/10"
                  >
                    Jelajahi Pengetahuan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="/equipment/separator-tiga-fasa" 
                    className="px-6 py-4 bg-card hover:bg-background-alt border border-border/80 text-foreground text-center text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Pelajari Equipment
                  </Link>
                </div>

                {/* Micro Stats Bar */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/70 max-w-lg select-none">
                  <div>
                    <span className="block text-2xl md:text-3xl font-black text-primary dark:text-primary-light">300+</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted">Materi Teknis</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black text-accent">100%</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted">Visual Diagram</span>
                  </div>
                  <div>
                    <span className="block text-2xl md:text-3xl font-black text-foreground">Akurat</span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted">Ref. Standar API</span>
                  </div>
                </div>
              </div>

              {/* Hero Standalone Logo Emblem with detailed blueprint backing & live telemetry indicators */}
              <div className="hidden lg:flex lg:col-span-5 relative w-full justify-center items-center py-6">
                {/* Glow Backdrop */}
                <div className="absolute w-[400px] h-[400px] bg-primary/10 dark:bg-primary/20 rounded-full blur-[110px] pointer-events-none select-none" />
                
                {/* SVG P&ID Blueprint Background (Subtle opacity adapted to theme) */}
                <div className="absolute inset-0 w-full h-[520px] -right-10 pointer-events-none opacity-[0.14] dark:opacity-[0.24] flex items-center justify-center">
                  <PandIDBlueprint />
                </div>
                
                {/* Logo Frame Container - Glassmorphic, modern and rich */}
                <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center p-8 rounded-3xl border border-border/40 bg-card/45 dark:bg-card/35 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] group hover:border-primary/20 hover:shadow-primary/5 transition-all duration-500">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Technical circular spinning rings */}
                  <div className="absolute inset-4 rounded-full border border-dashed border-primary/20 dark:border-primary/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
                  <div className="absolute inset-10 rounded-full border border-dotted border-accent/25 dark:border-accent/35 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

                  {/* Logo Center Emblem */}
                  <div className="relative w-full h-full max-w-[280px] aspect-square flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite] group-hover:scale-105 transition-transform duration-500">
                    <Image 
                      src="/icon-garudaloka.png" 
                      alt="Garudaloka Logo" 
                      fill 
                      className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_10px_35px_rgba(255,255,255,0.08)]" 
                      sizes="350px"
                      priority
                    />
                  </div>

                  {/* Telemetry Indicator 1 - Active Separation Unit (Bottom Left) */}
                  <div className="absolute -bottom-4 -left-8 bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border p-3.5 rounded-xl shadow-lg flex items-center gap-3 select-none hover:scale-105 hover:border-primary/30 transition-all duration-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <div className="text-left font-mono">
                      <span className="block text-[8px] font-bold text-muted uppercase tracking-wider">Unit Separator</span>
                      <span className="block text-[11px] font-black text-foreground">V-102 (3-Phase)</span>
                    </div>
                  </div>

                  {/* Telemetry Indicator 2 - System pressure (Top Right) */}
                  <div className="absolute -top-4 -right-6 bg-card/90 dark:bg-card/80 backdrop-blur-md border border-border p-3.5 rounded-xl shadow-lg flex items-center gap-3 select-none hover:scale-105 hover:border-primary/30 transition-all duration-300">
                    <Gauge className="h-4.5 w-4.5 text-primary dark:text-primary-light animate-pulse" />
                    <div className="text-left font-mono">
                      <span className="block text-[8px] font-bold text-muted uppercase tracking-wider">Tekanan</span>
                      <span className="block text-[11px] font-black text-foreground">32.4 barg <span className="text-[9px] text-emerald-500 font-bold">OK</span></span>
                    </div>
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
