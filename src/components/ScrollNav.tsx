import { useEffect, useState } from "react";

/** Up goes to the page top and down goes to the absolute page bottom. */
export function ScrollNav() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      setAtTop(scrollTop <= 8);
      setAtBottom(scrollTop + window.innerHeight >= pageHeight - 8);
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    window.scrollTo({ top: pageHeight, left: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={scrollToTop}
        disabled={atTop}
        aria-label="Scroll to top of page"
        title="Go to top"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-900/20 text-white/80 backdrop-blur-md transition-all hover:bg-ink-900/35 hover:text-white disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={scrollToBottom}
        disabled={atBottom}
        aria-label="Scroll to bottom of page"
        title="Go to bottom"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-900/20 text-white/80 backdrop-blur-md transition-all hover:bg-ink-900/35 hover:text-white disabled:pointer-events-none disabled:opacity-30 md:h-12 md:w-12"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}