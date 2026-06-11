"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

interface ExpItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  achievements: string[];
  skills: string[];
}

const EXPERIENCE_DATA: ExpItem[] = [
  {
    role: "Junior Software Engineer - AI/ML",
    company: "Nimir Corporation",
    location: "Remote (USA Overlap)",
    duration: "Mar 2026 - Present (Promoted to Full-Time)",
    achievements: [
      "Transitioned from Full Stack AI/ML Developer Intern to a permanent full-time Junior Software Engineer role.",
      "Engineered scalable enterprise communication systems, integrating Vapi for automated inbound voice agents and MongoDB for real-time call data storage and retrieval.",
      "Architected scalable backend pipelines utilizing Python, Flask, and LangChain, seamlessly connected to responsive frontend interfaces.",
      "Translated confidential business requirements into production-ready full-stack AI solutions while maintaining strict data privacy for real-time business cases."
    ],
    skills: ["Vapi", "MongoDB", "Python", "Flask", "LangChain", "Full-Stack AI"],
  },
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            History
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Professional Experience
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Click any position panel below to view full accomplishments and technical achievements.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {EXPERIENCE_DATA.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={item.role + item.company}
                className="glass-panel overflow-hidden shadow-md"
              >
                {/* Header Selector */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-zinc-400 shrink-0" />
                      <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                        {item.role}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-400 font-bold">
                      {item.company} &bull; <span className="font-normal">{item.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {item.duration}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-zinc-400"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                {/* Achievements Panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden bg-zinc-50/20 dark:bg-zinc-950/10"
                    >
                      <div className="p-5 space-y-4">
                        <div className="space-y-3">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-zinc-500 dark:text-zinc-500 block font-bold">
                            Key Achievements & Contributions:
                          </span>
                          <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans list-none pl-0">
                            {item.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex gap-2.5 items-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white mt-1.5 shrink-0" />
                                <span className="leading-relaxed font-medium">{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Experience Skills tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.skills.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 font-bold"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
