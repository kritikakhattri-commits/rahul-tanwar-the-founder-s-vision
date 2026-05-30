import { useEffect, useRef, type ReactNode } from "react";

type StackingCardsProps = {
  children: ReactNode;
  className?: string;
};

export function StackingCards({ children, className = "" }: StackingCardsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    const initStackingCards = async () => {
      const root = rootRef.current;

      if (!root) {
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

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stacking-card", root);

        if (cards.length <= 1) {
          return;
        }

        const firstCardHeight = cards[0]?.offsetHeight ?? window.innerHeight;
        const scrollDistance = () =>
          window.innerHeight * Math.max(cards.length - 1, 1) * 0.95 + window.innerHeight * 0.35;

        root.style.setProperty("--stacking-shell-height", `${firstCardHeight}px`);
        root.style.setProperty("--stacking-card-count", String(cards.length));

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: false,
            pinSpacing: true,
          },
        });

        cards.forEach((card, index) => {
          gsap.set(card, {
            zIndex: index + 1,
            transformOrigin: "center top",
            yPercent: index === 0 ? 0 : 108,
            opacity: 1,
            scale: 1,
          });
        });

        cards.slice(1).forEach((card, index) => {
          const previousCard = cards[index];
          const position = index;

          timeline
            .to(
              card,
              {
                yPercent: 0,
                duration: 1,
              },
              position,
            )
            .to(
              previousCard,
              {
                scale: 0.975,
                duration: 1,
              },
              position,
            );
        });

        const refresh = () => ScrollTrigger.refresh();

        window.addEventListener("load", refresh, { once: true });
        root.querySelectorAll("img").forEach((image) => {
          if (!image.complete) {
            image.addEventListener("load", refresh, { once: true });
            image.addEventListener("error", refresh, { once: true });
          }
        });

        ScrollTrigger.refresh();

        return () => {
          window.removeEventListener("load", refresh);
          root.querySelectorAll("img").forEach((image) => {
            image.removeEventListener("load", refresh);
            image.removeEventListener("error", refresh);
          });
          gsap.set(cards, {
            clearProps: "transform,transformOrigin,zIndex,opacity,y,yPercent,scale",
          });
          root.style.removeProperty("--stacking-shell-height");
          root.style.removeProperty("--stacking-card-count");
          timeline.kill();
        };
      });

      cleanup = () => media.revert();
      ScrollTrigger.refresh();
    };

    void initStackingCards();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className={`stacking-cards ${className}`.trim()}>
      {children}
    </div>
  );
}
