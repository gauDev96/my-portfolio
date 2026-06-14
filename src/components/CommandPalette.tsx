import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, Globe, Award, Sparkles, X, Smartphone, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSudoEasterEgg: () => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate, onSudoEasterEgg }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const commandItems = [
    { id: 'hero', name: 'Go to Hero Home', type: 'section', desc: 'Jump to start banner', icon: Globe },
    { id: 'about', name: 'Go to About Section', type: 'section', desc: 'Read biography and education highlights', icon: Sparkles },
    { id: 'skills', name: 'Go to Skills Catalog', type: 'section', desc: 'Detailed developer competency dashboard', icon: Award },
    { id: 'experience', name: 'Go to Experience History', type: 'section', desc: 'Nearly 4 year progressive path', icon: Terminal },
    { id: 'projects', name: 'Go to Live App Showcase', type: 'section', desc: 'Explore 8+ production app files', icon: Smartphone },
    { id: 'contact', name: 'Go to Contact Desk', type: 'section', desc: 'Send an email or message to Gaurab', icon: ArrowRight },
  ];

  const filteredItems = commandItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSudoCheck = (val: string) => {
    setQuery(val);
    if (val.trim().toLowerCase() === 'sudo portfolio') {
      onSudoEasterEgg();
      onClose();
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4" id="command-palette-modal">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-lg bg-slate-900/90 border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl relative z-10 glass-panel"
            id="command-palette-dialog"
          >
            {/* Search Input bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800" id="command-search-bar">
              <Search className="text-slate-400 shrink-0" size={18} />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-sm font-mono"
                placeholder='Type "sudo portfolio" or search a page section...'
                value={query}
                onChange={(e) => handleSudoCheck(e.target.value)}
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
                title="Close Command Palette"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content Results list */}
            <div className="max-h-[300px] overflow-y-auto p-2" id="command-palette-results">
              {filteredItems.length > 0 ? (
                <>
                  <div className="text-[10px] font-bold text-slate-500 px-3 py-1.5 uppercase letter tracking-wider font-mono">
                    Navigation Commands
                  </div>

                  <div className="flex flex-col gap-0.5">
                    {filteredItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.id);
                            onClose();
                          }}
                          className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border hover:border-blue-500/10 hover:shadow-inner text-slate-200 group transition-all font-mono"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-slate-800/80 group-hover:bg-blue-500/20 text-slate-400 group-hover:text-blue-400 transition-colors">
                              <Icon size={16} />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-100 group-hover:text-white">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-slate-500 group-hover:text-slate-400">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-600 group-hover:text-blue-400 font-mono flex items-center gap-1">
                            Go <ArrowRight size={10} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-slate-500 font-mono text-xs">
                  No matching files or commands. Try typing list names.
                </div>
              )}
            </div>

            {/* CMD Footer */}
            <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>[↑↓] Navigate</span>
                <span>[Esc] Close</span>
                <span>[Enter] Choose</span>
              </div>
              <div className="text-xs font-semibold text-cyan-500/80">
                gaurab@cli: ~
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
