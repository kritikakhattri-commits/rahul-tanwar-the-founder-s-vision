import { useCallback, useEffect, useState, type MouseEvent } from "react";
import type { CmsContent } from "@/lib/cms-content";

export function Nav({ content }: { content: CmsContent["header"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToAnchor = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    setOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 shadow-[0_12px_36px_-30px_var(--secondary-dark)]"
          : "bg-transparent"
      }`}
    >
      <div className="mobile-nav__bar mx-auto flex h-[4.75rem] max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-6 md:h-20 md:px-10">
        <a href="#top" onClick={scrollToAnchor} className="flex min-w-0 items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="truncate font-display text-[1.45rem] leading-none sm:text-2xl">
            {content.logoText}
          </span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
          {content.navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={scrollToAnchor}
              className="relative text-[11px] font-medium tracking-[0.14em] uppercase text-ink-soft"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={content.ctaLink}
          onClick={scrollToAnchor}
          className="!hidden lg:!inline-flex ghost-btn !min-h-0 !px-4 !py-2.5 text-[10px]"
        >
          <span>{content.ctaText}</span>
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="mobile-nav__toggle flex shrink-0 flex-col gap-1.5 p-2 lg:hidden"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-background shadow-[0_18px_46px_-36px_var(--secondary-dark)] transition-[max-height] duration-300 ease-out ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="mobile-nav__menu flex flex-col gap-4 px-5 py-6 sm:px-6 md:px-10">
          {content.navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={scrollToAnchor}
              className="mobile-nav__link font-display text-[clamp(2rem,7vw,3rem)] leading-[0.98]"
            >
              {l.label}
            </a>
          ))}
          <a href={content.ctaLink} onClick={scrollToAnchor} className="ghost-btn mt-2 w-fit">
            <span>{content.ctaText}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
