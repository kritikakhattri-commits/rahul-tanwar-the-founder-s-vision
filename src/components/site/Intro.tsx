import aboutImg from "@/assets/rahul-about.jpg";
import { StackedCard } from "@/components/site/Motion";
import { useLocalParallax } from "@/components/site/motion-config";
import { motion } from "framer-motion";

const pillars = [
  { k: "01", t: "Leadership", d: "Building teams that compound talent over years." },
  { k: "02", t: "Execution", d: "Translating bold vision into operational reality." },
  { k: "03", t: "Innovation", d: "Reframing industries through first-principles thinking." },
  { k: "04", t: "Excellence", d: "Holding every venture to an uncompromising standard." },
];

export function Intro() {
  const [portraitRef, portraitY] = useLocalParallax([-26, 30]);

  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left — portrait + caption */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start reveal-up">
          <div
            ref={portraitRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-card shadow-[var(--shadow-soft)]"
          >
            <motion.img
              style={{ y: portraitY, scale: 1.06 }}
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

          <div className="space-y-7 text-lg md:text-xl leading-[1.75] text-foreground/85 max-w-2xl">
            <p className="reveal">
              Rahul Tanwar is a modern business builder — an operator who treats every company as a
              long-form act of craftsmanship. His work spans
              <span className="text-accent">
                {" "}
                beverages, consumer brands, textiles, manufacturing, finance
              </span>
              and emerging technology.
            </p>
            <p className="reveal">
              From a decade in global financial services to leadership in the quick-service
              industry, his career has been a deliberate study in building organisations that grow
              with discipline and outlast their founders.
            </p>
            <p className="reveal text-ink-soft">
              Today, his portfolio is an ecosystem — interconnected ventures designed to create
              sustained, generational value for partners, employees and the communities they touch.
            </p>
          </div>

          <div className="stack-scene grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 reveal-up">
            {pillars.map((p, i) => (
              <StackedCard
                key={p.k}
                index={i}
                className="stack-sticky rounded-[1.25rem] bg-card p-8 md:p-10 shadow-[var(--shadow-soft)] group hover:bg-secondary hover:text-background transition-colors duration-500"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="eyebrow">{p.k}</span>
                  <span className="h-px w-10 bg-accent-warm" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">{p.t}</h3>
                <p className="text-sm text-ink-soft group-hover:text-background/70 leading-relaxed transition-colors duration-500">
                  {p.d}
                </p>
              </StackedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
