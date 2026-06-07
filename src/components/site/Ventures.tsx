import { StackingCards } from "@/components/site/StackingCards";
import { useReactiveCard } from "@/components/site/useReactiveCard";
import { resolveCmsImage } from "@/lib/cms-assets";
import type { CmsContent } from "@/lib/cms-content";
import { HighlightedText } from "@/lib/cms-text";
import type { CSSProperties } from "react";

const stackCardBackgrounds = ["#F6F4EF", "#EDF5F0", "#E3EFE7", "#D7E7DC", "#CADFD1", "#BCD7C5"];

export function Ventures({ content }: { content: CmsContent["ventures"] }) {
  const reactiveCard = useReactiveCard();

  return (
    <section
      id="ventures"
      className="relative overflow-x-hidden bg-background py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end md:gap-8 lg:mb-20">
          <div>
            <div className="flex items-center gap-4">
              <span className="eyebrow">{content.eyebrow}</span>
            </div>
            <h2 className="mt-5 max-w-3xl font-display text-display-lg md:mt-6">
              <HighlightedText
                text={content.heading}
                highlight={content.highlightedHeading}
                className="text-accent"
              />
            </h2>
          </div>
          <p className="max-w-md text-[1.02rem] leading-[1.75] text-ink-soft md:text-lg">
            {content.description}
          </p>
        </div>

        <StackingCards>
          {content.cards.map((v, i) => (
            <article
              key={v.name}
              style={
                {
                  "--venture-card-bg": stackCardBackgrounds[i % stackCardBackgrounds.length],
                  backgroundColor: stackCardBackgrounds[i % stackCardBackgrounds.length],
                } as CSSProperties
              }
              className="reactive-card reactive-card--surface-host stacking-card venture-card premium-story-panel flex min-h-[520px] flex-col justify-between p-6 sm:min-h-[500px] sm:p-8 md:min-h-[460px] md:p-10 lg:min-h-[min(66vh,620px)]"
              {...reactiveCard}
            >
              <div className="venture-card__image" aria-hidden="true">
                <img src={resolveCmsImage(v.image.src)} alt="" loading="lazy" />
              </div>

              <div className="reactive-card__surface flex flex-1 flex-col justify-between">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-ink-soft">
                      {v.year}
                    </span>
                  </div>

                  <div className="mt-7 max-w-2xl md:mt-8">
                    <h3 className="font-sans text-[clamp(1.95rem,8vw,3.45rem)] font-extrabold uppercase leading-[0.98] tracking-[0] md:text-[clamp(2.6rem,4.5vw,4.35rem)]">
                      {v.name.toUpperCase()}
                    </h3>
                  </div>

                  <div className="venture-card__story mt-6 max-w-2xl space-y-5 md:mt-7">
                    <p className="text-[0.98rem] leading-[1.78] text-ink-soft md:text-[1.03rem]">
                      {v.shortDescription}
                    </p>

                    <div className="venture-card__tags">
                      {v.tags.map((tag) => (
                        <span key={tag} className="venture-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center md:mt-8">
                    <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-foreground">
                      {v.category}
                    </span>
                    <a
                      href={v.link}
                      className="venture-card__cta"
                      aria-label={`Enquire about ${v.name}`}
                    >
                      <span>Enquire</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </StackingCards>
      </div>
    </section>
  );
}
