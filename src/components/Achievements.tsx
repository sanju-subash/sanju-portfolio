"use client";

import { motion } from "framer-motion";
import { TrendingUp, Cpu, GraduationCap, Award } from "lucide-react";

const STATS = [
  {
    icon: GraduationCap,
    val: "7.25 / 10",
    title: "MCA CGPA",
    desc: "Average score across Integrated MCA database and programming course works.",
  },
  {
    icon: Award,
    val: "86.0%",
    title: "Class XII Score",
    desc: "Graduated Commerce stream under Kerala State Education Board syllabus.",
  },
  {
    icon: TrendingUp,
    val: "820ms",
    title: "Vapi Voice Delay",
    desc: "Round-trip telephony latencies measured during active conversational testing.",
  },
  {
    icon: Cpu,
    val: "100%",
    title: "Data Integrity",
    desc: "Zero ballot impersonation rates logged in biometric voting hardware tests.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Achievements
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Performance Metrics & Scores
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Key academic grades, biometric verification ratings, and connection metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-card p-6 rounded-xl space-y-3 shadow-md"
              >
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white w-fit shrink-0">
                  <Icon className="w-4.5 h-4.5 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <span className="text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-mono block">
                    {item.val}
                  </span>
                  <h3 className="text-xs font-bold text-zinc-950 dark:text-white uppercase font-mono tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans pt-1 font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
