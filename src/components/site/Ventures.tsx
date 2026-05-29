import { StackingCards } from "@/components/site/StackingCards";
import type { CSSProperties } from "react";

const ventures = [
  {
    name: "SR18 Groups",
    sector: "Business Group",
    year: "—",
    desc: "A business ecosystem built around disciplined operations, cross-market ambition and long-term value creation.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Delhi 6",
    sector: "Consumer Brand",
    year: "—",
    desc: "A heritage-inspired consumer brand celebrating the spirit of old Delhi.",
    image:
      "https://images.unsplash.com/photo-1681422695061-9023e14a28c1?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Volt 50000",
    sector: "Energy / Mobility",
    year: "—",
    desc: "Next-generation energy proposition built around scale and efficiency.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "VAM",
    sector: "Manufacturing",
    year: "—",
    desc: "Industrial manufacturing with a precision-engineered approach.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Adatto",
    sector: "Consumer Brand",
    year: "—",
    desc: "A modern consumer proposition shaped by thoughtful design, utility and premium everyday experience.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Arnika Textiles",
    sector: "Textiles",
    year: "—",
    desc: "Textile craftsmanship reimagined for global supply chains.",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Masai",
    sector: "Consumer / Lifestyle",
    year: "—",
    desc: "Bold, design-led consumer experiences with category-defining ambition.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "TradesNSignals",
    sector: "Finance / Fintech",
    year: "2022",
    desc: "Market intelligence and trading insights for serious participants.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=82",
  },
];

const stackCardBackgrounds = [
  "#F6F4EF",
  "#EDF5F0",
  "#E3EFE7",
  "#D7E7DC",
  "#CADFD1",
  "#BCD7C5",
];

export function Ventures() {
  return (
    <section id="ventures" className="relative overflow-x-hidden py-28 md:py-40 bg-background">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="eyebrow">Chapter II — The Ecosystem</span>
            </div>
            <h2 className="mt-6 font-display text-display-lg max-w-3xl">
              An ecosystem of <em className="text-accent">ventures.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-soft text-lg leading-[1.75]">
            Eight ventures. One operating philosophy. Each built to compound value independently —
            and together.
          </p>
        </div>

        <StackingCards>
          {ventures.map((v, i) => (
            <article
              key={v.name}
              style={
                {
                  "--venture-card-bg": stackCardBackgrounds[i % stackCardBackgrounds.length],
                  backgroundColor: stackCardBackgrounds[i % stackCardBackgrounds.length],
                } as CSSProperties
              }
              className="stacking-card venture-card premium-story-panel flex min-h-[360px] flex-col justify-between p-8 md:p-10 lg:min-h-[min(66vh,620px)]"
            >
              <div className="venture-card__image" aria-hidden="true">
                <img src={v.image} alt="" loading="lazy" />
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-soft">
                  {v.year}
                </span>
              </div>

              <div className="relative z-10 my-10 max-w-2xl">
                <h3 className="font-display text-3xl uppercase tracking-[0.04em] md:text-4xl leading-tight">
                  {v.name}
                </h3>
              </div>

              <div className="relative z-10 max-w-xl space-y-4">
                <p className="text-sm text-ink-soft leading-relaxed">{v.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                    {v.sector}
                  </span>
                  <span className="h-8 w-8 rounded-full border border-ink/30 flex items-center justify-center text-xs">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}
