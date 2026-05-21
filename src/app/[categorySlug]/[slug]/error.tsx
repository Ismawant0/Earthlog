"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("MDX Article Rendering Error:", error);
  }, [error]);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-full flex items-center justify-center text-rose-500 shadow-inner mb-6">
          <AlertTriangle className="h-10 w-10" />
        </div>
        
        <h2 className="text-3xl font-bold font-serif text-foreground mb-4">Gagal Memuat Artikel</h2>
        
        <div className="max-w-md space-y-4 text-muted">
          <p className="text-sm">
            Terdapat masalah saat memproses konten (MDX) artikel ini. Hal ini biasanya disebabkan oleh sintaks karakter kurawal <code className="bg-muted-foreground/10 px-1 rounded text-rose-500">{"{ }"}</code> atau tag HTML yang tidak diformat dengan benar di dalam artikel.
          </p>
          
          {error.digest && (
            <p className="text-xs bg-muted/50 p-2 rounded border border-border mt-4 font-mono">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-5 py-2.5 bg-background border border-border text-foreground text-sm font-semibold rounded-lg shadow-sm hover:bg-muted/30 transition-all"
          >
            <RefreshCcw className="h-4 w-4" /> Coba Lagi
          </button>
          <Link 
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:opacity-90 transition-all"
          >
            <Home className="h-4 w-4" /> Ke Beranda
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
