"use client";

import { motion } from "framer-motion";

const HEARTS = ["❤️", "💕", "💗", "💖", "💘", "🌸"];

export default function HeartsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.flatMap((heart, i) =>
        Array.from({ length: 8 }, (_, j) => (
          <motion.span
            key={`${i}-${j}`}
            className="absolute text-2xl opacity-40 sm:text-3xl"
            style={{
              left: `${(i * 17 + j * 11) % 100}%`,
              top: -40,
            }}
            animate={{
              y: [0, 900],
              x: [0, (j % 3 - 1) * 20],
              opacity: [0.4, 0.2],
            }}
            transition={{
              duration: 12 + j * 2 + i,
              repeat: Infinity,
              delay: j * 1.5 + i * 0.5,
            }}
          >
            {heart}
          </motion.span>
        ))
      )}
    </div>
  );
}
