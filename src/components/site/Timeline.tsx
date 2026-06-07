import { useEffect, useRef } from "react";
import { useReactiveCard } from "@/components/site/useReactiveCard";
import { resolveCmsImage } from "@/lib/cms-assets";
import type { CmsContent } from "@/lib/cms-content";
import { HighlightedText } from "@/lib/cms-text";

export function Timeline({ content }: { content: CmsContent["journey"] }) {
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
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-5 border-y border-border py-6 md:grid-cols-12 md:gap-8 md:py-7">
          <div className="md:col-span-6">
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 className="mt-3 font-display text-display-lg">
              <HighlightedText
                text={content.heading}
                highlight={content.highlightedHeading}
                className="text-accent"
              />
            </h2>
          </div>
          <p className="max-w-2xl self-end text-[1.02rem] leading-[1.75] text-ink-soft md:col-span-5 md:col-start-8 md:text-lg">
            {content.description}
          </p>
        </div>

        <div className="mt-8 space-y-8 md:mt-9 md:space-y-9 lg:space-y-10">
          {content.items.map((chapter, index) => {
            const imageFirst = index % 2 === 1;

            return (
              <article
                key={`${chapter.number}-${chapter.title}`}
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
                    <h3 className="mt-3 max-w-[12ch] font-display text-[clamp(2rem,9vw,5.65rem)] leading-[0.98] md:max-w-[11ch] md:leading-[0.94]">
                      {chapter.title}
                    </h3>
                    <div className="mt-4 border-l border-accent pl-4">
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
                        {chapter.role}
                      </div>
                      {chapter.year ? (
                        <div className="mt-1 text-sm text-ink-soft">{chapter.year}</div>
                      ) : null}
                    </div>
                    <p className="mt-3 max-w-xl text-[1.02rem] leading-[1.75] text-ink-soft md:text-lg">
                      {chapter.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`founder-chapter__image md:col-span-5 ${
                    imageFirst ? "md:order-first" : "md:col-start-8"
                  }`}
                >
                  <img
                    src={resolveCmsImage(chapter.image.src)}
                    alt={chapter.image.alt ?? chapter.title}
                    loading="lazy"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
