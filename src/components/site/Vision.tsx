import { resolveCmsImage } from "@/lib/cms-assets";
import type { CmsContent } from "@/lib/cms-content";

export function Vision({ content }: { content: CmsContent["vision"] }) {
  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-ink py-24 text-background md:py-36 lg:py-48"
    >
      <div className="absolute inset-0 opacity-30">
        <img
          src={resolveCmsImage(content.image.src)}
          alt={content.image.alt ?? "Rahul Tanwar - vision portrait"}
          loading="lazy"
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      </div>
      <div className="absolute inset-0 grain" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4 md:mb-16">
          <span className="h-px w-12 bg-accent" />
          <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-accent">
            {content.eyebrow}
          </span>
        </div>

        <h2 className="font-display text-display-xl leading-[0.96] max-w-[14ch]">
          <span className="block">{content.headingLines[0]}</span>
          <span className="block italic text-accent">{content.highlightedLine}</span>
          <span className="block">{content.headingLines[1]}</span>
        </h2>

        <div className="mt-12 grid max-w-5xl grid-cols-1 gap-8 md:mt-20 md:grid-cols-3 md:gap-10">
          <p className="text-[1.02rem] leading-[1.75] text-background/70 md:text-lg">
            {content.description}
          </p>
          <div className="hidden md:block" />
          <p className="text-[1.02rem] leading-[1.75] text-background/70 md:text-right md:text-lg">
            {content.supportingText}
          </p>
        </div>

        {content.keyPoints.length ? (
          <div className="mt-12 grid max-w-5xl grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-4">
            {content.keyPoints.map((point) => (
              <article key={point.title} className="border-t border-background/20 pt-5">
                <h3 className="font-display text-2xl">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/64">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
