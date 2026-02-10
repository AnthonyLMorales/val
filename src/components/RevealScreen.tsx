"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import HeartsBackground from "./HeartsBackground";

type Props = {
  onComplete?: () => void;
};

function runConfetti() {
  const count = 120;
  const defaults = { origin: { y: 0.6 }, zIndex: 50 };
  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
  }
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

export default function RevealScreen(_props: Props) {
  const [answered, setAnswered] = useState(false);

  const handleYes = () => {
    if (answered) return;
    setAnswered(true);
    runConfetti();
  };

  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-100 to-rose-200 px-6 py-12"
    >
      <HeartsBackground />
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-lg text-rose-800/90 sm:text-xl"
        >
          Verification Complete 💘
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-3 text-base text-rose-700/85 sm:text-lg"
        >
          You have successfully chosen your Valentine.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-8 text-2xl font-semibold text-rose-900 sm:text-3xl md:text-4xl"
        >
          Will you be mine? ❤️
        </motion.p>
        {!answered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <motion.button
              type="button"
              onClick={handleYes}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-rose-500 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-rose-300/50 transition-colors hover:bg-rose-600"
            >
              Yes 💕
            </motion.button>
            <motion.button
              type="button"
              onClick={handleYes}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-2 border-rose-400 bg-white/80 px-8 py-3.5 text-base font-medium text-rose-700 transition-colors hover:bg-rose-50"
            >
              Absolutely Yes 💖
            </motion.button>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 text-xl font-medium text-rose-800 sm:text-2xl"
          >
            Best decision ever 😌❤️
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
