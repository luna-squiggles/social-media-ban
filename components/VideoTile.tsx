"use client";

import type { Question } from "@/data/questions";
import { usePreviewReel } from "@/components/PreviewReelProvider";
import { useVideoLightbox } from "@/components/VideoLightbox";
import { useSegmentLoop } from "@/lib/useSegmentLoop";

type VideoTileProps = {
  question: Question;
};

export function VideoTile({ question }: VideoTileProps) {
  const { reelUrl, reducedMotion } = usePreviewReel();
  const { open } = useVideoLightbox();
  const { videoRef, containerRef } = useSegmentLoop({
    preview: question.preview,
    reducedMotion,
  });

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={() => open(question.youtubeId, question.title)}
      aria-label={`Watch: ${question.title}`}
      className="group relative block aspect-[4/5] h-[var(--tile-height)] w-[calc(var(--tile-height)*0.8)] shrink-0 overflow-hidden rounded-2xl bg-black text-left transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <video
        ref={videoRef}
        src={reelUrl}
        muted
        playsInline
        loop={false}
        preload="auto"
        className="h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/55 group-focus-visible:bg-black/55" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <p className="font-serif text-sm leading-snug text-white">{question.title}</p>
      </div>
    </button>
  );
}
