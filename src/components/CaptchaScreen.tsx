"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onComplete: () => void;
};

export default function CaptchaScreen({ onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (loading || checked) return;
    setChecked(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2200);
  };

  return (
    <motion.div
      key="captcha"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[400px] rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      {/* Main widget area - reCAPTCHA style */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={handleCheck}
          disabled={loading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 disabled:pointer-events-none"
          style={{
            borderColor: checked ? "#1a73e8" : "#dadce0",
            backgroundColor: checked ? "#1a73e8" : "transparent",
          }}
          aria-label="Verify you are human"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
            />
          ) : checked ? (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : null}
        </button>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-zinc-800">I&apos;m not a robot</p>
          {loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Verifying…
            </motion.p>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[10px] text-zinc-400">Protected by</span>
            <span className="text-[10px] font-medium text-zinc-500">SecureCheck</span>
          </div>
        </div>
      </div>

      {/* Footer - privacy/terms style */}
      <p className="mt-4 text-[10px] leading-relaxed text-zinc-400">
        This site is protected by SecureCheck. By continuing, you agree to our{" "}
        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        {" "}and{" "}
        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>.
      </p>
    </motion.div>
  );
}
