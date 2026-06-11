"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

// FORMSPREE ID CONFIGURATION
// Replace "PLACEHOLDER_ID" with your real Formspree endpoint ID to receive messages in your inbox.
const FORMSPREE_FORM_ID = "PLACEHOLDER_ID";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please supply a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", message: "" });
        
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#09090b", "#71717a", "#a1a1aa"],
        });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Form submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      if (FORMSPREE_FORM_ID === "PLACEHOLDER_ID") {
        setStatus("success");
        console.warn("Formspree ID is set to PLACEHOLDER_ID. Simulating successful submit.");
        setFormData({ name: "", company: "", email: "", message: "" });
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } else {
        setStatus("error");
        setErrorMessage(err.message || "Failed to send data packet. Verify network connection.");
      }
    }
  };

  return (
    <section id="contact" className="py-20 relative border-t border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-2 text-center md:text-left mb-12">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono block font-bold">
            Communications
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white font-sans">
            Secure Contact Portal
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
            Recruiters, founders, and managers can transmit packets directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Quick Info Grid */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-wide uppercase font-mono text-zinc-950 dark:text-white">
                Contact Credentials
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-medium">
                For urgent inquiries, full-time engineering positions, or contracting discussions, feel free to leverage these channels.
              </p>

              <div className="space-y-3 pt-3">
                <a
                  href="mailto:KH.EN.I5MCA22094@kh.students.amrita.edu"
                  className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none font-bold"
                >
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="truncate">KH.EN.I5MCA22094@kh.students.amrita.edu</span>
                </a>
                <a
                  href="tel:7736683583"
                  className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none font-bold"
                >
                  <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                  7736683583
                </a>
                <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 cursor-default font-bold">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                  Sri Janaki Raman
                </div>
                <a
                  href="https://linkedin.com/in/sanju-subash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none font-bold"
                >
                  <svg className="w-4 h-4 text-zinc-400 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  linkedin.com/in/sanju-subash
                </a>
                <a
                  href="https://github.com/sanju-subash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-none font-bold"
                >
                  <svg className="w-4 h-4 text-zinc-400 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  github.com/sanju-subash
                </a>
              </div>
            </div>

            {FORMSPREE_FORM_ID === "PLACEHOLDER_ID" && (
              <div className="p-3.5 rounded-lg border border-yellow-200/50 dark:border-yellow-900/30 bg-yellow-50/20 dark:bg-yellow-950/10 text-[10px] text-yellow-700 dark:text-yellow-400 font-mono font-bold">
                <span className="font-bold">ADMIN NOTE:</span> Replace Formspree ID inside <code>src/components/Contact.tsx</code> to receive actual email submissions.
              </div>
            )}
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "success" && (
                <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-300 dark:border-emerald-800 flex items-start gap-3 text-xs text-emerald-800 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Transmission Complete:</span> Your message has been sent successfully. I will review and reply shortly!
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg bg-rose-50/50 dark:bg-rose-955/10 border border-rose-300 dark:border-rose-800 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-400 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Validation Error:</span> {errorMessage}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-bold">
                    Full Name <span className="text-zinc-950 dark:text-white">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/50 text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors disabled:opacity-50 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-bold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === "submitting" || status === "success"}
                    placeholder="Enter company name"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/50 text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors disabled:opacity-50 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-bold">
                  Email Address <span className="text-zinc-950 dark:text-white">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "submitting" || status === "success"}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/50 text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors disabled:opacity-50 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400 font-bold">
                  Message <span className="text-zinc-950 dark:text-white">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "submitting" || status === "success"}
                  placeholder="Enter message description..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/50 text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors disabled:opacity-50 resize-none font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm disabled:opacity-55 cursor-none"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Transmitting Packet...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Transmit Packet
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
