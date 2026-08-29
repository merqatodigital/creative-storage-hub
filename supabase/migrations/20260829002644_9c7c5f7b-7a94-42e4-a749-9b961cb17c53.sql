CREATE TABLE public.applications (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  tier text,
  note text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT INSERT ON public.applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(first_name)) between 1 and 100
    and length(trim(last_name)) between 1 and 100
    and length(trim(email)) between 3 and 255
    and email like '%_@_%.__%'
    and length(trim(phone)) between 3 and 40
    and length(trim(country)) between 1 and 100
    and (tier is null or length(tier) <= 100)
    and (note is null or length(note) <= 2000)
    and status = 'new'
  );

CREATE POLICY "Admins read applications"
  ON public.applications FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins update applications"
  ON public.applications FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins delete applications"
  ON public.applications FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE TRIGGER applications_touch_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();