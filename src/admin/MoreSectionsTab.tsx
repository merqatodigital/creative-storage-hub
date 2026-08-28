import { useState } from "react";
import type { Content, FaqItem, RoadmapItem, TeamItem } from "../content/types";
import { Area, List, MediaField, Panel, Text } from "./fields";

type Props = {
  content: Content;
  update: (fn: (content: Content) => Content) => void;
};

export function MoreSectionsTab({ content, update }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="px-1 text-xs leading-relaxed text-ink-900/55">
        All remaining page sections live here. Open only the section you need to edit.
      </p>
      <ContentDetailsEditor content={content} update={update} />
      <CircleEditor content={content} update={update} />
      <PebblesEditor content={content} update={update} />
      <RevenueEditor content={content} update={update} />
      <FlywheelEditor content={content} update={update} />
      <PortalEditor content={content} update={update} />
      <RoadmapEditor content={content} update={update} />
      <TeamEditor content={content} update={update} />
      <FaqEditor content={content} update={update} />
      <JoinEditor content={content} update={update} />
    </div>
  );
}

function ContentDetailsEditor({ content, update }: Props) {
  return (
    <Editor title="Story, Places, Tiers, Experience & Retreat Details">
      <div className="flex flex-col gap-4">
        <Panel title="The Meaning">
          <Text label="Eyebrow" value={content.manifesto.eyebrow2} onChange={(value) => update((prev) => ({ ...prev, manifesto: { ...prev.manifesto, eyebrow2: value } }))} />
          <Area label="Quote" value={content.manifesto.quote} onChange={(value) => update((prev) => ({ ...prev, manifesto: { ...prev.manifesto, quote: value } }))} />
          <List label="Paragraphs" items={content.manifesto.paragraphs2} onChange={(value) => update((prev) => ({ ...prev, manifesto: { ...prev.manifesto, paragraphs2: value } }))} area />
        </Panel>

        <Panel title="Hidden Destinations Details">
          <Area label="Destination story" value={content.destinations.body} onChange={(value) => update((prev) => ({ ...prev, destinations: { ...prev.destinations, body: value } }))} />
          {content.destinations.groups.map((group, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-lg bg-sand-50 p-3">
              <Text label={`Group ${index + 1} heading`} value={group.title} onChange={(value) => update((prev) => {
                const groups = [...prev.destinations.groups];
                groups[index] = { ...group, title: value };
                return { ...prev, destinations: { ...prev.destinations, groups } };
              })} />
              <List label="Places" items={group.items} onChange={(value) => update((prev) => {
                const groups = [...prev.destinations.groups];
                groups[index] = { ...group, items: value };
                return { ...prev, destinations: { ...prev.destinations, groups } };
              })} />
            </div>
          ))}
        </Panel>

        <Panel title="Investment Tier Details">
          <Text label="Section eyebrow" value={content.tiersSection.eyebrow} onChange={(value) => update((prev) => ({ ...prev, tiersSection: { ...prev.tiersSection, eyebrow: value } }))} />
          <Area label="Section description" value={content.tiersSection.description} onChange={(value) => update((prev) => ({ ...prev, tiersSection: { ...prev.tiersSection, description: value } }))} />
          {content.tiersSection.tiers.map((tier, index) => (
            <div key={tier.id} className="grid grid-cols-2 gap-2 rounded-lg bg-sand-50 p-3">
              <Text label="Tier label" value={tier.numeral} onChange={(value) => updateTier(update, index, { numeral: value })} />
              <Text label="Tier name" value={tier.name} onChange={(value) => updateTier(update, index, { name: value })} />
              <Text label="Price label" value={tier.price} onChange={(value) => updateTier(update, index, { price: value })} />
              <Text label="Price number" value={String(tier.priceValue)} onChange={(value) => updateTier(update, index, { priceValue: Number(value) || 0 })} />
              <Text label="Units label" value={tier.units} onChange={(value) => updateTier(update, index, { units: value })} />
              <Text label="Units number" value={String(tier.unitsValue)} onChange={(value) => updateTier(update, index, { unitsValue: Number(value) || 0 })} />
              <Text label="Pebbles label" value={tier.pebbles} onChange={(value) => updateTier(update, index, { pebbles: value })} />
              <Text label="Pebbles number" value={String(tier.pebblesValue)} onChange={(value) => updateTier(update, index, { pebblesValue: Number(value) || 0 })} />
              <Text label="Return target" value={tier.returnTarget} onChange={(value) => updateTier(update, index, { returnTarget: value })} />
              <Text label="Button label" value={tier.cta} onChange={(value) => updateTier(update, index, { cta: value })} />
              <div className="col-span-2"><Text label="Tagline" value={tier.tagline} onChange={(value) => updateTier(update, index, { tagline: value })} /></div>
              <div className="col-span-2"><Text label="Availability note" value={tier.note} onChange={(value) => updateTier(update, index, { note: value })} /></div>
            </div>
          ))}
        </Panel>

        <Panel title="Experience Details">
          <Text label="Eyebrow" value={content.experience.eyebrow} onChange={(value) => update((prev) => ({ ...prev, experience: { ...prev.experience, eyebrow: value } }))} />
          <Text label="Heading" value={content.experience.title} onChange={(value) => update((prev) => ({ ...prev, experience: { ...prev.experience, title: value } }))} />
          {content.experience.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-lg bg-sand-50 p-3">
              <Text label={`Experience ${index + 1}`} value={item.title} onChange={(value) => updateExperience(update, index, { title: value })} />
              <Area label="Description" value={item.description} onChange={(value) => updateExperience(update, index, { description: value })} rows={2} />
            </div>
          ))}
        </Panel>

        <Panel title="First Chapter — Palawan">
          <Text label="Eyebrow" value={content.firstChapter.eyebrow} onChange={(value) => update((prev) => ({ ...prev, firstChapter: { ...prev.firstChapter, eyebrow: value } }))} />
          <Text label="Heading" value={content.firstChapter.title} onChange={(value) => update((prev) => ({ ...prev, firstChapter: { ...prev.firstChapter, title: value } }))} />
          <List label="Paragraphs" items={content.firstChapter.paragraphs} onChange={(value) => update((prev) => ({ ...prev, firstChapter: { ...prev.firstChapter, paragraphs: value } }))} area />
          <MediaField label="Feature image or video" value={content.firstChapter.image} onChange={(value) => update((prev) => ({ ...prev, firstChapter: { ...prev.firstChapter, image: value } }))} />
        </Panel>

        <Panel title="Retreat — San Vicente Details">
          <Text label="Eyebrow" value={content.retreat.eyebrow} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, eyebrow: value } }))} />
          <Text label="Heading" value={content.retreat.title} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, title: value } }))} />
          <Area label="Description" value={content.retreat.description} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, description: value } }))} />
          <div className="grid grid-cols-2 gap-2">
            <Text label="Suites count" value={content.retreat.suites} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, suites: value } }))} />
            <Text label="Villas count" value={content.retreat.villas} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, villas: value } }))} />
          </div>
          <Text label="Suite name" value={content.retreat.suiteLabel} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, suiteLabel: value } }))} />
          <Text label="Suite unlock text" value={content.retreat.suiteUnlock} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, suiteUnlock: value } }))} />
          <Text label="Villa name" value={content.retreat.villaLabel} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, villaLabel: value } }))} />
          <Text label="Villa unlock text" value={content.retreat.villaUnlock} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, villaUnlock: value } }))} />
          <Area label="Footnote" value={content.retreat.footnote} onChange={(value) => update((prev) => ({ ...prev, retreat: { ...prev.retreat, footnote: value } }))} rows={3} />
          {content.retreat.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Text label="Stat value" value={stat.value} onChange={(value) => update((prev) => {
                const stats = [...prev.retreat.stats]; stats[index] = { ...stat, value };
                return { ...prev, retreat: { ...prev.retreat, stats } };
              })} />
              <Text label="Stat label" value={stat.label} onChange={(value) => update((prev) => {
                const stats = [...prev.retreat.stats]; stats[index] = { ...stat, label: value };
                return { ...prev, retreat: { ...prev.retreat, stats } };
              })} />
            </div>
          ))}
        </Panel>
      </div>
    </Editor>
  );
}

function updateTier(
  update: Props["update"],
  index: number,
  patch: Partial<Content["tiersSection"]["tiers"][number]>
) {
  update((prev) => {
    const tiers = [...prev.tiersSection.tiers];
    tiers[index] = { ...tiers[index], ...patch };
    return { ...prev, tiersSection: { ...prev.tiersSection, tiers } };
  });
}

function updateExperience(
  update: Props["update"],
  index: number,
  patch: Partial<Content["experience"]["items"][number]>
) {
  update((prev) => {
    const items = [...prev.experience.items];
    items[index] = { ...items[index], ...patch };
    return { ...prev, experience: { ...prev.experience, items } };
  });
}

function Editor({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-900/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-serif text-lg font-light text-ink-900">{title}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink-900/10 text-lg font-light text-ink-900/50">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="border-t border-ink-900/10 p-4">{children}</div>}
    </div>
  );
}

function CircleEditor({ content, update }: Props) {
  const circle = content.circle;
  const set = (patch: Partial<typeof circle>) =>
    update((prev) => ({ ...prev, circle: { ...prev.circle, ...patch } }));
  return (
    <Editor title="The Circle">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={circle.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Area label="Heading" value={circle.heading} onChange={(value) => set({ heading: value })} />
        <List label="Intro paragraphs" items={circle.paragraphs} onChange={(value) => set({ paragraphs: value })} area />
        <Panel title="Circle Units">
          <Text label="Eyebrow" value={circle.unitTitle} onChange={(value) => set({ unitTitle: value })} />
          <Text label="Heading" value={circle.unitSubtitle} onChange={(value) => set({ unitSubtitle: value })} />
          <Area label="Description" value={circle.unitBody} onChange={(value) => set({ unitBody: value })} />
        </Panel>
        <Panel title="Annual Renewal">
          <Text label="Eyebrow" value={circle.renewalTitle} onChange={(value) => set({ renewalTitle: value })} />
          <Text label="Heading" value={circle.renewalSubtitle} onChange={(value) => set({ renewalSubtitle: value })} />
          <Area label="Description" value={circle.renewalBody} onChange={(value) => set({ renewalBody: value })} />
        </Panel>
        <MediaField label="Circle background image or video" value={circle.backgroundMedia} onChange={(value) => set({ backgroundMedia: value })} />
      </div>
    </Editor>
  );
}

function PebblesEditor({ content, update }: Props) {
  const section = content.pebbles;
  const set = (patch: Partial<typeof section>) =>
    update((prev) => ({ ...prev, pebbles: { ...prev.pebbles, ...patch } }));
  return (
    <Editor title="Pebbles">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={section.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={section.title} onChange={(value) => set({ title: value })} />
        <Area label="Description" value={section.description} onChange={(value) => set({ description: value })} />
        <Panel title="Uses">
          {section.usages.map((item, index) => (
            <div key={index} className="mb-3 flex flex-col gap-2 rounded-lg bg-sand-50 p-3 last:mb-0">
              <Text label={`Use ${index + 1} title`} value={item.title} onChange={(value) => {
                const usages = [...section.usages];
                usages[index] = { ...item, title: value };
                set({ usages });
              }} />
              <Area label="Description" value={item.description} onChange={(value) => {
                const usages = [...section.usages];
                usages[index] = { ...item, description: value };
                set({ usages });
              }} rows={2} />
            </div>
          ))}
        </Panel>
        <Panel title="Pebble Rates">
          {section.tables.map((table, tableIndex) => (
            <div key={tableIndex} className="mb-4 flex flex-col gap-2 rounded-lg bg-sand-50 p-3 last:mb-0">
              <Text label="Accommodation" value={table.title} onChange={(value) => {
                const tables = [...section.tables];
                tables[tableIndex] = { ...table, title: value };
                set({ tables });
              }} />
              {table.rows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-2">
                  <input value={row.label} onChange={(event) => {
                    const tables = [...section.tables];
                    const rows = [...table.rows];
                    rows[rowIndex] = { ...row, label: event.target.value };
                    tables[tableIndex] = { ...table, rows };
                    set({ tables });
                  }} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
                  <input value={row.value} onChange={(event) => {
                    const tables = [...section.tables];
                    const rows = [...table.rows];
                    rows[rowIndex] = { ...row, value: event.target.value };
                    tables[tableIndex] = { ...table, rows };
                    set({ tables });
                  }} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
                </div>
              ))}
            </div>
          ))}
        </Panel>
      </div>
    </Editor>
  );
}

function RevenueEditor({ content, update }: Props) {
  const revenue = content.revenue;
  const set = (patch: Partial<typeof revenue>) =>
    update((prev) => ({ ...prev, revenue: { ...prev.revenue, ...patch } }));
  return (
    <Editor title="Revenue Model & Calculator">
      <div className="flex flex-col gap-4">
        <Text label="Revenue eyebrow" value={revenue.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Revenue heading" value={revenue.title} onChange={(value) => set({ title: value })} />
        <Area label="Revenue description" value={revenue.description} onChange={(value) => set({ description: value })} />
        <Area label="Rate note" value={revenue.tableNote} onChange={(value) => set({ tableNote: value })} rows={2} />
        <Panel title="Nightly Rates">
          {revenue.rateRows.map((row, index) => (
            <div key={index} className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-sand-50 p-3 last:mb-0 md:grid-cols-4">
              {(["type", "low", "high", "peak"] as const).map((key) => (
                <input key={key} value={row[key]} placeholder={key} onChange={(event) => {
                  const rateRows = [...revenue.rateRows];
                  rateRows[index] = { ...row, [key]: event.target.value };
                  set({ rateRows });
                }} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
              ))}
            </div>
          ))}
        </Panel>
        <Panel title="Revenue Highlights">
          {revenue.stats.map((stat, index) => (
            <div key={index} className="mb-3 grid gap-2 rounded-lg bg-sand-50 p-3 last:mb-0">
              <Text label="Value" value={stat.value} onChange={(value) => {
                const stats = [...revenue.stats]; stats[index] = { ...stat, value }; set({ stats });
              }} />
              <Text label="Label" value={stat.label} onChange={(value) => {
                const stats = [...revenue.stats]; stats[index] = { ...stat, label: value }; set({ stats });
              }} />
              <Text label="Note" value={stat.note} onChange={(value) => {
                const stats = [...revenue.stats]; stats[index] = { ...stat, note: value }; set({ stats });
              }} />
            </div>
          ))}
        </Panel>
        <Text label="Calculator eyebrow" value={content.calculator.eyebrow} onChange={(value) => update((prev) => ({ ...prev, calculator: { ...prev.calculator, eyebrow: value } }))} />
        <Text label="Calculator heading" value={content.calculator.title} onChange={(value) => update((prev) => ({ ...prev, calculator: { ...prev.calculator, title: value } }))} />
      </div>
    </Editor>
  );
}

function FlywheelEditor({ content, update }: Props) {
  const flywheel = content.flywheel;
  const set = (patch: Partial<typeof flywheel>) => update((prev) => ({ ...prev, flywheel: { ...prev.flywheel, ...patch } }));
  return (
    <Editor title="Flywheel">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={flywheel.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={flywheel.title} onChange={(value) => set({ title: value })} />
        <List label="Steps" items={flywheel.steps.map((step) => step.title)} onChange={(items) => set({ steps: items.map((title, index) => ({ n: String(index + 1).padStart(2, "0"), title })) })} />
      </div>
    </Editor>
  );
}

function PortalEditor({ content, update }: Props) {
  const portal = content.memberPortal;
  const set = (patch: Partial<typeof portal>) => update((prev) => ({ ...prev, memberPortal: { ...prev.memberPortal, ...patch } }));
  return (
    <Editor title="Member Portal">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={portal.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={portal.title} onChange={(value) => set({ title: value })} />
        <Area label="Description" value={portal.description} onChange={(value) => set({ description: value })} />
        <Text label="First list title" value={portal.bookingTitle} onChange={(value) => set({ bookingTitle: value })} />
        <List label="First list" items={portal.booking} onChange={(value) => set({ booking: value })} area />
        <Text label="Second list title" value={portal.financeTitle} onChange={(value) => set({ financeTitle: value })} />
        <List label="Second list" items={portal.finance} onChange={(value) => set({ finance: value })} area />
      </div>
    </Editor>
  );
}

function RoadmapEditor({ content, update }: Props) {
  const roadmap = content.roadmap;
  const set = (patch: Partial<typeof roadmap>) => update((prev) => ({ ...prev, roadmap: { ...prev.roadmap, ...patch } }));
  return (
    <Editor title="Roadmap">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={roadmap.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={roadmap.title} onChange={(value) => set({ title: value })} />
        {roadmap.items.map((item, index) => (
          <RoadmapRow key={index} item={item} onChange={(next) => {
            const items = [...roadmap.items]; items[index] = next; set({ items });
          }} />
        ))}
      </div>
    </Editor>
  );
}

function RoadmapRow({ item, onChange }: { item: RoadmapItem; onChange: (item: RoadmapItem) => void }) {
  return (
    <div className="grid gap-2 rounded-lg bg-sand-50 p-3">
      <div className="grid grid-cols-[90px_1fr] gap-2">
        <input value={item.year} onChange={(event) => onChange({ ...item, year: event.target.value })} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
        <input value={item.title} onChange={(event) => onChange({ ...item, title: event.target.value })} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
      </div>
      <textarea value={item.description} rows={2} onChange={(event) => onChange({ ...item, description: event.target.value })} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
    </div>
  );
}

function TeamEditor({ content, update }: Props) {
  const team = content.team;
  const set = (patch: Partial<typeof team>) => update((prev) => ({ ...prev, team: { ...prev.team, ...patch } }));
  return (
    <Editor title="Team">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={team.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={team.title} onChange={(value) => set({ title: value })} />
        {team.members.map((member, index) => (
          <TeamMemberEditor key={index} member={member} index={index} onChange={(next) => {
            const members = [...team.members]; members[index] = next; set({ members });
          }} />
        ))}
      </div>
    </Editor>
  );
}

function TeamMemberEditor({ member, index, onChange }: { member: TeamItem; index: number; onChange: (member: TeamItem) => void }) {
  return (
    <Panel title={`Member ${index + 1}`}>
      <Text label="Name" value={member.name} onChange={(value) => onChange({ ...member, name: value })} />
      <Text label="Role" value={member.role} onChange={(value) => onChange({ ...member, role: value })} />
      <Area label="Biography" value={member.bio} onChange={(value) => onChange({ ...member, bio: value })} rows={3} />
      <MediaField label="Portrait" value={member.image} onChange={(value) => onChange({ ...member, image: value })} />
    </Panel>
  );
}

function FaqEditor({ content, update }: Props) {
  const faq = content.faq;
  const set = (patch: Partial<typeof faq>) => update((prev) => ({ ...prev, faq: { ...prev.faq, ...patch } }));
  return (
    <Editor title="Questions & FAQ">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={faq.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={faq.title} onChange={(value) => set({ title: value })} />
        {faq.items.map((item, index) => (
          <FaqRow key={index} item={item} onChange={(next) => {
            const items = [...faq.items]; items[index] = next; set({ items });
          }} />
        ))}
      </div>
    </Editor>
  );
}

function FaqRow({ item, onChange }: { item: FaqItem; onChange: (item: FaqItem) => void }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-sand-50 p-3">
      <input value={item.q} onChange={(event) => onChange({ ...item, q: event.target.value })} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
      <textarea value={item.a} rows={3} onChange={(event) => onChange({ ...item, a: event.target.value })} className="rounded border border-ink-900/10 bg-white px-3 py-2 text-sm" />
    </div>
  );
}

function JoinEditor({ content, update }: Props) {
  const join = content.join;
  const set = (patch: Partial<typeof join>) => update((prev) => ({ ...prev, join: { ...prev.join, ...patch } }));
  return (
    <Editor title="Join the Circle">
      <div className="flex flex-col gap-4">
        <Text label="Eyebrow" value={join.eyebrow} onChange={(value) => set({ eyebrow: value })} />
        <Text label="Heading" value={join.title} onChange={(value) => set({ title: value })} />
        <Area label="Description" value={join.description} onChange={(value) => set({ description: value })} />
        <List label="Member benefits" items={join.perks} onChange={(value) => set({ perks: value })} area />
        <Text label="Contact email" value={join.contactEmail} onChange={(value) => set({ contactEmail: value })} />
        <Text label="Form title" value={join.formTitle} onChange={(value) => set({ formTitle: value })} />
        <Text label="Form note" value={join.formNote} onChange={(value) => set({ formNote: value })} />
        <Text label="Submit button" value={join.submit} onChange={(value) => set({ submit: value })} />
      </div>
    </Editor>
  );
}