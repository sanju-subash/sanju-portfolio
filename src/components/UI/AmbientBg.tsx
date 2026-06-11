"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number; // depth value for parallax (0.5 to 2.5)
  vx: number;
  vy: number;
  radius: number;
  isDust?: boolean; // dust particles do not draw lines
  opacity: number;
}

export default function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 200 };
    let scrollY = 0;

    // Theme states for interpolation
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
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Particle count scaled by screen size
      const count = width < 768 ? 40 : 80;
      particles = [];

      // Add regular connected particles
      for (let i = 0; i < count; i++) {
        const z = Math.random() * 2 + 0.5; // z-depth
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: ((Math.random() - 0.5) * 0.2) / z,
          vy: ((Math.random() - 0.5) * 0.2) / z,
          radius: (Math.random() * 1.2 + 0.4) * (z * 0.6),
          isDust: false,
          opacity: 1,
        });
      }

      // Add drifting atmospheric particle dust (faint, does not connect)
      const dustCount = width < 768 ? 25 : 55;
      for (let i = 0; i < dustCount; i++) {
        const z = Math.random() * 1.8 + 0.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: ((Math.random() - 0.5) * 0.08) / z,
          vy: ((Math.random() - 0.5) * 0.08) / z,
          radius: (Math.random() * 0.8 + 0.2) * (z * 0.5),
          isDust: true,
          opacity: Math.random() * 0.4 + 0.15,
        });
      }
    };

    initCanvas();

    // Perspective grid parameters
    let gridOffset = 0;

    // Linear interpolation helper
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    // Color structures for theme-interpolated drawing (Light Mode -> Dark Mode)
    const COLORS = {
      node: {
        light: { r: 9, g: 9, b: 11, a: 0.06 },
        dark: { r: 244, g: 244, b: 245, a: 0.11 }
      },
      line: {
        light: { r: 9, g: 9, b: 11, a: 0.025 },
        dark: { r: 244, g: 244, b: 245, a: 0.055 }
      },
      grid: {
        light: { r: 9, g: 9, b: 11, a: 0.007 },
        dark: { r: 255, g: 255, b: 255, a: 0.016 }
      },
      dust: {
        light: { r: 9, g: 9, b: 11, a: 0.04 },
        dark: { r: 255, g: 255, b: 255, a: 0.09 }
      }
    };

    const getInterpolatedColor = (
      c: { light: { r: number; g: number; b: number; a: number }; dark: { r: number; g: number; b: number; a: number } },
      customAlphaScale = 1
    ) => {
      const r = Math.round(lerp(c.light.r, c.dark.r, themeProgress));
      const g = Math.round(lerp(c.light.g, c.dark.g, themeProgress));
      const b = Math.round(lerp(c.light.b, c.dark.b, themeProgress));
      const a = lerp(c.light.a, c.dark.a, themeProgress) * customAlphaScale;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Interpolate theme progress float
      themeProgress += (targetThemeProgress - themeProgress) * 0.065;

      const nodeColorStr = getInterpolatedColor(COLORS.node);
      const lineColorStr = getInterpolatedColor(COLORS.line);
      const gridColorStr = getInterpolatedColor(COLORS.grid);
      const dustColorStr = getInterpolatedColor(COLORS.dust);

      const connectionDist = 135;

      // 1. Draw Perspective Grid at bottom of screen
      ctx.save();
      ctx.strokeStyle = gridColorStr;
      ctx.lineWidth = 1;

      const horizon = window.innerHeight * 0.55;
      const step = 42;
      gridOffset = (gridOffset + 0.08) % step;

      const vanishingPointX = window.innerWidth / 2;
      const vanishingPointY = horizon;
      const lineCount = 35;
      for (let i = -lineCount; i <= lineCount; i++) {
        const xStart = vanishingPointX + i * 95;
        ctx.beginPath();
        ctx.moveTo(vanishingPointX, vanishingPointY);
        ctx.lineTo(xStart, window.innerHeight);
        ctx.stroke();
      }

      for (let y = horizon + gridOffset; y < window.innerHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render Particle System (with parallax scroll offset)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Particle speed updates
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Apply scroll offsets (parallax effect)
        const currentY = p1.y - scrollY * (0.12 / p1.z);

        // Border loop wrap-around
        if (p1.x < -20) p1.x = window.innerWidth + 20;
        if (p1.x > window.innerWidth + 20) p1.x = -20;
        if (p1.y < -20) p1.y = window.innerHeight + 20;
        if (p1.y > window.innerHeight + 20) p1.y = -20;

        // Mouse attraction/repulsion physics
        const dx = mouse.x - p1.x;
        const dy = mouse.y - currentY;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Drifting dust is lighter and moves faster/is pushed away, connected nodes attract
          const multiplier = p1.isDust ? -0.015 : 0.012;
          p1.x -= dx * force * multiplier / p1.z;
          p1.y -= dy * force * multiplier / p1.z;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, currentY, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.isDust ? getInterpolatedColor(COLORS.dust, p1.opacity) : nodeColorStr;
        ctx.fill();

        // Connect nodes (only if they are standard nodes, not dust)
        if (!p1.isDust) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.isDust) continue;

            const p2CurrentY = p2.y - scrollY * (0.12 / p2.z);
            const distNodes = Math.hypot(p2.x - p1.x, p2CurrentY - currentY);

            if (distNodes < connectionDist) {
              ctx.beginPath();
              ctx.moveTo(p1.x, currentY);
              ctx.lineTo(p2.x, p2CurrentY);
              ctx.strokeStyle = lineColorStr;
              
              // Lines are thicker/brighter if closer or on the same Z plane
              const zSimilarity = 1 - Math.abs(p1.z - p2.z) / 2;
              ctx.lineWidth = (1 - distNodes / connectionDist) * 0.55 * Math.max(0.1, zSimilarity);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none w-full h-full block bg-transparent"
    />
  );
}
