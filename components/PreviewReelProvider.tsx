"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { PREVIEW_REEL_URL } from "@/data/questions";
import { useReducedMotion } from "@/lib/useReducedMotion";

type PreviewReelContextValue = {
  reelUrl: string;
  reducedMotion: boolean;
};

const PreviewReelContext = createContext<PreviewReelContextValue | null>(null);

export function PreviewReelProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  const value = useMemo(
    () => ({
      reelUrl: PREVIEW_REEL_URL,
      reducedMotion,
    }),
    [reducedMotion],
  );

  return (
    <PreviewReelContext.Provider value={value}>
      {children}
    </PreviewReelContext.Provider>
  );
}

export function usePreviewReel() {
  const context = useContext(PreviewReelContext);
  if (!context) {
    throw new Error("usePreviewReel must be used within PreviewReelProvider");
  }

  return context;
}
