"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check initial theme class on html
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-5 h-5 flex items-center justify-center text-zinc-900 dark:text-zinc-100"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 stroke-[1.5]" />
        ) : (
          <Moon className="w-4 h-4 stroke-[1.5]" />
        )}
      </motion.div>
    </button>
  );
}
