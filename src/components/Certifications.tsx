"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Milestone } from "lucide-react";

interface Item {
  title: string;
  issuer: string;
  date: string;
  desc: string;
}

const CERTIFICATIONS: Item[] = [
  {
    title: "Walmart USA Advanced Software Engineering Virtual Experience",
    issuer: "Forage",
    date: "Jan 2026",
    desc: "Implemented a custom Java heap data structure to optimize queue workflows. Designed system UML diagrams and ERDs for data mapping.",
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase",
    date: "May 2025",
    desc: "Integrated Apache Kafka for event-driven message dispatch architecture. Developed transactional REST APIs using Spring Boot and H2 database.",
  },
  {
    title: "Solutions Architecture Virtual Experience",
    issuer: "AWS APAC",
    date: "Jul 2025",
    desc: "Designed scalable hosting infrastructures on AWS utilizing Elastic Beanstalk routing models.",
  },
];

const ACHIEVEMENTS: Item[] = [
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Jun 2025",
    desc: "Validated fundamental cloud concepts, security variables, database engines, and billing options.",
  },
  {
    title: "Basics in Senior Programming",
    issuer: "GTEC Computer Education",
    date: "Sep 2022",
    desc: "Completed foundational programming syllabus, focusing on algorithm layouts and basic code compilation syntax.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Certifications & Training
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            A repository of completed job simulations, cloud credentials, and technical workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certifications column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-bold tracking-wide uppercase font-mono text-zinc-950 dark:text-white">
                Technical Badges & Simulators
              </h3>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((item) => (
                <div
                  key={item.title}
                  className="glass-panel p-5 rounded-xl space-y-1.5 shadow-md hover:border-zinc-950 dark:hover:border-zinc-200 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start text-xs gap-3">
                    <h4 className="font-extrabold text-zinc-950 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold font-mono">
                    {item.issuer}
                  </p>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pt-1 font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic & Milestones column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white shrink-0">
                <Milestone className="w-4 h-4 stroke-[1.5]" />
              </div>
              <h3 className="text-sm font-bold tracking-wide uppercase font-mono text-zinc-950 dark:text-white">
                Training Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.title}
                  className="glass-panel p-5 rounded-xl space-y-1.5 shadow-md hover:border-zinc-950 dark:hover:border-zinc-200 transition-colors duration-300"
                >
                  <div className="flex justify-between items-start text-xs gap-3">
                    <h4 className="font-extrabold text-zinc-950 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold font-mono">
                    {item.issuer}
                  </p>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pt-1 font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
