import transitionImg from "@/assets/rahul-transition.jpg";
import { useReactiveCard } from "@/components/site/useReactiveCard";

const principles = [
  {
    title: "Innovation",
    description: "Building ventures through first-principles thinking.",
  },
  {
    title: "Execution",
    description: "Turning clear vision into disciplined operations.",
  },
  {
    title: "Ownership",
    description: "Treating every venture with founder-level responsibility.",
  },
  {
    title: "Excellence",
    description: "Holding the standard when momentum makes compromise easy.",
  },
  {
    title: "Growth",
    description: "Compounding people, systems and value over the long term.",
  },
  {
    title: "Integrity",
    description: "Building trust through clarity, consistency and restraint.",
  },
];

export function Philosophy() {
  const reactiveCard = useReactiveCard();

  return (
    <section id="philosophy" className="relative">
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src={transitionImg}
          alt="Rahul Tanwar walking through a manufacturing space"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/5 to-background" />
        <div className="absolute inset-0 grain" />
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex items-end justify-between text-foreground">
          <div className="backdrop-blur-md bg-background/75 rounded-[1rem] px-4 py-3 border border-accent/45 shadow-[var(--shadow-soft)]">
            <div className="eyebrow">Chapter III</div>
            <div className="font-display text-2xl mt-1">Leadership Philosophy</div>
          </div>
          <div className="hidden md:block text-right">
            <div className="eyebrow">Frame</div>
            <div className="font-display text-xl">003 / 010</div>
          </div>
        </div>
      </div>

      <div className="py-28 md:py-40 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="max-w-3xl mb-20">
            <h2 className="font-display text-display-md">
              Six principles that govern every{" "}
              <em className="text-accent">decision, every hire, every product.</em>
            </h2>
          </div>

          <ul className="overflow-hidden border-t border-border" aria-label="Operating principles">
            {principles.map((principle, i) => (
              <li
                key={principle.title}
                className="reactive-card group relative overflow-hidden border-b border-border transition-colors duration-500 hover:bg-accent/10"
                {...reactiveCard}
              >
                <span
                  className="pointer-events-none absolute -top-8 left-16 hidden font-display text-[10rem] leading-none text-accent/10 opacity-0 transition-all duration-500 group-hover:left-24 group-hover:opacity-100 md:block"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <div className="relative grid items-center gap-4 py-5 md:grid-cols-[5rem_1fr_12rem] md:gap-8 md:py-7">
                  <span className="text-xs font-medium tracking-[0.14em] text-ink-soft md:text-sm">
                    0{i + 1}
                  </span>

                  <div className="min-w-0">
                    <span className="block font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] transition-transform duration-500 group-hover:translate-x-3 md:group-hover:translate-x-5">
                      {principle.title}
                    </span>
                    <p className="max-h-0 max-w-2xl overflow-hidden text-base leading-relaxed text-ink-soft opacity-0 transition-all duration-500 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100 md:text-lg">
                      {principle.description}
                    </p>
                  </div>

                  <div
                    className="relative hidden h-20 items-center justify-end md:flex"
                    aria-hidden="true"
                  >
                    <span className="absolute right-0 h-px w-24 origin-right bg-border transition-all duration-500 group-hover:w-36 group-hover:bg-accent" />
                    <span className="absolute right-0 h-8 w-8 rotate-45 border-r border-t border-border transition-all duration-500 group-hover:border-accent" />
                    <span className="absolute right-12 h-14 w-14 rounded-full border border-border/70 transition-all duration-500 group-hover:right-16 group-hover:border-accent/60" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
