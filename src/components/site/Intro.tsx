import aboutImg from "@/assets/rahul-about.jpg";

const pillars = [
  {
    k: "01",
    t: "Leadership",
    d: "Building teams that compound talent over years.",
  },
  {
    k: "02",
    t: "Execution",
    d: "Translating bold vision into operational reality.",
  },
  {
    k: "03",
    t: "Innovation",
    d: "Reframing industries through first-principles thinking.",
  },
  {
    k: "04",
    t: "Excellence",
    d: "Holding every venture to an uncompromising standard.",
  },
];

export function Intro() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5 self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-soft)]">
            <img
              src={aboutImg}
              alt="Rahul Tanwar at work"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/5" />
          </div>
          <div className="mt-6 flex items-start justify-between">
            <div>
              <div className="eyebrow">Portrait</div>
              <div className="font-display text-xl mt-1">Rahul Tanwar, 2025</div>
            </div>
            <div className="text-right">
              <div className="eyebrow">Based</div>
              <div className="font-display text-xl mt-1">New Delhi</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-4">
            <span className="eyebrow">Chapter I — The Founder</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h2 className="font-display max-w-[12ch] text-[clamp(2.3rem,4.8vw,4.5rem)] leading-[0.94] tracking-[-0.01em] text-balance">
            <span className="block">The entrepreneur</span>
            <span className="block">
              behind <em className="text-accent">multiple ventures.</em>
            </span>
          </h2>

          <div className="space-y-7 text-lg md:text-xl leading-[1.75] text-foreground/85 max-w-2xl">
            <p>
              Rahul Tanwar is a modern business builder — an operator who treats every company as a
              long-form act of craftsmanship. His work spans
              <span className="text-accent">
                {" "}
                beverages, consumer brands, textiles, manufacturing, finance
              </span>
              and emerging technology.
            </p>
            <p>
              From a decade in global financial services to leadership in the quick-service
              industry, his career has been a deliberate study in building organisations that grow
              with discipline and outlast their founders.
            </p>
            <p className="text-ink-soft">
              Today, his portfolio is an ecosystem — interconnected ventures designed to create
              sustained, generational value for partners, employees and the communities they touch.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl px-6 md:mt-20 md:px-10">
        <div className="pillar-rail" role="list" aria-label="Philosophy pillars">
          {pillars.map((p) => (
            <div
              key={p.k}
              role="listitem"
              className="pillar-rail__item"
            >
              <div className="flex items-baseline gap-3">
                <span className="eyebrow">{p.k}</span>
                <span className="pillar-rail__marker" aria-hidden="true" />
              </div>
              <h3 className="font-display mt-4 text-3xl md:text-4xl leading-tight">
                {p.t}
              </h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-[18ch]">
                {p.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
