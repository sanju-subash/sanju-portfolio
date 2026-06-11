"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

const ROTATING_TITLES = [
  "AI/ML Junior Software Engineer",
  "Software Engineer",
  "AI/ML Engineer",
  "Automation Developer",
  "Cloud & Backend Developer",
  "AI Voice Agent Builder",
  "Workflow Automation Engineer",
];

interface DataStream {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
  fontSize: number;
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Premium 3D Perspective Wave Mesh, Data Streams & Parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const streams: DataStream[] = [];
    const mouse = { x: -1000, y: -1000, active: false };
    
    // Parallax tracking
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    // Theme tracking
    let themeProgress = document.documentElement.classList.contains("dark") ? 1 : 0;
    let targetThemeProgress = themeProgress;

    const observer = new MutationObserver(() => {
      targetThemeProgress = document.documentElement.classList.contains("dark") ? 1 : 0;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const initCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.parentElement?.clientWidth || 480;
      const height = canvas.parentElement?.clientHeight || 300;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Initialize vertical AI Data Streams
      streams.length = 0;
      const streamCount = Math.floor(width / 60);
      for (let i = 0; i < streamCount; i++) {
        streams.push({
          x: Math.random() * width,
          y: Math.random() * -height,
          speed: Math.random() * 1.5 + 0.6,
          chars: Array.from({ length: 8 }, () => 
            Math.random() > 0.5 ? Math.floor(Math.random() * 2).toString() : String.fromCharCode(65 + Math.floor(Math.random() * 6))
          ),
          opacity: Math.random() * 0.35 + 0.1,
          fontSize: Math.random() * 3 + 7,
        });
      }
    };

    initCanvas();

    // Helpers
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const COLORS = {
      mesh: {
        light: { r: 9, g: 9, b: 11, a: 0.05 },
        dark: { r: 244, g: 244, b: 245, a: 0.08 }
      },
      meshNode: {
        light: { r: 9, g: 9, b: 11, a: 0.2 },
        dark: { r: 255, g: 255, b: 255, a: 0.35 }
      },
      stream: {
        light: { r: 9, g: 9, b: 11, a: 0.25 },
        dark: { r: 255, g: 255, b: 255, a: 0.45 }
      },
      glow: {
        light: { r: 9, g: 9, b: 11, a: 0.03 },
        dark: { r: 255, g: 255, b: 255, a: 0.07 }
      }
    };

    const getInterpolatedColor = (
      c: { light: { r: number; g: number; b: number; a: number }; dark: { r: number; g: number; b: number; a: number } },
      alphaScale = 1
    ) => {
      const r = Math.round(lerp(c.light.r, c.dark.r, themeProgress));
      const g = Math.round(lerp(c.light.g, c.dark.g, themeProgress));
      const b = Math.round(lerp(c.light.b, c.dark.b, themeProgress));
      const a = lerp(c.light.a, c.dark.a, themeProgress) * alphaScale;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    // 3D Grid constants
    const gridCols = 16;
    const gridRows = 10;
    const focalLength = 220;

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolations
      themeProgress += (targetThemeProgress - themeProgress) * 0.065;
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;

      const meshColor = getInterpolatedColor(COLORS.mesh);
      const nodeColor = getInterpolatedColor(COLORS.meshNode);
      const glowColor = getInterpolatedColor(COLORS.glow);

      const time = Date.now() * 0.0012;
      const centerX = width / 2;
      const centerY = height / 2 + 10;

      // 1. Draw Flowing Data Streams (Matrix Overlay in depth)
      ctx.save();
      ctx.font = "bold 9px monospace";
      for (const s of streams) {
        s.y += s.speed;
        if (s.y > height) {
          s.y = -60;
          s.x = Math.random() * width;
        }

        ctx.fillStyle = getInterpolatedColor(COLORS.stream, s.opacity);
        for (let k = 0; k < s.chars.length; k++) {
          const charY = s.y + k * 10;
          if (charY > 0 && charY < height) {
            ctx.fillText(s.chars[k], s.x, charY);
          }
        }
      }
      ctx.restore();

      // 2. Draw 3D Perspective Wave Mesh with Parallax
      const spacingX = width / (gridCols - 1) * 0.95;
      const spacingZ = 22;

      // Temporary matrix to store projected coordinates
      const projPoints: { x: number; y: number; scale: number; originY: number }[][] = [];

      for (let c = 0; c < gridCols; c++) {
        projPoints[c] = [];
        for (let r = 0; r < gridRows; r++) {
          // 3D coordinate spaces
          const x3d = (c - (gridCols - 1) / 2) * spacingX + tiltX * 25;
          const z3d = (r - (gridRows - 1) / 2) * spacingZ + tiltY * 25 + 60; // offset forward
          
          // Wave movement
          const distFromCenter = Math.hypot(c - gridCols / 2, r - gridRows / 2);
          const y3dOffset = Math.sin(time * 1.5 - distFromCenter * 0.5) * 15;

          // Mouse proximity ripples
          const mouseRelX = mouse.x - centerX;
          const mouseRelY = mouse.y - centerY;
          const distToMouse = Math.hypot(x3d - mouseRelX, z3d - 100);
          const mouseRipple = mouse.active && distToMouse < 90
            ? Math.cos(distToMouse * 0.12 - time * 4) * 8 * (1 - distToMouse / 90)
            : 0;

          const y3d = y3dOffset + mouseRipple;

          // Projection calculation
          const scale = focalLength / (focalLength + z3d);
          const projX = centerX + x3d * scale;
          const projY = centerY + (y3d - 15) * scale;

          projPoints[c][r] = { x: projX, y: projY, scale, originY: projY };
        }
      }

      // Draw Connection lines (horizontal/vertical)
      ctx.save();
      ctx.lineWidth = 0.85;

      for (let c = 0; c < gridCols; c++) {
        for (let r = 0; r < gridRows; r++) {
          const p1 = projPoints[c][r];

          // Horizontal links
          if (c < gridCols - 1) {
            const p2 = projPoints[c + 1][r];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = getInterpolatedColor(COLORS.mesh, p1.scale * 0.8);
            ctx.lineWidth = p1.scale * 0.75;
            ctx.stroke();
          }

          // Vertical links
          if (r < gridRows - 1) {
            const p2 = projPoints[c][r + 1];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = getInterpolatedColor(COLORS.mesh, p1.scale * 0.8);
            ctx.lineWidth = p1.scale * 0.75;
            ctx.stroke();
          }

          // Draw node glow details
          if (c % 2 === 0 && r % 2 === 0) {
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.scale * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = nodeColor;
            ctx.fill();

            // Light outer rings
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.scale * 6, 0, Math.PI * 2);
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;

      // Map coordinates to camera tilt (-1 to 1)
      targetTiltX = (x / rect.width) * 2 - 1;
      targetTiltY = (y / rect.height) * 2 - 1;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex items-center justify-center pt-28 overflow-hidden">
      {/* Background grid details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Subtle radial glow light indicator */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-200/20 dark:bg-zinc-800/10 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-4xl mx-auto px-6 text-center space-y-10 flex flex-col items-center">
        
        {/* Flagship Interactive Visual Particle Wave Centerpiece Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-full max-w-[480px] h-[280px] sm:h-[300px] rounded-xl border border-zinc-300/70 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-md shadow-2xl overflow-hidden"
        >
          {/* Tech HUD Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-zinc-400 dark:border-zinc-600 pointer-events-none opacity-80" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-zinc-400 dark:border-zinc-600 pointer-events-none opacity-80" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-zinc-400 dark:border-zinc-600 pointer-events-none opacity-80" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-zinc-400 dark:border-zinc-600 pointer-events-none opacity-80" />

          {/* HUD Status Bar Text details */}
          <div className="absolute top-2.5 left-7 right-7 flex items-center justify-between text-[8px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
            <span>[ AI_ENGINE_STATUS: ONLINE ]</span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              14ms LATENCY
            </span>
          </div>

          <div className="absolute bottom-2.5 left-7 right-7 flex items-center justify-between text-[8px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
            <span>[ SYS_LOAD: 2.3% ]</span>
            <span>MODEL: GEMINI-2.5-PRO</span>
          </div>

          <canvas ref={canvasRef} className="absolute inset-0 z-10" />
        </motion.div>

        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-250 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-400 font-mono"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Integrated MCA student
        </motion.div>

        {/* Name Title */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans text-zinc-950 dark:text-white"
          >
            SANJU SUBASH
          </motion.h1>

          {/* Rotating Carousel of Roles */}
          <div className="h-8 sm:h-10 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl md:text-2xl font-mono font-medium tracking-wide text-zinc-600 dark:text-zinc-400 select-none block"
              >
                {ROTATING_TITLES[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Short Hook */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-medium"
        >
          Full Stack AI Developer specializing in voice agents, serverless container deployments,
          and robust API integrations. Combining traditional backend foundations with generative AI pipelines.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection("#projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-none"
          >
            View Case Studies
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          <button
            onClick={() => scrollToSection("#contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none"
          >
            <Mail className="w-3.5 h-3.5 stroke-[1.5]" />
            Get In Touch
          </button>

          <a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none"
          >
            <Download className="w-3.5 h-3.5 stroke-[1.5]" />
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
