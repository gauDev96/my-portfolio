import React, { useState } from 'react';
import { motion } from 'motion/react';
import { experienceData } from '../data';
import { Award, Briefcase, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

export default function ExperienceTimeline() {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  return (
    <section className="py-24 relative select-none" id="experience">
      {/* Decorative blobs */}
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-600/5 to-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-16 text-center" id="experience-heading">
          <div className="flex items-center gap-2 justify-center mb-2">
            <span className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">CAREER ARCHITECTURE</span>
            <span className="w-8 h-[2px] bg-cyan-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
            Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Timeline.</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto font-mono text-xs leading-relaxed">
            Trace my progressive ascending curve at Webskitters, tracking major accomplishments and tech architecture transformations.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative border-l-2 border-slate-900 ml-4 md:ml-32 py-4" id="experience-vertical-tree">
          
          {/* Animated scrolling light path indicator */}
          <div className="absolute top-0 bottom-0 left-[-2px] w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 origin-top" />

          {experienceData.map((exp, index) => {
            const isLatest = index === 0;
            const isHovered = activeItem === index;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 pb-16 last:pb-4 group"
              >
                {/* Glowing Node on Timeline */}
                <span className="absolute left-[-9px] top-1.5 flex h-4 id-timeline w-4 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isLatest ? 'bg-cyan-400' : 'bg-slate-700'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    isLatest ? 'bg-cyan-400' : 'bg-slate-800 border border-slate-700'
                  }`} />
                </span>

                {/* Left Side Floating Date Indicator (Desktop) */}
                <div className="hidden md:block absolute left-[-162px] top-1.5 w-32 text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400 block tracking-wide">
                    {exp.period.split(' – ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    {exp.period.split(' – ')[1] || 'Current'}
                  </span>
                </div>

                {/* Main Content card */}
                <div
                  onMouseEnter={() => setActiveItem(index)}
                  className={`rounded-2xl border bg-slate-950/30 p-6 backdrop-blur-md transition-all duration-300 relative ${
                    isLatest 
                      ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/5 bg-slate-950/50' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                  id={`timeline-card-${index}`}
                >
                  
                  {/* Highlight Flag for Latest Role */}
                  {isLatest && (
                    <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md shadow-cyan-500/10">
                      <Star size={10} className="fill-current" />
                      <span>PRESENT RANK</span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-[10px] text-slate-500 font-bold block md:hidden font-mono">
                      {exp.period}
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-black text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-400 font-mono">
                      <span className="text-slate-300 font-bold flex items-center gap-1">
                        <Briefcase size={12} className="text-purple-400" />
                        {exp.company}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-blue-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-3 pl-1 text-[11px] md:text-xs text-slate-400 font-mono" id={`responsibilities-list-${index}`}>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex gap-2.5 items-start leading-relaxed">
                        <span className={`text-[11px] shrink-0 ${isLatest ? 'text-cyan-400' : 'text-slate-600'}`}>
                          0{rIdx + 1}
                        </span>
                        <p className="text-slate-300 select-all group-hover:text-slate-200 transition-colors">
                          {resp}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* System metadata label */}
                  <div className="flex items-center justify-between border-t border-slate-900/60 pt-4 mt-6 text-[10px] text-slate-600 font-mono">
                    <span>ROLE KEY: WEBSKITTERS-ACTIVE#{3 - index}</span>
                    <span className="text-cyan-500/80 uppercase">VERIFIED ACTIVE RECORD</span>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
