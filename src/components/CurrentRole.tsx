"use client";

import { motion } from "framer-motion";

export default function CurrentRole() {
  return (
    <section id="role" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center md:text-left mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Current Status
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Active Position
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6 sm:p-8 shadow-md"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-955 dark:text-zinc-100 font-mono mb-3">
                  FULL-TIME ROLE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-955 dark:text-white">
                  Junior Software Engineer - AI/ML
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-bold font-mono">
                  Nimir Corporation &bull; Remote (USA Overlap)
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-2 shrink-0" />
                  <span>
                    Engineered scalable enterprise communication systems, integrating <strong>Vapi</strong> for automated inbound voice agents and <strong>MongoDB</strong> for real-time call data storage and retrieval.
                  </span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-2 shrink-0" />
                  <span>
                    Architected scalable backend pipelines utilizing <strong>Python</strong>, <strong>Flask</strong>, and <strong>LangChain</strong>, seamlessly connected to responsive frontend interfaces.
                  </span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-2 shrink-0" />
                  <span>
                    Translated business requirements into production-ready full-stack AI solutions while maintaining strict data privacy models for real-time enterprise test cases.
                  </span>
                </div>
              </div>
            </div>

            {/* Stats/Metrics column */}
            <div className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-col gap-4 border-t md:border-t-0 md:border-l border-zinc-300 dark:border-zinc-800 pt-6 md:pt-0 md:pl-8 min-w-[200px] shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono block font-bold">
                  TIMEFRAME
                </span>
                <span className="text-xs font-bold text-zinc-950 dark:text-white">
                  Mar 2026 - Present
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono block font-bold">
                  TECH STACK
                </span>
                <span className="text-xs font-bold text-zinc-950 dark:text-white">
                  Flask, Vapi, MongoDB
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono block font-bold">
                  ORCHESTRATION
                </span>
                <span className="text-xs font-bold text-zinc-950 dark:text-white">
                  LangChain RAG
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-500 font-mono block font-bold">
                  SYSTEM STATUS
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ACTIVE LAB
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
