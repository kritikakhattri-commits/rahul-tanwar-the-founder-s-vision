import { useEffect, useRef } from "react";
import { useReactiveCard } from "@/components/site/useReactiveCard";

const markets = [
  {
    country: "UAE",
    flag: "🇦🇪",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=82",
    description: "UAE opportunity, global access and the momentum of future-facing markets.",
  },
  {
    country: "India",
    flag: "🇮🇳",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=82",
    description: "Indian scale, enterprise depth and a culture of long-term ambition.",
  },
];

export function IndiaUAEMarketSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reactiveCard = useReactiveCard();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    const initAnimation = async () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!section || !track || !viewport) {
        return;
      }

      const syncCardWidth = () => {
        const width = Math.min(viewport.clientWidth, 700);
        track.style.setProperty("--market-card-width", `${width}px`);
      };
      const resizeObserver = new ResizeObserver(syncCardWidth);

      syncCardWidth();
      resizeObserver.observe(viewport);

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        resizeObserver.disconnect();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const refresh = () => ScrollTrigger.refresh();
        const images = Array.from(section.querySelectorAll("img"));

        const context = gsap.context(() => {
          gsap.set(track, { x: 0 });

          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getDistance() + window.innerHeight * 0.3}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        }, section);

        images.forEach((image) => {
          if (!image.complete) {
            image.addEventListener("load", refresh, { once: true });
            image.addEventListener("error", refresh, { once: true });
          }
        });

        window.addEventListener("load", refresh, { once: true });

        return () => {
          images.forEach((image) => {
            image.removeEventListener("load", refresh);
            image.removeEventListener("error", refresh);
          });
          window.removeEventListener("load", refresh);
          context.revert();
        };
      });

      cleanup = () => {
        resizeObserver.disconnect();
        media.revert();
      };

      ScrollTrigger.refresh();
    };

    void initAnimation();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="india-uae-stack-section relative overflow-hidden bg-[#f6f2e9] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-center lg:gap-14 xl:gap-18">
          <div className="max-w-2xl lg:sticky lg:top-28 lg:self-center">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-accent" />
              <span className="eyebrow">India ↔ UAE</span>
            </div>
            <h2 className="mt-8 max-w-[15ch] font-display text-display-md">
              <span className="block lg:whitespace-nowrap">Connecting Indian</span>
              <span className="block lg:whitespace-nowrap">ambition with UAE</span>
              <span className="block lg:whitespace-nowrap">opportunity</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-[1.75] text-ink-soft">
              Building ventures across India and the UAE through operating discipline, trusted
              partnerships and a clear view of cross-market growth.
            </p>
            <div className="mt-11 flex items-center gap-3 text-3xl" aria-label="India and UAE">
              <span>🇮🇳</span>
              <span className="h-px w-14 bg-accent" />
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_6px_rgb(111_207_151_/_0.16)]" />
              <span className="h-px w-14 bg-accent" />
              <span>🇦🇪</span>
            </div>
          </div>

          <div
            ref={viewportRef}
            className="relative w-full overflow-visible lg:overflow-hidden lg:py-8"
          >
            <div ref={trackRef} className="india-uae-horizontal-track">
              {markets.map((market, index) => (
                <article
                  key={market.country}
                  className="reactive-card reactive-card--surface-host india-uae-card premium-story-panel relative w-full shrink-0 overflow-hidden rounded-[1.5rem] bg-ink text-background shadow-[var(--shadow-editorial)]"
                  {...reactiveCard}
                >
                  <div className="reactive-card__surface">
                    <div className="relative min-h-[430px] md:min-h-[560px] lg:min-h-[min(68vh,640px)]">
                      <img
                        src={market.image}
                        alt={`${market.country} business and city connection`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/54 to-ink/14" />
                      <div className="absolute inset-0 grain" />

                      <div className="relative flex min-h-[430px] flex-col justify-between p-8 md:min-h-[560px] md:p-11 lg:min-h-[min(68vh,640px)]">
                        <div className="flex items-start justify-between gap-6">
                          <span className="rounded-full border border-background/20 bg-background/12 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] backdrop-blur-md">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-5xl leading-none md:text-6xl" aria-hidden="true">
                            {market.flag}
                          </span>
                        </div>

                        <div>
                          <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-12 bg-accent" />
                            <span className="h-2 w-2 rounded-full bg-accent" />
                          </div>
                          <h3 className="font-display text-[4rem] leading-none md:text-[6.5rem] lg:text-[clamp(5rem,7vw,6.5rem)]">
                            {market.country}
                          </h3>
                          <p className="mt-5 max-w-lg text-base leading-[1.7] text-background/76 md:text-lg">
                            {market.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
