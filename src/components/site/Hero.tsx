import heroImg from "@/assets/rahul-hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 md:pt-22 lg:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-32 h-px w-[42vw] bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-36 hidden h-40 w-px bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 md:block"
      />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 items-start gap-10 px-6 pb-12 md:px-10 md:pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-center lg:gap-14 lg:pb-10 xl:gap-20">
        <div className="flex min-h-0 min-w-0 flex-col justify-center py-4 md:py-6 lg:min-h-[calc(100svh-10rem)] lg:py-0">
          <div className="w-full max-w-full space-y-6 lg:max-w-[920px]">
            <h1 className="hero-title font-display text-foreground">
              <span className="whitespace-nowrap">
                Rahul <span className="italic text-accent">Tanwar</span>
              </span>
            </h1>

            <p className="font-display text-display-md text-foreground/90 max-w-[19ch]">
              Building businesses that create <em className="text-accent">lasting value.</em>
            </p>

            <p className="w-full max-w-[calc(100vw-3rem)] text-base leading-[1.75] text-ink-soft md:max-w-xl md:text-lg">
              Entrepreneur, founder, investor and business leader building ventures across
              beverages, consumer brands, textiles, manufacturing, finance and innovation-led
              industries.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
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

        <div className="relative h-[52svh] min-h-[340px] min-w-0 sm:min-h-[390px] md:h-[64vh] lg:h-[calc(100svh-10rem)] lg:min-h-[560px] lg:max-h-[760px]">
          <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-editorial)]">
            <div className="absolute inset-0">
              <img
                src={heroImg}
                alt="Rahul Tanwar — Founder portrait"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/14 to-transparent" />
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
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
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground/90">
              <div>
                <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground/70">
                  Delhi · India
                </div>
                <div className="font-display text-2xl mt-1">An Ecosystem in Motion</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-primary/35 bg-background/70 text-primary flex items-center justify-center">
                ↓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
