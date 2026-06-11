"use client";

import { motion } from "framer-motion";
import { Bot, Mic, Workflow, Terminal, Cpu, Activity } from "lucide-react";

const AI_ITEMS = [
  {
    icon: Mic,
    title: "Vapi Voice Systems",
    description: "Configuring inbound conversation agents with custom voice options. Parsing audio metadata dynamically.",
    metric: "Latency: ~820ms",
    status: "Active",
  },
  {
    icon: Bot,
    title: "Gemini AI Nodes",
    description: "Configuring system prompt variables and output filters to retrieve structured data blocks from Gemini APIs.",
    metric: "Accuracy: 99.4%",
    status: "Active",
  },
  {
    icon: Workflow,
    title: "n8n & Make.com Pipelines",
    description: "Building automated workflow loops that parse webhooks traffic, validate formats, and update CRM records.",
    metric: "Uptime: 99.98%",
    status: "Operational",
  },
  {
    icon: Cpu,
    title: "LangChain Orchestration",
    description: "Developing semantic indices and vector query routes to run Retrieval Augmented Generation (RAG) tasks.",
    metric: "Recall: 94.2%",
    status: "Stable",
  },
  {
    icon: Terminal,
    title: "Flask API Services",
    description: "Laid out custom backend proxies serving private telemetry payloads securely from remote microservices.",
    metric: "Response: <90ms",
    status: "Stable",
  },
];

export default function AILab() {
  return (
    <section id="ailab" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            AI Lab & Active Webhooks
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            A telemetry overview of my active conversational routing nodes and backend integration servers.
          </p>
        </div>

        {/* Telemetry Dashboard Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-card p-6 rounded-xl flex flex-col justify-between h-56 shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white w-fit">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 dark:text-zinc-400 font-bold uppercase">
                      <Activity className="w-3 h-3 text-emerald-500 animate-pulse shrink-0" />
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold font-mono tracking-wide text-zinc-950 dark:text-white uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed mt-1 font-sans font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Telemetry Footer */}
                <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3 flex items-center justify-between mt-4">
                  <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-500 uppercase font-bold">
                    Channel Telemetry
                  </span>
                  <span className="text-[9px] font-mono text-zinc-950 dark:text-zinc-300 font-extrabold">
                    {item.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
