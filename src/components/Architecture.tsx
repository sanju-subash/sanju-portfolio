"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Settings, Play, Database, CheckCircle, ArrowRight } from "lucide-react";

interface DiagramNode {
  label: string;
  desc: string;
  icon?: any;
}

interface SystemFlow {
  title: string;
  description: string;
  nodes: DiagramNode[];
}

const FLOWS: SystemFlow[] = [
  {
    title: "Vapi → n8n → MongoDB (Voice Portal)",
    description: "Automated inbound voice agent calling telephony hooks, parsed dynamically in n8n pipelines, and committed to MongoDB call records.",
    nodes: [
      { label: "Vapi Voice Input", desc: "User phone stream ingested via WebRTC / SIP links", icon: Play },
      { label: "n8n Webhook Node", desc: "API payload parsing and metadata extraction", icon: Settings },
      { label: "MongoDB Records", desc: "Saves raw audio session transcript logs", icon: Database },
    ],
  },
  {
    title: "Innovative Hiring (Gemini AI Recruiter)",
    description: "Adaptive interview recruitment portal using React UI, Flask API layers, and Gemini AI for dynamic question generation.",
    nodes: [
      { label: "React Dashboard", desc: "Recruiter and candidate interactive layouts", icon: Play },
      { label: "Flask API Gateway", desc: "Authenticates users and proxies Gemini prompts", icon: Settings },
      { label: "Gemini AI Engine", desc: "Generates dynamic questions and candidate scores", icon: Settings },
      { label: "PostgreSQL Database", desc: "Saves structured user responses", icon: Database },
    ],
  },
  {
    title: "Campus Voting IoT Security System",
    description: "Secure biometric voting pipeline connecting Arduino hardware authentication with isolated PocketBase backend validation.",
    nodes: [
      { label: "Fingerprint Scanner", desc: "Hardware scanner reading fingerprint lines", icon: Play },
      { label: "Arduino Uno Controller", desc: "Verifies matching template records", icon: Settings },
      { label: "Svelte UI Interface", desc: "Displays real-time voter validation panels", icon: Settings },
      { label: "PocketBase Backend", desc: "Encrypts candidate vote transactions", icon: CheckCircle },
    ],
  },
  {
    title: "AWS Elastic Beanstalk Gateway",
    description: "Scaled cloud deployment routing HTTP traffic to web servers running isolated Flask app modules.",
    nodes: [
      { label: "Client Request", desc: "HTTP traffic reaching server endpoint", icon: Play },
      { label: "Elastic Beanstalk Proxy", desc: "Balances request loads across instances", icon: Settings },
      { label: "Flask Web Application", desc: "Processes database lookups", icon: Settings },
      { label: "Relational Database", desc: "Persists records in private subnets", icon: Database },
    ],
  },
];

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFlow = FLOWS[activeTab];

  return (
    <section id="architecture" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Interactive System Flowcharts
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Explore live data packet routing and structural layout mapping of my core projects.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8 border-b border-zinc-200/40 dark:border-zinc-800/40 pb-4">
          {FLOWS.map((flow, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={flow.title}
                onClick={() => setActiveTab(idx)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-md border tracking-wider transition-all cursor-none ${
                  isActive
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                    : "bg-white/80 dark:bg-zinc-900/80 border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700"
                }`}
              >
                {flow.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Viewer Card */}
        <div className="glass-panel p-6 sm:p-8 shadow-lg">
          <div className="space-y-3 mb-10">
            <h3 className="text-sm font-bold text-zinc-950 dark:text-white font-mono uppercase tracking-wide">
              {activeFlow.title}
            </h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans max-w-2xl font-medium">
              {activeFlow.description}
            </p>
          </div>

          {/* Interactive SVG Flow Diagram */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 py-8 px-4 overflow-x-auto no-scrollbar">
            {activeFlow.nodes.map((node, nodeIdx) => {
              const NodeIcon = node.icon || Settings;
              const isLast = nodeIdx === activeFlow.nodes.length - 1;

              return (
                <div key={node.label} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                  {/* Node Panel */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: nodeIdx * 0.08 }}
                    className="w-full lg:w-60 p-4 border border-zinc-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 rounded-lg shadow-sm flex items-start gap-3 relative overflow-hidden"
                  >
                    {/* Glowing pulse indicator */}
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 pulse-glow" />

                    <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white shrink-0 mt-0.5">
                      <NodeIcon className="w-3.5 h-3.5" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-[11px] sm:text-xs font-bold text-zinc-950 dark:text-white font-mono leading-tight">
                        {node.label}
                      </h4>
                      <p className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans pt-0.5 font-medium">
                        {node.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Flow Arrow */}
                  {!isLast && (
                    <div className="flex items-center justify-center py-4 lg:py-0 lg:px-4 text-zinc-400 dark:text-zinc-500">
                      <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
