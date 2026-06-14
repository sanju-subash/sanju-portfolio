"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Infinity as InfinityIcon, Menu, X, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Video source links
const MAINFRAME_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
const EQUILIBRIUM_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

// Custom typewriter hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    
    const delayTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayed((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function ShowcasePage() {
  const [mode, setMode] = useState<"mainframe" | "equilibrium">("mainframe");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);

  // Typewriter logic for Mainframe mode
  const mainframeText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed: typewriterText, done: typewriterDone } = useTypewriter(mainframeText, 38, 600);

  // Video controller refs for mouse scrub seeking (Mainframe mode)
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const prevXRef = useRef<number | null>(null);

  // Trigger pills entry delay (400ms after load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, [mode]);

  // Mouse scrub seek queuing
  useEffect(() => {
    if (mode !== "mainframe") return;

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      // time offset: (delta / width) * sensitivity * duration
      const timeOffset = (delta / window.innerWidth) * 0.8 * video.duration;
      let nextTime = video.currentTime + timeOffset;

      // Clamp target time between 0 and duration
      if (nextTime < 0) nextTime = 0;
      if (nextTime > video.duration) nextTime = video.duration;

      targetTimeRef.current = nextTime;
      triggerSeek();
    };

    const triggerSeek = () => {
      const video = videoRef.current;
      if (!video || isSeekingRef.current) return;

      // Only seek if there's a meaningful delta
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      triggerSeek(); // seek to the latest accumulated target
    };

    window.addEventListener("mousemove", handleMouseMove);
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.addEventListener("seeked", handleSeeked);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (videoEl) {
        videoEl.removeEventListener("seeked", handleSeeked);
      }
    };
  }, [mode]);

  // Handle email copy click
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@mainframe.co");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Nav items array for Equilibrium mode
  const equilibriumNavLinks = [
    { label: "Home", active: true },
    { label: "Wellness", dropdown: true },
    { label: "Routine" },
    { label: "Our Team" },
  ];

  return (
    <div 
      className="relative w-full h-screen overflow-hidden text-black transition-all"
      style={{
        fontFamily: mode === "mainframe" ? "var(--font-body)" : "'Geist', -apple-system, sans-serif",
      }}
    >
      {/* 1. Dynamic background videos */}
      {mode === "mainframe" ? (
        <video
          ref={videoRef}
          src={MAINFRAME_VIDEO}
          muted
          playsInline
          preload="auto"
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ objectPosition: "70% center" }}
        />
      ) : (
        <video
          src={EQUILIBRIUM_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* Subtle shading overlay to increase contrast */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/10 z-0 pointer-events-none" />

      {/* 2. Top Navigation Bar (z-index 10) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-md">
        
        {/* Logo Element */}
        {mode === "mainframe" ? (
          <div className="flex items-center gap-3 select-none">
            <span 
              className="text-[21px] sm:text-[26px] tracking-tight font-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Mainframe&reg;
            </span>
            <span className="text-[25px] sm:text-[30px] font-light tracking-tighter leading-none">&#10059;&#65128;</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white font-medium text-base">
            <InfinityIcon size={22} strokeWidth={1.5} />
            <span className="tracking-wide text-white uppercase font-bold text-xs">Equilibrium</span>
          </div>
        )}

        {/* Desktop Central Navigation Links */}
        {mode === "mainframe" ? (
          <nav className="hidden md:flex items-center text-[23px] font-medium tracking-tight">
            <a href="#" className="hover:opacity-60 transition-opacity">Labs</a>
            <span className="text-black/30 mx-1 select-none">, </span>
            <a href="#" className="hover:opacity-60 transition-opacity">Studio</a>
            <span className="text-black/30 mx-1 select-none">, </span>
            <a href="#" className="hover:opacity-60 transition-opacity">Openings</a>
            <span className="text-black/30 mx-1 select-none">, </span>
            <a href="#" className="hover:opacity-60 transition-opacity">Shop</a>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-1.5 rounded-xl px-2 py-2 liquid-glass">
            {equilibriumNavLinks.map((link, idx) => (
              <button
                key={idx}
                className={`flex items-center gap-0.5 px-3.5 py-1.5 rounded-md text-xs font-bold uppercase transition-colors cursor-none ${
                  link.active
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown size={13} className="mt-px" />}
              </button>
            ))}
          </nav>
        )}

        {/* Desktop Action & Mode Selector Button Group */}
        <div className="flex items-center gap-4">
          {/* Aesthetic Toggle Selector */}
          <button
            onClick={() => {
              setMode(mode === "mainframe" ? "equilibrium" : "mainframe");
              setMenuOpen(false);
            }}
            className="px-3 py-1.5 rounded-full border border-black/15 bg-white/80 hover:bg-black hover:text-white text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-sm cursor-none flex items-center gap-1.5 z-50 text-black"
          >
            <span>MODE:</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
              {mode === "mainframe" ? "MAINFRAME ✳︎" : "EQUILIBRIUM ♾️"}
            </span>
          </button>

          {/* Right Action CTA */}
          {mode === "mainframe" ? (
            <a 
              href="mailto:hello@mainframe.co"
              className="hidden md:block text-[23px] font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
            >
              Get in touch
            </a>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button className="liquid-glass text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors cursor-none">
                Log in
              </button>
              <button className="bg-white text-black text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-none">
                Begin Now
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg z-50 cursor-none ${
              mode === "mainframe" 
                ? "flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
                : "liquid-glass text-white p-2 rounded-lg"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mode === "mainframe" ? (
              <>
                <div 
                  className={`w-6 h-[2px] bg-black transition-transform duration-300 ${
                    menuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`} 
                />
                <div 
                  className={`w-6 h-[2px] bg-black transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`} 
                />
                <div 
                  className={`w-6 h-[2px] bg-black transition-transform duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`} 
                />
              </>
            ) : (
              menuOpen ? <X size={18} /> : <Menu size={18} />
            )}
          </button>
        </div>
      </header>

      {/* 3. Mobile Menu Overlay (z-index 40) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8 gap-8 ${
              mode === "mainframe"
                ? "bg-white/95 backdrop-blur-sm text-black"
                : "top-[72px] left-4 right-4 bottom-auto liquid-glass rounded-2xl p-6"
            }`}
          >
            {mode === "mainframe" ? (
              <>
                <div className="flex flex-col gap-6 text-[32px] font-medium tracking-tight mt-10">
                  <a href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Labs</a>
                  <a href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Studio</a>
                  <a href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Openings</a>
                  <a href="#" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition-opacity">Shop</a>
                  <a 
                    href="mailto:hello@mainframe.co" 
                    onClick={() => setMenuOpen(false)}
                    className="underline underline-offset-4 hover:opacity-60 transition-opacity"
                  >
                    Get in touch
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4 text-white">
                  {equilibriumNavLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
                    >
                      <span>{link.label}</span>
                      {link.dropdown && <ChevronDown size={14} />}
                    </a>
                  ))}
                  <div className="flex gap-2 mt-2 pt-4 border-t border-white/10">
                    <button className="flex-1 liquid-glass text-white text-xs font-bold uppercase py-3 rounded-full hover:bg-white/5 transition-colors cursor-none">
                      Log in
                    </button>
                    <button className="flex-1 bg-white text-black text-xs font-bold uppercase py-3 rounded-full hover:bg-white/90 transition-colors cursor-none">
                      Begin Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Hero Content Section (z-index 20) */}
      <main className="absolute inset-0 flex flex-col justify-end md:justify-center px-5 sm:px-8 md:px-10 pb-12 md:pb-0 z-20 pointer-events-none">
        <div className="max-w-xl relative z-10 space-y-5 sm:space-y-6">
          
          {mode === "mainframe" ? (
            <>
              {/* --- MAINFRAME MODE CONTENT --- */}
              {/* Blurred Intro Label */}
              <div 
                className="select-none pointer-events-none tracking-tight leading-snug font-normal filter blur-[2px] opacity-80"
                style={{ fontSize: "clamp(18px, 4vw, 26px)" }}
              >
                Hey there, meet A.R.I.A,<br />
                Mainframe's Adaptive Response Interface Agent
              </div>

              {/* Typewriter text console block */}
              <div 
                className="font-normal leading-snug min-height-[65px]"
                style={{ fontSize: "clamp(18px, 4vw, 26px)" }}
              >
                <span>&ldquo;{typewriterText}&rdquo;</span>
                {!typewriterDone && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-pulse" />
                )}
              </div>

              {/* Action pill buttons container */}
              <div 
                className={`flex flex-wrap gap-y-1.5 transition-all duration-500 pointer-events-auto ${
                  pillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {/* 4 White pill buttons */}
                <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4.5 py-1.5 mr-2 mb-2 font-medium tracking-tight whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-none shadow-sm">
                  Pitch us an idea
                </button>
                <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4.5 py-1.5 mr-2 mb-2 font-medium tracking-tight whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-none shadow-sm">
                  Come work here
                </button>
                <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4.5 py-1.5 mr-2 mb-2 font-medium tracking-tight whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-none shadow-sm">
                  Send a brief hello
                </button>
                <button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4.5 py-1.5 mr-2 mb-2 font-medium tracking-tight whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-none shadow-sm">
                  See how we operate
                </button>

                {/* 1 Outline copy pill button */}
                <button 
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center bg-transparent text-white border border-white rounded-full text-[13px] sm:text-[15px] px-4.5 py-1.5 mr-2 mb-2 font-medium tracking-tight gap-2.5 sm:gap-3 whitespace-nowrap hover:bg-white hover:text-black transition-all duration-200 cursor-none shadow-sm group"
                >
                  <span>Reach us: <span className="underline underline-offset-2 decoration-white group-hover:decoration-black">hello@mainframe.co</span></span>
                  {copied ? (
                    <Check size={12} className="text-emerald-400 shrink-0" />
                  ) : (
                    <Copy size={12} className="shrink-0 text-white/70 group-hover:text-black/70" />
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* --- EQUILIBRIUM MODE CONTENT --- */}
              <div className="space-y-6">
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-none tracking-tight">
                  Live Better, Feel Whole Every Day.
                </h1>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md">
                  Take charge of how you feel with a companion built for your journey—build routines, follow your growth, and unlock tailored insights for a steadier, more vibrant life each day.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
                  <button className="bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-white/90 transition-colors cursor-none shadow-md">
                    Start Today
                  </button>
                  <button className="liquid-glass text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-white/5 transition-colors cursor-none">
                    Discover How
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </main>

      {/* 5. Custom Cursor and Footer guidelines */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:block text-[9px] font-mono text-zinc-500 bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 rounded-md px-2.5 py-1 select-none pointer-events-none">
        {mode === "mainframe" ? "MOUSE SCRUB X TO SEEK VIDEO" : "AMBIENT PLAYBACK ACTIVE"}
      </div>
    </div>
  );
}
