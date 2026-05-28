import transitionImg from "@/assets/rahul-transition.jpg";
import { useLocalParallax } from "@/components/site/motion-config";
import { motion } from "framer-motion";

const words = ["Innovation", "Execution", "Ownership", "Excellence", "Growth", "Integrity"];

export function Philosophy() {
  const [transitionRef, transitionY] = useLocalParallax([-34, 38]);

  return (
    <section id="philosophy" className="relative">
      {/* Transition cinematic image */}
      <div ref={transitionRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <motion.img
          style={{ y: transitionY, scale: 1.08 }}
          src={transitionImg}
          alt="Rahul Tanwar walking through a manufacturing space"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover kenburns"
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

      {/* Big animated words */}
      <div className="py-28 md:py-40 bg-background">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="max-w-3xl mb-20 reveal">
            <h2 className="font-display text-display-md">
              Six principles that govern every{" "}
              <em className="text-accent">decision, every hire, every product.</em>
            </h2>
          </div>

          <ul className="space-y-2 md:space-y-4">
            {words.map((w, i) => (
              <li
                key={w}
                className="reveal group flex items-baseline gap-6 md:gap-10 border-b border-border py-6 md:py-10 hover:pl-4 transition-all duration-700"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-xs md:text-sm font-medium tracking-[0.14em] text-ink-soft w-12">
                  0{i + 1}
                </span>
                <span className="font-display text-display-lg leading-[0.98] flex-1 group-hover:text-primary transition-colors duration-500">
                  {w}
                </span>
                <span className="hidden md:inline-block h-px w-24 bg-border group-hover:bg-accent-warm group-hover:w-40 transition-all duration-500" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
