"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/UI/LoadingScreen";
import Hero from "@/components/Hero";
import CurrentRole from "@/components/CurrentRole";
import CurrentFocus from "@/components/CurrentFocus";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Architecture from "@/components/Architecture";
import Projects from "@/components/Projects";
import AILab from "@/components/AILab";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import ResumeViewer from "@/components/ResumeViewer";
import Contact from "@/components/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen flex flex-col justify-between"
      >
        <Hero />
        <CurrentRole />
        <CurrentFocus />
        <About />
        <Skills />
        <Architecture />
        <Projects />
        <AILab />
        <Certifications />
        <Achievements />
        <ResumeViewer />
        <Contact />

        {/* Footer */}
        <footer className="py-8 text-center text-[10px] text-zinc-400 dark:text-zinc-600 font-mono border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/20 dark:bg-zinc-950/10">
          <div>&copy; {new Date().getFullYear()} SANJU SUBASH. ALL RIGHTS RESERVED.</div>
          <div className="mt-1">
            BUILT WITH NEXT.JS &bull; TAILWIND CSS &bull; FRAMER MOTION
          </div>
        </footer>
      </motion.div>
    </>
  );
}
