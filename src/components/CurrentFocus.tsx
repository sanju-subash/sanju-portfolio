"use client";

import { motion } from "framer-motion";
import { Mic, GitBranch, Cpu, Code2, Database, Layers } from "lucide-react";

const FOCUS_ITEMS = [
  {
    icon: Mic,
    title: "Conversational AI",
    description: "Configuring real-time telephony agents with Vapi, lowering speech-to-text response loops, and routing function calls dynamically.",
    tech: "Vapi, WebRTC, Telephony",
  },
  {
    icon: GitBranch,
    title: "Workflow Automation",
    description: "Designing workflows in n8n and Make.com to process webhooks, parse text structures, and synchronize logs in databases.",
    tech: "n8n, Make.com, Webhooks",
  },
  {
    icon: Cpu,
    title: "LLM Orchestration",
    description: "Engineering prompts and building stateful pipelines using LangChain and Gemini AI to fetch verified structured answers.",
    tech: "LangChain, Gemini AI, RAG",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Developing APIs using Flask (Python) and building frontend dashboards with React and Svelte interfaces.",
    tech: "Flask, React, Svelte, Tailwind",
  },
  {
    icon: Database,
    title: "Database Engineering",
    description: "Configuring schema indexes in PostgreSQL and logging transcripts in MongoDB. Tuning SQL execution parameters.",
    tech: "PostgreSQL, MongoDB, PocketBase",
  },
  {
    icon: Layers,
    title: "Solutions Architecture",
    description: "Configuring deployments on AWS Elastic Beanstalk and writing build tasks inside automated GitHub pipelines.",
    tech: "AWS Beanstalk, Git, GitHub Actions",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function CurrentFocus() {
  return (
    <section id="focus" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center md:text-left mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-mono block">
            Core Skills Focus
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Active Initiatives
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl">
            Key areas of software engineering and systems integration I currently design and build.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FOCUS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="glass-card p-6 flex flex-col justify-between h-56 rounded-xl"
              >
                <div className="space-y-3">
                  <div className="p-2 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                    <Icon className="w-4.5 h-4.5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1 font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-4">
                  {item.tech}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
