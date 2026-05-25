import heroImg from "@/assets/rahul-hero.jpg";
import { useEffect, useRef } from "react";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = imgRef.current;
      if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${y * 0.08}px, 0) scale(${1 + y * 0.00008})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-screen pt-28 md:pt-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end min-h-[calc(100vh-6rem)]">
        {/* LEFT — typography */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[60vh] lg:min-h-[80vh] py-10">
          <div className="flex items-center gap-4 reveal">
            <span className="h-px w-12 bg-ink" />
            <span className="eyebrow">Founder · Investor · Builder</span>
          </div>

          <div className="space-y-6">
            <h1 className="font-display text-display-xl text-foreground reveal">
              <span className="block">Rahul</span>
              <span className="block italic text-accent">Tanwar</span>
            </h1>

            <p className="font-display text-display-md text-foreground/90 max-w-[18ch] reveal">
              Building businesses that create <em className="text-accent">lasting value.</em>
            </p>

            <p className="max-w-xl text-base md:text-lg leading-relaxed text-ink-soft reveal">
              Entrepreneur, founder, investor and business leader building ventures across
              beverages, consumer brands, textiles, manufacturing, finance and innovation-led industries.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 reveal">
              <a href="#ventures" className="magnetic-btn">
                <span>Explore Ventures</span>
                <span>→</span>
              </a>
              <a href="#journey" className="ghost-btn">
                <span>Discover the Journey</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — cinematic portrait */}
        <div className="lg:col-span-5 relative h-[70vh] lg:h-[88vh] reveal-up">
          <div className="absolute inset-0 overflow-hidden bg-cream">
            <div ref={imgRef} className="absolute inset-0 will-change-transform">
              <img
                src={heroImg}
                alt="Rahul Tanwar — Founder portrait"
                className="h-full w-full object-cover object-center kenburns"
              />
            </div>
            {/* gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            {/* glass accent corner */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
              <div className="backdrop-blur-md bg-background/30 border border-white/30 px-3 py-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/80">N° 01 / Founder</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/70">Est.</div>
                <div className="font-display text-xl">MMXXIII</div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground/90">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/70">Delhi · India</div>
                <div className="font-display text-2xl mt-1">An Ecosystem in Motion</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-foreground/40 flex items-center justify-center">↓</div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 hairline py-5 overflow-hidden">
        <div className="marquee-track text-ink-soft font-display text-2xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12">
              <span>SR18 Beverages</span><span className="text-accent">✦</span>
              <span>Delhi 6</span><span className="text-accent">✦</span>
              <span>Volt 50000</span><span className="text-accent">✦</span>
              <span>VAM</span><span className="text-accent">✦</span>
              <span>Adatto</span><span className="text-accent">✦</span>
              <span>Arnika Textiles</span><span className="text-accent">✦</span>
              <span>Masai</span><span className="text-accent">✦</span>
              <span>TradesNSignals</span><span className="text-accent">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
