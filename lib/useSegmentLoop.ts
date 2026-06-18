"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PreviewSegment } from "@/data/questions";

type UseSegmentLoopOptions = {
  preview: PreviewSegment;
  reducedMotion: boolean;
};

function getSegmentBounds(video: HTMLVideoElement, preview: PreviewSegment) {
  const duration = video.duration || preview.end;
  const end = Math.min(preview.end, duration);
  const start = Math.min(preview.start, Math.max(end - 0.1, 0));

  return { start, end };
}

export function useSegmentLoop({
  preview,
  reducedMotion,
}: UseSegmentLoopOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const segmentRef = useRef(preview);
  const shouldPlayRef = useRef(false);

  segmentRef.current = preview;

  const seekToStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const { start } = getSegmentBounds(video, segmentRef.current);
    if (Math.abs(video.currentTime - start) > 0.05) {
      video.currentTime = start;
    }
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !shouldPlayRef.current || !video.paused) return;

    const playPromise = video.play();
    if (playPromise) {
      // A concurrent seek can abort the play promise; the retry on the next
      // media event (canplay/seeked/playing) will recover it.
      playPromise.catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "100px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      seekToStart();
      setIsReady(true);
    };

    const handleTimeUpdate = () => {
      const { start, end } = getSegmentBounds(video, segmentRef.current);
      if (video.currentTime >= end - 0.05) {
        video.currentTime = start;
      }
    };

    // Recover playback whenever the element becomes able to play again.
    const handleRecover = () => tryPlay();

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("canplay", handleRecover);
    video.addEventListener("seeked", handleRecover);
    video.addEventListener("loadeddata", handleRecover);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("canplay", handleRecover);
      video.removeEventListener("seeked", handleRecover);
      video.removeEventListener("loadeddata", handleRecover);
    };
  }, [seekToStart, tryPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    const shouldPlay = isVisible && !reducedMotion;
    shouldPlayRef.current = shouldPlay;

    if (shouldPlay) {
      if (video.paused) {
        seekToStart();
        tryPlay();
      }
    } else if (!video.paused) {
      video.pause();
      if (reducedMotion) {
        seekToStart();
      }
    }
  }, [isReady, isVisible, reducedMotion, seekToStart, tryPlay]);

  return { videoRef, containerRef, isVisible };
}
