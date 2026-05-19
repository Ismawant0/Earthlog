import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLearningPaths } from "@/lib/content";
import { ChevronRight, ArrowRight, Compass, Clock, Award, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning Paths Terstruktur — Garudaloka",
  description: "Kuasai kompetensi teknik industri melalui program kurikulum mandiri terstruktur Garudaloka.",
  alternates: {
    canonical: "/learning-path",
  },
};

export default function LearningPathsPage() {
  const paths = getLearningPaths();

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background py-8 md:py-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-bold">
              Learning Path
            </span>
          </nav>

          {/* Heading */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Compass className="h-6 w-6" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Jalur Karir & Keilmuan</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-foreground">
              Learning Paths Terstruktur
            </h1>
            <p className="text-sm md:text-base text-muted max-w-xl leading-relaxed">
              Jalur belajar mandiri yang disusun secara sistematis oleh praktisi industri migas dan manufaktur Indonesia. Pelajari materi secara berurutan untuk hasil belajar maksimal.
            </p>
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paths.map((path) => (
              <div 
                key={path.slug}
                className="border border-border bg-card rounded-xl p-6 flex flex-col justify-between hover:border-primary/40 shadow-sm transition-all group"
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

                  <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    <Link href={`/learning-path/${path.slug}`}>
                      {path.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-muted leading-relaxed text-justify">
                    {path.description}
                  </p>

                  <div className="border-t border-border/60 pt-4 mt-4">
                    <h4 className="text-[11px] font-bold text-foreground uppercase tracking-wider mb-2">Target Kompetensi:</h4>
                    <ul className="space-y-1.5 text-xs text-muted font-semibold">
                      <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> Konsep Fundamental</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> Pemecahan Masalah Operasional</li>
                      <li className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-success shrink-0" /> Standar Industri Internasional (API/ASME)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                  <span className="text-muted font-bold flex items-center gap-1"><Award className="h-4 w-4 text-primary" /> {path.modulesCount} Modul Keilmuan</span>
                  <Link 
                    href={`/learning-path/${path.slug}`}
                    className="px-4 py-2 bg-primary hover:bg-primary-light text-white font-bold rounded-lg transition-all flex items-center gap-1 text-[11px]"
                  >
                    Mulai Belajar 
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
