"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ActiveVideo = { youtubeId: string; title: string } | null;

type VideoLightboxContextValue = {
  open: (youtubeId: string, title: string) => void;
  close: () => void;
};

const VideoLightboxContext = createContext<VideoLightboxContextValue | null>(
  null,
);

export function VideoLightboxProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveVideo>(null);

  const open = useCallback((youtubeId: string, title: string) => {
    setActive({ youtubeId, title });
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close]);

  return (
    <VideoLightboxContext.Provider value={{ open, close }}>
      {children}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            &times;
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="relative aspect-[9/16] h-[94vh] max-h-[94vh] w-auto max-w-[94vw] overflow-hidden rounded-2xl bg-black shadow-2xl"
          >
            <iframe
              key={active.youtubeId}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&playsinline=1`}
              title={active.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </VideoLightboxContext.Provider>
  );
}

export function useVideoLightbox() {
  const context = useContext(VideoLightboxContext);
  if (!context) {
    throw new Error(
      "useVideoLightbox must be used within VideoLightboxProvider",
    );
  }

  return context;
}
