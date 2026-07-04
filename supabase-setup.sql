-- Run this in your Supabase project: SQL Editor → New query → paste → Run.
-- Creates the projects table with public read access (site visitors can
-- read, but only you — via the dashboard — can write).

create table if not exists projects (
  id          bigint generated always as identity primary key,
  title       text not null,
  description text default '',
  tags        text[] default '{}',
  platform    text not null default 'youtube' check (platform in ('youtube', 'vimeo')),
  video_id    text not null,
  featured    boolean default false,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table projects enable row level security;

create policy "Public read access"
  on projects for select
  using (true);

-- Optional: seed a first row to test
-- insert into projects (title, description, tags, platform, video_id, featured, sort_order)
-- values ('My Showreel', 'A minute of my best cuts.', array['Showreel'], 'youtube', 'YOUR_VIDEO_ID', true, 0);
