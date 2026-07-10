"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActions, UserAction } from "@/lib/actions";
import { ArrowRight, MapPin, Calendar, Tag } from "lucide-react";

export default function CommunityFeedPreview() {
  const [actions, setActions] = useState<UserAction[]>([]);

  useEffect(() => {
    setActions(getActions().slice(0, 3));
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {actions.map((act) => (
          <div 
            key={act.id}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-card flex flex-col justify-between group h-full"
          >
            <div className="space-y-4">
              {/* Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-background border-b border-border relative select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={act.photo} 
                  alt={act.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>

              {/* Card Meta & Story */}
              <div className="px-5 pb-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-foreground-sub/80 select-none">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {act.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {act.date}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-sub flex items-center gap-1 select-none">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {act.country}
                  </h4>
                  <p className="text-[14px] text-foreground leading-relaxed font-sans line-clamp-3">
                    "{act.story}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center select-none pt-4">
        <Link 
          href="/community"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover group transition-colors"
        >
          Explore Community Feed
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
