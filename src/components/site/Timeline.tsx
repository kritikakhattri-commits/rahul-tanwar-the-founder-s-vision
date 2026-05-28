import { StackedCard } from "@/components/site/Motion";

const events = [
  {
    year: "2011 — 2014",
    title: "American Express",
    body: "A formative decade begins in global financial services — building rigor, operational discipline and a global perspective on enterprise.",
  },
  {
    year: "2014 — 2017",
    title: "Food & Quick Service Industry",
    body: "First operating chapters in consumer-facing businesses. Learning unit economics, supply chains and the art of the customer.",
  },
  {
    year: "2022",
    title: "TradesNSignals",
    body: "Launches a market intelligence platform — translating decades of finance instinct into a serious tool for traders and investors.",
  },
  {
    year: "2023",
    title: "SR18 Beverages",
    body: "Founds a modern beverage company — the cornerstone of a wider ecosystem play in consumer brands.",
  },
  {
    year: "2023 — Present",
    title: "Expansion Across Ventures",
    body: "Adds Delhi 6, Volt 50000, VAM, Adatto, Arnika Textiles and Masai — a portfolio engineered for long-term compounding.",
  },
];

export function Timeline() {
  return (
    <section id="journey" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <div className="eyebrow reveal">Chapter IV — The Journey</div>
            <h2 className="mt-6 font-display text-display-lg reveal">
              A career in <em className="text-accent">deliberate chapters.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-lg leading-[1.75] text-ink-soft self-end reveal">
            Each step builds on the last. From institutional finance to consumer operations to
            founding a multi-vertical ecosystem — a path defined by patience and conviction.
          </p>
        </div>

        <div className="relative">
          {/* timeline rail */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="stack-scene space-y-8 md:space-y-10">
            {events.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <StackedCard key={e.year} index={i} className="stack-sticky">
                  <article className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 rounded-[1.5rem] bg-card p-8 md:p-10 shadow-[var(--shadow-soft)]">
                    <div className={left ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"}>
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

                    <div className={`relative ${left ? "" : "md:order-1"}`}>
                      <span className="absolute left-0 md:left-1/2 -translate-x-1/2 top-3 h-3 w-3 rounded-full bg-accent ring-4 ring-card shadow-[0_0_0_6px_rgb(111_207_151_/_0.24)]" />
                    </div>
                  </article>
                </StackedCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
