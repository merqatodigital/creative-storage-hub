import { useCallback, useEffect, useState } from "react";
import {
  applicationsToCsv,
  deleteApplication,
  listApplications,
  setApplicationStatus,
  type Application,
} from "../integrations/supabase/applicationsRepository";
import {
  getAdminSettings,
  saveAdminSetting,
} from "../integrations/supabase/contentRepository";

const STATUSES = ["new", "contacted", "archived"] as const;

export function ApplicationsTab() {
  const [rows, setRows] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [savedNote, setSavedNote] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await listApplications());
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message} — sign in with your admin account to see applications.`
          : "Could not load applications.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    void (async () => {
      try {
        const settings = await getAdminSettings();
        const value = settings["notifications_email"];
        if (typeof value === "string") setNotifyEmail(value);
        else if (value && typeof value === "object" && "email" in value)
          setNotifyEmail(String((value as { email: unknown }).email ?? ""));
      } catch {
        /* settings are optional */
      }
    })();
  }, [load]);

  const exportCsv = () => {
    const blob = new Blob([applicationsToCsv(rows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amuma-applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm">
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink-900/40">
          Notifications email
        </span>
        <div className="flex flex-wrap gap-2">
          <input
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-ink-900/10 bg-sand-50 px-3 py-2.5 text-sm outline-none focus:border-ink-900"
          />
          <button
            onClick={async () => {
              try {
                await saveAdminSetting("notifications_email", notifyEmail.trim());
                setSavedNote("Saved.");
              } catch (e) {
                setSavedNote(e instanceof Error ? e.message : "Could not save.");
              }
            }}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-white"
          >
            Save
          </button>
        </div>
        <p className="text-xs text-ink-900/50">
          Every application is stored here in the admin inbox below. {savedNote}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-900/40">
          {loading ? "Loading…" : `${rows.length} application${rows.length === 1 ? "" : "s"}`}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => void load()}
            className="rounded-full border border-ink-900/10 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-ink-900/60"
          >
            Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={!rows.length}
            className="rounded-full border border-ink-900/10 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-ink-900/60 disabled:opacity-40"
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="font-serif text-lg">
                  {r.first_name} {r.last_name}
                </div>
                <div className="text-xs text-ink-900/60">
                  {r.email} · {r.phone} · {r.country}
                  {r.tier ? ` · ${r.tier}` : ""}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-ink-900/35">
                  {new Date(r.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={r.status}
                  onChange={async (e) => {
                    const status = e.target.value;
                    await setApplicationStatus(r.id, status);
                    setRows((prev) =>
                      prev.map((p) => (p.id === r.id ? { ...p, status } : p)),
                    );
                  }}
                  className="rounded-lg border border-ink-900/10 bg-sand-50 px-3 py-2 text-xs outline-none"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => void navigator.clipboard.writeText(r.email)}
                  className="rounded-full border border-ink-900/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-ink-900/60"
                >
                  Copy email
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this application?")) return;
                    await deleteApplication(r.id);
                    setRows((prev) => prev.filter((p) => p.id !== r.id));
                  }}
                  className="rounded-full border border-ink-900/10 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-ink-900/40 hover:border-red-300 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            {r.note && <p className="mt-3 text-sm text-ink-900/70">{r.note}</p>}
          </div>
        ))}
        {!loading && !rows.length && !error && (
          <p className="text-xs text-ink-900/50">No applications yet.</p>
        )}
      </div>
    </div>
  );
}
