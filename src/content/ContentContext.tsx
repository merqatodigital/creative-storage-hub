import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Content } from "./types";
import { defaultContent } from "./defaultContent";
import { getPublishedContent, publishContent } from "../integrations/supabase/contentRepository";

const STORAGE_KEY = "amuma.content.v1";

type Ctx = {
  content: Content;
  setContent: (updater: (c: Content) => Content) => void;
  replaceContent: (c: Content) => void;
  resetContent: () => void;
  publish: () => Promise<void>;
  publishing: boolean;
  loaded: boolean;
};

// Keep one context instance even if this module is duplicated (HMR / mixed graphs),
// otherwise consumers read a different context than the provider writes to.
const globalStore = globalThis as unknown as { __amumaContentCtx?: React.Context<Ctx | null> };
const ContentCtx = globalStore.__amumaContentCtx ?? createContext<Ctx | null>(null);
globalStore.__amumaContentCtx = ContentCtx;

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

function loadLocalContent(): Content | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return deepMerge<Content>(defaultContent, JSON.parse(raw));
  } catch {
    return null;
  }
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<Content>(defaultContent);
  const [loaded, setLoaded] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Cloud content wins; the local draft is a fallback when nothing is published.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let next: Content | null = null;
      try {
        const remote = await getPublishedContent();
        if (remote) next = deepMerge<Content>(defaultContent, remote);
      } catch (e) {
        console.warn("Could not load published content.", e);
      }
      if (!next) next = loadLocalContent();
      if (!cancelled && next) setContentState(next);
      if (!cancelled) setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn("Failed to persist local draft — storage may be full.", e);
    }
  }, [content, loaded]);

  const publish = useCallback(async () => {
    setPublishing(true);
    try {
      await publishContent(content);
    } finally {
      setPublishing(false);
    }
  }, [content]);

  const value = useMemo<Ctx>(
    () => ({
      content,
      setContent: (updater) => setContentState((prev) => updater(prev)),
      replaceContent: (c) => setContentState(c),
      resetContent: () => setContentState(defaultContent),
      publish,
      publishing,
      loaded,
    }),
    [content, publish, publishing, loaded],
  );

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentCtx);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
