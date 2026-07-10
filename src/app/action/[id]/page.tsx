"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getActions, UserAction } from "@/lib/actions";
import { MapPin, Calendar, ArrowLeft, Leaf, ShieldAlert } from "lucide-react";

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
    const list = getActions();
    const found = list.find((a) => a.id === id);
    if (found) {
      setAction(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex items-center justify-center min-h-[60vh] bg-background text-foreground">
          <div className="text-sm font-mono text-foreground-sub animate-pulse">Loading action...</div>
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

      <main className="flex-grow bg-background text-foreground py-12 md:py-20">
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
              <span>{action.location || action.country}</span>
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
            
            {/* Story Content */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-foreground select-none">The Story</h2>
              <p className="text-foreground leading-relaxed text-[17px] italic">
                "{action.story}"
              </p>
              <p className="text-sm text-foreground-sub leading-relaxed">
                This action is preserved in Earthlog's public contribution registry. Every choice we make to care for our natural ecosystems, reduce waste, and transition away from high-carbon habits builds a healthier Earth.
              </p>
            </div>

            {/* Stylized Location Map Card */}
            <div className="space-y-6 select-none">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-foreground">Location Pin</h2>
              
              <div className="bg-white border border-border rounded-xl p-4 space-y-4">
                {/* Styled static map indicator */}
                <div className="relative aspect-square w-full rounded-lg bg-[#FAFAF7] border border-border/80 flex items-center justify-center overflow-hidden">
                  {/* Subtle dots grid pattern */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2F6B45_1.5px,transparent_1.5px)] bg-[size:12px_12px]" />
                  
                  {/* Simple locator circles */}
                  <div className="relative z-10">
                    <span className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-primary/10 animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-primary border-2 border-white flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-bold text-foreground uppercase tracking-wide">Registry Coordinate</div>
                  <div className="text-foreground-sub font-mono">{action.location || action.country}</div>
                  <div className="text-[10px] text-foreground-sub/60 mt-2 italic">Logged securely via browser client</div>
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
