import React, { useState } from 'react';
import { motion } from 'motion/react';
import { skillCategories } from '../data';
import { Code, Smartphone, Layout, Database, Brain, GitBranch, ArrowRight, Sparkles } from 'lucide-react';

export default function SkillsShowcase() {
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);

  // Map icon names to Lucide icon components
  const iconMap: Record<string, any> = {
    Code,
    Smartphone,
    Layout,
    Database,
    Brain,
    GitBranch,
  };

  return (
    <section className="py-24 relative select-none" id="skills">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />
      <div className="absolute left-1/4 top-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Heading */}
        <div className="mb-16 text-center md:text-left" id="skills-heading">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <span className="w-8 h-[2px] bg-purple-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">STACK CAPABILITIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">Engineering.</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl font-mono text-sm leading-relaxed">
            A comprehensive overview of tools, environments, languages, and firmware integration systems utilized by Gaurab to build live applications.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid">
          {skillCategories.map((cat, catIdx) => {
            const IconComponent = iconMap[cat.iconName] || Code;
            const isHovered = hoveredCategoryIndex === catIdx;

            return (
              <motion.div
                key={cat.title}
                onMouseEnter={() => setHoveredCategoryIndex(catIdx)}
                onMouseLeave={() => setHoveredCategoryIndex(null)}
                className="group relative rounded-2xl border border-slate-800/80 bg-[#0b0f19]/65 hover:border-blue-500/30 p-6 overflow-hidden transition-all duration-300 backdrop-blur-xl"
              >
                {/* Spotlight glowing border card */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" 
                />

                {/* Cyber grid indicator */}
                <span className="absolute top-2 right-2 font-mono text-[80px] text-slate-900/60 leading-none select-none select-none z-0 tracking-tighter">
                  0{catIdx + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:bg-blue-950/20 shadow-inner transition-all duration-300">
                      <IconComponent size={18} className="transition-transform group-hover:rotate-12" />
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-bold text-slate-100 group-hover:text-white transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono">Competency Group</p>
                    </div>
                  </div>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-2 py-2" id={`skills-list-cat-${catIdx}`}>
                    {cat.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04 }}
                        className="text-[10px] font-mono font-semibold px-2.5 py-1 bg-slate-900/60 group-hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 rounded duration-200"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>

                  {/* Meter graph decoration */}
                  <div className="border-t border-slate-900/80 pt-4 flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-slate-500 font-mono">SYSTEM LEVEL:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span className="text-[9px] text-cyan-400 font-mono font-bold ml-1">PRODUCTION</span>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Infinite Tech Marquee at the bottom */}
        <div className="mt-16 overflow-hidden relative py-4 bg-slate-950/20 rounded-2xl border border-slate-900/40 backdrop-blur-md" id="infinite-marquee-slider">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030712] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030712] to-transparent z-10" />
          
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-slate-500 text-xs font-mono select-none">
            <span>🔹 REACT NATIVE</span>
            <span>🔹 BLUETOOTH LOW ENERGY (BLE)</span>
            <span>🔹 TYPESCRIPT</span>
            <span>🔹 NEXT.JS REVIEWS</span>
            <span>🔹 FLUTTER TRANSITION COMPARISONS</span>
            <span>🔹 FIREBASE STORAGE</span>
            <span>🔹 SOCKET.IO REAL-TIME SYSTEMS</span>
            <span>🔹 GPS COORDINATES SYNC</span>
            <span>🔹 OTA FIRMWARE CODECS</span>
            <span>🔹 NODE.JS API SERVER CONTROL</span>
            <span>🔹 COMPILE-TIME FASTLANE TRIMS</span>
            {/* Repeat for seamless loops */}
            <span>🔹 REACT NATIVE</span>
            <span>🔹 BLUETOOTH LOW ENERGY (BLE)</span>
            <span>🔹 TYPESCRIPT</span>
            <span>🔹 NEXT.JS REVIEWS</span>
            <span>🔹 FLUTTER TRANSITION COMPARISONS</span>
            <span>🔹 FIREBASE STORAGE</span>
            <span>🔹 SOCKET.IO REAL-TIME SYSTEMS</span>
            <span>🔹 GPS COORDINATES SYNC</span>
            <span>🔹 OTA FIRMWARE CODECS</span>
            <span>🔹 NODE.JS API SERVER CONTROL</span>
            <span>🔹 COMPILE-TIME FASTLANE TRIMS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
