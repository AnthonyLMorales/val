/**
 * Images from public/images/ — paths are relative to the public folder.
 */
export const VALENTINE_IMAGES = [
  "/images/IMG_02991.jpeg",
  "/images/IMG_0961.jpeg",
  "/images/IMG_1788.jpeg",
  "/images/IMG_1938.jpeg",
  "/images/IMG_2146.jpeg",
  "/images/IMG_2645.jpeg",
  "/images/IMG_3708.jpeg",
  "/images/IMG_3733.jpeg",
  "/images/IMG_4341.jpeg",
] as const;

export type Step = "captcha" | "challenge" | "reveal";
