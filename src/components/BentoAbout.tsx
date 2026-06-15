import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { MapPin, Calendar, Award, Star, Briefcase, Compass, Languages } from 'lucide-react';

export default function BentoAbout() {
  const avatarPath = '/my_img.png';

  // Mouse Coordinate tracker for glowing bento lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Individual Tilt Components
  const TiltCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const cardMouseX = useMotionValue(0);
    const cardMouseY = useMotionValue(0);
    const [tiltX, setTiltX] = useState(0);
    const [tiltY, setTiltY] = useState(0);

    const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      
      // Calculate angles (max 8 degrees tilt)
      setTiltX((percentY - 0.5) * 6);
      setTiltY((0.5 - percentX) * 6);
      
      cardMouseX.set(x);
      cardMouseY.set(y);
    };

    const handleCardLeave = () => {
      setTiltX(0);
      setTiltY(0);
    };

    const spotLight = useMotionTemplate`radial-gradient(400px circle at ${cardMouseX}px ${cardMouseY}px, rgba(56, 189, 248, 0.1), transparent 80%)`;

    return (
      <motion.div
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className={`group relative rounded-2xl border border-slate-800 bg-slate-950/40 p-6 overflow-hidden backdrop-blur-xl hover:border-slate-700/60 transition-colors ${className}`}
      >
        {/* Spotlight dynamic hover mask */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: spotLight }}
        />
        <div className="relative z-20 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-24 relative select-none" id="about">
      {/* Decorative Blob */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="mb-12 text-center md:text-left" id="about-heading">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <span className="w-8 h-[2px] bg-cyan-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">BIOGRAPHY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
            Who is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Gaurab Mukherjee?</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl font-mono text-sm leading-relaxed">
            A developer who transforms complex ideas into highly fluid, hardware-connected production code. Underneath is a comprehensive history of craftsmanship.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-grid-wrapper">
          
          {/* Main Biography Card */}
          <TiltCard className="md:col-span-2 md:row-span-2">
            <div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-900 pb-6 mb-6">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-lg shrink-0">
                  <img
                    src={avatarPath}
                    alt="Gaurab Mukherjee Futuristic Avatar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-slate-100 flex items-center gap-2 text-center sm:text-left justify-center sm:justify-start">
                    Gaurab Mukherjee
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1 text-center sm:text-left">
                    Software Engineer @ Webskitters Technology Solutions
                  </p>
                  <p className="text-xs text-cyan-500 mt-2 font-mono flex items-center gap-1.5 justify-center sm:justify-start">
                    <MapPin size={12} /> Kolkata, West Bengal, India
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-mono">
                <p>
                  I am a results-driven <strong className="text-white">Software Engineer and React Native Developer</strong> with nearly 4 years of progressive engineering experience. Specialized in architecting and distributing cross-platform mobile systems on iOS and Android.
                </p>
                <p>
                  My developer pedigree shines in <strong className="text-cyan-400">IoT / BLE hardware integration</strong>, high-performance mobile data systems, context-aware user interfaces, and mobile deployment pipelines.
                </p>
                <p>
                  To date, I have contributed directly to compiling and launching <strong className="text-purple-400">8+ live production apps</strong> currently in use on the Apple App Store and Google Play, achieving performance speedups of up to 35% through runtime optimization.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-900 flex flex-wrap gap-3 justify-center sm:justify-start">
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono">
                📱 8+ Live Apps
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono">
                ⚡ 35% Performance Tuning
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono">
                🛠️ IoT BLE expert
              </span>
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono">
                🧠 AI prompt integration
              </span>
            </div>
          </TiltCard>

          {/* Location & Time Coordinates Card */}
          <TiltCard className="md:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                <Compass size={18} className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h4 className="text-sm font-mono font-bold text-slate-200">Global Coordinates</h4>
                <p className="text-xs text-slate-500 font-mono mt-1">Based out of Eastern India</p>
              </div>

              {/* simulated compass radar vector mockup */}
              <div className="w-full h-32 rounded-xl bg-cyan-950/10 border border-cyan-900/20 flex flex-col items-center justify-center relative overflow-hidden my-2">
                <div className="absolute inset-0 bg-grid-cyber opacity-30" />
                <div className="w-24 h-24 rounded-full border border-cyan-500/20 flex items-center justify-center relative animate-pulse">
                  <div className="w-16 h-16 rounded-full border border-cyan-500/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 glow-cyan" />
                  </div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
                <div className="absolute bottom-2 text-[9px] font-mono text-cyan-500/80">
                  LOC: 22.5726° N, 88.3639° E
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono leading-normal">
                Serving digital products worldwide with solid async task loops and fluid team integration.
              </div>
            </div>
          </TiltCard>

          {/* Certifications Card */}
          <TiltCard className="md:col-span-1">
            <div className="flex flex-col gap-4 h-full justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-center text-amber-500 mb-4">
                  <Award size={18} />
                </div>
                <span className="text-[10px] font-mono font-semibold text-amber-500 uppercase tracking-widest block">CREENTIALS</span>
                <h4 className="text-sm font-mono font-bold text-slate-200 mt-1">Certified in React.js</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">WebSkitters Academy (2022–2023)</p>
                
                <p className="text-xs text-slate-500 font-mono mt-4 leading-relaxed">
                  Rigorous academy certification coupled with continuous hands-on deployment across Web, BLE pairing, and client REST pipelines.
                </p>
              </div>

              <div className="border-t border-slate-900/60 pt-4 flex items-center gap-2 mt-4">
                <Star size={12} className="text-amber-400 animate-pulse shrink-0" />
                <span className="text-[10px] text-slate-400 font-mono">Verified developer grade certified</span>
              </div>
            </div>
          </TiltCard>

          {/* Languages & Multi-Culture */}
          <TiltCard className="md:col-span-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-950/20 border border-blue-800/40 flex items-center justify-center text-blue-400 shrink-0">
                  <Languages size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-widest block">COMMUNICATION</span>
                  <h4 className="text-sm font-mono font-bold text-slate-200 mt-0.5">Languages Spoken</h4>
                  <p className="text-xs text-slate-500 font-mono">Bilingual proficiency parameters for global async workflows</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-xs shrink-0">
                <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 rounded-xl px-4 py-2">
                  <span className="text-slate-400">English:</span>
                  <span className="text-cyan-400 text-[11px] font-bold">PROFESSIONAL FLUENT</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 rounded-xl px-4 py-2">
                  <span className="text-slate-400">Bengali:</span>
                  <span className="text-purple-400 text-[11px] font-bold">NATIVE OR BILINGUAL</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 rounded-xl px-4 py-2">
                  <span className="text-slate-400">Hindi:</span>
                  <span className="text-blue-400 text-[11px] font-bold">PROFESSIONAL FLUENT</span>
                </div>
              </div>
            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  );
}
