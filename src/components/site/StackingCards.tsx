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

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top+=96",
            end: () => `+=${window.innerHeight * Math.max(cards.length - 1, 1) * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        cards.forEach((card, index) => {
          gsap.set(card, {
            zIndex: index + 1,
            transformOrigin: "center top",
            yPercent: index === 0 ? 0 : 112,
            opacity: 1,
            scale: 1,
          });
        });

        cards.slice(1).forEach((card, index) => {
          const previousCards = cards.slice(0, index + 1);
          const position = index * 1.08;

          timeline
            .to(
              card,
              {
                yPercent: 0,
                duration: 1.15,
              },
              position,
            )
            .to(
              previousCards,
              {
                scale: 0.97,
                yPercent: -1.8,
                duration: 1.15,
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
