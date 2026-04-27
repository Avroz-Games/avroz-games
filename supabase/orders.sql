create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'novo',
  source text not null default 'github-pages',
  customer jsonb not null,
  items jsonb not null,
  coupon jsonb,
  subtotal numeric(12, 2) not null,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null,
  shipping_status text not null default 'a_calcular',
  payment_method text not null default 'a_confirmar'
);

alter table public.orders enable row level security;

drop policy if exists "Permitir cadastro publico de pedidos" on public.orders;

create policy "Permitir cadastro publico de pedidos"
on public.orders
for insert
to anon
with check (true);
