-- Storage buckets for real photo/voice capture (run once, alongside schema.sql).

insert into storage.buckets (id, name, public)
values ('report-media', 'report-media', true)
on conflict (id) do nothing;

create policy "report-media: authenticated can upload" on storage.objects
  for insert with check (bucket_id = 'report-media' and auth.role() = 'authenticated');

create policy "report-media: anyone can view" on storage.objects
  for select using (bucket_id = 'report-media');

alter table reports add column if not exists voice_url text;
