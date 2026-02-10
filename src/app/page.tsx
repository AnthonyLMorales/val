"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Step } from "@/lib/constants";
import CaptchaScreen from "@/components/CaptchaScreen";
import ImageChallengeScreen from "@/components/ImageChallengeScreen";
import RevealScreen from "@/components/RevealScreen";

export default function Home() {
  const [step, setStep] = useState<Step>("captcha");

  return (
    <main className="flex min-h-dvh w-full items-center justify-center">
      <AnimatePresence mode="wait">
        {step === "captcha" && (
          <div className="flex w-full justify-center px-4 py-8">
            <CaptchaScreen onComplete={() => setStep("challenge")} />
          </div>
        )}
        {step === "challenge" && (
          <div className="flex w-full justify-center px-4 py-8">
            <ImageChallengeScreen onComplete={() => setStep("reveal")} />
          </div>
        )}
        {step === "reveal" && <RevealScreen />}
      </AnimatePresence>
    </main>
  );
}
