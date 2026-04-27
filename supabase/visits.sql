create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Administradores podem consultar o proprio acesso" on public.admin_users;

create policy "Administradores podem consultar o proprio acesso"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

create table if not exists public.site_visits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null,
  page_title text,
  referrer text,
  user_agent text,
  language text,
  screen_width integer,
  screen_height integer
);

alter table public.site_visits enable row level security;

drop policy if exists "Permitir cadastro publico de visitas" on public.site_visits;

create policy "Permitir cadastro publico de visitas"
on public.site_visits
for insert
to anon
with check (true);

drop policy if exists "Administradores podem consultar visitas" on public.site_visits;

create policy "Administradores podem consultar visitas"
on public.site_visits
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin
    where lower(admin.email) = lower(auth.jwt() ->> 'email')
  )
);

insert into public.admin_users (email)
values ('caetano.james@gmail.com')
on conflict (email) do nothing;

create or replace function public.get_site_visit_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.site_visits;
$$;

grant execute on function public.get_site_visit_count() to anon, authenticated;
