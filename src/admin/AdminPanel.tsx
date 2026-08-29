import { useEffect, useState } from "react";
import { useContent } from "../content/ContentContext";
import type { Content } from "../content/types";
import { defaultContent } from "../content/defaultContent";
import { cn } from "../utils/cn";
import { Text, Area, List, MediaField, Panel, Label, Slider, Toggle } from "./fields";
import { ThemeTab } from "./ThemeTab";
import { MoreSectionsTab } from "./MoreSectionsTab";
import { SocialLinksEditor } from "./SocialLinksEditor";
import { CloudBar } from "./CloudBar";
import { ApplicationsTab } from "./ApplicationsTab";

const PASSKEY = "5309";

const TABS = [
  { id: "theme", label: "Theme" },
  { id: "logo", label: "Logo" },
  { id: "header", label: "Header" },
  { id: "hero", label: "Hero" },
  { id: "story", label: "Story" },
  { id: "destinations", label: "Places" },
  { id: "tiers", label: "Tiers" },
  { id: "experience", label: "Experience" },
  { id: "retreat", label: "Retreat" },
  { id: "more", label: "More Sections" },
  { id: "footer", label: "Footer & Data" },
  { id: "applications", label: "Applications" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { content, setContent, replaceContent, resetContent } = useContent();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<TabId>("theme");

  useEffect(() => {
    if (!open) { setAuthed(false); setPass(""); setErr(""); }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  if (!authed) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/85 backdrop-blur p-6">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-bronze-600">AMUMA</span>
              <h2 className="mt-1 font-serif text-2xl">Admin</h2>
              <p className="mt-1 text-xs text-ink-900/50">Passkey required</p>
            </div>
            <button onClick={onClose} className="text-xl text-ink-900/40 hover:text-ink-900">×</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (pass === PASSKEY) setAuthed(true); else setErr("Wrong passkey"); }} className="mt-6 flex flex-col gap-3">
            <input type="password" autoFocus value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Enter passkey" className="rounded-lg border border-ink-900/15 bg-sand-50 px-4 py-3 text-center tracking-widest outline-none focus:border-ink-900" />
            {err && <p className="text-xs text-red-600">{err}</p>}
            <button type="submit" className="rounded-full bg-ink-900 py-3 text-xs uppercase tracking-[0.25em] text-white hover:bg-ink-700">Enter</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex bg-ink-900/20 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-full max-w-5xl flex-col bg-[#fafaf8] shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-900/10 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-[10px] tracking-[0.2em] text-white">A</span>
            <div>
              <h2 className="font-serif text-base leading-none">AMUMA Admin</h2>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/40">Simple mode · Full control when needed</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CloudBar />
            <button onClick={() => { if (confirm("Reset all content?")) resetContent(); }} className="rounded-full border border-ink-900/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-ink-900/50 hover:border-red-300 hover:text-red-600">Reset</button>
            <button onClick={onClose} className="rounded-full bg-ink-900 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white hover:bg-bronze-500">Done</button>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          {/* Mobile: horizontal pills */}
          <div className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-ink-900/10 bg-white px-3 py-2.5 md:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn("whitespace-nowrap rounded-full border px-3.5 py-2 text-[11px] uppercase tracking-wide transition-colors", tab === t.id ? "border-ink-900 bg-ink-900 text-white" : "border-ink-900/10 bg-sand-50 text-ink-900/60")}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Desktop: vertical */}
          <div className="hidden w-[140px] shrink-0 border-r border-ink-900/10 bg-white py-3 md:block">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn("flex w-full items-center gap-2 border-l-2 px-4 py-3 text-left text-[11px] transition-colors", tab === t.id ? "border-ink-900 bg-sand-50 font-medium text-ink-900" : "border-transparent text-ink-900/50 hover:bg-sand-50/60 hover:text-ink-900")}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-[#fafaf8] p-4 md:p-6 lg:p-7">
            <div className="mx-auto flex max-w-2xl flex-col gap-4 md:gap-5">
              {tab === "theme" && <ThemeTab c={content} update={setContent} />}
              {tab === "logo" && <LogoTab c={content} update={setContent} />}
              {tab === "header" && <HeaderTab c={content} update={setContent} />}
              {tab === "hero" && <HeroTab c={content} update={setContent} />}
              {tab === "story" && <StoryTab c={content} update={setContent} />}
              {tab === "destinations" && <DestinationsTab c={content} update={setContent} />}
              {tab === "tiers" && <TiersTab c={content} update={setContent} />}
              {tab === "experience" && <ExperienceTab c={content} update={setContent} />}
              {tab === "retreat" && <RetreatTab c={content} update={setContent} />}
              {tab === "more" && <MoreSectionsTab content={content} update={setContent} />}
              {tab === "footer" && <FooterDataTab c={content} update={setContent} replace={replaceContent} reset={resetContent} />}
              {tab === "applications" && <ApplicationsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type P = { c: Content; update: (fn: (c: Content) => Content) => void };

function LogoTab({ c, update }: P) {
  return (
    <>
      <Panel title="Logo — Fixed for Header, Footer & Hero">
        <p className="text-xs leading-relaxed text-ink-900/60">Upload once — your logo is fixed across header, footer, and hero (if you enable it in Hero tab). No need to upload three times. Adjust size for each place below.</p>

        <MediaField label="Upload Logo Image" value={c.header.logoImage} onChange={(v) => update((prev) => ({ ...prev, header: { ...prev.header, logoImage: v }, footer: { ...prev.footer, logoImage: v }, hero: { ...prev.hero, logoImage: v } }))} />

        <div className="grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-sm">
          <Slider label={`Header — ${c.header.logoSize}px`} value={c.header.logoSize} min={16} max={120} onChange={(v) => update((p) => ({ ...p, header: { ...p.header, logoSize: v } }))} />
          <Slider label={`Hero — ${c.hero.logoSize}px`} value={c.hero.logoSize} min={24} max={300} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, logoSize: v } }))} />
          <Slider label={`Footer — ${c.footer.logoSize}px`} value={c.footer.logoSize} min={16} max={120} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, logoSize: v } }))} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Text fallback (when no image uploaded)</Label>
          <input value={c.header.logo} onChange={(e) => update((p) => ({ ...p, header: { ...p.header, logo: e.target.value } }))} className="rounded-lg border border-ink-900/10 bg-white px-3 py-2.5 text-sm tracking-[0.15em] outline-none focus:border-ink-900" placeholder="AMUMA" />
        </div>
      </Panel>
    </>
  );
}

function HeaderTab({ c, update }: P) {
  return (
    <>
      <Panel title="Header Logo Size">
        <p className="text-xs text-ink-900/60">Adjust how big the logo appears in the header. Works on mobile, tablet, desktop.</p>
        <Slider label={`Header logo — ${c.header.logoSize}px`} value={c.header.logoSize} min={16} max={120} onChange={(v) => update((p) => ({ ...p, header: { ...p.header, logoSize: v } }))} />
        <div className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-ink-900 p-4">
          {c.header.logoImage.src ? (
            <img src={c.header.logoImage.src} alt="preview" className="object-contain" style={{ height: `${c.header.logoSize}px` }} />
          ) : (
            <span className="font-serif tracking-[0.2em] text-white" style={{ fontSize: `${c.header.logoSize}px` }}>{c.header.logo || "AMUMA"}</span>
          )}
        </div>
      </Panel>
      <Panel title="Header Menu">
        <div className="flex flex-col gap-2">
          {c.header.nav.map((n, i) => (
            <div key={i} className="flex gap-2">
              <input value={n.label} onChange={(e) => update((p) => { const nav = [...p.header.nav]; nav[i] = { ...nav[i], label: e.target.value }; return { ...p, header: { ...p.header, nav } }; })} className="flex-1 rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900" placeholder="Label" />
              <input value={n.href} onChange={(e) => update((p) => { const nav = [...p.header.nav]; nav[i] = { ...nav[i], href: e.target.value }; return { ...p, header: { ...p.header, nav } }; })} className="w-28 rounded-lg border border-ink-900/10 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900" placeholder="#anchor" />
              <button onClick={() => update((p) => ({ ...p, header: { ...p.header, nav: p.header.nav.filter((_, j) => j !== i) } }))} className="rounded-lg border border-ink-900/10 px-2 text-ink-900/40 hover:text-red-600">×</button>
            </div>
          ))}
          <button onClick={() => update((p) => ({ ...p, header: { ...p.header, nav: [...p.header.nav, { label: "New", href: "#" }] } }))} className="self-start text-[10px] uppercase tracking-[0.2em] text-bronze-600">+ Add link</button>
        </div>
        <Text label="Button text" value={c.header.cta} onChange={(v) => update((p) => ({ ...p, header: { ...p.header, cta: v } }))} />
        <SocialLinksEditor
          links={c.header.socialLinks}
          onChange={(socialLinks) =>
            update((p) => ({
              ...p,
              header: { ...p.header, socialLinks },
            }))
          }
        />
      </Panel>
    </>
  );
}

function HeroTab({ c, update }: P) {
  const h = c.hero;
  const setH = (patch: Partial<typeof h>) => update((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
  return (
    <>
      <Panel title="Hero">
        <Text label="Eyebrow" value={h.eyebrow} onChange={(v) => setH({ eyebrow: v })} />
        <Area label="Headline" value={h.title} onChange={(v) => setH({ title: v })} rows={2} />
        <Area label="Tagline" value={h.tagline} onChange={(v) => setH({ tagline: v })} rows={2} />
        <MediaField label="Background image or video" value={h.media} onChange={(v) => setH({ media: v })} />
      </Panel>
      <Panel title="Logo in Hero — Size & Position">
        <Toggle label="Show logo in hero" value={h.showLogo} onChange={(v) => setH({ showLogo: v })} />
        {h.showLogo && (
          <>
            <MediaField label="Upload logo for hero" value={h.logoImage} onChange={(v) => setH({ logoImage: v })} />
            <Slider label={`Size — ${h.logoSize}px — drag to resize`} value={h.logoSize} min={20} max={300} onChange={(v) => setH({ logoSize: v })} />
            <div className="flex flex-col gap-2">
              <Label>Position — responsive on all devices</Label>
              <div className="grid grid-cols-3 gap-1.5">
                {["above-title", "top-left", "top-center", "top-right", "center-left", "center", "center-right", "bottom-left", "bottom-center", "bottom-right"].map((id) => (
                  <button key={id} type="button" onClick={() => setH({ logoPosition: id })} className={`rounded-lg border py-2.5 text-[10px] uppercase tracking-wide ${h.logoPosition === id ? "border-ink-900 bg-ink-900 text-white" : "border-ink-900/10 bg-white text-ink-900/50 hover:border-ink-900/30"}`}>
                    {id.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
            {(h.logoImage.src || c.header.logoImage.src) && (
              <div className="rounded-lg bg-ink-900 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40">Preview — {h.logoSize}px at {h.logoPosition}</p>
                <img src={h.logoImage.src || c.header.logoImage.src} alt="preview" className="object-contain" style={{ height: `${h.logoSize}px`, width: "auto" }} />
              </div>
            )}
          </>
        )}
      </Panel>
    </>
  );
}

function StoryTab({ c, update }: P) {
  const m = c.manifesto;
  const circle = c.circle;
  return (
    <>
      <Panel title="Manifesto">
        <Text label="Eyebrow" value={m.eyebrow1} onChange={(v) => update((p) => ({ ...p, manifesto: { ...p.manifesto, eyebrow1: v } }))} />
        <Text label="Heading" value={m.heading1} onChange={(v) => update((p) => ({ ...p, manifesto: { ...p.manifesto, heading1: v } }))} />
        <Area label="Paragraphs" value={m.paragraphs1.join("\n\n")} onChange={(v) => update((p) => ({ ...p, manifesto: { ...p.manifesto, paragraphs1: v.split("\n\n") } }))} rows={5} />
        <div className="grid grid-cols-2 gap-3">
          <MediaField label="Image 1" value={m.image1} onChange={(v) => update((p) => ({ ...p, manifesto: { ...p.manifesto, image1: v } }))} />
          <MediaField label="Image 2" value={m.image2} onChange={(v) => update((p) => ({ ...p, manifesto: { ...p.manifesto, image2: v } }))} />
        </div>
      </Panel>
      <Panel title="The Circle">
        <Text label="Eyebrow" value={circle.eyebrow} onChange={(v) => update((p) => ({ ...p, circle: { ...p.circle, eyebrow: v } }))} />
        <Area label="Heading" value={circle.heading} onChange={(v) => update((p) => ({ ...p, circle: { ...p.circle, heading: v } }))} rows={3} />
        <MediaField label="Background" value={circle.backgroundMedia} onChange={(v) => update((p) => ({ ...p, circle: { ...p.circle, backgroundMedia: v } }))} />
      </Panel>
      <Panel title="Pebbles">
        <Text label="Title" value={c.pebbles.title} onChange={(v) => update((p) => ({ ...p, pebbles: { ...p.pebbles, title: v } }))} />
        <Area label="Description" value={c.pebbles.description} onChange={(v) => update((p) => ({ ...p, pebbles: { ...p.pebbles, description: v } }))} rows={3} />
      </Panel>
    </>
  );
}

function DestinationsTab({ c, update }: P) {
  const s = c.destinations;
  return (
    <Panel title="Hidden Destinations">
      <Text label="Eyebrow" value={s.eyebrow} onChange={(v) => update((p) => ({ ...p, destinations: { ...p.destinations, eyebrow: v } }))} />
      <Text label="Heading" value={s.title} onChange={(v) => update((p) => ({ ...p, destinations: { ...p.destinations, title: v } }))} />
      <Area label="Description" value={s.description} onChange={(v) => update((p) => ({ ...p, destinations: { ...p.destinations, description: v } }))} rows={3} />
      <MediaField label="Feature image / video" value={s.image} onChange={(v) => update((p) => ({ ...p, destinations: { ...p.destinations, image: v } }))} />
      <List label="Philippines places" items={s.groups[0]?.items || []} onChange={(v) => update((p) => { const groups = [...p.destinations.groups]; groups[0] = { ...groups[0], items: v }; return { ...p, destinations: { ...p.destinations, groups } }; })} />
    </Panel>
  );
}

function TiersTab({ c, update }: P) {
  const s = c.tiersSection;
  return (
    <Panel title="Investment Tiers">
      <Text label="Heading" value={s.title} onChange={(v) => update((p) => ({ ...p, tiersSection: { ...p.tiersSection, title: v } }))} />
      {s.tiers.map((t, i) => (
        <div key={t.id} className="rounded-lg border border-ink-900/10 bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium">{t.name}</span>
            <span className="text-[10px] text-ink-900/40">{t.price}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input value={t.name} onChange={(e) => update((p) => { const tiers = [...p.tiersSection.tiers]; tiers[i] = { ...tiers[i], name: e.target.value }; return { ...p, tiersSection: { ...p.tiersSection, tiers } }; })} className="rounded border border-ink-900/10 px-2 py-1.5 text-xs" placeholder="Name" />
            <input value={t.price} onChange={(e) => update((p) => { const tiers = [...p.tiersSection.tiers]; tiers[i] = { ...tiers[i], price: e.target.value }; return { ...p, tiersSection: { ...p.tiersSection, tiers } }; })} className="rounded border border-ink-900/10 px-2 py-1.5 text-xs" placeholder="Price" />
          </div>
        </div>
      ))}
    </Panel>
  );
}

function ExperienceTab({ c, update }: P) {
  const s = c.experience;
  return (
    <Panel title="Experience">
      <Text label="Heading" value={s.title} onChange={(v) => update((p) => ({ ...p, experience: { ...p.experience, title: v } }))} />
      <MediaField label="Image / video" value={s.image} onChange={(v) => update((p) => ({ ...p, experience: { ...p.experience, image: v } }))} />
      <List label="Experiences" items={s.items.map((i) => i.title)} onChange={(v) => update((p) => ({ ...p, experience: { ...p.experience, items: v.map((title, idx) => ({ title, description: p.experience.items[idx]?.description || "" })) } }))} />
    </Panel>
  );
}

function RetreatTab({ c, update }: P) {
  return (
    <>
      <Panel title="First Chapter — Palawan">
        <Text label="Title" value={c.firstChapter.title} onChange={(v) => update((p) => ({ ...p, firstChapter: { ...p.firstChapter, title: v } }))} />
        <MediaField label="Image / video" value={c.firstChapter.image} onChange={(v) => update((p) => ({ ...p, firstChapter: { ...p.firstChapter, image: v } }))} />
      </Panel>
      <Panel title="Retreat — San Vicente">
        <Text label="Title" value={c.retreat.title} onChange={(v) => update((p) => ({ ...p, retreat: { ...p.retreat, title: v } }))} />
        <div className="grid grid-cols-2 gap-3">
          <MediaField label="Suite" value={c.retreat.suiteImage} onChange={(v) => update((p) => ({ ...p, retreat: { ...p.retreat, suiteImage: v } }))} />
          <MediaField label="Villa" value={c.retreat.villaImage} onChange={(v) => update((p) => ({ ...p, retreat: { ...p.retreat, villaImage: v } }))} />
        </div>
      </Panel>
      <Panel title="Roadmap">
        <List label="Milestones" items={c.roadmap.items.map((i) => `${i.year} — ${i.title}`)} onChange={() => {}} />
        <p className="text-[11px] text-ink-900/40">Edit full roadmap in Data → Export JSON if needed.</p>
      </Panel>
    </>
  );
}

function FooterDataTab({ c, update, replace, reset }: { c: Content; update: (fn: (c: Content) => Content) => void; replace: (c: Content) => void; reset: () => void }) {
  return (
    <>
      <Panel title="Footer Logo — Size">
        <p className="text-xs text-ink-900/60">Upload footer logo and adjust size. Works on all devices.</p>
        <MediaField label="Footer logo image" value={c.footer.logoImage} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, logoImage: v } }))} />
        <Slider label={`Footer size — ${c.footer.logoSize}px`} value={c.footer.logoSize} min={16} max={120} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, logoSize: v } }))} />
        <div className="flex items-center gap-3 rounded-lg bg-ink-900 p-4">
          {c.footer.logoImage.src || c.header.logoImage.src ? (
            <img src={c.footer.logoImage.src || c.header.logoImage.src} alt="preview" className="object-contain" style={{ height: `${c.footer.logoSize}px` }} />
          ) : (
            <span className="font-serif tracking-[0.2em] text-white" style={{ fontSize: `${c.footer.logoSize}px` }}>{c.header.logo}</span>
          )}
        </div>
      </Panel>
      <Panel title="Footer Content">
        <Area label="Tagline" value={c.footer.tagline} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, tagline: v } }))} rows={2} />
        <Text label="Contact email" value={c.footer.contactEmails[0] || ""} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, contactEmails: [v, p.footer.contactEmails[1] || ""] } }))} />
        <SocialLinksEditor
          links={c.footer.socialLinks}
          onChange={(socialLinks) =>
            update((p) => ({
              ...p,
              footer: { ...p.footer, socialLinks },
            }))
          }
        />
      </Panel>
      <Panel title="Data">
        <p className="text-xs text-ink-900/60">All content is saved automatically. Export a backup or import a previous file.</p>
        <div className="flex gap-2">
          <button onClick={() => { const blob = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `amuma-${Date.now()}.json`; a.click(); URL.revokeObjectURL(url); }} className="rounded-full border border-ink-900/15 px-4 py-2 text-[10px] uppercase tracking-[0.15em] hover:bg-ink-900 hover:text-white">Export</button>
          <label className="cursor-pointer rounded-full border border-ink-900/15 px-4 py-2 text-[10px] uppercase tracking-[0.15em] hover:bg-ink-900 hover:text-white">
            Import
            <input type="file" accept="application/json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; try { const txt = await f.text(); replace({ ...defaultContent, ...JSON.parse(txt) }); alert("Imported"); } catch { alert("Invalid file"); } }} />
          </label>
          <button onClick={() => { if (confirm("Reset everything?")) reset(); }} className="ml-auto text-[10px] uppercase tracking-[0.15em] text-red-500">Reset</button>
        </div>
      </Panel>
    </>
  );
}
