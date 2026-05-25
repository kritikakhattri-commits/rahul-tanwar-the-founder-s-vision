const ventures = [
  { name: "SR18 Beverages Pvt. Ltd.", sector: "Beverages", year: "2023", desc: "An ambitious beverage company crafting modern Indian flavours for the next generation." },
  { name: "Delhi 6", sector: "Consumer Brand", year: "—", desc: "A heritage-inspired consumer brand celebrating the spirit of old Delhi." },
  { name: "Volt 50000", sector: "Energy / Mobility", year: "—", desc: "Next-generation energy proposition built around scale and efficiency." },
  { name: "VAM", sector: "Manufacturing", year: "—", desc: "Industrial manufacturing with a precision-engineered approach." },
  { name: "Adatto", sector: "Consumer", year: "—", desc: "A modern lifestyle brand designed around quality and intent." },
  { name: "Arnika Textiles", sector: "Textiles", year: "—", desc: "Textile craftsmanship reimagined for global supply chains." },
  { name: "Masai", sector: "Consumer / Lifestyle", year: "—", desc: "Bold, design-led consumer experiences with category-defining ambition." },
  { name: "TradesNSignals", sector: "Finance / Fintech", year: "2022", desc: "Market intelligence and trading insights for serious participants." },
];

export function Ventures() {
  return (
    <section id="ventures" className="relative py-28 md:py-40 bg-cream">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 reveal">
              <span className="eyebrow">Chapter II — The Ecosystem</span>
            </div>
            <h2 className="mt-6 font-display text-display-lg max-w-3xl reveal">
              An ecosystem of <em className="text-accent">ventures.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-soft text-lg leading-relaxed reveal">
            Eight companies. One operating philosophy. Each built to compound value
            independently — and together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {ventures.map((v, i) => (
            <article
              key={v.name}
              className="venture-card p-8 md:p-10 min-h-[360px] flex flex-col justify-between reveal-up"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">{v.year}</span>
              </div>

              <div className="my-10 relative">
                <div className="absolute -left-2 -top-2 h-12 w-12 rounded-full bg-accent/15 blur-xl" />
                <h3 className="font-display text-3xl md:text-4xl leading-tight">{v.name}</h3>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-ink-soft leading-relaxed">{v.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-foreground">{v.sector}</span>
                  <span className="h-8 w-8 rounded-full border border-ink/30 flex items-center justify-center text-xs group-hover:bg-ink group-hover:text-background transition-colors">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
