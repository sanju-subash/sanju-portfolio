"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu } from "lucide-react";

interface SkillItem {
  id: string;
  label: string;
  category: "programming" | "aiml" | "cloud" | "databases" | "automation" | "backend";
  usage: string;
  metric: string;
  status: string;
  color: string; // Hex brand color
  iconSvg: React.ReactNode;
}

interface TechCategory {
  id: string;
  label: string;
  color: string;
  lightColor: string;
  shadowClass: string;
  borderClass: string;
  bgClass: string;
  textClass: string;
}

const CATEGORY_MAP: Record<string, TechCategory> = {
  programming: {
    id: "programming",
    label: "Programming",
    color: "#3b82f6",
    lightColor: "#1d4ed8",
    shadowClass: "shadow-blue-500/15 dark:shadow-blue-500/25",
    borderClass: "border-blue-500/60 dark:border-blue-500/40",
    bgClass: "bg-blue-50/50 dark:bg-blue-950/20",
    textClass: "text-blue-700 dark:text-blue-400"
  },
  aiml: {
    id: "aiml",
    label: "AI / ML",
    color: "#a855f7",
    lightColor: "#7e22ce",
    shadowClass: "shadow-purple-500/15 dark:shadow-purple-500/25",
    borderClass: "border-purple-500/60 dark:border-purple-500/40",
    bgClass: "bg-purple-50/50 dark:bg-purple-950/20",
    textClass: "text-purple-700 dark:text-purple-400"
  },
  cloud: {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "#06b6d4",
    lightColor: "#0e7490",
    shadowClass: "shadow-cyan-500/15 dark:shadow-cyan-500/25",
    borderClass: "border-cyan-500/60 dark:border-cyan-500/40",
    bgClass: "bg-cyan-50/50 dark:bg-cyan-950/20",
    textClass: "text-cyan-700 dark:text-cyan-400"
  },
  databases: {
    id: "databases",
    label: "Databases",
    color: "#10b981",
    lightColor: "#15803d",
    shadowClass: "shadow-green-500/15 dark:shadow-green-500/25",
    borderClass: "border-green-500/60 dark:border-green-500/40",
    bgClass: "bg-green-50/50 dark:bg-green-950/20",
    textClass: "text-green-700 dark:text-green-400"
  },
  automation: {
    id: "automation",
    label: "Automation",
    color: "#f97316",
    lightColor: "#c2410c",
    shadowClass: "shadow-orange-500/15 dark:shadow-orange-500/25",
    borderClass: "border-orange-500/60 dark:border-orange-500/40",
    bgClass: "bg-orange-50/50 dark:bg-orange-950/20",
    textClass: "text-orange-700 dark:text-orange-400"
  },
  backend: {
    id: "backend",
    label: "Backend Services",
    color: "#6366f1",
    lightColor: "#4338ca",
    shadowClass: "shadow-indigo-500/15 dark:shadow-indigo-500/25",
    borderClass: "border-indigo-500/60 dark:border-indigo-500/40",
    bgClass: "bg-indigo-50/50 dark:bg-indigo-950/20",
    textClass: "text-indigo-700 dark:text-indigo-400"
  }
};

const ROW_1_SKILLS: SkillItem[] = [
  {
    id: "python",
    label: "Python",
    category: "programming",
    usage: "Primary language for generative AI logic, custom n8n python nodes, API webhooks, and data structures.",
    metric: "Latency: <10ms",
    status: "Active",
    color: "#3776AB",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350">
        <path d="M12 2c-2.3 0-4.5.2-6.2.6C4.1 3 3 4.1 2.6 5.8c-.8 3.3-.8 6.1 0 9.4.4 1.7 1.5 2.8 3.2 3.2.7.2 1.5.3 2.2.3V15.4c0-1.8 1.4-3.3 3.2-3.3h3.5V8.8c0-1.8-1.4-3.3-3.2-3.3H5.97L6 3.5c1.2-.6 3.4-1.1 6-1.1 5.6 0 8 1.6 8 3.7v3.3h-3.5c-1.8 0-3.2 1.5-3.2 3.3v3.7c0 .6-.4 1-1 1" fill="#3776AB" />
        <path d="M12.105 24c2.457 0 4.66-.455 5.918-1.096l.008-2.422h-3.992c-1.782 0-3.23-1.488-3.23-3.32v-3.743H9.317c-1.782 0-3.23 1.488-3.23 3.32v3.743c0 2.163 2.402 3.743 8.02 3.743z M19.992 17.223v-3.518c0-1.832-1.448-3.32-3.23-3.32h-3.493v3.743c0 1.832 1.448 3.32 3.23 3.32h3.493z" fill="#FFE052" />
      </svg>
    )
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "programming",
    usage: "Developing type-safe frontend UI grids, asynchronous payload handlers, and dashboard consoles.",
    metric: "Compile: <1.5s",
    status: "Active",
    color: "#3178C6",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <text x="12" y="17" fill="#FFFFFF" fontSize="10.5" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">TS</text>
      </svg>
    )
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "programming",
    usage: "Writing responsive client scripts, theme adapters, and interactive dynamic components.",
    metric: "FPS: 60 (Lock)",
    status: "Active",
    color: "#F7DF1E",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <text x="13" y="17" fill="#000000" fontSize="10.5" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">JS</text>
      </svg>
    )
  },
  {
    id: "vapi",
    label: "Vapi Voice Systems",
    category: "backend",
    usage: "Integrating high-fidelity voice interfaces with low-latency WebRTC streams and voice barge-in filters.",
    metric: "Jitter: <4ms",
    status: "Active",
    color: "#F59E0B",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
        <path d="M8 12c1-2 2-3 4-3s3 1 4 3" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#F59E0B" />
        <path d="M12 14v4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "n8n",
    label: "n8n Automation",
    category: "automation",
    usage: "Orchestrating automated backend systems, Webhook endpoint decoders, and cross-CRM nodes.",
    metric: "Uptime: 99.99%",
    status: "Active",
    color: "#FF6C37",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350">
        <rect width="24" height="24" rx="4" fill="#FF6C37" />
        <circle cx="7" cy="7" r="2" fill="#FFFFFF" />
        <circle cx="17" cy="17" r="2" fill="#FFFFFF" />
        <circle cx="17" cy="7" r="2" fill="#FFFFFF" />
        <path d="M9 7h6M17 9v6M9 7l6 10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "openai",
    label: "OpenAI API",
    category: "aiml",
    usage: "Deploying advanced reasoning completions, structured JSON schema response templates, and token gates.",
    metric: "Precision: 99.2%",
    status: "Active",
    color: "#10A37F",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M19.7 13c.4-.7.6-1.5.6-2.4 0-2.5-2-4.5-4.5-4.5h-.8c-.3-.7-.9-1.3-1.6-1.7-.7-.4-1.5-.6-2.4-.6-2.5 0-4.5 2-4.5 4.5v.8c-.7.3-1.3.9-1.7 1.6-.4.7-.6 1.5-.6 2.4 0 2.5 2 4.5 4.5 4.5h.8c.3.7.9 1.3 1.6 1.7.7.4 1.5.6 2.4.6 2.5 0 4.5-2 4.5-4.5v-.8c.7-.3 1.3-.9 1.7-1.6zM11 5.5c0-1.4 1.1-2.5 2.5-2.5.5 0 1 .1 1.4.4.4.2.7.6.9 1 .1.4.2.8.2 1.3v5.1c0 .4-.3.8-.8 1L11 9V5.5zm-5.6 5c.7-.7 1.7-1.1 2.7-1.1h5.1c.4 0 .8.3 1 .8l-2.8 4.8c-.4-.2-.8-.6-1-.9-.3-.5-.4-1.1-.4-1.7v-1.9z" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" fill="#10A37F" />
      </svg>
    )
  },
  {
    id: "gcp",
    label: "Google Cloud",
    category: "cloud",
    usage: "Deploying containerized microservices to Cloud Run, managing IAM key files, and telemetry logs.",
    metric: "Uptime: 99.99%",
    status: "Active",
    color: "#4285F4",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M19.5 9.5c0-1.8-1.5-3.3-3.3-3.3h-.9c-.7-2-2.5-3.5-4.8-3.5-2.9 0-5.2 2.3-5.2 5.2h-.5C2.8 7.9 1.2 9.5 1.2 11.5s1.6 3.6 3.6 3.6h14.7c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5z" stroke="#4285F4" strokeWidth="2" />
        <path d="M12 12.5h7.5c2 0 3.5-1.5 3.5-3.5S21.5 5.5 19.5 5.5H16.2" stroke="#EA4335" strokeWidth="2" />
        <path d="M10.5 2.7c2.3 0 4.3 1.5 4.8 3.5" stroke="#FBBC05" strokeWidth="2" />
        <path d="M10.5 2.7c-2.9 0-5.2 2.3-5.2 5.2h-.5" stroke="#34A853" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: "flask",
    label: "Flask API",
    category: "backend",
    usage: "Building serverless API gateways, routing requests, and proxying backend server tokens.",
    metric: "Requests: 140/s",
    status: "Stable",
    color: "#6b7280",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M9.5 3h5M12 3v4m-3.5 1.5h7c-.8 0-1.5.7-1.5 1.5v6.5c0 1.4-1.1 2.5-2.5 2.5S9 18 9 16.5V10c0-.8-.7-1.5-1.5-1.5z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11.5" cy="14.5" r="1.5" fill="#4B5563" />
        <circle cx="13.5" cy="12" r="1" fill="#4B5563" />
      </svg>
    )
  },
  {
    id: "github",
    label: "GitHub Actions",
    category: "automation",
    usage: "Automating CI/CD test workflows, Docker container builds, and staging site deploys via Actions.",
    metric: "Build: <45s",
    status: "Active",
    color: "#181717",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350 fill-current text-zinc-950 dark:text-white">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    )
  }
];

const ROW_2_SKILLS: SkillItem[] = [
  {
    id: "java",
    label: "Java",
    category: "programming",
    usage: "Designing relational backend APIs, thread safety models, and database access pools with Spring.",
    metric: "Threads: 0.8ms",
    status: "Stable",
    color: "#007396",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M4 15c0-2.5 1-4.5 4-4.5S10 12 11 11.5s2-1 2-2.5" stroke="#F89820" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 14.5c0-2.5 1-4 4-4s1.5 1 2.5.5.5-1.5.5-2.5" stroke="#F89820" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 19c2 1.5 5 2.5 10 2.5s8-1 10-2.5" stroke="#5382A1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M3.5 16.5C5.5 18 8 19 12 19s6.5-1 8.5-2.5" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 21.5C7 22.5 9 23 12 23s5-.5 7-1.5" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: "c",
    label: "C Language",
    category: "programming",
    usage: "Low-level microcontroller logic, register mapping, and hardware interruptions for IoT devices.",
    metric: "Memory: <16kb",
    status: "Stable",
    color: "#659AD2",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <rect width="24" height="24" rx="4" fill="#659AD2" />
        <path d="M16.5 7.5C15 6 13.5 5.5 12 5.5s-4 1.5-4 6.5s2.5 6.5 4 6.5s3-1.5 4.5-3" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: "docker",
    label: "Docker",
    category: "cloud",
    usage: "Packaging environment structures, isolating server scopes, and configuring lightweight runtime nodes.",
    metric: "Size: <180MB",
    status: "Active",
    color: "#2496ED",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M1.5 12.5c.3 3.5 3 6.3 6.5 6.3h8c3.5 0 6.2-2.8 6.5-6.3H1.5z" fill="#2496ED" />
        <rect x="5.5" y="7.5" width="3" height="3.5" rx="0.5" fill="#2496ED" />
        <rect x="9.5" y="7.5" width="3" height="3.5" rx="0.5" fill="#2496ED" />
        <rect x="13.5" y="7.5" width="3" height="3.5" rx="0.5" fill="#2496ED" />
        <rect x="9.5" y="3" width="3" height="3.5" rx="0.5" fill="#2496ED" />
      </svg>
    )
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "databases",
    usage: "Storing unstructured JSON telemetry records, transcription feeds, and webhook transaction logs.",
    metric: "Ping: <14ms",
    status: "Active",
    color: "#47A248",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M12 1.5c.5 1.5 2.5 5 2.5 8.5s-2 6.5-2.5 8c-.5-1.5-2.5-4.5-2.5-8s2-7 2.5-8.5z" fill="#47A248" />
        <path d="M12 18v4.5" stroke="#13AA52" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 1.5c-.2.6-1.5 3.5-1.5 8.5s1.2 8 1.5 8V1.5z" fill="#3F8E3D" opacity="0.6" />
      </svg>
    )
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "databases",
    usage: "Configuring high-speed relational index maps, triggers, and JSON data query pools.",
    metric: "Memory: 110MB",
    status: "Active",
    color: "#336791",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <path d="M19 14.5c2 0 3.8-1.5 3.8-3.5S21 7.5 19 7.5h-1c-.5-3-3-5.2-6-5.2S6 4.5 5.5 7.5c-2.5 0-4.3 2-4.3 4.5s1.8 4.5 4.3 4.5H19z" fill="#336791" />
        <path d="M11 6.5c-1.5 0-2.8.8-3.2 2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="1" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "mysql",
    label: "MySQL",
    category: "databases",
    usage: "Maintaining traditional transactional relational models and role authorization grids.",
    metric: "Query: <6ms",
    status: "Stable",
    color: "#00758F",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <rect width="24" height="24" rx="4" fill="#00758F" />
        <path d="M6 16.5C7.5 15 9.5 14 12 14s4.5 1 6 2.5 M7 9.5C8 8.5 10 7.5 12 7.5s4 1 5 2" stroke="#F29111" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 12c1 0 2.5-.5 2.5-1.5S9 9 8 9s-2.5.5-2.5 1.5S7 12 8 12z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: "langchain",
    label: "LangChain",
    category: "aiml",
    usage: "Orchestrating multi-agent tool loops, vector similarity indices, and context splitters.",
    metric: "Recall: 94.2%",
    status: "Active",
    color: "#00A389",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350" fill="none">
        <rect width="24" height="24" rx="4" fill="#00A389" />
        <circle cx="9" cy="9" r="2.5" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="15" cy="15" r="2.5" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="10.8" y1="10.8" x2="13.2" y2="13.2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="9" r="1" fill="#FFC72C" />
        <circle cx="15" cy="15" r="1" fill="#FFC72C" />
      </svg>
    )
  },
  {
    id: "gemini",
    label: "Gemini AI",
    category: "aiml",
    usage: "Integrating system prompt variables and modal extractions inside private developer sandboxes.",
    metric: "Accuracy: 99.4%",
    status: "Active",
    color: "#A855F7",
    iconSvg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 transition-transform duration-350">
        <defs>
          <linearGradient id="gemini-grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A73E8" />
            <stop offset="50%" stopColor="#8E24AA" />
            <stop offset="100%" stopColor="#DA4453" />
          </linearGradient>
        </defs>
        <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-5.523 0-10-4.477-10-10 0-5.523 4.477-10 10-10z" fill="url(#gemini-grad-icon)" />
        <path d="M18 5c0 1.657 1.343 3 3 3-1.657 0-3 1.343-3 3 0-1.657-1.343-3-3-3 1.657 0 3-1.343 3-3z" fill="#FFE052" />
      </svg>
    )
  }
];

const ALL_SKILLS = [...ROW_1_SKILLS, ...ROW_2_SKILLS];

interface SkillsProps {
  hoveredSkill: string | null;
  setHoveredSkill: (id: string | null) => void;
}

export default function Skills({ hoveredSkill, setHoveredSkill }: SkillsProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const activeNode = ALL_SKILLS.find((n) => n.id === hoveredSkill);
  const activeConfig = activeNode ? CATEGORY_MAP[activeNode.category] : null;

  return (
    <section id="skills" className="py-24 relative border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/10 dark:bg-zinc-950/10 overflow-hidden">
      {/* Decorative dynamic background glow */}
      <AnimatePresence>
        {activeNode && activeConfig && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            className="absolute -left-[10%] top-[20%] w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none z-0 transition-colors duration-500"
            style={{ backgroundColor: activeConfig.color }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Ecosystem Integration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Technology Ecosystem
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl font-medium">
            Touch or hover over any integration badge in the smoothly moving tracks to inspect active telemetry records.
          </p>
        </div>

        {/* Console Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* Responsive SVG connection overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0 overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Background connection grid lines */}
            <path
              d="M 64.5 35 C 72 35, 72 50, 75 50"
              stroke="var(--card-border)"
              strokeWidth="0.75"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M 64.5 65 C 72 65, 72 50, 75 50"
              stroke="var(--card-border)"
              strokeWidth="0.75"
              fill="none"
              opacity="0.25"
            />

            {/* Glowing Active Path */}
            <AnimatePresence>
              {activeNode && activeConfig && (
                <>
                  <motion.path
                    d={
                      activeNode.category === "programming" ||
                      activeNode.category === "backend" ||
                      activeNode.category === "automation"
                        ? "M 64.5 35 C 72 35, 72 50, 75 50"
                        : "M 64.5 65 C 72 65, 72 50, 75 50"
                    }
                    stroke={activeConfig.color}
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Energy Particle pulse */}
                  <motion.circle
                    r="2.5"
                    fill={activeConfig.color}
                    style={{ filter: `drop-shadow(0 0 3px ${activeConfig.color})` }}
                    animate={{
                      cx: [64.5, 70, 75],
                      cy:
                        activeNode.category === "programming" ||
                        activeNode.category === "backend" ||
                        activeNode.category === "automation"
                          ? [35, 35, 50]
                          : [65, 65, 50]
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </svg>

          {/* Left Column: Continuous Infinite Horizontal Sliding Badges (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 justify-center glass-panel p-6 sm:p-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden relative z-10 min-h-[300px]">
            {/* Inner background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

            <div className="absolute top-2.5 left-4 text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none z-10">
              [ INTEGRATION_CORES: CYCLING ]
            </div>

            <div className="space-y-6 z-10 w-full relative">
              {/* Row 1: Sliding Left */}
              <div className="relative w-full overflow-hidden py-2 select-none">
                <div className="flex w-max min-w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
                  {[...ROW_1_SKILLS, ...ROW_1_SKILLS].map((skill, idx) => {
                    const skillCat = CATEGORY_MAP[skill.category];
                    const isHovered = hoveredSkill === skill.id;

                    return (
                      <button
                        key={`${skill.id}-${idx}`}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onTouchStart={() => setHoveredSkill(skill.id)}
                        className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300 cursor-none shrink-0 ${
                          isHovered
                            ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-900 dark:border-white scale-102"
                            : "bg-white/90 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/70 text-zinc-700 dark:text-zinc-300 shadow-sm"
                        }`}
                        style={{
                          borderColor: isHovered ? skillCat.color : undefined,
                          boxShadow: isHovered 
                            ? `0 10px 22px -6px ${skillCat.color}25, inset 0 1px 0.5px rgba(255,255,255,0.06)` 
                            : "none",
                          backgroundColor: isHovered ? (isDark ? undefined : `${skillCat.color}08`) : undefined
                        }}
                      >
                        <span className={`transition-transform duration-350 ${isHovered ? "scale-115" : "scale-100"}`}>
                          {skill.iconSvg}
                        </span>
                        <span className="text-xs font-extrabold font-mono uppercase tracking-wider">
                          {skill.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Sliding Right (Reverse) */}
              <div className="relative w-full overflow-hidden py-2 select-none">
                <div className="flex w-max min-w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
                  {[...ROW_2_SKILLS, ...ROW_2_SKILLS].map((skill, idx) => {
                    const skillCat = CATEGORY_MAP[skill.category];
                    const isHovered = hoveredSkill === skill.id;

                    return (
                      <button
                        key={`${skill.id}-${idx}`}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onTouchStart={() => setHoveredSkill(skill.id)}
                        className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300 cursor-none shrink-0 ${
                          isHovered
                            ? "bg-zinc-150 dark:bg-zinc-900 border-zinc-900 dark:border-white scale-102"
                            : "bg-white/90 dark:bg-zinc-900/60 border-zinc-200/80 dark:border-zinc-800/70 text-zinc-700 dark:text-zinc-300 shadow-sm"
                        }`}
                        style={{
                          borderColor: isHovered ? skillCat.color : undefined,
                          boxShadow: isHovered 
                            ? `0 10px 22px -6px ${skillCat.color}25, inset 0 1px 0.5px rgba(255,255,255,0.06)` 
                            : "none",
                          backgroundColor: isHovered ? (isDark ? undefined : `${skillCat.color}08`) : undefined
                        }}
                      >
                        <span className={`transition-transform duration-350 ${isHovered ? "scale-115" : "scale-100"}`}>
                          {skill.iconSvg}
                        </span>
                        <span className="text-xs font-extrabold font-mono uppercase tracking-wider">
                          {skill.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none z-10">
              <span>RATE: LINEAR CONTINUOUS</span>
              <span>HOVER TO PAUSE TRACK & MAP PROJECTS</span>
            </div>
          </div>

          {/* Right Column: Node Telemetry Details Panel (4 cols) */}
          <div
            className={`lg:col-span-4 glass-panel p-6 sm:p-8 flex flex-col justify-between rounded-xl border transition-all duration-500 relative z-10 min-h-[320px] lg:min-h-0 shadow-lg ${
              activeNode && activeConfig ? activeConfig.borderClass : "border-zinc-200/80 dark:border-zinc-800/80"
            }`}
            style={{
              boxShadow: activeNode && activeConfig
                ? `0 12px 36px -12px ${activeConfig.color}20`
                : undefined
            }}
          >
            {/* Corner Bracket decorations */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-zinc-300 dark:border-zinc-700 opacity-60" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-zinc-300 dark:border-zinc-700 opacity-60" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-zinc-300 dark:border-zinc-700 opacity-60" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-zinc-300 dark:border-zinc-700 opacity-60" />

            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <Brain className={`w-4 h-4 transition-colors ${activeConfig ? activeConfig.textClass : "text-zinc-400"}`} />
                <h3 className="text-xs font-bold tracking-wide text-zinc-950 dark:text-white uppercase font-mono">
                  Node Telemetry
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {activeNode && activeConfig ? (
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block font-bold">
                        NODE_ID: {activeNode.id.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-2.5 pt-1">
                        <span className="scale-90">{activeNode.iconSvg}</span>
                        <h4 className="text-base font-extrabold text-zinc-950 dark:text-white">
                          {activeNode.label}
                        </h4>
                      </div>
                      
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[8px] font-mono border mt-3 font-extrabold uppercase transition-all duration-300 ${activeConfig.textClass} ${activeConfig.borderClass}`}
                        style={{
                          backgroundColor: isDark ? `${activeConfig.color}15` : `${activeConfig.color}08`
                        }}
                      >
                        {activeConfig.label}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase block font-bold">
                        Ecosystem Role
                      </span>
                      <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                        {activeNode.usage}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-12 space-y-2 text-zinc-400 dark:text-zinc-500">
                    <Cpu className="w-7 h-7 stroke-[1.2] mx-auto animate-pulse" />
                    <p className="text-[10px] font-mono uppercase tracking-wider">
                      AWAITING_NODE_HOVER...
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Summary details */}
            <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-4 mt-6">
              <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                SYSTEM: ONLINE
              </span>
              <span className={`text-[8px] font-mono font-extrabold uppercase transition-colors duration-300 ${activeConfig ? activeConfig.textClass : "text-zinc-950 dark:text-zinc-300"}`}>
                {activeNode ? activeNode.metric : "17 NODES REGISTERED"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
