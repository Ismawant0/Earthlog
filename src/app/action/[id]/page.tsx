"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getActions, UserAction } from "@/lib/actions";
import { MapPin, Calendar, ArrowLeft, Leaf } from "lucide-react";

interface ActionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ActionDetailPage({ params }: ActionDetailPageProps) {
  const { id } = use(params);
  const [action, setAction] = useState<UserAction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionDetail = async () => {
      try {
        // 1. Try checking localStorage first for the current user
        const localList = getActions();
        const foundLocal = localList.find((a) => a.id === id);
        if (foundLocal) {
          setAction(foundLocal);
          setLoading(false);
          return;
        }

        // 2. Fetch from GitHub API via actions route for other visitors
        const res = await fetch("/api/actions");
        if (res.ok) {
          const apiList = await res.json();
          const foundApi = apiList.find((a: UserAction) => a.id === id);
          if (foundApi) {
            setAction(foundApi);
          }
        }
      } catch (err) {
        console.error("Failed to load action details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActionDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex items-center justify-center min-h-[60vh] bg-background text-foreground">
          <div className="text-sm font-mono text-foreground-sub animate-pulse">Loading action details...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!action) {
    return notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background text-foreground py-12 md:py-20 animate-in fade-in duration-200">
        <div className="max-w-[840px] mx-auto px-6 space-y-8">
          
          {/* Back button */}
          <nav className="select-none">
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground-sub hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Feed
            </Link>
          </nav>

          {/* Action Details Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase select-none">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" />
                {action.category}
              </span>
              <span className="text-border">&bull;</span>
              <span className="flex items-center gap-1 text-foreground-sub">
                <Calendar className="w-3.5 h-3.5" />
                {action.date}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {action.title || action.category}
            </h1>

            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground-sub select-none">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{action.location ? `${action.location}, ${action.country}` : action.country}</span>
            </div>
          </div>

          {/* Large Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white border border-border select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={action.photo}
              alt={action.title || action.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detail Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-4">
            
            {/* Left/Center columns: Story */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-sub select-none">
                The Story
              </h3>
              <p className="text-[17px] text-foreground leading-relaxed font-serif whitespace-pre-wrap">
                {action.story}
              </p>
            </div>

            {/* Right column: Info Card */}
            <div className="bg-white border border-border rounded-2xl p-6 h-fit space-y-4 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-foreground-sub select-none">
                Action Metadata
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-foreground-sub/60">Category</span>
                  <span className="font-semibold text-foreground">{action.category}</span>
                </div>
                
                <div>
                  <span className="block text-[10px] uppercase font-bold text-foreground-sub/60">Location</span>
                  <span className="font-semibold text-foreground">
                    {action.location ? `${action.location}, ${action.country}` : action.country}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase font-bold text-foreground-sub/60">Logged On</span>
                  <span className="font-semibold text-foreground">{action.date}</span>
                </div>

                <div className="pt-2 border-t border-border/60">
                  <span className="block text-[10px] uppercase font-bold text-primary mb-1">Status</span>
                  <div className="inline-flex items-center gap-1 bg-[#2F6B45]/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Verified Log
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
