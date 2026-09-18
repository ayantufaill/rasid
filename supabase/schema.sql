-- RASID schema: run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.

create extension if not exists pgcrypto;

-- ---------- profiles (one row per authenticated user) ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Field engineer',
  role text not null default 'field' check (role in ('field', 'manager')),
  company text,
  zone text,
  created_at timestamptz not null default now()
);

-- auto-create a profile row whenever someone signs up
-- (search_path must be set explicitly: supabase_auth_admin, the role that fires
-- this trigger, only has `auth` on its search_path, so an unqualified `profiles`
-- reference fails with "relation profiles does not exist" without this)
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Field engineer'));
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ---------- zones (reference data) ----------
create table if not exists zones (
  id text primary key,
  name text not null,
  risk_level text not null check (risk_level in ('critical', 'high', 'medium', 'low'))
);

-- ---------- contractors (reference data) ----------
create table if not exists contractors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  man_hours int not null default 0,
  closure_rate int not null default 0,
  grade text not null check (grade in ('A', 'B', 'C', 'D'))
);

-- ---------- reports ----------
create table if not exists reports (
  id text primary key,
  zone_id text not null references zones(id),
  category text not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  kind text not null check (kind in ('hazard', 'nearmiss', 'unsafeact', 'positive', 'incident')),
  status text not null default 'open' check (status in ('open', 'assigned', 'verify', 'resolved')),
  cluster_count int not null default 1,
  contractor_id uuid references contractors(id),
  reporter_id uuid references profiles(id),
  description text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists reports_set_updated_at on reports;
create trigger reports_set_updated_at
  before update on reports
  for each row execute function set_updated_at();

-- ---------- row level security ----------
alter table profiles enable row level security;
alter table zones enable row level security;
alter table contractors enable row level security;
alter table reports enable row level security;

create policy "profiles: read all, authenticated" on profiles
  for select using (auth.role() = 'authenticated');
create policy "profiles: update own row" on profiles
  for update using (auth.uid() = id);

create policy "zones: read, authenticated" on zones
  for select using (auth.role() = 'authenticated');

create policy "contractors: read, authenticated" on contractors
  for select using (auth.role() = 'authenticated');

create policy "reports: read, authenticated" on reports
  for select using (auth.role() = 'authenticated');
create policy "reports: insert, authenticated" on reports
  for insert with check (auth.role() = 'authenticated');
create policy "reports: update, authenticated" on reports
  for update using (auth.role() = 'authenticated');

-- ---------- seed data (same demo dataset the frontend prototype used) ----------
insert into zones (id, name, risk_level) values
  ('A1', 'Coastal Package — Scaffolding', 'critical'),
  ('A2', 'Utility Corridor — Trenching', 'high'),
  ('B1', 'Structural Steel Yard', 'high'),
  ('B2', 'Site Access & Housekeeping', 'low'),
  ('C1', 'Electrical Rough-in', 'medium'),
  ('C2', 'Concrete Pour Zone', 'medium'),
  ('D1', 'Logistics & Storage', 'low'),
  ('D2', 'Finishing Works', 'low')
on conflict (id) do nothing;

insert into contractors (name, man_hours, closure_rate, grade) values
  ('Al Sahra Steel', 41200, 62, 'D'),
  ('Rawabi Civils', 38600, 78, 'C'),
  ('Gulf Mechanical', 29400, 88, 'B'),
  ('Noor Electrical', 26100, 94, 'A')
on conflict do nothing;

insert into reports (id, zone_id, category, severity, kind, status, cluster_count, contractor_id, description) values
  ('RSD-A1-014', 'A1', 'falling', 'critical', 'hazard', 'assigned', 7, (select id from contractors where name = 'Al Sahra Steel'), 'Hand tools and loose bolts on the scaffold deck at Level 4 with no toe-board fitted.'),
  ('RSD-A1-009', 'A1', 'scaffold', 'high', 'hazard', 'open', 2, (select id from contractors where name = 'Al Sahra Steel'), 'Missing tie-in on the scaffold frame; visible sway under load.'),
  ('RSD-A1-021', 'A1', 'height', 'critical', 'nearmiss', 'open', 1, (select id from contractors where name = 'Al Sahra Steel'), 'Worker observed leaning over the edge barrier with lanyard unclipped.'),
  ('RSD-A2-031', 'A2', 'excavation', 'high', 'hazard', 'verify', 3, (select id from contractors where name = 'Rawabi Civils'), 'Trench edge not barricaded and spoil pile stored within 0.5 m of the edge.'),
  ('RSD-A2-028', 'A2', 'confined', 'critical', 'hazard', 'open', 1, (select id from contractors where name = 'Rawabi Civils'), 'Entry to a wet well made without a gas test record.'),
  ('RSD-B1-006', 'B1', 'lifting', 'high', 'nearmiss', 'assigned', 1, (select id from contractors where name = 'Gulf Mechanical'), 'Tower crane slewed over an occupied area during a lift.'),
  ('RSD-B1-013', 'B1', 'vehicle', 'medium', 'unsafeact', 'open', 2, (select id from contractors where name = 'Gulf Mechanical'), 'Reversing plant without a spotter at an active pedestrian crossing point.'),
  ('RSD-C1-022', 'C1', 'electrical', 'medium', 'hazard', 'open', 2, (select id from contractors where name = 'Noor Electrical'), 'Exposed conductor near a temporary distribution board.'),
  ('RSD-C2-018', 'C2', 'housekeep', 'medium', 'hazard', 'assigned', 1, (select id from contractors where name = 'Rawabi Civils'), 'Packaging debris blocking the emergency walkway.'),
  ('RSD-B2-011', 'B2', 'ppe', 'low', 'unsafeact', 'resolved', 1, (select id from contractors where name = 'Gulf Mechanical'), 'Three workers in a marked high-noise zone without hearing protection.'),
  ('RSD-D1-004', 'D1', 'housekeep', 'low', 'hazard', 'open', 1, (select id from contractors where name = 'Noor Electrical'), 'Packaging debris blocking the emergency walkway at Gate 2.'),
  ('RSD-A1-002', 'A1', 'heat', 'high', 'hazard', 'verify', 4, (select id from contractors where name = 'Al Sahra Steel'), 'Shaded rest area for the coastal crew has no working water cooler.'),
  ('RSD-D2-007', 'D2', 'other', 'low', 'positive', 'resolved', 1, (select id from contractors where name = 'Noor Electrical'), 'Reported condition needs safety officer triage to confirm category.')
on conflict (id) do nothing;
