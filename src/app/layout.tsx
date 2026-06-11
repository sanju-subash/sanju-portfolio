import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/Header";
import AmbientBg from "@/components/UI/AmbientBg";
import CustomCursor from "@/components/UI/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanju Subash | AI/ML & Software Engineer",
  description:
    "Portfolio of Sanju Subash - AI/ML Junior Software Engineer, Cloud & Backend Developer, Automation & AI Voice Agent Builder. Specialized in Vapi, n8n, Cloud Run, Node.js, and Spring Boot.",
  keywords: [
    "Sanju Subash",
    "AI Junior Software Engineer",
    "Software Engineer",
    "Automation Developer",
    "Cloud & Backend Developer",
    "AI Voice Agent Builder",
    "Workflow Automation Engineer",
    "Vapi",
    "n8n",
    "Google Cloud Run",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Sanju Subash" }],
  openGraph: {
    title: "Sanju Subash | AI/ML & Software Engineer",
    description:
      "Explore the engineering portfolio of Sanju Subash - specializing in custom automation workflows, AI voice agents, and cloud systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <AmbientBg />
        <CustomCursor />
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
