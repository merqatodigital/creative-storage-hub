import { useState } from "react";
import { useContent } from "../content/ContentContext";
import { useSectionStyle } from "../theme/useSectionStyle";
import {
  applicationSchema,
  submitApplication,
} from "../integrations/supabase/applicationsRepository";

export function Join() {
  const { content } = useContent();
  const { join, tiersSection } = content;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const style = useSectionStyle("join");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const parsed = applicationSchema.safeParse({
      first_name: String(form.get("first_name") ?? ""),
      last_name: String(form.get("last_name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      country: String(form.get("country") ?? ""),
      tier: String(form.get("tier") ?? ""),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setSending(true);
    try {
      await submitApplication(parsed.data);
      setSubmitted(true);
    } catch {
      setError("We couldn't send your application. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="join" style={style} className="section-spacing bg-sand-50">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div>
              <div className="eyebrow flex items-center gap-2.5 text-bronze-600">
                <span className="divider-line" />
                {join.eyebrow}
              </div>
              <h2 className="heading-display mt-4 text-ink-900">{join.title}</h2>
              <p className="mt-4 max-w-xl text-[14px] font-light leading-[1.8] text-ink-900/60 md:text-[15px]">{join.description}</p>
            </div>

            <div className="grid gap-3">
              {join.perks.map((perk, i) => (
                <div key={i} className="flex gap-3 rounded-xl bg-white px-4 py-3.5 text-[13px] font-light leading-[1.5] text-ink-900/70 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] md:px-5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze-500" />
                  {perk}
                </div>
              ))}
            </div>

            <a href={`mailto:${join.contactEmail}`} className="mt-2 inline-flex items-center gap-2 text-[13px] font-light text-ink-900/60 hover:text-ink-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white">✦</span>
              {join.contactEmail}
            </a>
          </div>

          <div data-theme-table="joinForm" className="rounded-[24px] bg-ink-900 p-6 text-sand-50 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.4)] md:p-8 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-[22px] font-light">{join.formTitle}</h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wide text-sand-100/60">{join.formNote}</span>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bronze-400 text-ink-900">✓</div>
                <span className="font-serif text-[24px] font-light">Thank you.</span>
                <p className="max-w-[260px] text-[13px] font-light leading-[1.6] text-sand-100/60">Application received. We'll reach out shortly.</p>
              </div>
            ) : (
              <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field name="first_name" label="First Name" required />
                  <Field name="last_name" label="Last Name" required />
                  <Field name="email" label="Email" type="email" required />
                  <Field name="phone" label="Phone" required />
                </div>
                <Field name="country" label="Country" required />

                <label className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-sand-100/40">Tier</span>
                  <select name="tier" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] font-light text-sand-50 outline-none focus:border-bronze-400">
                    {tiersSection.tiers.map((t) => (
                      <option key={t.id} value={t.name} className="bg-ink-900">
                        {t.name} — {t.price}
                      </option>
                    ))}
                  </select>
                </label>

                {error && <p className="text-[12px] text-red-300">{error}</p>}

                <button type="submit" disabled={sending} className="mt-2 rounded-full bg-white py-3.5 text-[11px] uppercase tracking-[0.2em] text-ink-900 hover:bg-sand-50 disabled:opacity-50">
                  {sending ? "Sending…" : join.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, required, type = "text" }: { label: string; name?: string; required?: boolean; type?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.15em] text-sand-100/40">
        {label} {required && "*"}
      </span>
      <input name={name} type={type} required={required} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] font-light text-white outline-none placeholder:text-white/30 focus:border-bronze-400" />
    </label>
  );
}
