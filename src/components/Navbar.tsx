import React, { useState, useEffect } from 'react';
import { Search, Terminal, Menu, X, Command, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ onOpenCommandPalette, activeSection, onNavigate }: NavbarProps) {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }

      // Navbar remains permanently visible/sticky as requested by user
      setVisible(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      // element.scrollIntoView({ behavior: 'smooth' });
      onNavigate(id); // Call the onNavigate prop to update the active section in App.tsx
    }
  };

  return (
    <>
      {/* Absolute Scroll Progress top-bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 z-[9999] origin-left"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        id="navbar-scroll-progress"
      />

      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'tween', stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-[1000] transition-colors duration-300 ${
              scrollY > 20
                ? 'bg-slate-950/70 border-b border-slate-900/80 backdrop-blur-md shadow-lg shadow-black/20'
                : 'bg-transparent'
            }`}
            id="navbar-wrapper"
          >
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              
              {/* Brand Logo */}
              <div 
                className="flex items-center gap-2 cursor-none group select-none" 
                onClick={() => scrollToSection('hero')}
                id="navbar-brand-logo"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center border border-white/10 shadow-inner overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay group-hover:scale-110 transition-transform" />
                  <span className="text-white font-display font-black text-sm select-none tracking-wider font-mono">GM</span>
                </div>
                <div className="hidden md:block">
                  <span className="text-xs text-slate-500 block font-mono font-bold leading-none select-none tracking-tight">ENGINEER</span>
                  <span className="font-display font-bold text-slate-100 tracking-wide text-xs select-none">GAURAB_M.</span>
                </div>
              </div>

              {/* Central Nav Links (Desktop) */}
              <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1 rounded-full border border-slate-800/60" id="navbar-links-group">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-4 py-1.5 rounded-full text-xs font-medium font-mono uppercase tracking-widest cursor-none transition-colors duration-300 flex items-center justify-center ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-100'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBackground"
                          className="absolute inset-0 bg-slate-900/90 border border-slate-800 rounded-full shadow-inner -z-10"
                          transition={{ type: 'tween', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Action utilities (Palettes, Menu) */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                
                {/* Command palette search bar button */}
                <button
                  onClick={onOpenCommandPalette}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all flex items-center gap-2 cursor-none text-xs font-mono select-none"
                  title="Open Search Console"
                >
                  <Search size={16} className="text-cyan-400" />
                  <span className="hidden sm:inline">Search</span>
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[8px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 border border-slate-800">
                    <Command size={7} />K
                  </kbd>
                </button>

                {/* Mobile hamburger menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-none"
                >
                  <div className="w-4 h-4 flex flex-col justify-center items-center gap-[4px] relative">
                    {/* Top bar */}
                    <motion.span
                      animate={isMobileMenuOpen
                        ? { rotate: 45, y: 6, width: '100%' }
                        : { rotate: 0, y: 0, width: '100%' }
                      }
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="block h-[1.5px] w-full bg-current rounded-full origin-center"
                    />
                    {/* Middle bar */}
                    <motion.span
                      animate={isMobileMenuOpen
                        ? { opacity: 0, scaleX: 0 }
                        : { opacity: 1, scaleX: 1 }
                      }
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="block h-[1.5px] w-full bg-current rounded-full"
                    />
                    {/* Bottom bar */}
                    <motion.span
                      animate={isMobileMenuOpen
                        ? { rotate: -45, y: -6, width: '100%' }
                        : { rotate: 0, y: 0, width: '100%' }
                      }
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="block h-[1.5px] w-full bg-current rounded-full origin-center"
                    />
                  </div>
                </button>
              </div>

            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Overlay dropdown) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-[999] p-4 bg-slate-950/95 border-b border-slate-900 backdrop-blur-xl md:hidden font-mono flex flex-col gap-4 shadow-2xl"
            id="navbar-mobile-drawer"
          >
            {/* List links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all cursor-none flex items-center justify-between text-sm ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-950/20 to-purple-950/20 text-cyan-400 border border-cyan-500/10'
                        : 'text-slate-300 hover:bg-slate-900/40 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow shadow-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
