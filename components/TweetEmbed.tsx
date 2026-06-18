"use client";

import { useEffect, useRef } from "react";

const TWEET_ID = "2066429352246489341";
const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

type TwitterWidgets = {
  widgets: { load: (element?: HTMLElement) => void };
};

export function TweetEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const render = () => {
      const twttr = (window as unknown as { twttr?: TwitterWidgets }).twttr;
      if (twttr?.widgets && containerRef.current) {
        twttr.widgets.load(containerRef.current);
      }
    };

    if ((window as unknown as { twttr?: TwitterWidgets }).twttr?.widgets) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGETS_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }

    const script = document.createElement("script");
    script.src = WIDGETS_SRC;
    script.async = true;
    script.onload = render;
    document.body.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} className="[&_.twitter-tweet]:!my-0">
      <blockquote className="twitter-tweet" data-theme="light" data-dnt="true">
        <a
          href={`https://twitter.com/KanishkaNarayan/status/${TWEET_ID}`}
        >
          View the announcement on X
        </a>
      </blockquote>
    </div>
  );
}
