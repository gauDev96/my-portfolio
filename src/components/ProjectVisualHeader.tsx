import React from 'react';
import { motion } from 'motion/react';
import { 
  Wifi, 
  Map, 
  Layers, 
  Compass, 
  Smartphone, 
  Activity, 
  Gauge, 
  Battery, 
  TrendingUp, 
  Bell, 
  Compass as Wind, 
  Navigation,
  CheckCircle,
  Utensils
} from 'lucide-react';

interface ProjectVisualHeaderProps {
  id: string;
}

export default function ProjectVisualHeader({ id }: ProjectVisualHeaderProps) {
  // Render specific layout matching each production application code identity
  switch (id) {
    case 'blue-tees':
      return (
        <div className="w-full h-full bg-[#030712] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Cosmic Grid Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
          
          {/* BLE/GPS Telemetry Ring */}
          <div className="absolute right-4 top-4 w-28 h-28 rounded-full border border-cyan-500/10 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="w-24 h-24 rounded-full border border-dashed border-cyan-400/20 flex items-center justify-center"
            />
            <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* Top Status */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <span>BLE CONNECTED</span>
            </div>
            <span className="text-slate-500">PLAYER+ SPEAKER SYNC</span>
          </div>

          {/* Middle HUD Display */}
          <div className="my-auto z-10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">HOLE 18 - PAR 4</div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-display font-black text-white tracking-tighter">142</span>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">YDS</span>
            </div>
          </div>

          {/* Bottom Telemetry Metrics */}
          <div className="z-10 bg-slate-950/60 border border-slate-900 rounded-xl p-2 flex items-center justify-between gap-4 font-mono text-[9px] backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[8px] uppercase">FRONT / BACK</span>
              <span className="text-slate-200 mt-0.5">128 / 154</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-900" />
            <div className="flex flex-col text-right">
              <span className="text-slate-500 text-[8px] uppercase">BATTERY</span>
              <span className="text-emerald-400 flex items-center gap-1 mt-0.5 justify-end">
                <Battery size={10} className="text-emerald-400" /> 88%
              </span>
            </div>
          </div>
        </div>
      );

    case 'mgi-sureshot':
      return (
        <div className="w-full h-full bg-[#022c22]/10 bg-gradient-to-b from-[#022c22]/30 to-[#030712] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Soft topographic curve background */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <path d="M-20 60 C30 80, 100 20, 200 80 C300 140, 400 40, 500 90" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M-20 120 C30 140, 120 70, 240 130 C360 190, 420 90, 520 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
          </svg>

          {/* Telemetry header */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium tracking-wide bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              <Map size={10} className="text-emerald-400 animate-pulse" />
              <span>40k COURSES SYNCED</span>
            </div>
            <span className="text-emerald-500/80 uppercase">AI Series Trolley</span>
          </div>

          {/* Interactive scoring visual */}
          <div className="z-10 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-emerald-500/80 uppercase block">Distance Margins</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-display font-black text-white tracking-tight">251</span>
                <span className="text-[10px] font-mono text-slate-400">METERS</span>
              </div>
            </div>

            {/* Smart Digital Score Board */}
            <div className="bg-[#050b14]/90 border border-slate-900 rounded-lg p-2 font-mono text-[9px] text-slate-300 min-w-24">
              <div className="text-[8px] text-slate-500 tracking-wider">LIVE DIGITAL CARD</div>
              <div className="flex justify-between mt-1 border-b border-slate-900 pb-1">
                <span>STROKES:</span>
                <span className="text-emerald-400 font-bold">4 (Par)</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>PUTTS:</span>
                <span className="text-cyan-400 font-bold">2</span>
              </div>
            </div>
          </div>

          {/* Bottom telemetry HUD bar */}
          <div className="z-10 flex justify-between font-mono text-[8px] text-slate-400 bg-slate-950/80 p-2 rounded-xl border border-slate-900">
            <span className="flex items-center gap-1"><Compass size={10} className="text-emerald-400" /> COMPASS ANGLE: 42°</span>
            <span className="text-slate-500">MGI ACCELEROMETER INTACT</span>
          </div>
        </div>
      );

    case 'tactectec':
      return (
        <div className="w-full h-full bg-[#030712] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Smartwatch Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-40 h-40 rounded-full border border-indigo-500 animate-ping opacity-10" />
            <div className="w-32 h-32 rounded-full border border-indigo-500/40 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-dashed border-indigo-500/30" />
            </div>
          </div>

          {/* Top Status */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px]">
            <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
              <Activity size={10} />
              <span>TEAM8 SYNC</span>
            </div>
            <span className="text-slate-500">OTA FIRMWARE LOADER</span>
          </div>

          {/* Middle Smartwatch Wearable Bezel Mockup */}
          <div className="my-auto z-10 flex gap-4 items-center">
            <div className="w-14 h-14 rounded-full border-2 border-indigo-500/60 bg-slate-950 flex flex-col items-center justify-center shadow-lg relative shrink-0">
              <span className="text-[7px] text-indigo-400 font-bold tracking-widest font-mono uppercase">GPS</span>
              <span className="text-[10px] font-bold text-white font-mono leading-none">168</span>
              <span className="text-[6px] text-slate-500 font-mono">meters</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-300 font-mono">TecTecTec Bezel</span>
              <span className="text-slate-500 font-mono text-[9px] leading-tight mt-0.5">Custom compilation module executed over BLE channels.</span>
            </div>
          </div>

          {/* Bottom telemetry with dynamic hazards indicators */}
          <div className="z-10 bg-slate-950/80 border border-slate-900 rounded-xl p-2 font-mono text-[8.5px] items-center flex justify-between">
            <span className="text-indigo-400 flex items-center gap-1">📣 AUDIO WATCHDOG:</span>
            <span className="text-slate-300 font-semibold uppercase">Hazards active 50m left</span>
          </div>
        </div>
      );

    case 'yamatrack':
      return (
        <div className="w-full h-full bg-[#030712] relative flex flex-col justify-between p-4 overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:14px_14px] opacity-40 pointer-events-none" />

          {/* Top Status */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
              <Navigation size={10} className="text-blue-400 animate-spin-slow" />
              <span>CART ROUTING ACTIVE</span>
            </div>
            <span className="text-slate-500 font-bold">YAMAHA CAR PAIRING</span>
          </div>

          {/* Screen Content representing a high-res custom order screen and map route */}
          <div className="z-10 flex justify-between items-center gap-4 my-auto">
            {/* Simulation Vector Node */}
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-mono">CART NUMBER</span>
              <span className="text-xl font-mono font-bold text-white tracking-wider">GPS #088</span>
              <span className="text-[8px] text-cyan-400 font-mono mt-0.5">RESORT BOUNDARY: SAFE</span>
            </div>

            {/* Food order confirmation module */}
            <div className="bg-[#030712]/90 border border-slate-900 rounded-xl p-2 font-mono text-[9px] min-w-[120px] text-slate-300 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                <span className="text-emerald-400 flex items-center gap-1"><Utensils size={9} /> FOOD ORDER</span>
                <span className="text-[7px] text-slate-500">PAID</span>
              </div>
              <div className="mt-1 flex flex-col gap-0.5 text-slate-400 text-[8px]">
                <div className="flex justify-between">
                  <span>1x Club Sandwich</span>
                  <span>$12.50</span>
                </div>
                <div className="flex justify-between">
                  <span>2x Mineral Water</span>
                  <span>$4.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom order dispatch status */}
          <div className="z-10 bg-slate-950/80 border border-slate-900 rounded-xl px-2 py-1 flex items-center justify-between font-mono text-[8.5px]">
            <span className="text-slate-400">ORDER SHIPMENT DISPATCH:</span>
            <span className="text-emerald-400 font-bold uppercase animate-pulse">IN TRANSIT</span>
          </div>
        </div>
      );

    case 'rad-golf':
      return (
        <div className="w-full h-full bg-[#0c0a09] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Laser-guided grids background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-amber-500/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dashed border-amber-500/20 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-amber-500/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-amber-500/10 pointer-events-none" />

          {/* Top telemetry */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
              <TrendingUp size={10} />
              <span>RAD RANGEFINDER PAIR</span>
            </div>
            <span className="text-orange-500/80 lowercase font-bold font-mono">continuous telemetry</span>
          </div>

          {/* Shot analyzer HUD screen */}
          <div className="my-auto z-10 flex justify-between items-baseline">
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block">SLOPE ADJUSTED</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-display font-black text-white tracking-tighter">168</span>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-black">YDS</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">ACTUAL / SLOPE</span>
              <span className="text-xs font-mono font-bold text-slate-200 block mt-0.5">{`173yd / -3°`}</span>
            </div>
          </div>

          {/* Status tracking bottom parameters */}
          <div className="z-10 flex justify-between font-mono text-[9px] bg-slate-950 border border-slate-900 rounded-xl p-2">
            <span className="text-slate-400">AI AUTO-SHOT ESTIMATE:</span>
            <span className="text-amber-400 font-bold uppercase animate-pulse">DRIVE LOGGED: 265yd</span>
          </div>
        </div>
      );

    case 'powakaddy':
      return (
        <div className="w-full h-full bg-[#030712] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Top Status */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
              <Wifi size={10} className="text-rose-400 animate-pulse" />
              <span>BLE TROLLEY STALLION</span>
            </div>
            <span className="text-slate-500 font-bold">POWAKADDY RX SERIES</span>
          </div>

          {/* Middle Bezel HUD indicating speed and connection */}
          <div className="z-10 flex justify-between items-center my-auto">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-1 relative shadow-inner">
                <span className="text-[7px] text-rose-500 font-mono uppercase">SPEED</span>
                <span className="text-md font-bold text-slate-100 font-mono leading-none mt-0.5">G6</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-300 font-mono font-bold">Electric Motor Throttle</span>
                <span className="text-[8px] text-rose-400/80 font-mono">Pair state: continuous sync ok</span>
              </div>
            </div>

            {/* Smart battery stats widget */}
            <div className="flex flex-col text-right font-mono">
              <span className="text-[8px] text-slate-500 uppercase">Battery Cycle</span>
              <span className="text-xs font-bold text-emerald-400">89% Cap</span>
            </div>
          </div>

          {/* OTA Firmware simulator slider bar */}
          <div className="z-10 font-mono text-[9px] bg-slate-950/70 p-2 rounded-xl border border-slate-900">
            <div className="flex justify-between text-slate-500 text-[8px] mb-1">
              <span>OTA FIRMWARE LOADER</span>
              <span className="text-emerald-400 font-black">100% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="w-full bg-gradient-to-r from-rose-500 to-emerald-500 h-full rounded-full" />
            </div>
          </div>
        </div>
      );

    case 'whichbar':
      return (
        <div className="w-full h-full bg-[#05050f] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Cybernetic Grid elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50" x2="500" y2="50" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="0" y1="130" x2="500" y2="130" stroke="#8b5cf6" strokeWidth="1" />
          </svg>

          {/* Heat map glow effects */}
          <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-pink-500/15 rounded-full blur-xl animate-pulse" />

          {/* Top Status */}
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/25 font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-505 bg-indigo-500"></span>
              </span>
              <span>WEBSOCKET CONSOLE</span>
            </div>
            <span className="text-indigo-400/80 font-bold uppercase tracking-wide">Crowd Discovery Map</span>
          </div>

          {/* Middle heatmap status */}
          <div className="z-10 flex justify-between items-center my-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-mono">PEAK CROWD DENSITY</span>
              <span className="text-2xl font-black font-display text-white tracking-normal mt-0.5">WhichBar Live</span>
              <span className="text-[8px] text-pink-400 font-mono uppercase tracking-widest mt-1">
                🔥 92% DENSITY INDEX - BUSY
              </span>
            </div>

            {/* Simulated Live Ping Graph */}
            <div className="w-20 h-10 flex items-end gap-1 font-mono justify-end">
              <div className="w-1.5 h-3 bg-indigo-500/30 rounded-xs" />
              <div className="w-1.5 h-6 bg-indigo-500/40 rounded-xs animate-bounce" />
              <div className="w-1.5 h-4 bg-indigo-500/50 rounded-xs" />
              <div className="w-1.5 h-8 bg-pink-500 rounded-xs animate-pulse" />
              <div className="w-1.5 h-5 bg-indigo-500/70 rounded-xs" />
            </div>
          </div>

          {/* Bottom telemetry with dynamic hazards indicators */}
          <div className="z-10 bg-slate-950/90 border border-slate-900 rounded-xl p-2 font-mono text-[9px] text-slate-400 flex justify-between items-center">
            <span className="text-slate-500">Duplex Socket Response:</span>
            <span className="text-emerald-400 font-bold font-mono">24ms (Ultra low delay)</span>
          </div>
        </div>
      );

    case 'barany':
      return (
        <div className="w-full h-full bg-[#070402] relative flex flex-col justify-between p-4 overflow-hidden group">
          {/* Subtle routing grid background */}
          <div className="absolute inset-0 bg-[#f97316]/5 opacity-10 pointer-events-none" />
          
          <div className="flex justify-between items-center z-10 font-mono text-[9px] w-full">
            <div className="flex items-center gap-1.5 text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
              <Utensils size={10} className="text-amber-500 animate-pulse" />
              <span>DELIVERY DISPATCH SYNC</span>
            </div>
            <span className="text-slate-500 font-bold">Jordan & India Multi-Region</span>
          </div>

          {/* Delivery pipeline nodes visual representation */}
          <div className="z-10 flex justify-between items-center my-auto px-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-mono">LIVE TRACKING</span>
              <span className="text-lg font-mono font-black text-white mt-0.5">Barany Fleet</span>
              <span className="text-[9px] text-amber-400 font-mono mt-1">ETA: 14 mins</span>
            </div>

            {/* Pipeline Step visual representation */}
            <div className="flex items-center gap-1.5 font-mono text-[8px] bg-[#0d0703] border border-[#a16207]/20 rounded-xl p-2 text-slate-400 shadow-xl">
              <span className="text-slate-500">Shop</span>
              <span className="text-amber-500">➔</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">Rider <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" /></span>
              <span className="text-slate-500">➔</span>
              <span className="text-slate-600 font-medium">Home</span>
            </div>
          </div>

          {/* Firestore order log stream */}
          <div className="z-10 bg-slate-950 border border-slate-900 rounded-xl p-2 font-mono text-[9px] text-slate-400 flex justify-between">
            <span>FIRESTORE LIVE DOCUMENT STATUS:</span>
            <span className="text-emerald-400 font-bold uppercase animate-pulse">ACCEPTED BY COURIER</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-slate-950 relative flex items-center justify-center p-4">
          <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
          <Layers size={36} className="text-slate-800 animate-pulse" />
        </div>
      );
  }
}
