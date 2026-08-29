import { z } from "zod";
import { supabase } from "./client";

export const applicationSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100),
  last_name: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(3, "Phone is required").max(40),
  country: z.string().trim().min(1, "Country is required").max(100),
  tier: z.string().trim().max(100).optional().nullable(),
  note: z.string().trim().max(2000).optional().nullable(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export type Application = ApplicationInput & {
  id: string;
  status: string;
  created_at: string;
};

/** Public submissions are allowed by RLS; reads are admin-only. */
export async function submitApplication(input: ApplicationInput) {
  const parsed = applicationSchema.parse(input);
  const { error } = await supabase
    .from("applications")
    .insert({ ...parsed, status: "new" });
  if (error) throw error;
}

export async function listApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("id, first_name, last_name, email, phone, country, tier, note, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Application[];
}

export async function setApplicationStatus(id: string, status: string) {
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteApplication(id: string) {
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
}

export function applicationsToCsv(rows: Application[]) {
  const head = [
    "created_at",
    "first_name",
    "last_name",
    "email",
    "phone",
    "country",
    "tier",
    "status",
    "note",
  ];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [
    head.join(","),
    ...rows.map((r) =>
      head.map((k) => esc((r as unknown as Record<string, unknown>)[k])).join(","),
    ),
  ].join("\n");
}
