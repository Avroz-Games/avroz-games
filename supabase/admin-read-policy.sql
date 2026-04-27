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

drop policy if exists "Administradores podem consultar vendas" on public.orders;

create policy "Administradores podem consultar vendas"
on public.orders
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin
    where lower(admin.email) = lower(auth.jwt() ->> 'email')
  )
);

-- Depois de executar este script, cadastre seu e-mail administrador:
-- insert into public.admin_users (email) values ('seu-email@exemplo.com');
