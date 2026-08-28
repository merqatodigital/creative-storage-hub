import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Content } from "./types";
import { defaultContent } from "./defaultContent";

const STORAGE_KEY = "amuma.content.v1";

type Ctx = {
  content: Content;
  setContent: (updater: (c: Content) => Content) => void;
  replaceContent: (c: Content) => void;
  resetContent: () => void;
};

const ContentCtx = createContext<Ctx | null>(null);

function deepMerge<T>(def: T, incoming: unknown): T {
  if (
    def &&
    incoming &&
    typeof def === "object" &&
    typeof incoming === "object" &&
    !Array.isArray(def) &&
    !Array.isArray(incoming)
  ) {
    const out: Record<string, unknown> = { ...(def as object) };
    for (const k of Object.keys(incoming as object)) {
      const dv = (def as Record<string, unknown>)[k];
      const iv = (incoming as Record<string, unknown>)[k];
      out[k] = dv !== undefined ? deepMerge(dv as unknown, iv) : iv;
    }
    return out as T;
  }
  return (incoming ?? def) as T;
}

function loadContent(): Content {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw);
    return deepMerge<Content>(defaultContent, parsed);
  } catch {
    return defaultContent;
  }
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<Content>(() => loadContent());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn("Failed to persist content — storage may be full.", e);
    }
  }, [content]);

  const value = useMemo<Ctx>(
    () => ({
      content,
      setContent: (updater) => setContentState((prev) => updater(prev)),
      replaceContent: (c) => setContentState(c),
      resetContent: () => setContentState(defaultContent),
    }),
    [content]
  );

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentCtx);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
