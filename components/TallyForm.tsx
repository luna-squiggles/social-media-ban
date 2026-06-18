"use client";

import { useEffect } from "react";

const TALLY_SRC =
  "https://tally.so/embed/6848Go?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
const TALLY_SCRIPT = "https://tally.so/widgets/embed.js";

type TallyGlobal = {
  loadEmbeds: () => void;
};

export function TallyForm() {
  useEffect(() => {
    const loadEmbeds = () => {
      const tally = (window as unknown as { Tally?: TallyGlobal }).Tally;

      if (tally) {
        tally.loadEmbeds();
        return;
      }

      document
        .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
        .forEach((iframe) => {
          if (iframe.dataset.tallySrc) {
            iframe.src = iframe.dataset.tallySrc;
          }
        });
    };

    if ((window as unknown as { Tally?: TallyGlobal }).Tally) {
      loadEmbeds();
      return;
    }

    const existing = document.querySelector(`script[src="${TALLY_SCRIPT}"]`);
    if (existing) {
      loadEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = TALLY_SCRIPT;
    script.onload = loadEmbeds;
    script.onerror = loadEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      data-tally-src={TALLY_SRC}
      loading="lazy"
      width="100%"
      height={234}
      frameBorder={0}
      title="Submit a question"
      className="w-full"
    />
  );
}
