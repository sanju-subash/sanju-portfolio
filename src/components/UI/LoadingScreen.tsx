"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  "Initializing Portfolio...",
  "Loading Projects...",
  "Loading Architecture...",
  "Ready.",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Increment stages over time
    const stageIntervals = [800, 1500, 2200, 2800];
    const timers = stageIntervals.map((time, idx) =>
      setTimeout(() => {
        setStageIndex(idx);
      }, time)
    );

    // Progress bar speed
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsFinished(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // ~3 seconds total

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // short delay after "Ready."
      return () => clearTimeout(timer);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-zinc-500 dark:text-zinc-400 select-none"
      >
        <div className="w-80 space-y-4 px-4">
          {/* Decrypting Logs */}
          <div className="space-y-1.5 min-h-[5.5rem] flex flex-col justify-end">
            {STAGES.slice(0, stageIndex + 1).map((stage, idx) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  idx === STAGES.length - 1
                    ? "text-zinc-900 dark:text-zinc-100 font-bold"
                    : ""
                }
              >
                <span className="text-zinc-400 dark:text-zinc-600 mr-2">&gt;</span>
                {stage}
              </motion.div>
            ))}
          </div>

          {/* Progress Slider */}
          <div className="space-y-1">
            <div className="h-[2px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-zinc-900 dark:bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-600">
              <span>SYSTEM_INIT</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
