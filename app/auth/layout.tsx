"use client";

import Image from "next/image";
import Main from "@/asset/image/mainLogo.png";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const sentences = [
  "Smart queues make life easier.",
  "No more waiting in long lines.",
  "Efficiency starts with better systems.",
  "Technology that respects your time.",
  "Queue smarter, not longer.",
  "Simple solutions for complex problems.",
  "Your time matters.",
  "Built for speed and clarity.",
  "Smart Queue, smart choice.",
  "Modern problems need modern queues.",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [text, setText] = useState(sentences[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setText(sentences[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#0f6587] lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-5 lg:p-12">
        <div className="absolute -left-24 top-12 size-72 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute -bottom-20 right-0 size-80 rounded-full bg-blue-900/25 blur-3xl" />
        <div className="relative w-[220px] h-[220px]">
          <Image
            src={Main}
            alt="Logo"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>

        <p className="relative max-w-sm text-center text-lg font-medium leading-8 text-white/90 transition-opacity duration-500">
          {text}
        </p>
        <p className="relative text-sm text-white/60">Built for calmer, faster service.</p>
      </aside>

      <main className="relative min-w-0 bg-[radial-gradient(circle_at_top_right,rgba(21,122,162,0.12),transparent_35%)]">{children}</main>
      <Toaster />
    </div>
  );
}
