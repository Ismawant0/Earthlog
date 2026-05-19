"use client";

import { useState } from "react";
import { HelpCircle, RefreshCw, Info, Settings, Wind, Droplet, Thermometer } from "lucide-react";

export default function InteractiveDiagram() {
  const [wor, setWor] = useState<"low" | "medium" | "high">("medium");
  const [flowRate, setFlowRate] = useState<"low" | "medium" | "high">("medium");
  const [temp, setTemp] = useState<number>(60); // In Celsius
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Set visual dimensions based on Water-to-Oil Ratio (WOR)
  const getWaterLevel = () => {
    switch (wor) {
      case "low": return 260; // Thinner water layer
      case "medium": return 230; // Medium
      case "high": return 200; // Thicker water layer
    }
  };

  const getOilLevel = () => {
    // Oil floats on water. The top of the oil is bound by the Weir height (fixed at 170)
    // but before the weir, the level can change.
    return 170;
  };

  const componentsInfo: Record<string, { title: string; desc: string; role: string }> = {
    deflector: {
      title: "Inlet Deflector (Deflektor Masuk)",
      role: "Pemisahan Momentum Primer",
      desc: "Menyerap gaya tumbukan aliran sumur berkecepatan tinggi. Perubahan momentum mendadak memisahkan 80-90% cairan bebas dari gas secara instan."
    },
    coalescer: {
      title: "Coalescing Plates (Pelat Penggabung)",
      role: "Sedimentasi Dipercepat",
      desc: "Pelat miring menyediakan area permukaan ekstra bagi tetesan minyak halus untuk bertabrakan dan menyatu (koalesi), mempercepat naiknya minyak ke atas fasa air."
    },
    mist: {
      title: "Mist Extractor (Demister Pad)",
      role: "Penyaring Kabut Gas",
      desc: "Bantalan rajutan kawat halus menyaring sisa tetesan kabut minyak (<10-50 mikron) dari gas sebelum meninggalkan tangki, memastikan gas keluar benar-benar kering."
    },
    weir: {
      title: "Baffle / Weir (Sekat Pembatas)",
      role: "Kontrol Lapisan Cairan",
      desc: "Dinding pembatas vertikal tetap. Minyak mengapung dan meluap melewati weir ini masuk ke bucket minyak (oil bucket). Sedangkan air tertahan di sebelah kiri weir."
    },
    vortex: {
      title: "Vortex Breaker (Pencegah Pusaran)",
      role: "Stabilisasi Outlet",
      desc: "Mencegah pusaran corong udara saat membuang cairan, menghindari gas tersedot keluar bersama cairan."
    }
  };

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden shadow-md my-8">
      {/* Top Banner */}
      <div className="bg-primary text-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border">
        <div>
          <span className="text-[10px] uppercase font-bold bg-accent text-white px-2 py-0.5 rounded tracking-wide">
            Interactive Visual Tool
          </span>
          <h3 className="text-lg font-bold mt-1 text-white">Simulator Separator Tiga Fasa</h3>
          <p className="text-xs text-white/80">Sesuaikan parameter untuk mensimulasikan dinamika pemisahan fluida secara langsung.</p>
        </div>
        <button 
          onClick={() => {
            setWor("medium");
            setFlowRate("medium");
            setTemp(60);
            setActiveComponent(null);
          }}
          className="flex items-center text-xs gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-all font-semibold cursor-pointer"
        >
          <RefreshCw className="h-3 w-3" /> Reset Simulator
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Diagram Canvas */}
        <div className="lg:col-span-3 flex flex-col items-center">
          <div className="w-full bg-background-alt border border-border rounded-lg p-4 relative overflow-hidden flex items-center justify-center min-h-[340px]">
            {/* SVG Visual */}
            <svg viewBox="0 0 700 320" className="w-full max-w-[640px] h-auto overflow-visible select-none">
              
              {/* DEFINE GRADIENTS & PATTERNS */}
              <defs>
                {/* Water layer gradient */}
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9" />
                </linearGradient>
                
                {/* Oil layer gradient */}
                <linearGradient id="oilGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#854D0E" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#713F12" stopOpacity="0.95" />
                </linearGradient>
                
                {/* Gas Area gradient */}
                <linearGradient id="gasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.05" />
                </linearGradient>

                {/* Flow lines arrows */}
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1C1917" />
                </marker>
                <marker id="arrow-white" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFFFFF" />
                </marker>
              </defs>

              {/* BACKGROUND GAS PHASE */}
              <rect x="70" y="40" width="560" height="240" rx="30" fill="url(#gasGrad)" />

              {/* FLUID LAYERS (WATER & OIL) - HEIGHTS CONTROLLED BY WOR STATE */}
              {/* 1. Water Layer (Bottom) */}
              <path 
                d={`M 70,${getWaterLevel()} 
                    L 460,${getWaterLevel()} 
                    L 460,280 
                    L 70,280 Z`} 
                fill="url(#waterGrad)" 
                className="transition-all duration-500 ease-in-out"
              />
              
              {/* 2. Oil Layer (Middle) - Floats on Water, extends to Weir (x=460) */}
              <path 
                d={`M 70,${getOilLevel()} 
                    L 460,${getOilLevel()} 
                    L 460,${getWaterLevel()} 
                    L 70,${getWaterLevel()} Z`} 
                fill="url(#oilGrad)" 
                className="transition-all duration-500 ease-in-out"
              />

              {/* 3. Oil Bucket Chamber (Right of Weir) - Collects luapan minyak */}
              <rect x="462" y="172" width="138" height="106" fill="url(#oilGrad)" opacity="0.9" />

              {/* VESSEL OUTLINE (MAIN BODY OF SEPARATOR) */}
              <rect 
                x="70" y="40" width="560" height="240" rx="30" 
                fill="none" stroke="currentColor" strokeWidth="4" 
                className="text-foreground/80 dark:text-foreground/60"
              />

              {/* PIPES CONNECTIONS */}
              {/* Inlet Pipe (Left) */}
              <path d="M 20,110 L 70,110" stroke="currentColor" strokeWidth="16" fill="none" className="text-foreground/80 dark:text-foreground/60" />
              <path d="M 20,110 L 75,110" stroke="#E7E5E4" strokeWidth="10" fill="none" />
              
              {/* Gas Outlet Pipe (Top Right) */}
              <path d="M 540,10 L 540,40" stroke="currentColor" strokeWidth="16" fill="none" className="text-foreground/80 dark:text-foreground/60" />
              <path d="M 540,10 L 540,45" stroke="#E7E5E4" strokeWidth="10" fill="none" />

              {/* Oil Outlet Pipe (Bottom Right) */}
              <path d="M 530,280 L 530,310" stroke="currentColor" strokeWidth="16" fill="none" className="text-foreground/80 dark:text-foreground/60" />
              <path d="M 530,275 L 530,310" stroke="#E7E5E4" strokeWidth="10" fill="none" />

              {/* Water Outlet Pipe (Bottom Left) */}
              <path d="M 250,280 L 250,310" stroke="currentColor" strokeWidth="16" fill="none" className="text-foreground/80 dark:text-foreground/60" />
              <path d="M 250,275 L 250,310" stroke="#E7E5E4" strokeWidth="10" fill="none" />

              {/* INTERNALS DESIGN & HOVER EFFECTS */}
              
              {/* A. Inlet Deflector (x=80, y=80) */}
              <g 
                className="cursor-pointer group" 
                onClick={() => setActiveComponent("deflector")}
              >
                <path 
                  d="M 90,80 C 110,95 110,125 90,140" 
                  fill="none" 
                  stroke={activeComponent === "deflector" ? "#C6922F" : "currentColor"} 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="transition-colors group-hover:text-accent"
                />
                <circle cx="100" cy="110" r="15" fill="transparent" />
              </g>

              {/* B. Coalescing Plates (x=280, y=180) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setActiveComponent("coalescer")}
              >
                {/* 3 Angled plates inside liquid phase */}
                <line x1="280" y1="180" x2="310" y2="220" stroke={activeComponent === "coalescer" ? "#C6922F" : "currentColor"} strokeWidth="5" className="transition-colors" />
                <line x1="295" y1="180" x2="325" y2="220" stroke={activeComponent === "coalescer" ? "#C6922F" : "currentColor"} strokeWidth="5" className="transition-colors" />
                <line x1="310" y1="180" x2="340" y2="220" stroke={activeComponent === "coalescer" ? "#C6922F" : "currentColor"} strokeWidth="5" className="transition-colors" />
                <rect x="270" y="175" width="80" height="50" fill="transparent" />
              </g>

              {/* C. Mist Extractor (x=500, y=45) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setActiveComponent("mist")}
              >
                <rect 
                  x="500" y="44" width="75" height="30" 
                  fill={activeComponent === "mist" ? "#C6922F" : "#78716C"} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="transition-colors opacity-80 group-hover:fill-accent"
                />
                <path d="M 505,52 L 570,68 M 505,68 L 570,52" stroke="white" strokeWidth="2" />
              </g>

              {/* D. Weir baffle (x=460, y=170) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setActiveComponent("weir")}
              >
                <line 
                  x1="460" y1="170" x2="460" y2="280" 
                  stroke={activeComponent === "weir" ? "#C6922F" : "currentColor"} 
                  strokeWidth="6" 
                  className="transition-colors"
                />
                <circle cx="460" cy="220" r="15" fill="transparent" />
              </g>

              {/* E. Vortex Breakers (Outlet water and oil) */}
              <g 
                className="cursor-pointer group"
                onClick={() => setActiveComponent("vortex")}
              >
                {/* Vortex Water */}
                <path d="M 235,278 L 265,278 M 240,274 L 260,274" stroke={activeComponent === "vortex" ? "#C6922F" : "currentColor"} strokeWidth="4" />
                {/* Vortex Oil */}
                <path d="M 515,278 L 545,278 M 520,274 L 540,274" stroke={activeComponent === "vortex" ? "#C6922F" : "currentColor"} strokeWidth="4" />
              </g>

              {/* SIMULATION ANIMATED FLOW INDICATORS */}
              {/* Inlet stream splashing */}
              <path 
                d="M 20,110 Q 75,110 88,110" 
                stroke="#A8A29E" strokeWidth="6" strokeDasharray="5,5" fill="none"
                className="animate-[dash_2s_linear_infinite]"
                style={{ strokeDashoffset: -20 } as any}
              />
              
              {/* Fluid falling downwards */}
              <g opacity={flowRate === "low" ? "0.4" : flowRate === "medium" ? "0.7" : "1.0"}>
                <line x1="94" y1="125" x2="94" y2="175" stroke="#713F12" strokeWidth="3" strokeDasharray="4,4" className="animate-[dash_1.5s_linear_infinite]" />
                <line x1="102" y1="125" x2="102" y2="240" stroke="#1E4ED8" strokeWidth="3" strokeDasharray="4,4" className="animate-[dash_1.2s_linear_infinite]" />
              </g>

              {/* Gas flow upwards */}
              <g opacity="0.6" className="text-foreground/40 dark:text-white/30">
                <path d="M 150,110 Q 220,70 300,70" stroke="currentColor" strokeWidth="2" strokeDasharray="3,6" fill="none" className="animate-[dash_4s_linear_infinite]" />
                <path d="M 300,70 Q 420,60 520,60" stroke="currentColor" strokeWidth="2" strokeDasharray="3,6" fill="none" className="animate-[dash_4s_linear_infinite]" />
              </g>

              {/* Outlet Flow Arrows */}
              {/* Gas Out */}
              <path d="M 540,40 L 540,15" stroke="#1C1917" strokeWidth="2" markerEnd="url(#arrow)" fill="none" className="dark:stroke-white" />
              <text x="555" y="22" className="text-[10px] font-bold fill-foreground dark:fill-white">Gas Kering</text>

              {/* Oil Out (Right) */}
              <path d="M 530,280 L 530,305" stroke="#713F12" strokeWidth="3" markerEnd="url(#arrow)" fill="none" />
              <text x="548" y="302" className="text-[10px] font-bold fill-foreground dark:fill-white">Outlet Minyak</text>

              {/* Water Out (Left) */}
              <path d="M 250,280 L 250,305" stroke="#1D4ED8" strokeWidth="3" markerEnd="url(#arrow)" fill="none" />
              <text x="268" y="302" className="text-[10px] font-bold fill-foreground dark:fill-white">Outlet Air</text>

              {/* OVERLAYS & TEXT LABELS */}
              <text x="220" y="270" className="text-[11px] font-semibold fill-white/80">AIR SUMUR (WATER)</text>
              <text x="210" y="150" className="text-[11px] font-semibold fill-white/90">MINYAK BUMI (OIL)</text>
              <text x="310" y="100" className="text-[12px] font-semibold fill-foreground/50 dark:fill-white/40">FASA GAS (GAS PHASE)</text>
              
              <text x="32" y="94" className="text-[10px] font-bold fill-foreground dark:fill-white">Inlet Sumur</text>

              {/* Click interactive marker badges */}
              <circle cx="100" cy="110" r="10" fill="#C6922F" className="animate-ping opacity-60" />
              <circle cx="100" cy="110" r="7" fill="#C6922F" />
              <text x="97" y="113" className="text-[8px] font-bold fill-white">A</text>

              <circle cx="310" cy="200" r="10" fill="#C6922F" className="animate-ping opacity-60" />
              <circle cx="310" cy="200" r="7" fill="#C6922F" />
              <text x="307" y="203" className="text-[8px] font-bold fill-white">B</text>

              <circle cx="535" cy="60" r="10" fill="#C6922F" className="animate-ping opacity-60" />
              <circle cx="535" cy="60" r="7" fill="#C6922F" />
              <text x="532" y="63" className="text-[8px] font-bold fill-white">C</text>

              <circle cx="460" cy="210" r="10" fill="#C6922F" className="animate-ping opacity-60" />
              <circle cx="460" cy="210" r="7" fill="#C6922F" />
              <text x="457" y="213" className="text-[8px] font-bold fill-white">D</text>
            </svg>
          </div>
          
          <span className="text-[10px] text-muted mt-2 flex items-center gap-1">
            <Info className="h-3 w-3" /> Klik tanda huruf kuning (A, B, C, D) di dalam diagram untuk mempelajari komponen internal.
          </span>
        </div>

        {/* SIDE CONTROLS & COMPONENT DETAILS PANEL */}
        <div className="flex flex-col gap-5 justify-between">
          
          {/* 1. Simulator Parameter Controllers */}
          <div className="space-y-4 border border-border rounded-lg p-4 bg-background-alt">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" /> Parameter Kontrol
            </h4>
            
            {/* WOR Level */}
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1.5 flex items-center gap-1">
                <Droplet className="h-3 w-3 text-primary-light" /> Water-to-Oil Ratio (WOR)
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(["low", "medium", "high"] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWor(w)}
                    className={`text-[10px] py-1.5 px-2 rounded font-bold capitalize transition-all border cursor-pointer ${
                      wor === w
                        ? "bg-primary text-white border-primary"
                        : "bg-card text-foreground border-border hover:bg-background"
                    }`}
                  >
                    {w === "low" ? "Rendah" : w === "medium" ? "Sedang" : "Tinggi"}
                  </button>
                ))}
              </div>
            </div>

            {/* Inlet Flow Rate */}
            <div>
              <label className="text-[11px] font-semibold text-muted block mb-1.5 flex items-center gap-1">
                <Wind className="h-3 w-3 text-success" /> Laju Aliran Masuk
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(["low", "medium", "high"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlowRate(f)}
                    className={`text-[10px] py-1.5 px-2 rounded font-bold capitalize transition-all border cursor-pointer ${
                      flowRate === f
                        ? "bg-primary text-white border-primary"
                        : "bg-card text-foreground border-border hover:bg-background"
                    }`}
                  >
                    {f === "low" ? "Lambat" : f === "medium" ? "Sedang" : "Cepat"}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-muted mb-1">
                <span className="flex items-center gap-1">
                  <Thermometer className="h-3 w-3 text-accent" /> Temperatur Cairan
                </span>
                <span className="font-bold text-foreground">{temp}°C</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span className="text-[9px] text-muted block mt-1">
                Suhu tinggi menurunkan viskositas minyak, mempercepat pemisahan air.
              </span>
            </div>
          </div>

          {/* 2. Interactive Component Descriptor Panel */}
          <div className="flex-1 border border-border rounded-lg p-4 bg-background-alt flex flex-col justify-center min-h-[140px]">
            {activeComponent ? (
              <div>
                <span className="text-[9px] uppercase font-bold text-accent tracking-wide block mb-0.5">
                  {componentsInfo[activeComponent].role}
                </span>
                <h4 className="text-sm font-bold text-primary dark:text-primary-light">
                  {componentsInfo[activeComponent].title}
                </h4>
                <p className="text-xs text-foreground mt-1.5 leading-relaxed">
                  {componentsInfo[activeComponent].desc}
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <HelpCircle className="h-8 w-8 text-muted mx-auto mb-2 opacity-40 animate-bounce" />
                <h4 className="text-xs font-bold text-foreground">Klik Komponen Internal</h4>
                <p className="text-[10px] text-muted max-w-[180px] mx-auto mt-1">
                  Pilih salah satu komponen berlabel huruf kuning di diagram untuk membaca penjelasan fungsinya.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
