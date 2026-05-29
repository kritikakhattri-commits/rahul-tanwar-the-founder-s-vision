const events = [
  {
    year: "2011 — 2014",
    title: "American Express",
    body: "A formative decade begins in global financial services — building rigor, operational discipline and a global perspective on enterprise.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Monochrome financial district architecture detail",
  },
  {
    year: "2014 — 2017",
    title: "Food & Quick Service Industry",
    body: "First operating chapters in consumer-facing businesses. Learning unit economics, supply chains and the art of the customer.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Subtle coffee and hospitality detail",
  },
  {
    year: "2022",
    title: "TradesNSignals",
    body: "Launches a market intelligence platform — translating decades of finance instinct into a serious tool for traders and investors.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Quiet executive workspace and market intelligence detail",
  },
  {
    year: "2023",
    title: "SR18 Beverages",
    body: "Founds a modern beverage company — the cornerstone of a wider ecosystem play in consumer brands.",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Minimal beverage craft and hospitality texture",
  },
  {
    year: "2023 — Present",
    title: "Expansion Across Ventures",
    body: "Adds Delhi 6, Volt 50000, VAM, Adatto, Arnika Textiles and Masai — a portfolio engineered for long-term compounding.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Precision industrial texture and manufacturing detail",
  },
];

export function Timeline() {
  return (
    <section id="journey" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <div className="eyebrow">Chapter IV — The Journey</div>
            <h2 className="mt-6 font-display text-display-lg">
              A career in <em className="text-accent">deliberate chapters.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-lg leading-[1.75] text-ink-soft self-end">
            Each step builds on the last. From institutional finance to consumer operations to
            founding a multi-vertical ecosystem — a path defined by patience and conviction.
          </p>
        </div>

        <div className="relative">
          {/* timeline rail */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 md:space-y-10">
            {events.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <article
                  key={e.year}
                  className="timeline-card premium-story-panel relative grid grid-cols-1 gap-8 rounded-[1.5rem] bg-card p-8 shadow-[var(--shadow-soft)] md:grid-cols-2 md:gap-20 md:p-10 lg:min-h-[min(58vh,560px)]"
                >
                  <div
                    className={`relative z-10 ${
                      left ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"
                    }`}
                  >
                    <div className="text-xs font-medium tracking-[0.14em] uppercase text-primary">
                      {e.year}
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl leading-tight mt-3">
                      {e.title}
                    </h3>
                    <p className="mt-4 text-ink-soft leading-[1.75] max-w-md md:inline-block">
                      {e.body}
                    </p>
                  </div>

                  <div
                    className={`timeline-card__image-space relative min-h-44 overflow-hidden rounded-[1.15rem] md:min-h-0 ${
                      left ? "" : "md:order-1"
                    }`}
                    aria-hidden="true"
                  >
                    <img src={e.image} alt={e.imageAlt} loading="lazy" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
