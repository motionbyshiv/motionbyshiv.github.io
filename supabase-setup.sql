-- ================================================================
-- SUPABASE SETUP — Motion By Shiv
-- Run in your Supabase project: SQL Editor → New query → paste → Run.
-- Then put your project URL + anon key into assets/js/config.js.
--
-- The site works fully without Supabase (forms fall back to
-- WhatsApp). Connecting it adds: inquiry storage, lead tracking,
-- and newsletter subscriptions — all GitHub Pages compatible.
-- ================================================================

-- ---------- inquiries: contact form submissions ----------
create table if not exists inquiries (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  company    text default '',
  budget     text default '',
  message    text not null,
  page       text default '',            -- which page the form was sent from
  status     text not null default 'new' check (status in ('new', 'replied', 'qualified', 'won', 'lost', 'spam')),
  created_at timestamptz default now()
);

alter table inquiries enable row level security;

-- Anonymous visitors may INSERT only (never read others' inquiries).
create policy "Public can submit inquiries"
  on inquiries for insert
  with check (true);

-- Reading/updating happens via the Supabase dashboard (service role).

-- ---------- subscribers: newsletter / updates ----------
create table if not exists subscribers (
  id         bigint generated always as identity primary key,
  email      text not null unique,
  source     text default '',
  created_at timestamptz default now()
);

alter table subscribers enable row level security;

create policy "Public can subscribe"
  on subscribers for insert
  with check (true);

-- ---------- optional next steps (leave commented until needed) ----------
-- Lead-tracking view: inquiries grouped by status
-- create view lead_pipeline as
--   select status, count(*) as leads, max(created_at) as latest
--   from inquiries group by status;

-- Future client portal: enable Supabase Auth, then add per-client
-- tables (projects, deliverables, approvals) keyed to auth.uid().
