import { useReactiveCard } from "@/components/site/useReactiveCard";
import { resolveCmsImage } from "@/lib/cms-assets";
import type { CmsContent } from "@/lib/cms-content";
import { HighlightedText } from "@/lib/cms-text";

export function Philosophy({ content }: { content: CmsContent["philosophy"] }) {
  const reactiveCard = useReactiveCard();

  return (
    <section id="philosophy" className="relative bg-background py-18 md:py-28 lg:py-36">
      <div>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
          <div className="mb-10 max-w-3xl md:mb-14 lg:mb-16">
            <h2 className="font-display text-display-md">
              <HighlightedText
                text={content.heading}
                highlight={content.highlightedHeading}
                className="text-accent"
              />
            </h2>
            {content.supportingText ? (
              <p className="mt-6 text-lg leading-[1.75] text-ink-soft">{content.supportingText}</p>
            ) : null}
          </div>

          <ul
            className="principles-carousel -mx-5 flex flex-row flex-nowrap snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:block lg:overflow-hidden lg:border-t lg:border-border lg:px-0 lg:pb-0"
            aria-label="Operating principles"
          >
            {content.quoteBlocks.map((principle, i) => (
              <li
                key={principle.title}
                className="reactive-card group relative min-h-[19rem] min-w-[82vw] max-w-[82vw] shrink-0 snap-start overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:bg-accent/10 sm:min-w-[48vw] sm:max-w-[48vw] sm:min-h-[18rem] lg:block lg:min-h-0 lg:min-w-0 lg:w-auto lg:max-w-none lg:rounded-none lg:border-0 lg:border-b lg:bg-transparent lg:p-0 lg:shadow-none lg:hover:translate-y-0"
                {...reactiveCard}
              >
                <span
                  className="pointer-events-none absolute -top-8 left-16 hidden font-display text-[10rem] leading-none text-accent/10 opacity-0 transition-all duration-500 group-hover:left-24 group-hover:opacity-100 lg:block"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <div className="relative h-full lg:grid lg:h-auto lg:items-center lg:gap-8 lg:py-7 lg:grid-cols-[5rem_1fr_12rem]">
                  <span className="text-xs font-medium tracking-[0.14em] text-ink-soft lg:text-sm">
                    0{i + 1}
                  </span>

                  <div className="mt-8 min-w-0 lg:mt-0">
                    <span className="block [overflow-wrap:anywhere] font-display text-[clamp(2.3rem,13vw,4.25rem)] leading-[0.95] transition-transform duration-500 group-hover:translate-x-1 lg:text-[clamp(2.25rem,10vw,6.5rem)] lg:group-hover:translate-x-5">
                      {principle.title}
                    </span>
                    <p className="mt-4 max-w-2xl overflow-hidden text-base leading-relaxed text-ink-soft opacity-100 transition-all duration-500 lg:mt-0 lg:max-h-0 lg:opacity-0 lg:group-hover:mt-3 lg:group-hover:max-h-20 lg:group-hover:opacity-100 lg:text-lg">
                      {principle.content}
                    </p>
                  </div>

                  <div
                    className="relative hidden h-20 items-center justify-end lg:flex"
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

      <div className="mx-auto mt-10 max-w-[1600px] px-5 sm:px-6 md:mt-14 md:px-10">
        <div className="leadership-media relative h-[46vh] min-h-[300px] overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] md:h-[58vh] lg:h-[68vh]">
          <img
            src={resolveCmsImage(content.mediaImage.src)}
            alt={content.mediaImage.alt ?? "Rahul Tanwar walking through a manufacturing space"}
            loading="lazy"
            className="leadership-media__image absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/12 via-background/5 to-ink/18" />
          <div className="absolute inset-0 grain" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-foreground sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8">
            <div className="leadership-media__label max-w-full rounded-[1rem] border border-accent/45 bg-background/75 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-md">
              <div className="eyebrow">{content.mediaEyebrow}</div>
              <div className="mt-1 font-display text-[clamp(1.35rem,5vw,1.5rem)] leading-tight">
                {content.mediaTitle}
              </div>
            </div>
            <div className="hidden text-right md:block">
              <div className="eyebrow">Frame</div>
              <div className="font-display text-xl">003 / 010</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
