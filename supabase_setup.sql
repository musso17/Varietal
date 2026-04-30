-- Varietal Content Strategy - Supabase Setup Script
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  type text not null check (type in ('video', 'photo')),
  pilar text not null check (pilar in ('La Tostaduría', 'La Barra')),
  concept text,
  visual text,
  status text not null check (status in ('idea', 'produccion', 'revision', 'aprobado')),
  date date,
  link text,
  objective text,
  comments jsonb default '[]'::jsonb
);

-- 2. Performance: Add an index on status
create index if not exists posts_status_idx on public.posts (status);

-- 3. Security: Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- 4. Policies: Allow public access for now (Anonymous allowed)
create policy "Allow public read access" on public.posts for select using (true);
create policy "Allow public insert access" on public.posts for insert with check (true);
create policy "Allow public update access" on public.posts for update using (true);
create policy "Allow public delete access" on public.posts for delete using (true);

-- 5. Enable Real-time for this table
begin;
  -- If you already ran this, you might need to check if publication exists
  -- alter publication supabase_realtime add table posts;
commit;

-- 6. Initial Seed Data
insert into public.posts (title, type, pilar, concept, visual, status, date, link, objective, comments)
values
('Video 1: Física del Tueste', 'video', 'La Tostaduría', 'Un edit rítmico sobre la física del tueste.', 'Planos detalle del panel de control, el cambio de color del grano y el humo. Sonido industrial (ASMR).', 'aprobado', '2026-04-02', '', 'Educación', '[{"author":"Cerezo","text":"Audio ASMR listo, usamos micro de contacto en la tostadora."}]'),
('Video 2: Proceso de Cupping', 'video', 'La Tostaduría', 'El proceso de cupping (cata) antes de decidir qué llega a la barra.', 'Enfoque en las manos y la cuchara. Menos música, más sonido ambiente.', 'revision', '2026-04-06', '', 'Educación', '[]'),
('Post 1: Varietal Geisha', 'photo', 'La Tostaduría', 'Un primer plano extremo de un varietal específico (ej. Geisha).', 'Estética de catálogo de arte. Fondo negro o crema sólido.', 'produccion', '2026-04-09', '', 'Posicionamiento', '[]'),
('Post 2: Notas de Cata', 'photo', 'La Tostaduría', 'Foto de la bolsa con luz cenital, rodeada de sus notas de cata reales.', 'Composición minimalista tipo flat-lay editorial.', 'idea', '2026-04-12', '', 'Educación', '[]'),
('Video 3: Instalación Barra', 'video', 'La Barra', 'Un recorrido visual por la barra instalando todo.', 'Planos lentos (slow pan) y la luz de Barranco entrando por la ventana.', 'idea', '2026-04-21', '', 'Posicionamiento', '[]'),
('Video 4: Primer Espresso', 'video', 'La Barra', 'El primer espresso/V60 servido en la nueva barra.', 'La cámara sigue la taza desde la barra hasta la mano del cliente.', 'idea', '2026-04-24', '', 'Comunidad', '[]'),
('Post 5: Fachada Barranco', 'photo', 'La Barra', 'El logo de Varietal integrándose a la arquitectura de Barranco.', 'Foto de la fachada desde la calle.', 'idea', '2026-04-26', '', 'Comunidad', '[]'),
('Post 6: Precisión Técnica', 'photo', 'La Barra', 'Primer plano de la concentración al texturizar leche o verter agua.', 'Foco en la mirada y la precisión técnica del equipo.', 'idea', '2026-04-27', '', 'Posicionamiento', '[]');

-- 7. Create the sessions table
create table if not exists public.sessions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date not null unique
);

-- 8. Security: Enable RLS on sessions
alter table public.sessions enable row level security;
create policy "Allow public sessions read" on public.sessions for select using (true);
create policy "Allow public sessions insert" on public.sessions for insert with check (true);
create policy "Allow public sessions update" on public.sessions for update using (true);
create policy "Allow public sessions delete" on public.sessions for delete using (true);
