import { useEffect, useMemo, useRef, useState } from "react";
import { COLOR_FAMILIES } from "../theme/colorLibrary";

const RECENT_KEY = "amuma.recentColors.v1";
const MAX_RECENT = 16;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecent(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
  try {
    const list = loadRecent();
    const next = [hex.toLowerCase(), ...list.filter((c) => c.toLowerCase() !== hex.toLowerCase())].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/**
 * Simple, user-friendly color picker:
 * - Shows current color swatch + hex input + native picker
 * - Click "Library" to open a curated 40-color grid + search for full 300+ library
 * - Designed to be non-overwhelming by default
 */
export function ColorPicker({
  value,
  onChange,
  allowClear = false,
  onClear,
  compact = false,
}: {
  value: string;
  onChange: (hex: string) => void;
  allowClear?: boolean;
  onClear?: () => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [recent, setRecent] = useState<string[]>(loadRecent());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const pick = (hex: string) => {
    onChange(hex);
    saveRecent(hex);
    setRecent(loadRecent());
  };

  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(value);
  const displayColor = isValidHex ? value : "#ffffff";

  // Curated simple palette — 40 most useful luxury colors
  const simpleFamilies = useMemo(() => COLOR_FAMILIES.slice(0, 8), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return showFull ? COLOR_FAMILIES : simpleFamilies;
    return COLOR_FAMILIES.map((f) => ({
      ...f,
      shades: f.shades.filter(
        (s) =>
          f.name.toLowerCase().includes(q) ||
          f.id.includes(q) ||
          s.hex.toLowerCase().includes(q) ||
          s.shade.includes(q)
      ),
    })).filter((f) => f.shades.length > 0);
  }, [query, showFull, simpleFamilies]);

  return (
    <div className="relative" ref={wrapRef}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-8 items-center gap-1.5 rounded border border-ink-900/15 bg-white px-2.5 text-[10px] uppercase tracking-[0.15em] text-ink-900/70 hover:border-ink-900/40"
          title="Open color library"
        >
          <div className="h-4 w-4 rounded-sm border border-ink-900/15" style={{ background: value || "transparent" }} />
          {!compact && <span>Pick</span>}
        </button>
        <input
          type="color"
          value={displayColor}
          onChange={(e) => pick(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded border border-ink-900/15 bg-transparent"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => isValidHex && saveRecent(value)}
          placeholder={allowClear ? "Default" : "#000000"}
          className="w-24 rounded border border-ink-900/15 bg-white px-2 py-1 font-mono text-[11px] uppercase outline-none focus:border-bronze-500"
        />
        {allowClear && value && (
          <button type="button" onClick={onClear} className="text-[10px] text-ink-900/40 hover:text-red-600">
            ×
          </button>
        )}
      </div>

      {open && (
        <div className="absolute right-0 top-full z-[110] mt-2 w-[360px] max-w-[92vw] rounded-lg border border-ink-900/15 bg-white shadow-2xl">
          <div className="flex items-center justify-between gap-2 border-b border-ink-900/10 px-3 py-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-900/60">
              {showFull ? "Full Library · 300+" : "Quick Colors"}
            </span>
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-28 rounded border border-ink-900/15 bg-sand-50 px-2 py-1 text-[11px] outline-none focus:border-bronze-500"
              />
              <button type="button" onClick={() => setOpen(false)} className="text-lg leading-none text-ink-900/40 hover:text-ink-900">
                ×
              </button>
            </div>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-3">
            {recent.length > 0 && !query && (
              <div className="mb-3">
                <span className="mb-1.5 block text-[9px] uppercase tracking-[0.25em] text-ink-900/50">Recent</span>
                <div className="flex flex-wrap gap-1">
                  {recent.map((c) => (
                    <Swatch key={c} hex={c} label={c} selected={value.toLowerCase() === c.toLowerCase()} onPick={() => pick(c)} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {filtered.map((family) => (
                <div key={family.id}>
                  <span className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-ink-900/50">{family.name}</span>
                  <div className="grid grid-cols-8 gap-1">
                    {family.shades.map((s) => (
                      <Swatch key={s.hex + s.shade} hex={s.hex} label={`${family.name} ${s.shade} · ${s.hex}`} selected={value.toLowerCase() === s.hex.toLowerCase()} onPick={() => pick(s.hex)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!query && (
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                className="mt-3 w-full rounded border border-ink-900/10 py-2 text-[10px] uppercase tracking-[0.2em] text-ink-900/60 hover:bg-sand-50"
              >
                {showFull ? "← Show quick colors" : `Show full library (${COLOR_FAMILIES.length} families)`}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Swatch({
  hex,
  label,
  badge,
  selected,
  onPick,
}: {
  hex: string;
  label: string;
  badge?: string;
  selected: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onPick}
      className={`group relative aspect-square w-full overflow-hidden rounded-sm border transition-all hover:scale-[1.15] hover:z-10 hover:shadow-md ${
        selected
          ? "border-ink-900 ring-2 ring-bronze-500 ring-offset-1"
          : "border-ink-900/10"
      }`}
      style={{ background: hex }}
    >
      {badge && (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-black/60 py-px text-center text-[7px] font-medium text-white group-hover:block"
          aria-hidden
        >
          {badge}
        </span>
      )}
    </button>
  );
}
