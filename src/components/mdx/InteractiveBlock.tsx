'use client';

import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  HelpCircle, 
  Activity, 
  Sliders, 
  Flame, 
  AlertTriangle 
} from 'lucide-react';

interface InteractiveBlockProps {
  type: string;
}

export default function InteractiveBlock({ type }: InteractiveBlockProps) {
  // Render corresponding interactive block
  switch (type) {
    case 'steam-trap':
      return <SteamTrapSimulation />;
    case 'flare-system':
      return <FlareSystemSimulation />;
    case 'h2s-detector':
      return <H2SDetectorSimulation />;
    case 'boiler-chemistry':
      return <BoilerChemistrySimulation />;
    case 'pump-curve':
      return <PumpCurveSimulation />;
    case 'pid-interactive':
      return <PidInteractiveSimulation />;
    case 'quiz-block':
      return <QuizBlockComponent />;
    default:
      return (
        <div className="my-8 border-2 border-dashed border-border rounded-xl p-8 bg-muted/20 text-center select-none">
          <HelpCircle className="h-10 w-10 text-muted mx-auto mb-2 animate-bounce" />
          <h4 className="font-bold text-foreground">Interactive Block Placeholder</h4>
          <p className="text-xs text-muted mt-1">Unknown simulation block type: <code className="bg-muted px-1 rounded">{type}</code></p>
        </div>
      );
  }
}

// 1. Steam Trap Simulation Placeholder
function SteamTrapSimulation() {
  const [pressure, setPressure] = useState(5.0); // barg
  const [trapState, setTrapState] = useState<'Normal' | 'Failed Open' | 'Failed Closed'>('Normal');
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-primary/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Steam Trap Operation Simulator</h4>
          <p className="text-xs text-muted">Thermodynamic & Mechanical Steam Trap Behavior</p>
        </div>
        <Activity className="h-5 w-5 text-primary animate-pulse" />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">Simulation Controls</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Inlet Steam Pressure:</span>
                <span className="text-primary font-bold">{pressure.toFixed(1)} barg</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="15" 
                step="0.5" 
                value={pressure} 
                onChange={(e) => setPressure(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted block">Trap Operating Condition:</span>
              <div className="grid grid-cols-3 gap-2">
                {(['Normal', 'Failed Open', 'Failed Closed'] as const).map((state) => (
                  <button
                    key={state}
                    onClick={() => setTrapState(state)}
                    className={`px-2 py-1.5 rounded-lg border text-xs font-bold transition ${
                      trapState === state 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background hover:bg-muted/30 border-border text-muted-foreground'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Live Diagnostics</span>
              <div className="mt-3 space-y-2.5">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Condensate Flow Rate:</span>
                  <span className="font-semibold text-foreground">
                    {trapState === 'Failed Closed' ? '0.0 kg/h' : trapState === 'Failed Open' ? `${(pressure * 24.5).toFixed(1)} kg/h` : `${(pressure * 8.2).toFixed(1)} kg/h`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Steam Loss Rate:</span>
                  <span className={`font-semibold ${trapState === 'Failed Open' ? 'text-error font-bold' : 'text-foreground'}`}>
                    {trapState === 'Failed Open' ? `${(pressure * 4.8).toFixed(1)} kg/h` : '0.0 kg/h'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Acoustic Signal:</span>
                  <span className="font-semibold text-foreground">
                    {trapState === 'Failed Open' ? 'Continuous Hiss (Loud)' : trapState === 'Failed Closed' ? 'Silent (Cold)' : 'Cyclic Discharge (Purge)'}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-border flex items-center gap-3">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm border ${
                  isRunning 
                    ? 'bg-success/15 border-success/30 text-success hover:bg-success/20' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
                }`}
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" /> Stop Simulation
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" /> Start Live Monitoring
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Flare System Simulation Placeholder
function FlareSystemSimulation() {
  const [purgeGas, setPurgeGas] = useState(120); // Nm3/h
  const [hasPilot, setHasPilot] = useState(true);
  const [steamRatio, setSteamRatio] = useState(0.4);

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-rose-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Flare Tip & Combustion Dynamics</h4>
          <p className="text-xs text-muted">Optimize Smokeless Flare Operation & Steam Ratios</p>
        </div>
        <Flame className={`h-5 w-5 ${hasPilot ? 'text-rose-500 animate-pulse' : 'text-muted'}`} />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">Flow Variables</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Hydrocarbon Purge Flow:</span>
                <span className="text-rose-600 font-bold">{purgeGas} Nm³/h</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10" 
                value={purgeGas} 
                onChange={(e) => setPurgeGas(parseInt(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Steam-to-HC Ratio:</span>
                <span className="text-rose-600 font-bold">{steamRatio.toFixed(2)}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="1.5" 
                step="0.05" 
                value={steamRatio} 
                onChange={(e) => setSteamRatio(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="pilot_chk"
                checked={hasPilot} 
                onChange={(e) => setHasPilot(e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded border-border focus:ring-0 cursor-pointer"
              />
              <label htmlFor="pilot_chk" className="text-xs font-bold text-muted cursor-pointer select-none">Pilot Burners Ignited</label>
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Combustion Diagnostics</span>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Flame Status:</span>
                  <span className={`font-bold ${!hasPilot ? 'text-error' : purgeGas === 0 ? 'text-yellow-600' : 'text-success'}`}>
                    {!hasPilot ? 'OFF (Hazardous Release)' : purgeGas === 0 ? 'Pilot Only' : 'Active Combustion'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Smoke Density (Ringelmann):</span>
                  <span className="font-semibold text-foreground">
                    {!hasPilot || purgeGas === 0 ? '0' : steamRatio < 0.25 ? 'Class 2 (Dark Smoke)' : steamRatio < 0.5 ? 'Class 1 (Light Smoke)' : 'Class 0 (Smokeless)'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Destruction Efficiency:</span>
                  <span className="font-semibold text-foreground">
                    {!hasPilot ? '0.0%' : steamRatio > 1.2 ? '95.2% (Oversteaming)' : '99.8% (Optimal)'}
                  </span>
                </div>
              </div>
            </div>
            {(!hasPilot || (purgeGas > 0 && steamRatio < 0.25)) && (
              <div className="mt-3 p-2 bg-error/5 border border-error/25 rounded-lg flex items-center gap-2 text-error text-[11px] font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{!hasPilot ? 'Risk of unignited toxic dispersion!' : 'High soot formation detected. Increase steam injection.'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. H2S Gas Detector Simulation Placeholder
function H2SDetectorSimulation() {
  const [h2sLevel, setH2sLevel] = useState(8); // ppm

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-amber-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">H₂S Gas Transmitter Simulation</h4>
          <p className="text-xs text-muted">Fixed Point Toxic Gas Detection Safety Response</p>
        </div>
        <Sliders className="h-5 w-5 text-amber-500" />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">Gas Exposure Control</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Concentration Level:</span>
                <span className="text-amber-600 font-bold">{h2sLevel} ppm</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="1" 
                value={h2sLevel} 
                onChange={(e) => setH2sLevel(parseInt(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            <div className="text-[11px] text-muted space-y-1">
              <p>• OSHA PEL (Permissible Exposure Limit): <strong>20 ppm</strong></p>
              <p>• ACGIH TLV (Threshold Limit Value): <strong>1 ppm</strong></p>
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">Device Relay Outputs</span>
                <span className={`h-2.5 w-2.5 rounded-full ${h2sLevel >= 15 ? 'bg-error animate-ping' : h2sLevel >= 5 ? 'bg-warning animate-pulse' : 'bg-success'}`}></span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1">
                  <span className="text-muted">Signal Loop (4-20mA):</span>
                  <span className="font-semibold text-foreground">
                    {(4 + (16 * h2sLevel) / 50).toFixed(2)} mA
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1">
                  <span className="text-muted">Relay 1 (Low Alarm - 5ppm):</span>
                  <span className={`font-bold ${h2sLevel >= 5 ? 'text-warning' : 'text-muted'}`}>
                    {h2sLevel >= 5 ? 'TRIPPED (Yellow Beacon)' : 'RESET'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Relay 2 (High Alarm - 15ppm):</span>
                  <span className={`font-bold ${h2sLevel >= 15 ? 'text-error' : 'text-muted'}`}>
                    {h2sLevel >= 15 ? 'TRIPPED (Siren & ESD)' : 'RESET'}
                  </span>
                </div>
              </div>
            </div>
            {h2sLevel >= 15 && (
              <div className="mt-3 p-2 bg-error/5 border border-error/25 rounded-lg flex items-center gap-2 text-error text-[11px] font-bold">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>SCBA and immediate evacuation required!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Boiler Water Chemistry Simulation Placeholder
function BoilerChemistrySimulation() {
  const [pH, setPH] = useState(9.2);
  const [phosphate, setPhosphate] = useState(12.0); // ppm

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-blue-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Boiler Feedwater Chemistry Simulator</h4>
          <p className="text-xs text-muted">Corrosion & Scale Deposition Control Diagnostics</p>
        </div>
        <Sliders className="h-5 w-5 text-blue-500" />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">Chemical Dosing controls</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Boiler pH:</span>
                <span className="text-blue-600 font-bold">{pH.toFixed(1)}</span>
              </label>
              <input 
                type="range" 
                min="7" 
                max="12" 
                step="0.1" 
                value={pH} 
                onChange={(e) => setPH(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>PO₄ (Phosphate) Dosing:</span>
                <span className="text-blue-600 font-bold">{phosphate.toFixed(1)} ppm</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="0.5" 
                value={phosphate} 
                onChange={(e) => setPhosphate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Boiler Health Assessment</span>
              <div className="space-y-2.5 mt-2">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">pH Target Status:</span>
                  <span className={`font-bold ${pH >= 9.0 && pH <= 10.0 ? 'text-success' : 'text-error'}`}>
                    {pH >= 9.0 && pH <= 10.0 ? 'Acceptable (9.0-10.0)' : pH < 9.0 ? 'Acidic Corrosion Risk' : 'Caustic Embrittlement Risk'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Scaling Risk:</span>
                  <span className="font-semibold text-foreground">
                    {phosphate < 5.0 ? 'High (Insufficient PO4)' : phosphate > 20.0 ? 'High (Over-treatment Precipitation)' : 'Negligible (Optimal)'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Blowdown Valve Command:</span>
                  <span className="font-semibold text-foreground">
                    {pH > 10.5 || phosphate > 20 ? 'OPEN (Purge Concentrated Impurities)' : 'CLOSED (Normal Dosing)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Pump Curve Simulation Placeholder
function PumpCurveSimulation() {
  const [flow, setFlow] = useState(100); // m3/h

  // Equations mimicking pump curves
  const head = Math.max(0, 80 - 0.002 * flow * flow); // m
  const power = Math.max(0, 15 + 0.15 * flow - 0.0002 * flow * flow); // kW
  const efficiency = Math.max(0, 0.9 * flow - 0.0045 * flow * flow); // %

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-indigo-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Centrifugal Pump Performance Curve</h4>
          <p className="text-xs text-muted">Live Operating Point Diagnostic Simulation</p>
        </div>
        <Sliders className="h-5 w-5 text-indigo-500" />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">Process Control Valve</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Discharge Flow Rate:</span>
                <span className="text-indigo-600 font-bold">{flow} m³/h</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5" 
                value={flow} 
                onChange={(e) => setFlow(parseInt(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div className="text-[11px] text-muted space-y-1">
              <p>• Best Efficiency Point (BEP): <strong>100 m³/h</strong></p>
              <p>• Minimum Continuous Flow: <strong>30 m³/h</strong></p>
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Pump Diagnostics</span>
              <div className="space-y-2.5 mt-2">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Developed Head:</span>
                  <span className="font-semibold text-foreground">{head.toFixed(1)} meters</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Hydraulic Power:</span>
                  <span className="font-semibold text-foreground">{power.toFixed(1)} kW</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Pump Efficiency:</span>
                  <span className={`font-bold ${efficiency > 35 ? 'text-success' : 'text-error'}`}>
                    {efficiency.toFixed(1)}% {flow < 30 ? '(Low Flow Risk)' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. PID Loop Interactive Simulator Placeholder
function PidInteractiveSimulation() {
  const [sp, setSp] = useState(150); // Setpoint
  const [pv, setPv] = useState(140); // Process Variable
  const [kp, setKp] = useState(1.5);

  const calculateMV = () => {
    const error = sp - pv;
    return Math.min(100, Math.max(0, 50 + error * kp));
  };

  const handleTune = () => {
    // Mimic loop step response settling down
    setPv(sp);
  };

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-teal-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Interactive PID Loop Tuning Simulator</h4>
          <p className="text-xs text-muted">Feedback Controller Tuning & Setpoint Step Response</p>
        </div>
        <Sliders className="h-5 w-5 text-teal-500" />
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-foreground/90 uppercase tracking-wide">PID Controllers</h5>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Setpoint (SP):</span>
                <span className="text-teal-600 font-bold">{sp}°C</span>
              </label>
              <input 
                type="range" 
                min="100" 
                max="200" 
                value={sp} 
                onChange={(e) => setSp(parseInt(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted flex justify-between">
                <span>Proportional Gain (Kp):</span>
                <span className="text-teal-600 font-bold">{kp.toFixed(1)}</span>
              </label>
              <input 
                type="range" 
                min="0.1" 
                max="5.0" 
                step="0.1" 
                value={kp} 
                onChange={(e) => setKp(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          </div>

          <div className="border border-border/80 bg-background-alt/10 rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Controller States</span>
              <div className="space-y-2.5 mt-2">
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Process Value (PV):</span>
                  <span className="font-semibold text-foreground">{pv}°C</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-border/40 pb-1.5">
                  <span className="text-muted">Control Valve Output (MV):</span>
                  <span className="font-semibold text-foreground">{calculateMV().toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Settled Error:</span>
                  <span className={`font-semibold ${Math.abs(sp - pv) > 2 ? 'text-warning font-bold' : 'text-success'}`}>
                    {(sp - pv).toFixed(1)}°C
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleTune}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Force Loop Correction Step Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Interactive Quiz Block Component
function QuizBlockComponent() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = "Apakah fungsi utama coalescing plates pada Separator Tiga Fasa?";
  const options = [
    "Mempercepat pengendapan butiran gas dalam minyak.",
    "Menggabungkan droplet air kecil yang terdispersi dalam minyak agar mudah terpisah secara gravitasi.",
    "Menurunkan temperatur fluida proses agar viscositas meningkat.",
    "Menginjeksikan bahan kimia demulsifier secara mekanis."
  ];
  const correctAnswerIndex = 1;

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="my-8 border border-border bg-card rounded-2xl overflow-hidden shadow-sm font-sans select-none">
      <div className="bg-purple-500/5 px-6 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h4 className="font-bold text-foreground text-base">Quiz Pemahaman Teknis</h4>
          <p className="text-xs text-muted">Uji pemahaman Anda mengenai topik pembahasan di atas</p>
        </div>
        <HelpCircle className="h-5 w-5 text-purple-500" />
      </div>
      <div className="p-6 space-y-4">
        <p className="font-bold text-foreground/90 text-sm leading-relaxed">{question}</p>
        
        <div className="space-y-2">
          {options.map((opt, idx) => (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition flex items-start gap-3 cursor-pointer ${
                isAnswered
                  ? idx === correctAnswerIndex
                    ? 'bg-success/10 border-success text-success-foreground'
                    : selectedOption === idx
                    ? 'bg-error/10 border-error text-error-foreground'
                    : 'bg-background border-border opacity-70'
                  : selectedOption === idx
                  ? 'bg-purple-500/5 border-purple-500 text-purple-900 font-bold'
                  : 'bg-background hover:bg-muted/30 border-border text-muted-foreground'
              }`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                selectedOption === idx 
                  ? 'bg-purple-500 border-purple-500 text-white' 
                  : 'border-gray-300'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed">{opt}</span>
            </button>
          ))}
        </div>

        <div className="pt-3 flex gap-2">
          {!isAnswered ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmit}
              className="flex-1 bg-black text-white hover:bg-gray-800 disabled:bg-gray-250 py-2.5 rounded-xl text-xs font-bold transition shadow-sm disabled:cursor-not-allowed cursor-pointer"
            >
              Kirim Jawaban
            </button>
          ) : (
            <>
              <div className="flex-[3] flex items-center gap-2 px-3 border border-border rounded-xl bg-background text-xs font-medium">
                {selectedOption === correctAnswerIndex ? (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    Jawaban Benar! Kerja bagus!
                  </span>
                ) : (
                  <span className="text-error flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    Jawaban Salah. Coba pelajari materi di atas kembali.
                  </span>
                )}
              </div>
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 hover:bg-gray-100 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Ulangi Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
