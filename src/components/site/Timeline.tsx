import { useEffect, useRef } from "react";
import buildingEcosystemImg from "@/assets/chapter-building-ecosystem.jpg";
import buildingSystemsImg from "@/assets/chapter-building-systems.jpg";
import learningDisciplineImg from "@/assets/chapter-learning-discipline.jpg";
import understandingConsumersImg from "@/assets/chapter-understanding-consumers.jpg";
import { useReactiveCard } from "@/components/site/useReactiveCard";

const chapters = [
  {
    number: "01",
    label: "Chapter I",
    heading: "Learning Discipline",
    title: "American Express",
    year: "2011 — 2014",
    body: "A formative chapter in institutional finance, developing operational rigor, systems thinking and long-term discipline.",
    image: learningDisciplineImg,
    imageAlt: "Institutional finance trading floor with strategic discussion",
  },
  {
    number: "02",
    label: "Chapter II",
    heading: "Understanding Consumers",
    title: "Food & Quick Service Industry",
    year: "2014 — 2017",
    body: "Learning customer behaviour, operations, supply chains and the realities of consumer businesses.",
    image: understandingConsumersImg,
    imageAlt: "Premium hospitality operations and customer service interaction",
  },
  {
    number: "03",
    label: "Chapter III",
    heading: "Building Systems",
    title: "TradeNSignals",
    year: "2022",
    body: "Transforming market experience into products, systems and scalable frameworks.",
    image: buildingSystemsImg,
    imageAlt: "Financial technology systems with market analytics dashboards",
  },
  {
    number: "04",
    label: "Chapter IV",
    heading: "Building An Ecosystem",
    title: "SR18 GROUPS",
    year: "",
    body: "The culmination of multiple disciplines into a diversified ecosystem spanning beverages, manufacturing, consumer brands, technology and investment.",
    image: buildingEcosystemImg,
    imageAlt: "Abstract network visualization for a diversified business ecosystem",
    featured: true,
  },
];

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reactiveCard = useReactiveCard();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    const initReveal = async () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".founder-chapter", section).forEach((chapter) => {
            const text = chapter.querySelector(".founder-chapter__text");
            const image = chapter.querySelector(".founder-chapter__image img");

            gsap.fromTo(
              text,
              { autoAlpha: 0, y: 34 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 78%",
                  once: true,
                },
              },
            );

            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.35,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 80%",
                  once: true,
                },
              },
            );
          });
        }, section);

        return () => context.revert();
      });

      cleanup = () => media.revert();
      ScrollTrigger.refresh();
    };

    void initReveal();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="relative py-12 md:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-5 border-y border-border py-6 md:grid-cols-12 md:gap-8 md:py-7">
          <div className="md:col-span-6">
            <div className="eyebrow">Chapter IV — The Journey</div>
            <h2 className="mt-3 font-display text-display-lg">
              A career in <em className="text-accent">deliberate chapters.</em>
            </h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-[1.75] text-ink-soft md:col-span-5 md:col-start-8">
            Each chapter built on the last. From institutional finance to consumer operations to
            building a multi-vertical ecosystem.
          </p>
        </div>

        <div className="mt-8 space-y-8 md:mt-9 md:space-y-9 lg:space-y-10">
          {chapters.map((chapter, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <article
                key={chapter.label}
                className={`reactive-card founder-chapter grid grid-cols-1 items-center gap-5 border-b border-border pb-8 md:grid-cols-12 md:gap-8 md:pb-9 lg:gap-10 lg:pb-10 ${
                  chapter.featured ? "founder-chapter--featured" : ""
                }`}
                {...reactiveCard}
              >
                <div
                  className={`founder-chapter__text relative md:col-span-6 ${
                    imageFirst ? "md:col-start-7 lg:col-start-8 lg:col-span-5" : ""
                  }`}
                >
                  <div className="founder-chapter__number" aria-hidden="true">
                    {chapter.number}
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-10 bg-accent" />
                      <span className="eyebrow text-primary">{chapter.label}</span>
                    </div>
                    <h3 className="mt-3 max-w-[11ch] font-display text-[clamp(3rem,7vw,5.65rem)] leading-[0.94]">
                      {chapter.heading}
                    </h3>
                    <div className="mt-4 border-l border-accent pl-4">
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                        {chapter.title}
                      </div>
                      {chapter.year ? (
                        <div className="mt-1 text-sm text-ink-soft">{chapter.year}</div>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-xl text-lg leading-[1.75] text-ink-soft">
                      {chapter.body}
                    </p>
                  </div>
                </div>

                <div
                  className={`founder-chapter__image md:col-span-5 ${
                    imageFirst ? "md:order-first" : "md:col-start-8"
                  }`}
                >
                  <img src={chapter.image} alt={chapter.imageAlt} loading="lazy" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
