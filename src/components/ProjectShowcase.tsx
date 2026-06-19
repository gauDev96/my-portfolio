import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { Smartphone, ExternalLink, Cpu, AppWindow, ArrowRight, ArrowLeft, Layers, ShieldCheck } from 'lucide-react';
import ProjectVisualHeader from './ProjectVisualHeader';

interface AppAsset {
  icon: string;
  screenshot: string;
  screenshots: string[];
}

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Golf & IoT' | 'Social & Map Integration' | 'Full-Stack & Utilities'>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [storeAssets, setStoreAssets] = useState<Record<string, AppAsset>>({});
  const [loadingAssets, setLoadingAssets] = useState(true);

  useEffect(() => {
    const fetchStoreAssets = async () => {
      try {
        const ids = projectsData.map(p => p.appleId).filter(Boolean).join(',');
        const response = await fetch(`https://itunes.apple.com/lookup?id=${ids}`);
        if (!response.ok) throw new Error('Failed to resolve App Store references');
        const data = await response.json();
        
        if (data && data.results) {
          const assetsMap: Record<string, AppAsset> = {};
          data.results.forEach((item: any) => {
            const trackId = String(item.trackId);
            const icon = item.artworkUrl512 || item.artworkUrl100 || '';
            const screenshots = item.screenshotUrls || [];
            const screenshot = screenshots[0] || '';
            assetsMap[trackId] = {
              icon,
              screenshot,
              screenshots
            };
          });
          setStoreAssets(assetsMap);
        }
      } catch (err) {
        console.warn("Dynamic App Store mapping deferred to visual placeholders:", err);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchStoreAssets();
  }, []);

  // Filter projects by active tab
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const categories: { id: 'all' | 'Golf & IoT' | 'Social & Map Integration' | 'Full-Stack & Utilities', label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'Golf & IoT', label: 'Golf & IoT Hardware' },
    { id: 'Social & Map Integration', label: 'Social Map & WebSockets' },
    { id: 'Full-Stack & Utilities', label: 'Full-Stack Solutions' }
  ];

  // Manual scroll triggers for Apple-style track
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmt = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmt : scrollAmt,
        behavior: 'smooth'
      });
    }
  };

  // Predefined vivid gradient indices for beautiful neon glass card designs
  const backgroundGradients = [
    'from-blue-600/20 to-cyan-500/10 border-blue-500/20',
    'from-emerald-600/20 to-teal-500/10 border-emerald-500/20',
    'from-purple-600/20 to-pink-500/10 border-purple-500/20',
    'from-amber-600/20 to-red-500/10 border-amber-500/20',
    'from-cyan-600/20 to-indigo-500/10 border-cyan-500/20',
    'from-indigo-600/20 to-purple-500/10 border-indigo-500/20',
    'from-red-600/20 to-orange-500/10 border-red-500/20',
    'from-teal-600/20 to-cyan-500/10 border-teal-500/20'
  ];

  return (
    <section className="py-24 relative select-none" id="projects">
      {/* Decorative ambient elements */}
      <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-600/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6" id="projects-heading">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="w-8 h-[2px] bg-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">PRODUCTION WORK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight text-center md:text-left">
              App Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Deployments.</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm font-mono max-w-xl text-center md:text-left leading-relaxed">
              Explore 8+ live hardware-paired, GPS-synced mobile companion utilities launched dynamically onto Apple and Google frameworks.
            </p>
          </div>

          {/* Directional navigation slide buttons */}
          <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-900 border-b-2" id="slider-arrows">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-none border border-slate-800"
              title="Scroll Left"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-none border border-slate-800"
              title="Scroll Right"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-12 justify-center md:justify-start" id="projects-tab-selector">
          {categories.map((tab) => {
            const isTabActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-300 border cursor-none ${
                  isTabActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white glow-blue'
                    : 'bg-transparent border-slate-800/80 text-slate-400 hover:text-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal sliding track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none select-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          id="projects-sliding-track"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const bgGradient = backgroundGradients[idx % backgroundGradients.length];

              // Custom placeholder images linked with seeds that resemble golf / mobile apps
              const imagePlaceholder = `https://picsum.photos/seed/${proj.id}/500/320?blur=2`;

              // Resolve loaded App Store assets dynamically
              const assets = proj.appleId ? storeAssets[proj.appleId] : null;
              const appIcon = assets?.icon;
              const appScreenshot = assets?.screenshot;

              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 180 }}
                  className="w-[calc(100vw-2rem)] sm:w-[420px] shrink-0 snap-start bg-[#0b0f19]/70 rounded-2xl border border-slate-800 overflow-hidden glass-card flex flex-col justify-between"
                  id={`project-slide-${proj.id}`}
                >
                  
                  {/* Card Visual Header (Mockup) */}
                  <a
                    href={proj.appStoreLink || proj.playStoreLink || "#"}
                    target={proj.appStoreLink || proj.playStoreLink ? "_blank" : undefined}
                    rel="noreferrer"
                    className="relative h-56 w-full bg-[#030712] overflow-hidden border-b border-slate-900/80 group/img flex items-center justify-center block cursor-none"
                    id={`project-visual-link-${proj.id}`}
                  >
                    {/* Render custom styled telemetry design header natively! */}
                    <ProjectVisualHeader id={proj.id} />

                    {/* Left category tag overlay */}
                    <div className="absolute top-4 left-4 z-20 bg-slate-950/80 border border-slate-800/80 rounded-md py-1 px-2 text-[8px] font-mono font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider backdrop-blur-sm shadow-md">
                      <Smartphone size={10} />
                      <span>{proj.category}</span>
                    </div>

                    {/* Featured label overlay */}
                    {proj.featured && (
                      <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-slate-100 font-mono text-[8px] font-semibold tracking-widest px-2 py-1 rounded border border-blue-500/30 uppercase backdrop-blur-md shadow-md">
                        FEATURED DEPLOY
                      </div>
                    )}
                  </a>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col gap-4">
                    
                    {/* Headings with synced circular/rounded app icon */}
                    <a
                      href={proj.appStoreLink || proj.playStoreLink || "#"}
                      target={proj.appStoreLink || proj.playStoreLink ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex gap-3.5 items-start cursor-none group"
                      id={`project-header-link-${proj.id}`}
                    >
                      {appIcon ? (
                        <div className="relative shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={appIcon}
                            alt={`${proj.title} app icon`}
                            className="w-12 h-12 rounded-xl border border-slate-800 bg-slate-950 shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl border border-dashed border-slate-800/60 bg-slate-900/30 flex items-center justify-center text-slate-600 shrink-0">
                          <AppWindow size={20} />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-md sm:text-lg font-display font-black text-white group-hover:text-cyan-300 tracking-wide line-clamp-1 transition-colors">
                          {proj.title}
                        </h3>
                        {proj.metrics && (
                          <p className="text-[10px] text-cyan-400 font-mono mt-0.5 uppercase tracking-wider flex items-center gap-1 font-semibold">
                            <Cpu size={10} className="text-cyan-400 shrink-0" /> {proj.metrics}
                          </p>
                        )}
                        {appIcon && (
                          <span className="text-[8px] text-emerald-400 font-mono mt-0.5 tracking-widest flex items-center gap-1 font-bold uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" /> Store Assets Synced
                          </span>
                        )}
                      </div>
                    </a>

                    {/* Description Paragraph */}
                    <p className="text-slate-400 font-mono text-xs leading-relaxed line-clamp-3">
                      {proj.longDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5 bg-slate-900 border border-slate-800/60 rounded text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 4 && (
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 text-slate-600 rounded">
                          +{proj.tags.length - 4} more
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Footer Buttons */}
                  <div className="p-6 border-t border-slate-900 bg-slate-950/40 flex items-center gap-3">
                    {proj.appStoreLink && (
                      <a
                        href={proj.appStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-slate-800 hover:text-white transition-all cursor-none"
                        id={`btn-appstore-${proj.id}`}
                      >
                        <ExternalLink size={11} className="text-cyan-400" />
                        <span>APP STORE</span>
                      </a>
                    )}
                    {proj.playStoreLink && (
                      <a
                        href={proj.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-[10px] font-mono uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-slate-800 hover:text-white transition-all cursor-none"
                        id={`btn-playstore-${proj.id}`}
                      >
                        <ExternalLink size={11} className="text-purple-400" />
                        <span>PLAY STORE</span>
                      </a>
                    )}
                    {!proj.appStoreLink && !proj.playStoreLink && (
                      <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                        ⚙️ CORRESPONDING CLIENT RELEASED
                      </span>
                    )}
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footnote statistics */}
        <div className="text-center mt-12 bg-slate-950/35 border border-slate-900/60 p-4 rounded-xl max-w-lg mx-auto font-mono text-[10px] text-slate-500" id="projects-stat-bar">
          💡 PRO TIP: Contact Gaurab to run custom diagnostics, Bluetooth simulation logs, or to inspect raw hardware pairing files.
        </div>

      </div>
    </section>
  );
}
