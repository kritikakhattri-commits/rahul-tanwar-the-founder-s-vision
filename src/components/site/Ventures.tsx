import { StackingCards } from "@/components/site/StackingCards";
import { useReactiveCard } from "@/components/site/useReactiveCard";
import type { CSSProperties } from "react";

const ventures = [
  {
    name: "SR18 Groups",
    sector: "Business Group",
    year: "—",
    desc: "A diversified business ecosystem built around disciplined execution, operating depth and long-term value creation. Designed to connect consumer brands, manufacturing, technology and investment into one compounding platform.",
    tags: ["ECOSYSTEM", "VENTURES", "GROWTH"],
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Delhi 6",
    sector: "Beverages",
    year: "—",
    desc: "A heritage-inspired beverage venture celebrating culture, storytelling and modern consumer experiences. Built to create memorable brands with strong market resonance and enduring consumer value.",
    tags: ["BEER BRAND", "BEVERAGE", "CULTURE"],
    image:
      "https://images.unsplash.com/photo-1681422695061-9023e14a28c1?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Volt 50000",
    sector: "Energy & Mobility",
    year: "—",
    desc: "An energy and mobility platform focused on scalable infrastructure, technology adoption and future-ready consumer solutions. Built for emerging markets where reliability, access and efficiency matter.",
    tags: ["ENERGY", "MOBILITY", "FUTURE"],
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "VAM",
    sector: "Manufacturing",
    year: "—",
    desc: "Precision-led industrial manufacturing focused on quality, efficiency and long-term operational reliability. Built around disciplined execution, scalable systems and engineering excellence.",
    tags: ["INDUSTRIAL", "PRECISION", "SYSTEMS"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Adatto",
    sector: "Consumer & Lifestyle",
    year: "—",
    desc: "Design-led solutions focused on modern lifestyle, consumer experience and thoughtful product innovation. Built with a balance of creativity, utility and commercial impact.",
    tags: ["LIFESTYLE", "DESIGN", "CONSUMER"],
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Arnika Textiles",
    sector: "Textiles",
    year: "—",
    desc: "Textile craftsmanship shaped for modern supply chains, consistent quality and scalable production. Focused on material discipline, dependable execution and long-term manufacturing partnerships.",
    tags: ["TEXTILES", "CRAFT", "SUPPLY"],
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "Masai",
    sector: "Consumer Brand",
    year: "—",
    desc: "A contemporary consumer brand blending culture, design and community into category-defining experiences. Focused on emotional connection, strong identity and long-term loyalty.",
    tags: ["CONSUMER", "LIFESTYLE", "BRAND"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=82",
  },
  {
    name: "TradesNSignals",
    sector: "Financial Technology",
    year: "2022",
    desc: "Market intelligence and trading insights designed to transform financial experience into practical, data-driven decision-making tools. Built for investors who value clarity, discipline and timely execution.",
    tags: ["FINTECH", "MARKETS", "INTELLIGENCE"],
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1600&q=82",
  },
];

const stackCardBackgrounds = ["#F6F4EF", "#EDF5F0", "#E3EFE7", "#D7E7DC", "#CADFD1", "#BCD7C5"];

export function Ventures() {
  const reactiveCard = useReactiveCard();

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
              className="reactive-card reactive-card--surface-host stacking-card venture-card premium-story-panel flex min-h-[360px] flex-col justify-between p-8 md:p-10 lg:min-h-[min(66vh,620px)]"
              {...reactiveCard}
            >
              <div className="venture-card__image" aria-hidden="true">
                <img src={v.image} alt="" loading="lazy" />
              </div>

              <div className="reactive-card__surface flex flex-1 flex-col justify-between">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-soft">
                      {v.year}
                    </span>
                  </div>

                  <div className="mt-8 max-w-2xl">
                    <h3 className="font-sans text-[clamp(2.15rem,4vw,3.7rem)] font-extrabold uppercase leading-[0.96] tracking-[0] md:text-[clamp(2.6rem,4.5vw,4.35rem)]">
                      {v.name.toUpperCase()}
                    </h3>
                  </div>

                  <div className="venture-card__story mt-7 max-w-2xl space-y-5">
                    <p className="text-[0.98rem] leading-[1.78] text-ink-soft md:text-[1.03rem]">
                      {v.desc}
                    </p>

                    <div className="venture-card__tags">
                      {v.tags.map((tag) => (
                        <span key={tag} className="venture-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                      {v.sector}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/30 text-xs">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}
