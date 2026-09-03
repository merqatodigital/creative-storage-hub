import type { MediaValue } from "../content/types";
import { useRef, useState } from "react";
import { cn } from "../utils/cn";
import { isSupabaseConfigured, supabase } from "../integrations/supabase/siteConfig";
import { uploadSiteMedia } from "../integrations/supabase/mediaRepository";
import { formatFileSize, optimizeImage } from "./mediaProcessing";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink-900/60">
      {children}
    </span>
  );
}

export function Text({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-bronze-500"
      />
    </label>
  );
}

export function Area({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <textarea
        value={value ?? ""}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-bronze-500"
      />
    </label>
  );
}

export function List({
  label,
  items,
  onChange,
  itemLabel = "Item",
  area = false,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  itemLabel?: string;
  area?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded border border-ink-900/10 bg-sand-50/60 p-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-[10px] uppercase tracking-[0.25em] text-bronze-600 hover:text-ink-900"
        >
          + Add
        </button>
      </div>
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          {area ? (
            <textarea
              value={it}
              rows={2}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-bronze-500"
              placeholder={`${itemLabel} ${i + 1}`}
            />
          ) : (
            <input
              value={it}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none focus:border-bronze-500"
              placeholder={`${itemLabel} ${i + 1}`}
            />
          )}
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="rounded border border-ink-900/15 px-2 py-2 text-xs text-ink-900/50 hover:border-red-400 hover:text-red-600"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

const MAX_UPLOAD_MB = 50;

export function MediaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: MediaValue;
  onChange: (v: MediaValue) => void;
}) {
  const imgRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const upload = async (file: File | null, type: "image" | "video") => {
    if (!file) return;
    setBusy(true);
    setMessage("");
    setError("");

    try {
      // Once connected to Supabase, files belong in Storage rather than the
      // browser. The returned public URL keeps site content lightweight.
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          try {
            const src = await uploadSiteMedia(
              file,
              type === "image" ? "images" : "videos"
            );
            onChange({ ...value, type, src });
            setMessage(`${formatFileSize(file.size)} uploaded to site storage.`);
            return;
          } catch {
            // The current Supabase user may not have the admin role yet.
            // Images can still use the optimized local fallback below.
          }
        }
      }

      if (type === "image") {
        const result = await optimizeImage(file);
        onChange({ ...value, type, src: result.dataUrl });
        const dimensions = result.width
          ? ` · ${result.width} × ${result.height}px`
          : "";
        setMessage(
          `${formatFileSize(result.originalBytes)} optimized to ${formatFileSize(
            result.outputBytes
          )}${dimensions}.`
        );
        return;
      }

      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_LOCAL_VIDEO_MB) {
        throw new Error(
          `Video is ${sizeMB.toFixed(1)} MB. Connect Supabase for videos larger than ${MAX_LOCAL_VIDEO_MB} MB.`
        );
      }
      const src = await fileToDataURL(file);
      onChange({ ...value, type, src });
      setMessage(`${formatFileSize(file.size)} video saved locally.`);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "The file could not be uploaded."
      );
    } finally {
      setBusy(false);
      if (imgRef.current) imgRef.current.value = "";
      if (vidRef.current) vidRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded border border-ink-900/10 bg-sand-50/60 p-4">
      <Label>{label}</Label>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "relative flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded border border-dashed border-ink-900/20 bg-white text-[10px] uppercase tracking-widest text-ink-900/40"
          )}
        >
          {value.type === "image" && value.src && (
            <img src={value.src} alt="" className="h-full w-full object-cover" />
          )}
          {value.type === "video" && value.src && (
            <video src={value.src} muted className="h-full w-full object-cover" />
          )}
          {(value.type === "none" || !value.src) && <span>Empty</span>}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => imgRef.current?.click()}
              className="rounded border border-ink-900/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-ink-900 hover:bg-ink-900 hover:text-sand-50 disabled:cursor-wait disabled:opacity-40"
            >
              {busy ? "Processing…" : "Choose Image"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => vidRef.current?.click()}
              className="rounded border border-ink-900/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-ink-900 hover:bg-ink-900 hover:text-sand-50 disabled:cursor-wait disabled:opacity-40"
            >
              Choose Video
            </button>
            {value.src && (
              <button
                type="button"
                onClick={() => onChange({ ...value, type: "none", src: "" })}
                className="rounded border border-red-300 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-red-600 hover:bg-red-600 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
          {message && (
            <p className="text-[11px] leading-relaxed text-emerald-700">{message}</p>
          )}
          {error && (
            <p className="text-[11px] leading-relaxed text-red-600">{error}</p>
          )}
          {!isSupabaseConfigured && !message && !error && (
            <p className="text-[10px] leading-relaxed text-ink-900/40">
              Large images are resized automatically. Connect Supabase for large video files.
            </p>
          )}
          <input
            ref={imgRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => upload(e.target.files?.[0] ?? null, "image")}
          />
          <input
            ref={vidRef}
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => upload(e.target.files?.[0] ?? null, "video")}
          />
          <input
            value={value.alt}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="Alt / description"
            className="rounded border border-ink-900/15 bg-white px-3 py-1.5 text-xs outline-none focus:border-bronze-500"
          />
        </div>
      </div>
    </div>
  );
}

export function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-ink-900/10 bg-white p-5">
      <h3 className="font-serif text-lg font-light text-ink-900">{title}</h3>
      {children}
    </div>
  );
}

export function Slider({
  label,
  value,
  onChange,
  min = 8,
  max = 200,
  step = 1,
  unit = "px",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            className="w-16 rounded border border-ink-900/15 bg-white px-2 py-1 text-right text-xs outline-none focus:border-bronze-500"
          />
          <span className="text-[10px] text-ink-900/50">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ink-900"
      />
    </label>
  );
}

export function Toggle({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3 rounded border border-ink-900/10 bg-sand-50/60 p-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-ink-900">{label}</span>
        {hint && <span className="text-[11px] text-ink-900/50">{hint}</span>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          value ? "bg-ink-900" : "bg-ink-900/20"
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            value ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
