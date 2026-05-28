import heroImg from "@/assets/rahul-hero.jpg";
import { fadeUp, luxuryEase, staggerGroup } from "@/components/site/motion-config";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 68]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.11]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.9]);
  const sweepY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const lineY = useTransform(scrollYProgress, [0, 1], [0, 46]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen overflow-hidden pt-24 md:pt-22 lg:pt-24"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: sweepY }}
        className="pointer-events-none absolute right-0 top-32 h-px w-[42vw] bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: lineY }}
        className="pointer-events-none absolute left-6 top-36 hidden h-40 w-px bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 md:block"
      />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 items-start gap-10 px-6 pb-12 md:px-10 md:pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-center lg:gap-14 lg:pb-10 xl:gap-20">
        {/* LEFT — typography */}
        <motion.div
          style={{ y: copyY }}
          className="flex min-h-0 min-w-0 flex-col justify-center py-4 md:py-6 lg:min-h-[calc(100svh-10rem)] lg:py-0"
        >
          <motion.div
            className="w-full max-w-full space-y-6 lg:max-w-[920px]"
            variants={staggerGroup}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="hero-title font-display text-foreground"
              variants={{
                hidden: { opacity: 0, y: 42, filter: "blur(14px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 1.25, ease: luxuryEase },
                },
              }}
            >
              <span className="whitespace-nowrap">
                Rahul <span className="italic text-accent">Tanwar</span>
              </span>
            </motion.h1>

            <motion.p
              className="font-display text-display-md text-foreground/90 max-w-[19ch]"
              variants={fadeUp}
            >
              Building businesses that create <em className="text-accent">lasting value.</em>
            </motion.p>

            <motion.p
              className="w-full max-w-[calc(100vw-3rem)] text-base leading-[1.75] text-ink-soft md:max-w-xl md:text-lg"
              variants={fadeUp}
            >
              Entrepreneur, founder, investor and business leader building ventures across
              beverages, consumer brands, textiles, manufacturing, finance and innovation-led
              industries.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3 pt-4" variants={fadeUp}>
              <a href="#ventures" className="magnetic-btn">
                <span>Explore Ventures</span>
                <span>→</span>
              </a>
              <a href="#journey" className="ghost-btn">
                <span>Discover the Journey</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT — cinematic portrait */}
        <motion.div
          className="relative h-[58vh] min-h-[430px] min-w-0 md:h-[64vh] lg:h-[calc(100svh-10rem)] lg:min-h-[560px] lg:max-h-[760px]"
          initial={{ opacity: 0, y: 72, scale: 0.97, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.25, ease: luxuryEase }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-editorial)]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 will-change-transform"
            >
              <img
                src={heroImg}
                alt="Rahul Tanwar — Founder portrait"
                className="h-full w-full object-cover object-center kenburns"
              />
            </motion.div>
            {/* gradient veil */}
            <motion.div
              style={{ opacity: veilOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/14 to-transparent"
            />
            {/* glass accent corner */}
            <motion.div
              className="absolute top-6 left-6 right-6 flex items-start justify-between"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: luxuryEase }}
            >
              <div className="backdrop-blur-md bg-background/70 border border-accent/45 rounded-full px-3 py-2 shadow-[var(--shadow-soft)]">
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground/80">
                  N° 01 / Founder
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground/70">
                  Est.
                </div>
                <div className="font-display text-xl">MMXXIII</div>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground/90"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: luxuryEase }}
            >
              <div>
                <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground/70">
                  Delhi · India
                </div>
                <div className="font-display text-2xl mt-1">An Ecosystem in Motion</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-primary/35 bg-background/70 text-primary flex items-center justify-center">
                ↓
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
