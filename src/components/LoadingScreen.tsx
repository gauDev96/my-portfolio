import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface LoadingScreenProps {
  key?: string;
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const steps = [
    { text: 'Initializing Portfolio Console...', duration: 600, log: 'ENV: Dev-Build 4.1.1' },
    { text: 'Loading Gaurab Mukherjee\'s CV...', duration: 800, log: 'READING: Experience, Skills, Certifications' },
    { text: 'Optimizing Mobile Hardware Interfaces...', duration: 500, log: 'LINKING: BLE, GPS, OTA Core modules' },
    { text: 'Connecting IoT Device Handshakes...', duration: 700, log: 'STATUS: BLE 5.0 Stack loaded successfully' },
    { text: 'Initializing Glassmorphic Render Engine...', duration: 500, log: 'ENGINE: WebGL, Framer Motion initialized' },
    { text: 'Starting Premium Experience...', duration: 400, log: 'SYSTEM: Ready for deployment. 95% on-time KPI' },
  ];

  useEffect(() => {
    let logIndex = 0;
    
    // Add first initial log immediately
    setLogs(['[SYSTEM] Initializing core environment...']);

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        
        // Random incremental progress
        const increment = Math.floor(Math.random() * 8) + 3;
        const nextProgress = Math.min(prevProgress + increment, 100);

        // Step transition based on progress percentage
        const expectedStep = Math.min(
          Math.floor((nextProgress / 100) * steps.length),
          steps.length - 1
        );

        if (expectedStep !== currentStep) {
          setCurrentStep(expectedStep);
          setLogs(prev => [
            ...prev,
            `[IO/OK] ${steps[expectedStep].text}`,
            `[DEBUG] ${steps[expectedStep].log}`
          ]);
        }

        return nextProgress;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  // Generate ASCII installation bar helper
  const renderAsciiBar = (pct: number) => {
    const totalBars = 20;
    const filledBars = Math.floor((pct / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return '[' + '█'.repeat(filledBars) + '░'.repeat(emptyBars) + '] ' + pct + '%';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 bg-[#030712] text-emerald-400 font-mono flex flex-col items-center justify-center p-6 z-[9999] scanlines select-none"
      id="loading-screen"
    >
      <div className="max-w-2xl w-full flex flex-col gap-8">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-950 pb-3" id="loading-terminal-header">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="text-xs text-slate-500 ml-2">gaurab@webskitters-tech-solutions: ~</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Terminal size={12} className="text-emerald-500" />
            <span>PORT 3000 DEV_SYS</span>
          </div>
        </div>

        {/* Console outputs */}
        <div className="min-h-[200px] flex flex-col gap-1 text-xs md:text-sm text-emerald-400/95" id="loading-terminal-logs">
          <div className="text-slate-500 mb-2">// CORE INSTALLATION PROTOCOLS</div>
          
          <div className="flex items-center gap-2 text-emerald-300">
            <Cpu size={14} className="animate-spin text-emerald-400" />
            <span>LOAD PROTOCOL ACTIVE: GAURAB_MUKHERJEE_CV</span>
          </div>
          
          {logs.slice(-6).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={log.startsWith('[SYSTEM]') ? 'text-blue-400' : log.split(' ').includes('STATUS:') ? 'text-cyan-400' : 'text-slate-400'}
            >
              {log}
            </motion.div>
          ))}
        </div>

        {/* Dynamic ASCII install Progress Bar */}
        <div className="mb-4 flex flex-col gap-2" id="loading-terminal-progress-section">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider">
            <span>COMPILING PORTFOLIO RESOURCES</span>
            <span className="text-emerald-300">{progress}%</span>
          </div>
          <div className="text-sm md:text-base text-emerald-400 font-bold whitespace-pre overflow-hidden bg-emerald-950/20 p-3 rounded border border-emerald-900/30">
            {renderAsciiBar(progress)}
          </div>
        </div>

        {/* Step tracker indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] sm:text-xs text-slate-500" id="loading-step-grid">
          {steps.map((st, i) => {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;
            return (
              <div
                key={i}
                className={`flex items-center gap-1.5 p-2 rounded border transition-colors duration-300 ${
                  isActive
                    ? 'border-emerald-500/30 bg-emerald-950/10 text-emerald-300'
                    : isCompleted
                    ? 'border-slate-800/20 text-emerald-500/60'
                    : 'border-transparent text-slate-700'
                }`}
              >
                {isCompleted ? (
                  <Check size={10} className="text-emerald-500" />
                ) : isActive ? (
                  <Sparkles size={10} className="animate-pulse text-emerald-400" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                )}
                <span className="truncate">{st.text.slice(0, 20)}...</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
