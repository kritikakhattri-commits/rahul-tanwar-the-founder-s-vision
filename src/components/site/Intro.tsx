import { resolveCmsImage } from "@/lib/cms-assets";
import type { CmsContent } from "@/lib/cms-content";
import { HighlightedText } from "@/lib/cms-text";

export function Intro({ content }: { content: CmsContent["about"] }) {
  return (
    <section id="about" className="relative py-18 sm:py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-9 px-5 sm:px-6 md:gap-10 md:px-10 lg:grid-cols-[45fr_55fr] lg:gap-14 xl:gap-18">
        <div className="order-2 self-start lg:order-1">
          <div className="founder-portrait-frame relative aspect-[5/6] overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] bg-card shadow-[var(--shadow-soft)] sm:aspect-[4/5] lg:aspect-[9/10]">
            <img
              src={resolveCmsImage(content.image.src)}
              alt={content.image.alt ?? "Rahul Tanwar at work"}
              loading="lazy"
              className="founder-portrait-image h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/5" />
          </div>
          <div className="mt-5 flex items-start justify-between gap-5">
            <div>
              <div className="eyebrow">Portrait</div>
              <div className="mt-1 font-display text-xl">{content.imageCaptionLeft}</div>
            </div>
            <div className="text-right">
              <div className="eyebrow">Based</div>
              <div className="mt-1 font-display text-xl">{content.imageCaptionRight}</div>
            </div>
          </div>
        </div>

        <div className="order-1 space-y-6 md:space-y-7 lg:order-2 lg:pt-1 xl:pt-2">
          <div className="flex items-center gap-4">
            <span className="eyebrow">{content.eyebrow}</span>
          </div>

          <h2 className="max-w-[900px] text-balance font-display text-[clamp(2.15rem,10vw,4.3rem)] leading-[1.05] md:text-[clamp(3.4rem,6vw,7rem)] md:leading-[0.95]">
            <HighlightedText
              text={content.sectionTitle}
              highlight={content.highlightedTitle}
              className="text-accent"
            />
          </h2>

          <div className="max-w-2xl space-y-5 text-[1.02rem] leading-[1.68] text-foreground/85 md:text-xl">
            <p>{content.mainParagraph}</p>
            {content.supportingContent.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === content.supportingContent.length - 1 ? "text-ink-soft" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </div>

      <div className="mx-auto mt-10 w-full max-w-[1600px] px-5 sm:px-6 md:mt-14 md:px-10">
        <div
          className="editorial-card-track flex flex-row flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:grid-cols-5"
          role="list"
          aria-label="Founder operating framework"
        >
          {content.framework.map((item) => (
            <article
              key={item.number}
              role="listitem"
              className="group min-w-[82vw] max-w-[82vw] shrink-0 snap-start overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] bg-card shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-editorial)] md:min-w-0 md:max-w-none md:shrink"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={resolveCmsImage(item.image.src)}
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
                <h3 className="font-display text-[1.85rem] leading-[1.04] md:text-[2rem]">
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
