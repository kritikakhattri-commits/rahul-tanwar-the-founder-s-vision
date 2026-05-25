import aboutImg from "@/assets/rahul-about.jpg";

const pillars = [
  { k: "01", t: "Leadership", d: "Building teams that compound talent over years." },
  { k: "02", t: "Execution", d: "Translating bold vision into operational reality." },
  { k: "03", t: "Innovation", d: "Reframing industries through first-principles thinking." },
  { k: "04", t: "Excellence", d: "Holding every venture to an uncompromising standard." },
];

export function Intro() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left — portrait + caption */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start reveal-up">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={aboutImg}
              alt="Rahul Tanwar at work"
              loading="lazy"
              className="h-full w-full object-cover kenburns"
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

        {/* Right — editorial body */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-4 reveal">
            <span className="eyebrow">Chapter I — The Founder</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <h2 className="font-display text-display-lg reveal">
            The entrepreneur <br />
            behind <em className="text-accent">multiple ventures.</em>
          </h2>

          <div className="space-y-7 text-lg md:text-xl leading-relaxed text-foreground/85 max-w-2xl">
            <p className="reveal">
              Rahul Tanwar is a modern business builder — an operator who treats
              every company as a long-form act of craftsmanship. His work spans
              <span className="text-accent"> beverages, consumer brands, textiles, manufacturing, finance</span>
              and emerging technology.
            </p>
            <p className="reveal">
              From a decade in global financial services to leadership in the
              quick-service industry, his career has been a deliberate study in
              building organisations that grow with discipline and outlast their founders.
            </p>
            <p className="reveal text-ink-soft">
              Today, his portfolio is an ecosystem — interconnected ventures
              designed to create sustained, generational value for partners,
              employees and the communities they touch.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border mt-16 reveal-up">
            {pillars.map((p) => (
              <div key={p.k} className="bg-background p-8 md:p-10 group hover:bg-cream transition-colors duration-500">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="eyebrow">{p.k}</span>
                  <span className="h-px w-10 bg-accent" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-3">{p.t}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
