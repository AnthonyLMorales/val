"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { VALENTINE_IMAGES } from "@/lib/constants";

type Props = {
  onComplete: () => void;
};

export default function ImageChallengeScreen({ onComplete }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showError, setShowError] = useState(false);

  const toggle = (i: number) => {
    setShowError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const handleConfirm = () => {
    if (selected.size < VALENTINE_IMAGES.length) {
      setShowError(true);
      return;
    }
    onComplete();
  };

  return (
    <motion.div
      key="challenge"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[400px] rounded-lg border border-zinc-200 bg-white shadow-sm"
    >
      {/* Header bar - challenge prompt + refresh */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-zinc-800">
            Select all images that apply
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">
            Choose who you want to be your Valentine
          </p>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
          aria-label="Get new challenge"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Image grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-1.5">
          {VALENTINE_IMAGES.map((src, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className="relative aspect-square overflow-hidden rounded-sm border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1"
              style={{
                borderColor: selected.has(i) ? "#1a73e8" : "#dadce0",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={src}
                alt={`Selection ${i + 1}`}
                fill
                sizes="(max-width: 400px) 33vw, 120px"
                className="object-cover"
                unoptimized
              />
              {selected.has(i) && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1a73e8] text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            className="text-xs text-blue-600 hover:underline"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-zinc-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700 active:scale-[0.99]"
          >
            Verify
          </button>
        </div>

        <AnimatePresence>
          {showError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-center text-xs text-rose-500"
            >
              Hmm… look carefully 👀
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-4 py-2">
        <p className="text-[10px] leading-relaxed text-zinc-400">
          This site is protected by SecureCheck.{" "}
          <a href="#" className="text-blue-600 hover:underline">Privacy</a>
          {" · "}
          <a href="#" className="text-blue-600 hover:underline">Terms</a>
        </p>
      </div>
    </motion.div>
  );
}
