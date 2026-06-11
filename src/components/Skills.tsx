"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu } from "lucide-react";

interface Node {
  id: string;
  label: string;
  category: "languages" | "frameworks" | "tools" | "domains";
  x: number; // percentage
  y: number; // percentage
  connections: string[]; // target node IDs
  usage: string;
}

const SKILL_NODES: Node[] = [
  // Languages
  { id: "python", label: "Python", category: "languages", x: 25, y: 30, connections: ["flask", "langchain", "gemini"], usage: "Core language for Flask backend architectures and LangChain LLM scripts." },
  { id: "java", label: "Java", category: "languages", x: 15, y: 45, connections: ["postgresql"], usage: "Used for enterprise REST APIs and database object mapping." },
  { id: "c", label: "C", category: "languages", x: 18, y: 15, connections: ["arduino"], usage: "Low-level system logic; used in IoT hardware code (Arduino)." },
  { id: "sql", label: "SQL", category: "languages", x: 40, y: 70, connections: ["postgresql", "mongodb"], usage: "Relational queries, index optimizations, and data mapping." },

  // Frameworks
  { id: "flask", label: "Flask", category: "frameworks", x: 45, y: 20, connections: ["python", "gemini", "vapi"], usage: "Used to build serverless webhook endpoints and REST controllers." },
  { id: "html", label: "HTML/CSS", category: "frameworks", x: 50, y: 80, connections: ["tailwind"], usage: "Frontend layout markup and DOM structures." },
  { id: "tailwind", label: "Tailwind CSS", category: "frameworks", x: 65, y: 85, connections: ["html"], usage: "Clean SaaS layout styles and responsive utility classes." },

  // Tools & Technologies
  { id: "vapi", label: "Vapi Telephony", category: "tools", x: 70, y: 25, connections: ["conversational-ai", "mongodb", "flask"], usage: "Telephony webhook server integration for low-latency voice assistants." },
  { id: "mongodb", label: "MongoDB", category: "tools", x: 75, y: 45, connections: ["vapi", "sql"], usage: "Saves real-time call logs, transcripts, and telemetry details." },
  { id: "postgresql", label: "PostgreSQL", category: "tools", x: 35, y: 55, connections: ["java", "sql"], usage: "Secure relational database schemas with index optimizations." },
  { id: "langchain", label: "LangChain", category: "tools", x: 55, y: 45, connections: ["python", "gemini"], usage: "Orchestrating RAG workflows, prompt variables, and vector retrieval." },
  { id: "gemini", label: "Gemini AI", category: "tools", x: 50, y: 50, connections: ["python", "flask", "langchain"], usage: "Provides adaptive reasoning and structured text generations." },
  { id: "make", label: "Make.com / n8n", category: "tools", x: 82, y: 15, connections: ["vapi", "flask"], usage: "Orchestrates API calls and workflow alert steps." },
  { id: "arduino", label: "Arduino Uno", category: "tools", x: 30, y: 10, connections: ["c"], usage: "Hardware layer for biometric fingerprint verification." },

  // Domain Knowledge
  { id: "conversational-ai", label: "Conversational AI", category: "domains", x: 85, y: 35, connections: ["vapi", "mongodb"], usage: "Primary domain focus: lowering speech latencies and optimizing voice pipelines." },
];

export default function Skills() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const activeNode = SKILL_NODES.find((n) => n.id === hoveredNode);

  // Check if a node is connected to the hovered node
  const isHighlighted = (nodeId: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === nodeId) return true;
    const node = SKILL_NODES.find((n) => n.id === hoveredNode);
    return node?.connections.includes(nodeId) || false;
  };

  return (
    <section id="skills" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block">
            AI Neural Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Technology Ecosystem
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Hover over any node in the neural network below to illuminate related technologies and trace data connections.
          </p>
        </div>

        {/* Interactive Neural Grid Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Live Interactive SVG Network Layer */}
          <div className="lg:col-span-8 glass-panel min-h-[400px] relative overflow-hidden rounded-2xl flex items-center justify-center p-4">
            {/* Background grid details inside network */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {SKILL_NODES.map((node) => 
                node.connections.map((targetId) => {
                  const target = SKILL_NODES.find((n) => n.id === targetId);
                  if (!target) return null;

                  const isLineActive = hoveredNode && (hoveredNode === node.id || hoveredNode === target.id);

                  // Theme inverting line colors
                  const strokeColor = isLineActive
                    ? (isDark ? "rgba(244, 244, 245, 0.45)" : "rgba(9, 9, 11, 0.45)")
                    : (isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(9, 9, 11, 0.04)");
                  
                  const strokeWidth = isLineActive ? 2 : 1;

                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      className={isLineActive ? "animate-dash" : ""}
                      style={{
                        strokeDasharray: isLineActive ? "4" : "none",
                        transition: "stroke 0.3s ease, stroke-width 0.3s ease",
                      }}
                    />
                  );
                })
              )}
            </svg>

            {/* Skill Nodes */}
            <div className="absolute inset-0 w-full h-full z-10">
              {SKILL_NODES.map((node) => {
                const isActive = hoveredNode === node.id;
                const isLinked = isHighlighted(node.id);
                const hasHover = hoveredNode !== null;

                // Color mappings based on category for theme-adaptive visibility
                let badgeColor = "border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/60";
                if (hasHover) {
                  if (isActive) {
                    badgeColor = "border-zinc-950 dark:border-white text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-900 shadow-md scale-105";
                  } else if (isLinked) {
                    badgeColor = "border-zinc-500 dark:border-zinc-500 text-zinc-950 dark:text-zinc-100 bg-white/95 dark:bg-zinc-950/95 shadow-sm";
                  } else {
                    badgeColor = "border-zinc-200/30 dark:border-zinc-800/20 text-zinc-400/20 scale-95 opacity-30";
                  }
                }

                return (
                  <motion.button
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`absolute px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold tracking-wide transition-all cursor-none ${badgeColor}`}
                  >
                    {node.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 2. Interactive Telemetry / Details Panel */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 flex flex-col justify-between rounded-2xl min-h-[300px] lg:min-h-0 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <Brain className="w-5 h-5 text-zinc-400" />
                <h3 className="text-xs font-bold tracking-wide text-zinc-950 dark:text-white uppercase font-mono">
                  Node Telemetry
                </h3>
              </div>

              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-widest block">
                      NODE_ID: {activeNode.id.toUpperCase()}
                    </span>
                    <h4 className="text-base font-bold text-zinc-950 dark:text-white pt-1">
                      {activeNode.label}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[8px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase border border-zinc-200/50 dark:border-zinc-800 mt-2 font-bold">
                      {activeNode.category}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 uppercase block">
                      Project Usage
                    </span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                      {activeNode.usage}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-10 space-y-2 text-zinc-400 dark:text-zinc-500">
                  <Cpu className="w-8 h-8 stroke-[1.2] mx-auto animate-pulse" />
                  <p className="text-xs font-mono">
                    AWAITING_NODE_HOVER...
                  </p>
                </div>
              )}
            </div>

            {/* Quick Summary Tip */}
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 mt-6">
              STATUS: ONLINE &bull; 15 NODES REGISTERED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
