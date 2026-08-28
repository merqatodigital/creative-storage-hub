create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'member');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create table public.site_content (
  id text primary key default 'main' check (id = 'main'),
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  public_url text not null,
  kind text not null default 'image',
  mime_type text,
  size_bytes bigint,
  original_name text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.admin_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
grant select on public.media_assets to anon;
grant select, insert, update, delete on public.media_assets to authenticated;
grant all on public.media_assets to service_role;
grant select on public.admin_settings to anon;
grant select, insert, update, delete on public.admin_settings to authenticated;
grant all on public.admin_settings to service_role;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.site_content enable row level security;
alter table public.media_assets enable row level security;
alter table public.admin_settings enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_role(auth.uid(), 'admin')
$$;

create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "Admins manage roles" on public.user_roles for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "Users read own profile" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "Users update own profile" on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (id = auth.uid());

create policy "Site content is publicly readable" on public.site_content for select to anon, authenticated using (true);
create policy "Admins insert content" on public.site_content for insert to authenticated with check (public.is_admin());
create policy "Admins update content" on public.site_content for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete content" on public.site_content for delete to authenticated using (public.is_admin());

create policy "Media records are publicly readable" on public.media_assets for select to anon, authenticated using (true);
create policy "Admins insert media records" on public.media_assets for insert to authenticated with check (public.is_admin());
create policy "Admins update media records" on public.media_assets for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete media records" on public.media_assets for delete to authenticated using (public.is_admin());

create policy "Admin settings are publicly readable" on public.admin_settings for select to anon, authenticated using (true);
create policy "Admins write settings" on public.admin_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles for each row execute procedure public.touch_updated_at();
create trigger site_content_touch_updated_at before update on public.site_content for each row execute procedure public.touch_updated_at();
create trigger admin_settings_touch_updated_at before update on public.admin_settings for each row execute procedure public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', new.email))
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, role)
  values (new.id, case when (select count(*) from public.user_roles where role = 'admin') = 0 then 'admin'::public.app_role else 'member'::public.app_role end)
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create policy "Signed in users read site media" on storage.objects for select to authenticated using (bucket_id = 'site-media');
create policy "Admins can upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
create policy "Admins can update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin()) with check (bucket_id = 'site-media' and public.is_admin());
create policy "Admins can delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());