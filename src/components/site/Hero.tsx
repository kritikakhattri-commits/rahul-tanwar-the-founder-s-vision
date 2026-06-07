import type { CmsContent } from "@/lib/cms-content";
import { resolveCmsImage } from "@/lib/cms-assets";
import { HighlightedText } from "@/lib/cms-text";

export function Hero({ content }: { content: CmsContent["hero"] }) {
  return (
    <section
      id="top"
      className="mobile-hero relative min-h-screen overflow-hidden pt-24 md:pt-22 lg:pt-24"
    >
      <div className="mobile-hero__grid mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 items-start gap-8 px-5 pb-12 sm:px-6 md:gap-10 md:px-10 md:pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-center lg:gap-14 lg:pb-10 xl:gap-20">
        <div className="flex min-h-0 min-w-0 flex-col justify-center py-4 md:py-6 lg:min-h-[calc(100svh-10rem)] lg:py-0">
          <div className="w-full max-w-full space-y-5 md:space-y-6 lg:max-w-[920px]">
            <h1 className="hero-title font-display text-foreground">
              <span className="sm:whitespace-nowrap">
                {content.founderName}{" "}
                <span className="italic text-accent">{content.highlightedName}</span>
              </span>
            </h1>

            <p className="max-w-[19ch] font-display text-display-md text-foreground/90">
              <HighlightedText
                text={content.mainHeadline}
                highlight={content.highlightedWord}
                className="text-accent"
              />
            </p>

            <p className="w-full max-w-[calc(100vw-2.5rem)] text-[0.98rem] leading-[1.75] text-ink-soft sm:max-w-xl md:text-lg">
              {content.shortDescription}
            </p>

            <div className="flex items-center pt-3 md:pt-4">
              <a href={content.primaryButtonLink} className="magnetic-btn">
                <span>{content.primaryButtonText}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mobile-hero__media relative h-[48svh] min-h-[330px] min-w-0 sm:min-h-[380px] md:h-[60vh] lg:h-[calc(100svh-10rem)] lg:min-h-[560px] lg:max-h-[760px]">
          <div className="absolute inset-0 overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] bg-card shadow-[var(--shadow-editorial)]">
            <img
              src={resolveCmsImage(content.portraitImage.src)}
              alt={content.portraitImage.alt ?? "Rahul Tanwar - Founder portrait"}
              className="hero-portrait-image h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
