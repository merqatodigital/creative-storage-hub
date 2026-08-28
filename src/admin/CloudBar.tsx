import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { useContent } from "../content/ContentContext";

/**
 * Signing in enables cloud publishing and media uploads. Row level security
 * only accepts writes from an account with the admin role.
 */
export function CloudBar() {
  const { publish, publishing } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const { data } = await supabase.auth.getUser();
    setUserEmail(data.user?.email ?? null);
    if (data.user) {
      const { data: rows } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      setIsAdmin(Boolean(rows?.some((r) => r.role === "admin")));
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    void refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void refresh());
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (mode: "in" | "up") => {
    setBusy(true);
    setStatus("");
    const fn =
      mode === "in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    setBusy(false);
    if (error) setStatus(error.message);
    else {
      setStatus(mode === "up" ? "Account created." : "Signed in.");
      await refresh();
    }
  };

  if (!userEmail) {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin email"
          className="rounded-lg border border-ink-900/15 bg-sand-50 px-3 py-2 text-xs outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="rounded-lg border border-ink-900/15 bg-sand-50 px-3 py-2 text-xs outline-none"
        />
        <button
          disabled={busy}
          onClick={() => void signIn("in")}
          className="rounded-full bg-ink-900 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white"
        >
          Sign in
        </button>
        <button
          disabled={busy}
          onClick={() => void signIn("up")}
          className="rounded-full border border-ink-900/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
        >
          Create
        </button>
        {status && <span className="text-[11px] text-ink-900/60">{status}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
      <span className="text-[11px] text-ink-900/60">
        {userEmail} {isAdmin ? "· admin" : "· no admin role"}
      </span>
      <button
        disabled={publishing || !isAdmin}
        onClick={async () => {
          try {
            await publish();
            setStatus("Published to cloud.");
          } catch (e) {
            setStatus(e instanceof Error ? e.message : "Publish failed.");
          }
        }}
        className="rounded-full bg-bronze-500 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white disabled:opacity-40"
      >
        {publishing ? "Publishing…" : "Publish"}
      </button>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          await refresh();
        }}
        className="rounded-full border border-ink-900/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
      >
        Sign out
      </button>
      {status && <span className="text-[11px] text-ink-900/60">{status}</span>}
    </div>
  );
}
