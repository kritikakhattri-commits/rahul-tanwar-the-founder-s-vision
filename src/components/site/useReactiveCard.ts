import { useCallback, useRef, type MouseEvent } from "react";

type ReactiveCardOptions = {
  maxRotateX?: number;
  maxRotateY?: number;
};

const canUseReactiveCard = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};

export function useReactiveCard({ maxRotateX = 3, maxRotateY = 4 }: ReactiveCardOptions = {}) {
  const frameRef = useRef<number | null>(null);

  const cancelFrame = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!canUseReactiveCard()) {
        return;
      }

      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxRotateX * 2;
      const rotateY = (x - 0.5) * maxRotateY * 2;

      cancelFrame();
      frameRef.current = window.requestAnimationFrame(() => {
        element.style.setProperty("--card-x", `${x * 100}%`);
        element.style.setProperty("--card-y", `${y * 100}%`);
        element.style.setProperty("--card-rotate-x", `${rotateX.toFixed(2)}deg`);
        element.style.setProperty("--card-rotate-y", `${rotateY.toFixed(2)}deg`);
        element.style.setProperty("--card-image-x", `${((x - 0.5) * 10).toFixed(2)}px`);
        element.style.setProperty("--card-image-y", `${((y - 0.5) * 10).toFixed(2)}px`);
      });
    },
    [cancelFrame, maxRotateX, maxRotateY],
  );

  const onMouseLeave = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      cancelFrame();
      const element = event.currentTarget;
      element.style.setProperty("--card-x", "50%");
      element.style.setProperty("--card-y", "50%");
      element.style.setProperty("--card-rotate-x", "0deg");
      element.style.setProperty("--card-rotate-y", "0deg");
      element.style.setProperty("--card-image-x", "0px");
      element.style.setProperty("--card-image-y", "0px");
    },
    [cancelFrame],
  );

  return {
    onMouseMove,
    onMouseLeave,
  };
}
