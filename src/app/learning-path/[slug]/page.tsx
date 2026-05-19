import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLearningPaths } from "@/lib/content";
import { 
  ChevronRight, 
  Compass, 
  Clock, 
  Award, 
  CheckCircle2, 
  Play, 
  ArrowLeft, 
  AlertCircle 
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paths = getLearningPaths();
  const path = paths.find((p) => p.slug === slug);
  if (!path) return {};

  return {
    title: `Syllabus: ${path.title} — Garudaloka`,
    description: path.description,
    alternates: {
      canonical: `/learning-path/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const paths = getLearningPaths();
  return paths.map((p) => ({
    slug: p.slug,
  }));
}

// Structured syllabus mock data to match slugs
const SYLLABUS_MODULES: Record<string, { title: string; desc: string; duration: string; articleLink?: { text: string; href: string } }[]> = {
  "proses-pemisahan-migas": [
    {
      title: "Modul 1: Fundamental Reservoar & Karakteristik Fluida Hulu",
      desc: "Memahami sifat kimia fisika hidrokarbon hulu, gas terlarut, tekanan uap reid (RVP), dan emulsi alam.",
      duration: "1 Minggu",
      articleLink: { text: "Pelajari Sistem Hulu Migas", href: "/process/upstream-migas" }
    },
    {
      title: "Modul 2: Pemrosesan Mekanikal - Separator Dua Fasa & Tiga Fasa",
      desc: "Analisis lengkap komponen internal separator (deflector, coalescer, weir), perhitungan kecepatan terminal gas (Hukum Stokes), dan troubleshooting pembusaan.",
      duration: "1 Minggu",
      articleLink: { text: "Buka Panduan Separator Tiga Fasa", href: "/equipment/separator-tiga-fasa" }
    },
    {
      title: "Modul 3: Bahan Kimia Produksi - Pembongkaran Emulsi Minyak-Air",
      desc: "Prinsip kerja surfaktan polimerik, laju injeksi demulsifier di kepala sumur, efek overdosing surfaktan, dan botol pengujian (bottle test).",
      duration: "1 Minggu",
      articleLink: { text: "Pelajari Peran Demulsifier", href: "/chemical/demulsifier" }
    },
    {
      title: "Modul 4: Sistem Pemrosesan Gas Alam & Unit Dehidrasi",
      desc: "Teknologi dehidrasi gas (triethylene glycol unit - TEG), pemisahan kondensat gas, dan mitigasi pembentukan hidrat gas bumi.",
      duration: "1 Minggu"
    }
  ],
  "instrumentasi-dasar-industri": [
    {
      title: "Modul 1: Pengantar Sensor & Transmiter Parameter Proses",
      desc: "Cara kerja sensor tekanan (strain gauge), sensor tingkat cairan (DP cell, radar), dan sensor suhu (RTD & thermocouple).",
      duration: "1 Minggu"
    },
    {
      title: "Modul 2: Katup Pengontrol & Katup Pengaman Kepala Sumur",
      desc: "Mekanisme control valve, sizing orifice disk, prinsip termodinamika Joule-Thomson, dan pengoperasian choke valve.",
      duration: "2 Minggu",
      articleLink: { text: "Pelajari Fungsi Choke Valve", href: "/glossary/choke-valve" }
    },
    {
      title: "Modul 3: Sistem Pengaman Darurat (Emergency Shutdown System - ESD)",
      desc: "Desain logika pengaman (safety interlocks), fungsi solenoid valve, arsitektur PLC keselamatan, dan standar SIL (Safety Integrity Level).",
      duration: "3 Minggu"
    }
  ],
  "perawatan-kompresor-turbin": [
    {
      title: "Modul 1: Klasifikasi & Dinamika Mesin Rotasi",
      desc: "Dasar klasifikasi mesin dinamis versus displacement, konsep slip pompa sentrifugal, dan kurva unjuk kerja pompa.",
      duration: "1 Minggu"
    },
    {
      title: "Modul 2: Kompresor Gas Sentrifugal & Penggerak Utama",
      desc: "Kompresi multitingkat gas bumi, sistem seal gas kering (dry gas seals), anti-surge control, dan perawatan seal.",
      duration: "2 Minggu"
    },
    {
      title: "Modul 3: Pemeliharaan Turbin Uap & Turbin Gas",
      desc: "Siklus termodinamika Brayton, sistem pelumasan bearing, inspeksi pisau turbin, dan analisis getaran untuk deteksi misalignment rotor.",
      duration: "3 Minggu"
    }
  ]
};

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const paths = getLearningPaths();
  const path = paths.find((p) => p.slug === slug);

  if (!path) {
    return notFound();
  }

  const modules = SYLLABUS_MODULES[slug] || [];

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-8 md:py-12 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/learning-path" className="hover:text-primary transition-colors">
              Learning Path
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold truncate max-w-[200px]">
              {path.title}
            </span>
          </nav>

          {/* Back button */}
          <Link 
            href="/learning-path"
            className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-primary select-none"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog
          </Link>

          {/* Jumbotron Hero */}
          <div className="border border-border rounded-2xl bg-card p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded bg-accent/10 text-accent">
                {path.level}
              </span>
              <span className="text-xs text-muted font-bold flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Total: {path.duration}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold font-serif text-primary dark:text-primary-light">
              {path.title}
            </h1>
            
            <p className="text-sm text-muted leading-relaxed text-justify antialiased">
              {path.description}
            </p>

            <div className="pt-4 border-t border-border/80 flex items-center gap-4 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-accent" /> {path.modulesCount} Tahapan Modul</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success" /> Kurikulum Terverifikasi</span>
            </div>
          </div>

          {/* Timeline Syllabus */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
              <Compass className="h-5 w-5 text-accent" />
              Syllabus Timeline ({modules.length} Modul)
            </h2>

            <div className="relative pl-6 border-l-2 border-border/80 ml-3 space-y-10 py-2">
              {modules.map((mod, idx) => (
                <div key={idx} className="relative">
                  
                  {/* Timeline bullet dot */}
                  <span className="absolute -left-[33px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card border-2 border-primary text-[10px] font-black text-primary dark:border-primary-light dark:text-primary-light shadow-sm">
                    {idx + 1}
                  </span>

                  <div className="border border-border bg-card p-5 rounded-xl shadow-sm space-y-3 transition-colors hover:border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h3 className="text-sm font-extrabold text-foreground leading-snug">
                        {mod.title}
                      </h3>
                      <span className="text-[10px] font-bold text-muted bg-background border border-border px-2 py-0.5 rounded shrink-0 self-start sm:self-auto">
                        Est. {mod.duration}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed text-justify">
                      {mod.desc}
                    </p>

                    {/* Integrated dynamic link to actual content */}
                    {mod.articleLink ? (
                      <div className="pt-2">
                        <Link 
                          href={mod.articleLink.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/25 bg-primary/5 hover:bg-primary/10 text-primary dark:text-primary-light text-xs font-bold transition-all cursor-pointer"
                        >
                          <Play className="h-3 w-3 fill-current" />
                          {mod.articleLink.text}
                        </Link>
                      </div>
                    ) : (
                      <div className="pt-2 flex items-center gap-1 text-[10px] text-muted/65 italic">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> Dokumen materi pendukung sedang dipersiapkan.
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
