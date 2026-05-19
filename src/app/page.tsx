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
  Sparkles
} from "lucide-react";

export const revalidate = 3600; // ISR - revalidate every hour

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
      case "BookOpen":
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="flex-1 transition-colors duration-200">
        
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 md:py-28 bg-gradient-to-b from-background-alt via-background to-background">
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            {/* Grid Pattern overlay for engineering blueprint feeling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#E7E5E4_1px,transparent_1px),linear-gradient(to_bottom,#E7E5E4_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#232E42_1px,transparent_1px),linear-gradient(to_bottom,#232E42_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Copywriting */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/15 tracking-wide">
                  <Sparkles className="h-3 w-3 text-accent animate-pulse" />
                  Edukasi Visual Engineering #1 di Indonesia
                </span>
                
                <h1 className="hero-title text-foreground">
                  Belajar Engineering dengan Lebih Jelas
                </h1>
                
                <p className="text-base md:text-[18px] text-muted leading-relaxed max-w-2xl antialiased">
                  Pelajari equipment industri, sistem proses, chemical, maintenance, dan engineering knowledge melalui pembelajaran visual yang modern dan terstruktur.
                </p>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Link 
                    href="#categories" 
                    className="px-6 py-3.5 bg-primary hover:bg-primary-light text-white text-center font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Jelajahi Pengetahuan
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="/equipment/separator-tiga-fasa" 
                    className="px-6 py-3.5 bg-card hover:bg-background-alt border border-border text-foreground text-center font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Lihat Equipment
                  </Link>
                </div>

                {/* Micro Stats Bar */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/80 max-w-lg">
                  <div>
                    <span className="block text-2xl font-black text-primary dark:text-primary-light">300+</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Materi Teknis</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-accent">100%</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Visual Diagram</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-foreground">Akurat</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Ref. Standar API</span>
                  </div>
                </div>
              </div>

              {/* Hero Standalone Logo Emblem (No frame - 3x Larger) */}
              <div className="lg:col-span-5 relative w-full flex justify-center items-center py-6">
                {/* 3x Larger Glow effect in background */}
                <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] bg-primary/20 dark:bg-primary/25 rounded-full blur-[110px] sm:blur-[150px] animate-[pulse_4s_ease-in-out_infinite]" />
                
                <div className="relative w-full max-w-[400px] sm:max-w-[540px] md:max-w-[600px] aspect-square flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
                  <Image 
                    src="/icon-garudaloka.png" 
                    alt="Garudaloka Logo" 
                    fill 
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_35px_rgba(255,255,255,0.1)]" 
                    sizes="(max-width: 640px) 400px, 600px"
                    priority
                  />
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
                  
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-muted">
                    <span>SCHEMATIC ID: SP-3F</span>
                    <span className="flex items-center gap-1 text-accent font-bold">
                      <TrendingUp className="h-3 w-3" /> Populer
                    </span>
                  </div>

                  <div className="relative z-10 py-12 flex justify-center">
                    <svg viewBox="0 0 200 120" className="w-full max-w-[280px] h-auto text-primary dark:text-primary-light">
                      <rect x="25" y="25" width="150" height="70" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
                      <line x1="5" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="1.5" />
                      {/* Fluid layers */}
                      <rect x="27" y="65" width="146" height="28" fill="#1D4ED8" opacity="0.3" rx="2" />
                      <rect x="27" y="48" width="146" height="17" fill="#713F12" opacity="0.4" />
                      {/* Baffle */}
                      <line x1="120" y1="50" x2="120" y2="92" stroke="currentColor" strokeWidth="2" />
                      {/* Outlets */}
                      <line x1="150" y1="95" x2="150" y2="115" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="75" y1="95" x2="75" y2="115" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="relative z-10 space-y-2.5">
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

                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Pokok Pembahasan:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-muted">
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Mekanisme Pemisahan 3 Fasa</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Fungsi Coalescing Plates & Weir</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Mengatasi Masalah Foaming & Emulsi</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Safety Instrument & Alarm Tripping</li>
                      </ul>
                    </div>
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
                  <div className="p-5 space-y-3.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase">
                      <span className="px-2 py-0.5 rounded bg-background border border-border text-primary dark:text-primary-light">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                      <Link href={`/${article.categorySlug}/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 text-justify">
                      {article.description}
                    </p>
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
