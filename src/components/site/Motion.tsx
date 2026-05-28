import { fadeUp, luxuryEase, staggerGroup } from "@/components/site/motion-config";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";

export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export function StackedCard({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 18%"],
  });
  const y = useTransform(scrollYProgress, [0, 0.55, 1], reduceMotion ? [0, 0, 0] : [34, 0, -18]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    reduceMotion ? [1, 1, 1] : [0.975, 1, 0.986],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.82, 1], [0.55, 1, 1, 0.86]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, scale, opacity }}
      initial={{ filter: "blur(12px)" }}
      whileInView={{ filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: Math.min(index * 0.07, 0.28), ease: luxuryEase }}
      whileHover={{
        y: -8,
        scale: 1.012,
        transition: { duration: 0.45, ease: luxuryEase },
      }}
    >
      {children}
    </motion.div>
  );
}
