"use client";

import Image from "next/image";
import Main from "@/asset/image/mainLogo.png"
import { useEffect, useState } from "react";


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
    <div className="min-h-screen grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="hidden md:flex flex-col  items-center justify-center bg-[#e5f5f9] gap-4">
        <Image src={Main} alt="Logo" width={220} height={220} />

        <p className="text-lg font-sans font-medium text-black text-center max-w-xs transition-opacity duration-500">
          {text}
        </p>
      </div>

      {children}
    </div>
  );
}