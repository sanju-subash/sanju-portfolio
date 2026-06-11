"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Calendar } from "lucide-react";

const TIMELINE = [
  {
    year: "2022 - 2027 (Expected)",
    title: "Integrated MCA (Master of Computer Applications)",
    institution: "Amrita Vishwa Vidyapeetham, ASAS Kochi",
    desc: "Focusing on Database Management Systems, Data Structures, Machine Learning, and Software Engineering. Current CGPA: 7.25 / 10.",
  },
  {
    year: "2022",
    title: "Class XII (Kerala State Board - Commerce)",
    institution: "KCP Higher Secondary School, Kavassery",
    desc: "Completed commerce stream modules. Graduated with a score of 86%.",
  },
  {
    year: "2020",
    title: "Class X (CBSE)",
    institution: "Bhavans Vidya Mandir, Palakkad",
    desc: "Completed secondary education syllabus. Graduated with a score of 72%.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center md:text-left mb-12"
        >
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block">
            Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Professional Narrative & Education
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-8 bg-white/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800 space-y-6 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white font-mono uppercase tracking-wide">
                About Me
              </h3>
            </div>

            <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 space-y-4 font-sans leading-relaxed font-medium">
              <p>
                Hi, I'm Sanju Subash. I am currently pursuing an **Integrated MCA** at **Amrita Vishwa Vidyapeetham** 
                and working as a **Junior Software Engineer - AI/ML** at Nimir Corporation. My coding focus is centered 
                around building automated webhook workflows, speech telephony interfaces (using Vapi), and backend databases.
              </p>
              <p>
                I enjoy bridging the gap between raw backend services and cognitive language models. Rather than just deploying 
                isolated scripts, I focus on containerizing APIs (via Docker), setting up secure VPC configurations, and structuring 
                RAG retrieval logic using Flask, LangChain, and databases.
              </p>
              <p>
                My goals involve mastering cloud solutions architecture (AWS/GCP), designing distributed backend databases, and 
                deploying highly optimized integrations that improve operational productivity.
              </p>
            </div>
          </motion.div>

          {/* Timeline Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 dark:text-white font-mono uppercase tracking-wide">
                Academic Timeline
              </h3>
            </div>

            <div className="border-l border-zinc-300 dark:border-zinc-800 ml-4 pl-6 space-y-6 relative">
              {TIMELINE.map((item) => (
                <div key={item.year} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-950 dark:group-hover:bg-white transition-colors border-4 border-zinc-50 dark:border-zinc-950" />
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wide font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 font-mono">
                      {item.institution}
                    </p>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans pt-0.5 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
