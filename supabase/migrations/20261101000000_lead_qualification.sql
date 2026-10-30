-- Ligana: qualificação de leads de empresas + indicadores de oferta. SOMENTE ADITIVA:
-- nada é apagado, nenhum dado existente muda. Pode rodar mais de uma vez sem problema.
--
-- Impactos:
-- * employer_leads ganha main_difficulty e current_sourcing (opcionais; registros antigos ficam NULL).
-- * headcount e willingness_to_pay continuam existindo; passam a ser opcionais só no formulário
--   (no banco já aceitavam vazio).
-- * Nova visão lead_workers_by_role_region (profissionais por função e região aceita).

alter table public.employer_leads add column if not exists main_difficulty text check (main_difficulty in (
  'takes_too_long','short_notice','no_shows','lack_experience','availability','cost','other'
));
alter table public.employer_leads add column if not exists current_sourcing text[] check (current_sourcing <@ array[
  'whatsapp_groups','referrals','social_media','job_sites','agency','own_contacts','other'
]);

-- Profissionais por função e por região em que aceitam trabalhar ('any' = qualquer região).
create or replace view public.lead_workers_by_role_region with (security_invoker = true) as
select coalesce(r.role, '(sem função marcada)') as role,
       coalesce(w.work_region, '(não informado)') as work_region,
       count(*) as workers
from public.worker_leads l
left join lateral unnest(l.roles) as r(role) on true
left join lateral unnest(l.work_regions) as w(work_region) on true
group by 1, 2
order by workers desc;

-- Como as empresas resolvem hoje e qual a principal dificuldade (para pesquisa de mercado).
create or replace view public.lead_employer_pain with (security_invoker = true) as
select coalesce(main_difficulty, '(não informado)') as main_difficulty,
       coalesce(s.sourcing, '(não informado)') as current_sourcing,
       count(*) as employers
from public.employer_leads l
left join lateral unnest(l.current_sourcing) as s(sourcing) on true
group by 1, 2
order by employers desc;

revoke all on public.lead_workers_by_role_region, public.lead_employer_pain from anon, authenticated;
grant select on public.lead_workers_by_role_region, public.lead_employer_pain to service_role;

notify pgrst, 'reload schema';
