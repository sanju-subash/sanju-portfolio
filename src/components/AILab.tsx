"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight, ExternalLink, Code, Terminal, Server, Bot, Workflow, Cpu, Layers } from "lucide-react";

// Accent definitions matching categories
const ACCENTS = {
  aiml: {
    color: "#a855f7",
    lightColor: "#7e22ce",
    textClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-50/50 dark:bg-purple-950/20",
    borderClass: "border-purple-500/50 dark:border-purple-500/40"
  },
  automation: {
    color: "#f97316",
    lightColor: "#c2410c",
    textClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-50/50 dark:bg-orange-950/20",
    borderClass: "border-orange-500/50 dark:border-orange-500/40"
  },
  cloud: {
    color: "#06b6d4",
    lightColor: "#0e7490",
    textClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-cyan-50/50 dark:bg-cyan-950/20",
    borderClass: "border-cyan-500/50 dark:border-cyan-500/40"
  },
  backend: {
    color: "#6366f1",
    lightColor: "#4338ca",
    textClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-indigo-50/50 dark:bg-indigo-950/20",
    borderClass: "border-indigo-500/50 dark:border-indigo-500/40"
  }
};

const LOGOS = {
  python: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M12 2c-2.3 0-4.5.2-6.2.6C4.1 3 3 4.1 2.6 5.8c-.8 3.3-.8 6.1 0 9.4.4 1.7 1.5 2.8 3.2 3.2.7.2 1.5.3 2.2.3V15.4c0-1.8 1.4-3.3 3.2-3.3h3.5V8.8c0-1.8-1.4-3.3-3.2-3.3H5.97L6 3.5c1.2-.6 3.4-1.1 6-1.1 5.6 0 8 1.6 8 3.7v3.3h-3.5c-1.8 0-3.2 1.5-3.2 3.3v3.7c0 .6-.4 1-1 1" fill="#3776AB" />
      <path d="M12.105 24c2.457 0 4.66-.455 5.918-1.096l.008-2.422h-3.992c-1.782 0-3.23-1.488-3.23-3.32v-3.743H9.317c-1.782 0-3.23 1.488-3.23 3.32v3.743c0 2.163 2.402 3.743 8.02 3.743z" fill="#FFE052" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="12" y="16.5" fill="#FFFFFF" fontSize="10" fontFamily="var(--font-heading)" fontWeight="bold" textAnchor="middle">TS</text>
    </svg>
  ),
  vapi: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" />
      <path d="M8 12c1-2 2-3 4-3s3 1 4 3" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#F59E0B" />
    </svg>
  ),
  n8n: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <rect width="24" height="24" rx="3" fill="#FF6C37" />
      <circle cx="7" cy="7" r="1.5" fill="#FFFFFF" />
      <circle cx="17" cy="17" r="1.5" fill="#FFFFFF" />
      <circle cx="17" cy="7" r="1.5" fill="#FFFFFF" />
      <path d="M9 7h6M17 9v6M9 7l6 10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M19.7 13c.4-.7.6-1.5.6-2.4 0-2.5-2-4.5-4.5-4.5h-.8c-.3-.7-.9-1.3-1.6-1.7-.7-.4-1.5-.6-2.4-.6-2.5 0-4.5 2-4.5 4.5v.8c-.7.3-1.3.9-1.7 1.6-.4.7-.6 1.5-.6 2.4 0 2.5 2 4.5 4.5 4.5h.8c.3.7.9 1.3 1.6 1.7.7.4 1.5.6 2.4.6 2.5 0 4.5-2 4.5-4.5v-.8c.7-.3 1.3-.9 1.7-1.6z" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#10A37F" />
    </svg>
  ),
  gcp: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M19.5 9.5c0-1.8-1.5-3.3-3.3-3.3h-.9c-.7-2-2.5-3.5-4.8-3.5-2.9 0-5.2 2.3-5.2 5.2h-.5C2.8 7.9 1.2 9.5 1.2 11.5s1.6 3.6 3.6 3.6h14.7c2.5 0 4.5-2 4.5-4.5s-2-4.5-4.5-4.5z" stroke="#4285F4" strokeWidth="2" />
      <path d="M12 12.5h7.5" stroke="#EA4335" strokeWidth="2" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M1.5 12.5c.3 3.5 3 6.3 6.5 6.3h8c3.5 0 6.2-2.8 6.5-6.3H1.5z" fill="#2496ED" />
      <rect x="9.5" y="7.5" width="3" height="3" rx="0.5" fill="#2496ED" />
      <rect x="9.5" y="4" width="3" height="3" rx="0.5" fill="#2496ED" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M12 1.5c.5 1.5 2.5 5 2.5 8.5s-2 6.5-2.5 8c-.5-1.5-2.5-4.5-2.5-8s2-7 2.5-8.5z" fill="#47A248" />
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M19 14.5c2 0 3.8-1.5 3.8-3.5S21 7.5 19 7.5h-1c-.5-3-3-5.2-6-5.2S6 4.5 5.5 7.5c-2.5 0-4.3 2-4.3 4.5s1.8 4.5 4.3 4.5H19z" fill="#336791" />
    </svg>
  ),
  gemini: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <defs>
        <linearGradient id="gemini-grad-lab" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A73E8" />
          <stop offset="50%" stopColor="#8E24AA" />
          <stop offset="100%" stopColor="#DA4453" />
        </linearGradient>
      </defs>
      <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-5.523 0-10-4.477-10-10 0-5.523 4.477-10 10-10z" fill="url(#gemini-grad-lab)" />
    </svg>
  ),
  langchain: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <rect width="24" height="24" rx="3" fill="#00A389" />
      <circle cx="9" cy="9" r="2" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="2" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M4 15c0-2.5 1-4.5 4-4.5S10 12 11 11.5s2-1 2-2.5" stroke="#F89820" strokeWidth="1.5" />
      <path d="M2 19c2 1.5 5 2.5 10 2.5s8-1 10-2.5" stroke="#5382A1" strokeWidth="2" />
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <path d="M9.5 3h5M12 3v4m-3.5 1.5h7c-.8 0-1.5.7-1.5 1.5v6.5" stroke="#6B7280" strokeWidth="1.5" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00d8ff" strokeWidth="1.5" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="#00d8ff" />
    </svg>
  )
};

interface AIProject {
  id: string;
  title: string;
  category: "aiml" | "automation" | "cloud" | "backend";
  tagline: string;
  description: string;
  status: string;
  metrics: { label: string; value: string }[];
  technologies: { label: string; logo: React.ReactNode }[];
  github: string | null;
  live: string | null;
  diagramNodes: { label: string; logo: React.ReactNode }[];
}

const AI_PROJECTS: AIProject[] = [
  {
    id: "voice-agents",
    title: "Voice Agent Systems",
    category: "backend",
    tagline: "Low-Latency Conversational Telephony Core",
    description: "Configuring inbound conversation agents with custom voice options. Parsing audio metadata dynamically and implementing real-time low-latency voice pipelines with barge-in support.",
    status: "Production",
    metrics: [
      { label: "Pipeline Latency", value: "780ms" },
      { label: "Buffer Size", value: "32kb" },
      { label: "Protocol", value: "WebRTC / SIP" }
    ],
    technologies: [
      { label: "Vapi", logo: LOGOS.vapi },
      { label: "n8n", logo: LOGOS.n8n },
      { label: "Python", logo: LOGOS.python },
      { label: "Google Cloud", logo: LOGOS.gcp }
    ],
    github: "https://github.com",
    live: "https://example.com",
    diagramNodes: [
      { label: "Caller WebRTC", logo: LOGOS.react },
      { label: "Vapi Telephony", logo: LOGOS.vapi },
      { label: "Cloud Run Proxy", logo: LOGOS.gcp },
      { label: "Gemini AI", logo: LOGOS.gemini }
    ]
  },
  {
    id: "n8n-automation",
    title: "n8n Automation Workflows",
    category: "automation",
    tagline: "Serverless Event-Driven Automations",
    description: "Building automated workflow loops that parse webhooks traffic, validate input formats, run code sandboxes, sync contact nodes across CRM platforms, and trigger alerts.",
    status: "Operational",
    metrics: [
      { label: "Daily Tasks Exec", value: "14.2k" },
      { label: "Uptime Rate", value: "99.99%" },
      { label: "Avg Run Time", value: "1.4s" }
    ],
    technologies: [
      { label: "n8n", logo: LOGOS.n8n },
      { label: "Python", logo: LOGOS.python },
      { label: "PostgreSQL", logo: LOGOS.postgresql }
    ],
    github: "https://github.com",
    live: null,
    diagramNodes: [
      { label: "Webhook Event", logo: LOGOS.python },
      { label: "n8n Core", logo: LOGOS.n8n },
      { label: "PostgreSQL DB", logo: LOGOS.postgresql },
      { label: "Slack Sync", logo: LOGOS.react }
    ]
  },
  {
    id: "ai-integrations",
    title: "AI Integrations",
    category: "aiml",
    tagline: "Structured Schema Guardrail Layers",
    description: "Designing prompt context windows, structured JSON schema response maps, and input validation layers to extract reliable telemetry data blocks from LLM models.",
    status: "Active",
    metrics: [
      { label: "Parse Accuracy", value: "99.8%" },
      { label: "Latency", value: "95ms" },
      { label: "Context Window", value: "2M tokens" }
    ],
    technologies: [
      { label: "Gemini AI", logo: LOGOS.gemini },
      { label: "OpenAI", logo: LOGOS.openai },
      { label: "LangChain", logo: LOGOS.langchain },
      { label: "Python", logo: LOGOS.python }
    ],
    github: "https://github.com",
    live: "https://example.com",
    diagramNodes: [
      { label: "JSON Schema Input", logo: LOGOS.typescript },
      { label: "LangChain Guard", logo: LOGOS.langchain },
      { label: "OpenAI APIs", logo: LOGOS.openai },
      { label: "Structured Output", logo: LOGOS.python }
    ]
  },
  {
    id: "cloud-deployments",
    title: "Cloud Deployments",
    category: "cloud",
    tagline: "Dockerized Scale-to-Zero Microservices",
    description: "Deploying secure containerized services to Google Cloud Run with private IAM permissions, custom resource limits, and automated GitHub Actions delivery pipelines.",
    status: "Stable",
    metrics: [
      { label: "Instance Scale", value: "0 to 10" },
      { label: "Concurrency", value: "80/inst" },
      { label: "Deploy Time", value: "45s" }
    ],
    technologies: [
      { label: "Google Cloud", logo: LOGOS.gcp },
      { label: "Docker", logo: LOGOS.docker },
      { label: "Python", logo: LOGOS.python }
    ],
    github: "https://github.com",
    live: "https://example.com",
    diagramNodes: [
      { label: "Git Push Commit", logo: LOGOS.react },
      { label: "Docker Package", logo: LOGOS.docker },
      { label: "GCP Registry", logo: LOGOS.gcp },
      { label: "Cloud Run VM", logo: LOGOS.gcp }
    ]
  },
  {
    id: "llm-applications",
    title: "LLM Applications",
    category: "aiml",
    tagline: "RAG Semantic Retrieval Indexing",
    description: "Developing semantic indices and vector query routes to run document embeddings matching and retrieval tasks with semantic chunking and cosine similarity filters.",
    status: "Stable",
    metrics: [
      { label: "Vector Search", value: "8ms" },
      { label: "Top-K Recall", value: "94.2%" },
      { label: "Dimension Size", value: "768px" }
    ],
    technologies: [
      { label: "LangChain", logo: LOGOS.langchain },
      { label: "Gemini AI", logo: LOGOS.gemini },
      { label: "PostgreSQL", logo: LOGOS.postgresql },
      { label: "Python", logo: LOGOS.python }
    ],
    github: "https://github.com",
    live: null,
    diagramNodes: [
      { label: "User Question", logo: LOGOS.typescript },
      { label: "Embeddings model", logo: LOGOS.langchain },
      { label: "pgvector Index", logo: LOGOS.postgresql },
      { label: "Gemini Context", logo: LOGOS.gemini }
    ]
  },
  {
    id: "backend-apis",
    title: "Backend APIs",
    category: "backend",
    tagline: "Type-Safe Relational Microservices",
    description: "Building robust backend gateways and relational microservices managing core system configurations, logging records, and token-based client authorizations.",
    status: "Active",
    metrics: [
      { label: "Throughput", value: "250 req/s" },
      { label: "Conn Pool Size", value: "10" },
      { label: "JWT Auth Gate", value: "<2ms" }
    ],
    technologies: [
      { label: "Java", logo: LOGOS.java },
      { label: "Flask", logo: LOGOS.flask },
      { label: "PostgreSQL", logo: LOGOS.postgresql }
    ],
    github: "https://github.com",
    live: "https://example.com",
    diagramNodes: [
      { label: "Client Request", logo: LOGOS.react },
      { label: "Spring Gateway", logo: LOGOS.java },
      { label: "Flask microservice", logo: LOGOS.flask },
      { label: "PostgreSQL Pool", logo: LOGOS.postgresql }
    ]
  }
];

function FlowDiagram({ project, color }: { project: AIProject; color: string }) {
  return (
    <div className="p-5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/20 font-mono text-[9px] relative overflow-hidden flex flex-col justify-center min-h-[140px] shadow-inner">
      <div className="absolute top-2 left-3 text-[7px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
        [ Architecture Flow telemetry ]
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-1 mt-4 relative z-10 w-full">
        {project.diagramNodes.map((node, idx) => (
          <div key={idx} className="flex items-center w-full md:w-auto">
            {/* Box Node */}
            <div
              className="px-3 py-2 rounded-lg border border-zinc-200/80 dark:border-zinc-850 bg-white dark:bg-zinc-950 flex items-center gap-1.5 shadow-sm min-w-[105px] max-w-[120px] justify-center transition-all duration-300"
              style={{
                borderColor: idx === 1 || idx === 2 ? color : undefined,
                boxShadow: idx === 1 || idx === 2 ? `0 4px 12px ${color}15` : undefined
              }}
            >
              <span className="scale-75 shrink-0">{node.logo}</span>
              <span className="font-extrabold text-zinc-850 dark:text-zinc-200 text-[8px] uppercase tracking-wider truncate">
                {node.label}
              </span>
            </div>
            
            {/* Arrow/Line connection */}
            {idx < project.diagramNodes.length - 1 && (
              <div className="flex-grow flex items-center justify-center min-w-[15px] md:min-w-[20px]">
                {/* Horizontal line for desktop, vertical for mobile */}
                <div className="hidden md:block w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 relative">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-60 animate-flow-line"
                    style={{ color }}
                  />
                </div>
                <div className="md:hidden w-[1px] h-3 bg-zinc-200 dark:bg-zinc-800 mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AILab() {
  const [activeItem, setActiveItem] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const activeProject = AI_PROJECTS[activeItem];
  const activeAccent = ACCENTS[activeProject.category];

  return (
    <section id="ailab" className="py-24 relative border-t border-zinc-200/40 dark:border-zinc-800/40 overflow-hidden bg-zinc-50/10 dark:bg-zinc-950/10">
      {/* Dynamic background lighting overlay matching active project */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute right-0 top-[20%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 dark:opacity-5 transition-colors duration-[1000ms]"
          style={{ backgroundColor: activeAccent.color }}
        />
        {/* Subtle coordinate grid mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_70%_50%,#000_60%,transparent_100%)] opacity-80" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Interactive Telemetry Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            AI Projects Dashboard
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl font-medium">
            Explore my active conversational nodes, automated webhook systems, and containerized cloud APIs.
          </p>
        </div>

        {/* Outer Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Narrative Panel / Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 glass-panel p-6 sm:p-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 relative shadow-lg">
            {/* Tech HUD Corner Brackets */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-zinc-300 dark:border-zinc-700 opacity-60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-zinc-300 dark:border-zinc-700 opacity-60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-zinc-300 dark:border-zinc-700 opacity-60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-zinc-300 dark:border-zinc-700 opacity-60 pointer-events-none" />

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200/40 dark:border-zinc-800/40">
                <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">
                  [ SANDBOX_CHANNELS ]
                </span>
                <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                  6 ACTIVE SYSTEMS
                </span>
              </div>

              {/* Sidebar Menu Selectors */}
              <div className="flex flex-col gap-2">
                {AI_PROJECTS.map((project, idx) => {
                  const isActive = activeItem === idx;
                  const itemAccent = ACCENTS[project.category];

                  return (
                    <button
                      key={project.id}
                      onClick={() => setActiveItem(idx)}
                      className={`w-full text-left px-4.5 py-3 rounded-lg border transition-all duration-300 cursor-none flex items-center justify-between ${
                        isActive
                          ? "bg-zinc-100 dark:bg-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                          : "bg-white/40 dark:bg-zinc-950/20 border-zinc-200/60 dark:border-zinc-850 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                      style={{
                        borderColor: isActive ? itemAccent.color : undefined,
                        backgroundColor: isActive ? (isDark ? undefined : `${itemAccent.color}08`) : undefined
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[8.5px] font-mono font-extrabold transition-colors duration-300 ${isActive ? itemAccent.textClass : "text-zinc-400"}`}>
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className={`text-xs font-extrabold uppercase font-mono tracking-wide transition-colors duration-300 ${isActive ? "text-zinc-950 dark:text-white" : ""}`}>
                            {project.title}
                          </h4>
                        </div>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? `${itemAccent.textClass} translate-x-0.5` : "text-zinc-300 dark:text-zinc-800 opacity-0 group-hover:opacity-100"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-zinc-200/40 dark:border-zinc-800/40 text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
              <span>SELECT CORE TO LOAD SCHEMAS</span>
            </div>
          </div>

          {/* Right Dashboard Console Monitor (7 cols) */}
          <div
            className={`lg:col-span-7 flex flex-col justify-between space-y-6 glass-panel p-6 sm:p-8 rounded-xl border transition-all duration-500 shadow-xl relative ${activeAccent.borderClass}`}
            style={{
              boxShadow: `0 12px 36px -12px ${activeAccent.color}20`
            }}
          >
            {/* Viewport Tech Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/40 dark:border-zinc-800/40 w-full">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pointer-events-none select-none">
                  SYSTEM_DASHBOARD: {activeProject.id.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-[8px] font-mono font-extrabold uppercase tracking-wider">
                <Activity className="w-2.5 h-2.5 animate-pulse shrink-0" />
                {activeProject.status}
              </div>
            </div>

            {/* Active Dashboard Narrative Details */}
            <div className="space-y-4 relative z-10">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold uppercase font-mono tracking-wide text-zinc-950 dark:text-white">
                  {activeProject.title}
                </h3>
                <span className={`text-[9.5px] font-mono font-extrabold uppercase ${activeAccent.textClass}`}>
                  {activeProject.tagline}
                </span>
              </div>

              <p className="text-[11.5px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                {activeProject.description}
              </p>

              {/* Dynamic flow Diagram */}
              <FlowDiagram project={activeProject} color={activeAccent.color} />

              {/* Technologies Badges */}
              <div className="space-y-2">
                <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wide block font-extrabold">
                  System Architecture Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <div
                      key={tech.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200/80 dark:border-zinc-850 bg-white/70 dark:bg-zinc-950/40 text-[10px] font-mono font-extrabold uppercase tracking-wide text-zinc-750 dark:text-zinc-300 shadow-sm"
                    >
                      <span className="scale-85">{tech.logo}</span>
                      <span>{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Metrics Summary */}
            <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800/80 border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg bg-zinc-50/40 dark:bg-zinc-900/30 p-3 mt-6">
              {activeProject.metrics.map((metric, idx) => (
                <div key={idx} className="text-center first:pl-0 pl-2">
                  <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-0.5 font-bold">
                    {metric.label}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-950 dark:text-white font-mono">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Links and Action Buttons */}
            <div className="flex items-center justify-between border-t border-zinc-200/40 dark:border-zinc-800/40 pt-4 mt-6">
              <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">
                [ ACCESS_TELEMETRY: ALLOWED ]
              </span>
              
              <div className="flex items-center gap-4">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9.5px] font-extrabold uppercase text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none font-mono"
                  >
                    <Code className="w-3.5 h-3.5" />
                    Repository
                  </a>
                )}
                <a
                  href="#architecture"
                  className={`inline-flex items-center gap-1 text-[9.5px] font-extrabold uppercase transition-colors cursor-none font-mono ${activeAccent.textClass} hover:opacity-80`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  View Schema
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
