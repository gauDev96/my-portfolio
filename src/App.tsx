import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal, Smartphone, Mail, Phone, MapPin,
  Linkedin, Github, ArrowUpRight, CheckCircle2,
  Sparkles, Download, MessageSquare, Code, Cpu, Flame, Command
} from 'lucide-react';

// Subcomponents import
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import BentoAbout from './components/BentoAbout';
import SkillsShowcase from './components/SkillsShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectShowcase from './components/ProjectShowcase';
import CommandPalette from './components/CommandPalette';
import { achievementsData } from './data';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showSudoBanner, setShowSudoBanner] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isFormSending, setIsFormSending] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);

  // Keyboard shortcut listener for CMD/CTRL + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeSectionRef = useRef('hero');
  const isManualScrolling = useRef(false);
  const manualScrollTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    let intersectionObserver: IntersectionObserver;
    let scrollFallbackTimer: ReturnType<typeof setTimeout>;

    const getActiveSectionByScroll = () => {
      if (isManualScrolling.current) return;
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (id !== activeSectionRef.current) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (isManualScrolling.current) return;
      clearTimeout(scrollFallbackTimer);
      scrollFallbackTimer = setTimeout(getActiveSectionByScroll, 80);
    };

    const setupObserver = () => {
      const allFound = sectionIds.every((id) => document.getElementById(id));
      if (!allFound) return false;

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (isManualScrolling.current) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id !== activeSectionRef.current) {
              activeSectionRef.current = entry.target.id;
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null,
          rootMargin: '-5% 0px -40% 0px',
          threshold: 0.1,
        }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) intersectionObserver.observe(el);
      });

      window.addEventListener('scroll', handleScroll, { passive: true });
      return true;
    };

    if (setupObserver()) {
      return () => {
        intersectionObserver?.disconnect();
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollFallbackTimer);
      };
    }

    const mutationObserver = new MutationObserver(() => {
      if (setupObserver()) mutationObserver.disconnect();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollFallbackTimer);
    };
  }, [isLoading]);

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsFormSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage,
        }),
      });

      if (!res.ok) throw new Error('Failed to send');

      setIsFormSending(false);
      setIsFormSent(true);

      setTimeout(() => {
        setIsFormSent(false);
        setFormName('');
        setFormEmail('');
        setFormMessage('');
      }, 4000);
    } catch (error) {
      console.error('Contact form error:', error);
      setIsFormSending(false);
      alert('Failed to send message. Please try again or email me directly.');
    }
  };

  const handleSudoEasterEgg = () => {
    setShowSudoBanner(true);
    setTimeout(() => {
      setShowSudoBanner(false);
    }, 6000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isManualScrolling.current = true;
      clearTimeout(manualScrollTimer.current);
      setActiveSection(id);
      activeSectionRef.current = id;
      element.scrollIntoView({ behavior: 'smooth' });
      manualScrollTimer.current = setTimeout(() => {
        isManualScrolling.current = false;
      }, 1200);
    }
  };

  // Typewriter loop titles list for terminal visual
  const typewriterTitles = [
    'Software Engineer',
    'React Native Architect',
    'IoT & BLE specialist',
    'Mobile Stack Optimizer',
    'Full Stack Developer'
  ];
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    let timer: NodeJS.Timeout;
    const currentFullText = typewriterTitles[typewriterIndex];

    const tick = () => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          if (prev.length === 0) {
            setIsDeleting(false);
            setTypewriterIndex((prevIdx) => (prevIdx + 1) % typewriterTitles.length);
            return '';
          }
          return prev.slice(0, -1);
        } else {
          if (prev === currentFullText) {
            // delay before starting deletion
            timer = setTimeout(() => setIsDeleting(true), 2000);
            return prev;
          }
          return currentFullText.slice(0, prev.length + 1);
        }
      });
    };

    const speed = isDeleting ? 40 : 80;
    if (!isDeleting && displayedText === currentFullText) {
      // already set the timeout inside callback
    } else {
      timer = setTimeout(tick, speed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typewriterIndex, isLoading]);

  return (
    <>
      {/* Background noise grid layers */}
      <div className="noise-overlay" />
      <div className="fixed inset-0 bg-grid-cyber opacity-[0.03] pointer-events-none z-0" />

      {/* Futuristic Background Moving Blobs */}
      <div className="fixed top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0" />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300"
          >
            {/* Custom Interactive Glow Cursor */}
            <CustomCursor />

            {/* Custom Navigation */}
            <Navbar
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              activeSection={activeSection}
              onNavigate={scrollToSection}
            />

            {/* Command Palette keyboard search trigger */}
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onNavigate={scrollToSection}
              onSudoEasterEgg={handleSudoEasterEgg}
            />

            {/* HIGH-TECH EASTER EGG POPUP */}
            <AnimatePresence>
              {showSudoBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4 font-mono select-none"
                  id="sudo-easter-egg"
                >
                  <div className="bg-emerald-950/90 border-2 border-emerald-500 text-emerald-400 p-6 rounded-xl shadow-2xl backdrop-blur-md glow-cyan relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />
                    <div className="flex items-start gap-4">
                      <Terminal className="text-emerald-400 animate-bounce shrink-0" size={24} />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-300">ADMINISTRATOR OVERRIDE LOGGED</h4>
                        <p className="text-[11px] text-emerald-400/90 mt-1.5 leading-relaxed">
                          $ sudo portfolio unlock --all<br />
                          [OK] Hardware components loaded.<br />
                          [OK] Real-time duplex channels online.<br />
                          🚀 Shipped by Gaurab with 35% Hermes acceleration!
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ----------------- SECTION 1: HERO CONTAINER ----------------- */}
            <section
              id="hero"
              className="min-h-screen flex items-center justify-center pt-28 pb-16 px-4 relative overflow-hidden"
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left column info */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6" id="hero-left-metrics">

                  {/* Status Indicator Pill */}
                  <div className="inline-flex items-center gap-2 p-1.5 px-3 rounded-full bg-slate-950/70 border border-slate-900 border-b-2 font-mono text-xs text-cyan-400/90 select-none">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                    <span>GAURAB_CORE_SYS_ONLINE</span>
                  </div>

                  {/* Large Typography Headings */}
                  <div className="space-y-2">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-none">
                      Deploying <br className="hidden sm:inline" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                        Interactive Apps
                      </span>
                    </h1>

                    {/* Blinking typewriter subline */}
                    <div className="h-8 flex items-center justify-center lg:justify-start">
                      <span className="text-sm sm:text-lg font-mono text-slate-400">
                        &gt; Specialized as{' '}
                        <span className="text-white font-bold blinking-cursor select-all">{displayedText}</span>
                      </span>
                    </div>
                  </div>

                  {/* Summary paragraph */}
                  <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-xl leading-relaxed">
                    Nearly 4 years pushing code bounds at Webskitters. Specialized in high-performance hardware-integrated React Native structures, BLE communication setups, and 8+ live store deployments.
                  </p>

                  {/* Action Button cluster */}
                  <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start w-full">
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-none hover:shadow-lg shadow-blue-500/20 glow-blue transition-all"
                      id="hero-cta-projects"
                    >
                      <Code size={14} />
                      <span>Browse Store Apps</span>
                    </button>

                    <button
                      onClick={() => scrollToSection('contact')}
                      className="px-6 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-none hover:text-white hover:bg-slate-900 transition-all"
                      id="hero-cta-contact"
                    >
                      <span>Request Diagnostics</span>
                      <ArrowUpRight size={14} className="text-cyan-400" />
                    </button>
                  </div>

                  {/* Command palette tip */}
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 justify-center lg:justify-start select-none">
                    <Command size={10} className="text-cyan-500/60" />
                    <span>HINT: TYPE <kbd className="bg-slate-950 border border-slate-800 px-1 py-0.5 rounded text-cyan-400 text-[9px] font-bold">sudo portfolio</kbd> INSIDE THE SEARCH PALETTE FOR SECRET LAYOUTS</span>
                  </div>

                </div>

                {/* Right column dashboard mock indicators */}
                <div className="lg:col-span-5 w-full max-w-md mx-auto" id="hero-right-visuals">
                  <div className="relative rounded-2xl border border-slate-800 bg-slate-950/45 p-6 backdrop-blur-xl flex flex-col gap-6 tracking-wide select-none">

                    {/* Floating decoration lights */}
                    <div className="absolute top-2 right-2 flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                    </div>

                    <div className="border-b border-slate-900 pb-3 font-mono text-[10px] text-slate-500">
                      // PROCESS TRACKER: MEM_METRIC_ON
                    </div>

                    {/* Numeric stats layout (Achievements completed) */}
                    <div className="grid grid-cols-2 gap-4">
                      {achievementsData.map((stat) => (
                        <div
                          key={stat.title}
                          className="bg-slate-950/50 p-4 rounded-xl border border-slate-900 flex flex-col gap-1 transition-colors hover:border-slate-800"
                        >
                          <span className="text-[10px] font-mono text-slate-500 leading-tight block">{stat.title}</span>
                          <span className="text-2xl font-display font-black text-white">{stat.value}</span>
                          <span className="text-[9px] font-mono text-slate-400 leading-none block">{stat.sub}</span>
                        </div>
                      ))}
                    </div>

                    {/* Mini code block illustration */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 font-mono text-[10px] text-slate-400 space-y-1">
                      <div className="text-blue-400">const developer = GaurabMukherjee;</div>
                      <div className="text-slate-500">/* Nearly 4 Years Progressive Evolution */</div>
                      <div>
                        developer.<span className="text-purple-400">coreFocus</span> = [<span className="text-cyan-400">"React Native", "BLE/IoT", "Fastlane"</span>];
                      </div>
                      <div>
                        developer.<span className="text-purple-400">kpis</span> = &#123; sprintRelease: <span className="text-emerald-400">"95%"</span>, appDeliveries: <span className="text-emerald-400">"8+"</span> &#125;;
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* ----------------- SECTION 2: ABOUT SECTION ----------------- */}
            <BentoAbout />

            {/* ----------------- SECTION 3: SKILLS SECTION ----------------- */}
            <SkillsShowcase />

            {/* ----------------- SECTION 4: EXPERIENCE TIMELINE ----------- */}
            <ExperienceTimeline />

            {/* ----------------- SECTION 5: PROJECTS SHOWCASE ------------- */}
            <ProjectShowcase />

            {/* ----------------- SECTION 6: CONTACT FORM SECTION ---------- */}
            <section className="py-24 relative select-none" id="contact">
              <div className="absolute left-1/3 bottom-0 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16 text-center" id="contact-heading">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span className="w-8 h-[2px] bg-blue-500" />
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-400">DIAGNOSTICS & TELEMETRY</span>
                    <span className="w-8 h-[2px] bg-blue-500" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight">
                    Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Contact.</span>
                  </h2>
                  <p className="mt-4 text-slate-400 max-w-xl mx-auto font-mono text-xs leading-relaxed">
                    Have an IoT concept, custom mobile client requirement, or looking to sponsor a senior grade full-stack specialist? Connect directly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-panel-wrapper">

                  {/* Left Column: Direct Info */}
                  <div className="lg:col-span-5 flex flex-col gap-6 lg:h-full justify-between">

                    <div className="flex flex-col gap-6">

                      {/* Email Card */}
                      <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-900 backdrop-blur-md flex items-center gap-4 group hover:border-slate-800 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-blue-950/20 border border-blue-900/30 flex items-center justify-center text-blue-400 shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="font-mono">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Direct Email</span>
                          <span className="text-xs text-slate-200 select-all font-bold">gaurab.officialyt@gmail.com</span>
                          <span className="text-[10px] text-slate-400 hover:text-cyan-400 mt-1 block font-semibold cursor-none">Copy address</span>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-900 backdrop-blur-md flex items-center gap-4 group hover:border-slate-800 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-cyan-950/20 border border-cyan-900/30 flex items-center justify-center text-cyan-400 shrink-0">
                          <Phone size={18} />
                        </div>
                        <div className="font-mono">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Telephone Coordinates</span>
                          <span className="text-xs text-slate-200 select-all font-bold">(+91) 6297610544</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">India (GMT +5:30)</span>
                        </div>
                      </div>

                      {/* Location Map Pin Card */}
                      <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-900 backdrop-blur-md flex items-center gap-4 group hover:border-slate-800 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-purple-950/20 border border-purple-900/30 flex items-center justify-center text-purple-400 shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div className="font-mono">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Base Residence</span>
                          <span className="text-xs text-slate-200 font-bold">Kolkata, West Bengal, India</span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">Willing to operate remotely</span>
                        </div>
                      </div>

                    </div>

                    {/* Social connection badges */}
                    <div className="p-6 rounded-2xl bg-slate-950/20 border border-slate-800/40 backdrop-blur-md flex flex-col gap-4 mt-6">
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest block">SOCIAL DISPATCH NETS</span>
                      <div className="flex gap-4">
                        <a
                          href="https://www.linkedin.com/in/m-gaurab/"
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-xl bg-slate-900 hover:bg-blue-600 border border-slate-800 text-slate-400 hover:text-white hover:border-transparent transition-all cursor-none"
                          title="Connect on LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                        <a
                          href="https://github.com/gauDev96?tab=repositories"
                          target="_blank"
                          rel="noreferrer"
                          className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-transparent transition-all cursor-none"
                          title="View Github repositories"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          className="p-3 rounded-xl bg-slate-900 hover:bg-cyan-600 border border-slate-800 text-slate-400 hover:text-white hover:border-transparent transition-all flex items-center gap-2 cursor-none text-xs font-mono ml-auto font-bold uppercase tracking-wider"
                          title="Download Resume PDF"
                          href="https://drive.google.com/uc?export=download&id=10sjFn4B6gsZ52z9BOjXNv5_xql3gvfgR"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Download size={14} />
                          <span>Download CV</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Right Column: Interactive Glass Message Form */}
                  <div className="lg:col-span-7" id="contact-form-panel">
                    <form
                      onSubmit={handleFormSubmit}
                      className="bg-[#0b0f19]/60 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative flex flex-col gap-6"
                    >
                      <div className="absolute top-2 right-2 flex gap-1 select-none pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      </div>

                      <div className="border-b border-slate-900 pb-3 text-xs text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare size={12} className="text-cyan-400" />
                        <span>Transmission Control Protocol form</span>
                      </div>

                      {/* Inputs Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                        <div className="flex flex-col gap-2">
                          <label className="text-slate-400 font-bold uppercase tracking-wider">Your Name *</label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. John Doe"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors cursor-none"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-slate-400 font-bold uppercase tracking-wider">Email Coordinates *</label>
                          <input
                            required
                            type="email"
                            placeholder="e.g. email@provider.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors cursor-none"
                          />
                        </div>
                      </div>

                      {/* Message Body Input */}
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">Transmission Message *</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Type your hardware concept or developer inquiry message..."
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none cursor-none"
                        />
                      </div>

                      {/* Form action submission */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-950 pt-6">
                        <div className="text-[10px] text-slate-500 font-mono text-center sm:text-left">
                          🔒 SSL Secured client channel handshakes.
                        </div>

                        <button
                          type="submit"
                          disabled={isFormSending || isFormSent}
                          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-none flex items-center justify-center gap-2 border transition-all ${isFormSent
                              ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400'
                              : 'bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800 hover:text-white hover:border-cyan-500/20'
                            }`}
                        >
                          {isFormSending ? (
                            <>
                              <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                              <span>Dispatching Message...</span>
                            </>
                          ) : isFormSent ? (
                            <>
                              <CheckCircle2 size={14} className="text-emerald-400 animate-bounce" />
                              <span>Log Transmission Ok!</span>
                            </>
                          ) : (
                            <>
                              <span>Send Request Log</span>
                              <Flame size={12} className="text-cyan-400" />
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  </div>

                </div>

              </div>
            </section>

            {/* ----------------- SECT 7: FOOTER FRAME ---------------------- */}
            <footer className="bg-slate-950 border-t border-slate-900/80 py-12 relative overflow-hidden select-none" id="footer">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono relative z-20">

                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-bold text-slate-100 uppercase tracking-widest leading-none">Gaurab Mukherjee</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    Premium Interactive Portfolio | Shipped under React Native parameters.
                  </p>
                </div>

                {/* Back to top click trigger */}
                <button
                  onClick={() => scrollToSection('hero')}
                  className="px-4 py-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-2xs cursor-none text-[10px] flex items-center gap-1.5 transition-colors"
                >
                  <span>TERMINATE SCROLL / BACK TOP</span>
                  <span className="text-cyan-400">▲</span>
                </button>

                <div className="text-[9px] text-slate-600 text-center md:text-right">
                  <span>© {new Date().getFullYear()} GAURAB_CLIENT_BUILD. ALL METRICS ACTIVE.</span>
                </div>

              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
