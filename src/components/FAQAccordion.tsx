"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!items || !Array.isArray(items)) return null;

  return (
    <div className="my-8 border border-border rounded-lg bg-card overflow-hidden divide-y divide-border shadow-sm">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="transition-all duration-200">
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-foreground hover:bg-background-alt/50 transition-colors cursor-pointer select-none text-[15px]"
            >
              <span>{item.question}</span>
              <ChevronDown 
                className={`h-4 w-4 text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-primary animate-pulse" : ""
                }`} 
              />
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[500px] border-t border-border/40" : "max-h-0"
              }`}
            >
              <div className="px-5 py-4 bg-background-alt/30 text-sm leading-relaxed text-muted antialiased">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
