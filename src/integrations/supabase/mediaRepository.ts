import { supabase } from "./client";

const BUCKET = "site-media";

/** Uploads an asset to the public site-media bucket and returns its public URL. */
export async function uploadSiteMedia(file: File, folder = "uploads") {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });

  if (error) throw error;

  // The bucket is private, so a long-lived signed link is used for the site.
  const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
  const signed = await supabase.storage.from(BUCKET).createSignedUrl(path, TEN_YEARS);
  if (signed.error) throw signed.error;
  const publicUrl = signed.data.signedUrl;

  // Track the asset so the admin can browse everything that was uploaded.
  await supabase.from("media_assets").insert({
    path,
    public_url: publicUrl,
    kind: file.type.startsWith("video/") ? "video" : "image",
    mime_type: file.type,
    size_bytes: file.size,
    original_name: file.name,
  });

  return publicUrl;
}

export type MediaAsset = {
  id: string;
  path: string;
  public_url: string;
  kind: string;
  mime_type: string | null;
  size_bytes: number | null;
  original_name: string | null;
  created_at: string;
};

export async function listSiteMedia(): Promise<MediaAsset[]> {
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MediaAsset[];
}
