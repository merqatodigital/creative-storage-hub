import { supabase } from "./client";

const BUCKET = "site-media";

/**
 * Media is served through a stable app URL rather than a signed storage link.
 * Signed links expire; this one never does, so published content keeps working.
 */
export const mediaUrlForPath = (path: string) =>
  `/api/public/media/${path.split("/").map(encodeURIComponent).join("/")}`;

/** Uploads an asset to site storage and returns its permanent URL. */
export async function uploadSiteMedia(file: File, folder = "uploads") {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });

  if (error) throw error;

  const publicUrl = mediaUrlForPath(path);

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
