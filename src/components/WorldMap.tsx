"use client";

import { useState } from "react";
import { TreeDeciduous, Trash2, Droplet, Bike, ShieldCheck, MapPin } from "lucide-react";

interface ActionPin {
  id: string;
  country: string;
  flag: string;
  title: string;
  story: string;
  category: string;
  date: string;
  x: number; // percentage from left
  y: number; // percentage from top
  icon: any;
}

export default function WorldMap() {
  const [activePin, setActivePin] = useState<ActionPin | null>(null);

  const pins: ActionPin[] = [
    {
      id: "pin-1",
      country: "Indonesia",
      flag: "🇮🇩",
      title: "Planted Mango Trees",
      story: "I planted two mango trees with my family in Malang.",
      category: "Plant a Tree",
      date: "2026-07-09",
      x: 78,
      y: 68,
      icon: TreeDeciduous,
    },
    {
      id: "pin-2",
      country: "United States",
      flag: "🇺🇸",
      title: "Oregon Coastal Cleanup",
      story: "Picked up 12kg of plastic along the Oregon coastline.",
      category: "Pick Up Trash",
      date: "2026-07-08",
      x: 18,
      y: 35,
      icon: Trash2,
    },
    {
      id: "pin-3",
      country: "Germany",
      flag: "🇩🇪",
      title: "Zero Waste Challenge",
      story: "Composted all kitchen scraps and avoided waste for a week.",
      category: "Reduce Plastic",
      date: "2026-07-07",
      x: 48,
      y: 32,
      icon: ShieldCheck,
    },
    {
      id: "pin-4",
      country: "Japan",
      flag: "🇯🇵",
      title: "Commuting by Bicycle",
      story: "Cycled 42 kilometers instead of driving my gasoline car.",
      category: "Bike Instead",
      date: "2026-07-06",
      x: 84,
      y: 39,
      icon: Bike,
    },
    {
      id: "pin-5",
      country: "Brazil",
      flag: "🇧🇷",
      title: "Rainforest Restoration",
      story: "Helped organize a community forest restoration weekend.",
      category: "Community Cleanup",
      date: "2026-07-05",
      x: 35,
      y: 65,
      icon: TreeDeciduous,
    },
    {
      id: "pin-6",
      country: "Kenya",
      flag: "🇰🇪",
      title: "Rainwater Harvesting",
      story: "Constructed a local rainwater catchment container.",
      category: "Save Water",
      date: "2026-07-04",
      x: 55,
      y: 58,
      icon: Droplet,
    },
  ];

  return (
    <div className="w-full bg-white border border-border rounded-xl p-6 md:p-8 space-y-6 relative overflow-hidden">
      <div>
        <h3 className="font-semibold text-lg text-foreground">Interactive World Map</h3>
        <p className="text-sm text-foreground-sub">See where the global community is making a difference.</p>
      </div>

      {/* Styled World Map Container */}
      <div className="relative w-full aspect-[2/1] bg-[#FAFAF7] rounded-lg border border-border/60 overflow-hidden select-none">
        
        {/* Clean, minimalist SVG world grid representing continents */}
        <svg 
          className="absolute inset-0 w-full h-full text-foreground/5" 
          viewBox="0 0 1000 500" 
          fill="currentColor"
        >
          {/* North America */}
          <path d="M120,110 L250,90 L320,120 L280,240 L160,200 Z" />
          <path d="M80,80 L180,60 L240,80 Z" />
          
          {/* South America */}
          <path d="M280,250 L340,290 L360,380 L320,470 L290,440 L260,320 Z" />
          
          {/* Europe */}
          <path d="M450,110 L540,110 L560,160 L460,170 Z" />
          
          {/* Africa */}
          <path d="M440,190 L560,180 L620,260 L590,380 L520,380 L480,260 Z" />
          
          {/* Asia */}
          <path d="M550,110 L840,100 L900,240 L720,320 L660,290 L600,220 Z" />
          
          {/* Australia */}
          <path d="M780,360 L880,370 L860,440 L760,420 Z" />
          
          {/* Islands / Greenland */}
          <circle cx="340" cy="50" r="15" />
          <circle cx="780" cy="220" r="8" />
          <circle cx="850" cy="180" r="10" />
        </svg>

        {/* Action Pins */}
        {pins.map((pin) => {
          const Icon = pin.icon;
          const isActive = activePin?.id === pin.id;

          return (
            <div
              key={pin.id}
              className="absolute"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              {/* Pulse effect */}
              <span className="absolute -left-2 -top-2 w-5 h-5 rounded-full bg-primary/20 animate-ping" />
              
              <button
                onClick={() => setActivePin(isActive ? null : pin)}
                onMouseEnter={() => setActivePin(pin)}
                className={`relative flex items-center justify-center w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                  ${isActive 
                    ? "bg-primary scale-125 shadow-md" 
                    : "bg-primary/80 hover:bg-primary"
                  }
                `}
                aria-label={`Action in ${pin.country}`}
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </button>
            </div>
          );
        })}

        {/* Tooltip detail card */}
        {activePin && (
          <div 
            className="absolute z-10 bg-white border border-border rounded-lg p-4 shadow-lg w-72 max-w-[90vw] animate-fade-in"
            style={{
              left: `${activePin.x > 70 ? activePin.x - 30 : activePin.x + 2}%`,
              top: `${activePin.y > 60 ? activePin.y - 40 : activePin.y + 4}%`,
            }}
          >
            <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase">
                <MapPin className="w-3.5 h-3.5" />
                {activePin.category}
              </span>
              <span className="text-xs text-foreground-sub">{activePin.date}</span>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-1">
                <span>{activePin.flag}</span>
                <span>{activePin.country}</span>
              </h4>
              <p className="text-xs text-foreground-sub leading-relaxed italic">
                "{activePin.story}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
