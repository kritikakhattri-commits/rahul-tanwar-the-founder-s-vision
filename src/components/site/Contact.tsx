import type { CmsContent } from "@/lib/cms-content";
import { HighlightedText } from "@/lib/cms-text";

export function Contact({ content }: { content: CmsContent["contact"] }) {
  return (
    <section id="contact" className="relative py-18 md:py-28 lg:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 className="mt-5 font-display text-display-lg md:mt-6">
              <HighlightedText
                text={content.heading}
                highlight={content.highlightedHeading}
                className="text-accent"
              />
            </h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-[1.75] text-ink-soft md:mt-8 md:text-lg">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
              <a href={content.contactCtaLink} className="magnetic-btn">
                <span>{content.contactCtaText}</span>
                <span>→</span>
              </a>
              <a href={content.secondaryCtaLink} className="ghost-btn">
                <span>{content.secondaryCtaText}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-7 rounded-[clamp(1rem,2vw,1.5rem)] bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8 md:space-y-8 md:p-10">
              <div>
                <div className="eyebrow">Office</div>
                <div className="mt-2 font-display text-[clamp(1.35rem,5vw,1.5rem)] leading-tight">
                  {content.location}
                </div>
              </div>
              <div>
                <div className="eyebrow">Email</div>
                <a
                  href={`mailto:${content.email}`}
                  className="mt-2 block overflow-wrap-anywhere font-display text-[clamp(1.25rem,5vw,1.5rem)] leading-tight"
                >
                  {content.email}
                </a>
              </div>
              {content.phone ? (
                <div>
                  <div className="eyebrow">Phone</div>
                  <a
                    href={`tel:${content.phone}`}
                    className="mt-2 block font-display text-[clamp(1.35rem,5vw,1.5rem)] leading-tight"
                  >
                    {content.phone}
                  </a>
                </div>
              ) : null}
              <div>
                <div className="eyebrow">Social</div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  {content.socialLinks.map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      className="underline-offset-4"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({
  content,
  logoText,
}: {
  content: CmsContent["contact"];
  logoText: string;
}) {
  return (
    <footer className="bg-secondary py-10 text-background md:py-12">
      <div className="mx-auto grid max-w-[1600px] gap-5 px-5 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="truncate font-display text-lg">{logoText}</span>
        </div>
        <div className="max-w-full text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-background/65 md:text-center">
          © {new Date().getFullYear()} Office of Rahul Tanwar. All rights reserved.
        </div>
        <div className="text-xs font-medium uppercase leading-relaxed tracking-[0.14em] text-background/65 md:text-right">
          {content.footerTagline}
        </div>
      </div>
    </footer>
  );
}
