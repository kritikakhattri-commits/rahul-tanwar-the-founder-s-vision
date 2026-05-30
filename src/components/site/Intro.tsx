import aboutImg from "@/assets/rahul-about.jpg";

const founderFramework = [
  {
    number: "01",
    title: "See Opportunity",
    description: "Identify market openings before they become obvious.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
  },
  {
    number: "02",
    title: "Build Systems",
    description: "Turn ambition into repeatable operating structure.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=82",
  },
  {
    number: "03",
    title: "Execute Relentlessly",
    description: "Move with discipline from decision to delivery.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82",
  },
  {
    number: "04",
    title: "Compound Value",
    description: "Build assets that strengthen each other over time.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=82",
  },
  {
    number: "05",
    title: "Connect Markets",
    description: "Bridge regional strengths into wider opportunity.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=82",
  },
];

export function Intro() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-30">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[45fr_55fr] lg:gap-14 xl:gap-18">
        <div className="self-start">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-soft)] lg:aspect-[9/10]">
            <img
              src={aboutImg}
              alt="Rahul Tanwar at work"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/5" />
          </div>
          <div className="mt-5 flex items-start justify-between">
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

        <div className="space-y-7 lg:pt-1 xl:pt-2">
          <div className="flex items-center gap-4">
            <span className="eyebrow">Chapter I — The Founder</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h2 className="font-display max-w-[900px] text-[clamp(3.1rem,6vw,7rem)] leading-[0.95] text-balance">
            The entrepreneur behind <em className="text-accent">multiple ventures.</em>
          </h2>

          <div className="max-w-2xl space-y-5 text-lg leading-[1.68] text-foreground/85 md:text-xl">
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

      <div className="mx-auto mt-12 w-full max-w-[1600px] px-6 md:mt-14 md:px-10">
        <div
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-5"
          role="list"
          aria-label="Founder operating framework"
        >
          {founderFramework.map((item) => (
            <article
              key={item.number}
              role="listitem"
              className="group overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-editorial)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/5 via-transparent to-ink/20" />
                <div className="absolute left-4 top-4 font-display text-6xl leading-none text-background/80 md:text-7xl">
                  {item.number}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="mb-4 h-px w-12 bg-accent transition-all duration-500 group-hover:w-20" />
                <h3 className="font-display text-3xl leading-[1.02] md:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
