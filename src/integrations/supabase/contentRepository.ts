import type { Content } from "../../content/types";
import { supabase } from "./client";

const SITE_CONTENT_ID = "main";

/** Read the published page configuration. Public reads are allowed by RLS. */
export async function getPublishedContent(): Promise<Content | null> {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("id", SITE_CONTENT_ID)
    .maybeSingle();

  if (error) throw error;
  return (data?.content as Content | undefined) ?? null;
}

/** Write the full page configuration. RLS permits this for admins only. */
export async function publishContent(content: Content): Promise<void> {
  const { error } = await supabase.from("site_content").upsert(
    {
      id: SITE_CONTENT_ID,
      content: content as unknown as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) throw error;
}

/** Admin key/value settings (deploy toggles, integrations, notes). */
export async function getAdminSettings(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase.from("admin_settings").select("key, value");
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
}

export async function saveAdminSetting(key: string, value: unknown): Promise<void> {
  const { error } = await supabase
    .from("admin_settings")
    .upsert(
      { key, value: value as never, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
  if (error) throw error;
}
