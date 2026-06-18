"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/*
 * A sticky/pinned section that works at any height. We measure the rendered
 * height and set the sticky `top` so that:
 *  - sections that fit the viewport pin at the top (stay stationary while the
 *    next section rises over them);
 *  - sections taller than the viewport pin at the bottom, i.e. they scroll all
 *    the way through (so every bit of content is visible) before sticking.
 * This keeps the pinned parallax on mobile and short windows without ever
 * clipping content.
 */
export function StickySection({
  className = "",
  children,
  ...rest
}: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const offset = Math.min(0, window.innerHeight - element.offsetHeight);
      element.style.top = `${offset}px`;
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`sticky flex min-h-svh items-center ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
