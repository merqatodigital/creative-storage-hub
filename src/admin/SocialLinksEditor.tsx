import type { SocialLink } from "../content/types";
import { Label } from "./fields";

const NETWORKS = [
  "Website",
  "Instagram",
  "Facebook",
  "YouTube",
  "LinkedIn",
  "TikTok",
  "X",
];

export function SocialLinksEditor({
  links,
  onChange,
}: {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}) {
  const update = (index: number, patch: Partial<SocialLink>) => {
    const next = [...links];
    next[index] = { ...next[index]!, ...patch };
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Label>Social & Website Links</Label>
          <span className="text-[11px] text-ink-900/40">
            Optional. Empty links are hidden from the site.
          </span>
        </div>
        <button
          type="button"
          onClick={() =>
            onChange([...links, { label: "Website", url: "" }])
          }
          className="shrink-0 rounded-full bg-ink-900 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-white"
        >
          Add Link
        </button>
      </div>

      {links.map((link, index) => (
        <div
          key={index}
          className="grid gap-2 rounded-lg bg-sand-50 p-3 sm:grid-cols-[120px_1fr_auto]"
        >
          <select
            value={NETWORKS.includes(link.label) ? link.label : "Website"}
            onChange={(event) =>
              update(index, { label: event.target.value })
            }
            className="rounded border border-ink-900/10 bg-white px-3 py-2 text-xs outline-none focus:border-ink-900"
          >
            {NETWORKS.map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </select>
          <input
            value={link.url}
            onChange={(event) => update(index, { url: event.target.value })}
            placeholder="https://..."
            className="min-w-0 rounded border border-ink-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900"
          />
          <button
            type="button"
            onClick={() => onChange(links.filter((_, item) => item !== index))}
            aria-label={`Remove ${link.label} link`}
            className="rounded border border-ink-900/10 px-3 text-sm text-ink-900/40 hover:border-red-300 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
