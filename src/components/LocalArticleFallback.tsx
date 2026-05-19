"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleToc from "@/components/ArticleToc";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  Tag, 
  BookOpen, 
  Share2, 
  Bookmark 
} from "lucide-react";

interface LocalArticleFallbackProps {
  categorySlug: string;
  slug: string;
}

interface LocalArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  difficulty: string;
  readTime: string;
  featured: boolean;
  tags: string[];
  content: string;
  htmlContent?: string;
}

export default function LocalArticleFallback({ categorySlug, slug }: LocalArticleFallbackProps) {
  const [article, setArticle] = useState<LocalArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    try {
      let localArticles: LocalArticle[] = [];
      const localArticlesStr = localStorage.getItem("garudaloka_local_articles");
      if (localArticlesStr && localArticlesStr !== 'undefined' && localArticlesStr !== 'null') {
        const parsed = JSON.parse(localArticlesStr);
        if (Array.isArray(parsed)) {
          localArticles = parsed;
        }
      }
      const matched = localArticles.find(
        (a) => a.categorySlug === categorySlug && a.slug === slug
      );

      if (matched) {
        setArticle(matched);
      } else {
        setNotFoundState(true);
      }
    } catch (e) {
      console.error("Error fetching local article fallback:", e);
      setNotFoundState(true);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-muted">Memuat artikel lokal...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (notFoundState || !article) {
    return (
      <>
        <Navbar />
        <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center text-center px-4 space-y-4">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-full flex items-center justify-center text-red-500 shadow-inner">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Artikel Tidak Ditemukan</h2>
          <p className="text-sm text-muted max-w-md">
            Materi dengan alamat <code className="bg-background-alt px-1.5 py-0.5 rounded text-xs text-rose-500">/{categorySlug}/{slug}</code> tidak terdaftar di database server maupun penyimpanan lokal browser Anda.
          </p>
          <Link 
            href="/"
            className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all"
          >
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Extract headings for Table of Contents from markdown content
  const getHeadings = (content: string) => {
    const headingRegex = /^(##|###)\s+(.*)$/gm;
    const headings = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].replace(/[\*\_]/g, "").trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      headings.push({ level, text, id });
    }
    return headings;
  };

  const headings = getHeadings(article.content || "");

  return (
    <>
      <Navbar />

      <div className="flex-grow bg-background transition-colors duration-200 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* A. BREADCRUMBS BAR */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-muted mb-6 md:mb-10 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 select-none">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href={`/category/${categorySlug}`} className="hover:text-primary transition-colors capitalize">
              {article.category}
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground font-bold truncate max-w-[240px]">
              {article.title}
            </span>
          </nav>

          {/* B. MAIN TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1: Main Article content reader */}
            <article className="xl:col-span-9 space-y-6">
              
              {/* Local Fallback Banner */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-medium leading-relaxed flex items-start gap-2.5 shadow-sm">
                <span className="inline-flex h-4 w-4 bg-amber-100 border border-amber-300 rounded-full items-center justify-center shrink-0 font-bold">i</span>
                <div>
                  <strong>Local Storage Preview:</strong> Artikel ini berhasil disimpan secara lokal di browser Anda karena repositori produksi berstatus <em>Read-Only</em> (Serverless Hosting). Perubahan ini hanya terlihat di browser Anda saat ini.
                </div>
              </div>

              {/* Header block */}
              <div className="space-y-4 border-b border-border/60 pb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/15 tracking-wide capitalize">
                  {article.category}
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold font-serif text-foreground leading-[1.2] tracking-tight">
                  {article.title}
                </h1>

                {/* Meta details bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted pt-2 select-none">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    By {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime} Bacaan
                  </span>
                  <span className="text-accent font-extrabold">
                    Tingkat: {article.difficulty}
                  </span>
                </div>
              </div>

              {/* HTML Compiled content output */}
              <div className="article-container article-body py-4 prose dark:prose-invert">
                <div 
                  className="tiptap-html-content"
                  dangerouslySetInnerHTML={{ __html: article.htmlContent || `<p>${article.content}</p>` }} 
                />
              </div>

              {/* Article Footer (Tags and Socials) */}
              <div className="border-t border-border mt-12 pt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-1 text-[11px] font-bold border border-border px-2.5 py-1 rounded bg-background text-muted"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40 select-none">
                  <Link 
                    href={`/category/${categorySlug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4" /> Kembali ke Kategori
                  </Link>

                  <div className="flex gap-2">
                    <button className="p-2 border border-border bg-card rounded-lg hover:bg-background-alt text-muted hover:text-foreground cursor-pointer shadow-sm text-xs font-semibold flex items-center gap-1">
                      <Bookmark className="h-4 w-4" /> Simpan
                    </button>
                    <button className="p-2 border border-border bg-card rounded-lg hover:bg-background-alt text-muted hover:text-foreground cursor-pointer shadow-sm text-xs font-semibold flex items-center gap-1">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>
                </div>
              </div>

            </article>

            {/* COLUMN 2: Sticky Table of Contents */}
            <div className="xl:col-span-3">
              <ArticleToc headings={headings} />
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
