"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, ExternalLink, X, AlertCircle, ShieldCheck } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "AI/ML Development" | "IoT & Security" | "Web Applications";
  shortDesc: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: string;
  results: string;
  github: string;
  live: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "innovative-hiring",
    title: "Innovative Hiring – Interview Automation System",
    category: "AI/ML Development",
    shortDesc: "AI-driven recruitment platform utilizing React, Flask, and Gemini AI to automate corporate interview screening workflows.",
    problem: "Corporate screening processes are manual, expensive, slow, and lack consistent adaptive candidate evaluation metrics.",
    solution: "Developed an adaptive interview engine powered by Gemini AI, featuring real-time candidate evaluation and dynamic question generation. Deployed Python ML preprocessing techniques to extract structured features.",
    architecture: "React Dashboard ──> Flask (Python) API ──> Gemini AI Engine ──> PostgreSQL Database",
    techStack: ["React", "Flask", "Python", "Gemini AI", "PostgreSQL"],
    challenges: "Parsing unstructured speech/text responses into standardized candidate profiles. Solved by writing system prompt templates that enforce Gemini to output strict JSON schemas.",
    results: "Automated candidate screening flows, improving initial round throughput metrics and standardizing evaluation reports.",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "voting-security",
    title: "Campus Voting Security System Using Fingerprint",
    category: "IoT & Security",
    shortDesc: "Secure, biometric IoT voting system utilizing Svelte, PocketBase, and Arduino Uno controllers.",
    problem: "Campus elections are susceptible to paper fraud, voter impersonation, and database commit tampering.",
    solution: "Developed an integrated biometric voting platform using Arduino Uno, Svelte UI interfaces, and PocketBase. Hardware-level fingerprint scans validate voters before committing transactions.",
    architecture: "Fingerprint Scanner ──> Arduino Uno ──> Svelte Web client ──> PocketBase Auth API",
    techStack: ["Svelte", "PocketBase", "Arduino Uno", "C/C++", "Hardware Integrations"],
    challenges: "Managing serial communication latency between Arduino hardware board and browser clients. Solved by writing a custom serial webhook bridge.",
    results: "Achieved 100% database transaction integrity with zero voter impersonation occurrences during simulation runs.",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "library-system",
    title: "Library Management System – WordPress",
    category: "Web Applications",
    shortDesc: "WordPress-based digital library system with role-based access control, return logging, and borrow tracking.",
    problem: "Overdue books, checkouts, and fine collections were tracked manually, causing record synchronization delays.",
    solution: "Designed a digital library tracking platform with user role editor configurations, automated return logs, and custom administrative dashboard widgets.",
    architecture: "WordPress Client ──> User Role Gate ──> WP Library Plugin ──> MySQL Database",
    techStack: ["WordPress", "WP Library Plugin", "User Role Editor", "MySQL"],
    challenges: "Enforcing checkout locks dynamically for members with overdue checkout balances. Solved by mapping roles in custom PHP filters.",
    results: "Reduced checkout record synchronization delays by 80% and successfully cataloged all resources.",
    github: "https://github.com",
    live: "https://example.com",
  },
];

interface ProjectsProps {
  activeSkillFilter?: string | null;
}

const getSkillColor = (skillId: string | null) => {
  if (!skillId) return null;
  const id = skillId.toLowerCase();
  if (["python", "java", "c", "typescript", "javascript"].includes(id)) return "var(--accent-programming)";
  if (["gemini", "langchain", "openai"].includes(id)) return "var(--accent-aiml)";
  if (["gcp", "docker"].includes(id)) return "var(--accent-cloud)";
  if (["mongodb", "postgresql", "mysql"].includes(id)) return "var(--accent-databases)";
  if (["n8n", "github"].includes(id)) return "var(--accent-automation)";
  if (["vapi", "flask"].includes(id)) return "var(--accent-backend)";
  return "var(--accent-color)";
};

const isTechRelated = (techStack: string[], filter: string | null) => {
  if (!filter) return false;
  const f = filter.toLowerCase();
  return techStack.some((tech) => {
    const t = tech.toLowerCase();
    if (f === "python" && t === "python") return true;
    if (f === "java" && t === "java") return true;
    if (f === "c" && (t === "c" || t === "c/c++")) return true;
    if (f === "typescript" && t === "typescript") return true;
    if (f === "javascript" && t === "javascript") return true;
    if (f === "gcp" && (t === "google cloud" || t === "gcp" || t === "google cloud run")) return true;
    if (f === "docker" && t === "docker") return true;
    if (f === "mongodb" && t === "mongodb") return true;
    if (f === "postgresql" && t === "postgresql") return true;
    if (f === "mysql" && t === "mysql") return true;
    if (f === "n8n" && (t === "n8n" || t === "make.com")) return true;
    if (f === "github" && (t === "github" || t === "git")) return true;
    if (f === "vapi" && (t === "vapi" || t === "vapi telephony")) return true;
    if (f === "openai" && t === "openai") return true;
    if (f === "gemini" && (t === "gemini ai" || t === "gemini")) return true;
    if (f === "langchain" && t === "langchain") return true;
    if (f === "flask" && t === "flask") return true;
    return t.includes(f) || f.includes(t);
  });
};

export default function Projects({ activeSkillFilter = null }: ProjectsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeAccent = getSkillColor(activeSkillFilter);

  return (
    <section id="projects" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6 animate-fade-in">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Engineering Projects
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            A validation of my full-stack programming, cognitive AI integrations, and hardware system implementations.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            {["All", "AI/ML Development", "IoT & Security", "Web Applications"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-extrabold tracking-wide transition-colors border cursor-none ${
                  selectedCategory === cat
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                    : "bg-white/80 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search stack or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-md text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isRelated = activeSkillFilter ? isTechRelated(project.techStack, activeSkillFilter) : false;
            const hasFilter = !!activeSkillFilter;
            const isDimmed = hasFilter && !isRelated;

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`glass-card p-6 flex flex-col justify-between h-64 rounded-xl cursor-none group shadow-md transition-all duration-300 ${
                  isRelated ? "scale-102 ring-2" : ""
                } ${isDimmed ? "opacity-30 blur-[0.4px]" : "opacity-100"}`}
                style={{
                  borderColor: isRelated && activeAccent ? activeAccent : undefined,
                  boxShadow: isRelated && activeAccent 
                    ? `0 12px 32px -8px ${activeAccent}25, inset 0 1px 0.5px rgba(255,255,255,0.06)` 
                    : undefined
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-extrabold">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-extrabold text-zinc-950 dark:text-white group-hover:text-zinc-900 dark:group-hover:text-white transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3 font-sans font-medium">
                      {project.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Badges footer */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-800 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500 self-center font-bold">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Case Study Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 dark:bg-zinc-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel p-6 sm:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-6 scrollbar-thin shadow-2xl relative cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400 uppercase tracking-wider w-fit block font-bold">
                    {activeProject.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 dark:text-white leading-tight">
                    {activeProject.title}
                  </h3>
                </div>

                <hr className="border-zinc-200/60 dark:border-zinc-800/40" />

                {/* Deep Content */}
                <div className="space-y-4 text-xs leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <h4 className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wide text-[10px]">
                        <AlertCircle className="w-3.5 h-3.5 text-zinc-400" />
                        Problem Statement
                      </h4>
                      <p className="font-sans text-zinc-600 dark:text-zinc-300 font-medium">{activeProject.problem}</p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 font-mono uppercase tracking-wide text-[10px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                        Solution
                      </h4>
                      <p className="font-sans text-zinc-600 dark:text-zinc-300 font-medium">{activeProject.solution}</p>
                    </div>
                  </div>

                  {/* Architecture Diagram Box */}
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5 shadow-inner">
                    <h4 className="font-bold text-zinc-900 dark:text-white font-mono uppercase tracking-wide text-[10px]">
                      Architecture Workflow
                    </h4>
                    <code className="block text-[10px] text-zinc-800 dark:text-zinc-200 overflow-x-auto whitespace-nowrap py-1 font-bold">
                      {activeProject.architecture}
                    </code>
                  </div>

                  {/* Technical Hurdles (Challenges) */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-zinc-950 dark:text-white font-mono uppercase tracking-wide text-[10px]">
                      Challenges Faced & Solutions
                    </h4>
                    <p className="font-sans text-zinc-600 dark:text-zinc-300 font-medium">{activeProject.challenges}</p>
                  </div>

                  {/* Results & Metrics */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-zinc-950 dark:text-white font-mono uppercase tracking-wide text-[10px]">
                      Results & Key Metrics
                    </h4>
                    <p className="font-sans text-zinc-950 dark:text-white font-extrabold text-sm">
                      {activeProject.results}
                    </p>
                  </div>
                </div>

                <hr className="border-zinc-200/60 dark:border-zinc-800/40" />

                {/* Tech Stack and Links */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Repository
                    </a>
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
