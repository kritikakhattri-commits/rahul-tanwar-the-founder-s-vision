import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

export const luxuryEase = [0.2, 0.7, 0.2, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: luxuryEase },
  },
};

export const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

export function useLocalParallax(
  outputRange: [number, number],
  offset: Parameters<typeof useScroll>[0]["offset"] = ["start end", "end start"],
): [RefObject<HTMLDivElement | null>, MotionValue<number>] {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], outputRange);

  return [ref, y];
}
