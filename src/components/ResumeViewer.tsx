"use client";

import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2 } from "lucide-react";

export default function ResumeViewer() {
  return (
    <section id="resume" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Curriculum Vitae
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Resume & Technical Profile
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Download or view my complete technical profile detailing software engineering, AI voice systems, and backend experience.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 max-w-2xl mx-auto shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left w-full sm:w-auto">
              <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white shrink-0 shadow-sm">
                <FileText className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  Sanju_Subash_Resume.pdf
                </h3>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono font-bold">
                  Size: ~120 KB &bull; Format: PDF
                </p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-650 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  Verified Recruiter-Friendly Layout
                </div>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download="Sanju_Subash_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-none"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
