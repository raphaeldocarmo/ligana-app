-- Ligana: configuração completa do banco (tabelas, segurança, visões e permissões).
--
-- COMO USAR: no Supabase, abra SQL Editor -> New query, cole ESTE ARQUIVO INTEIRO e clique em Run.
-- Pode rodar mais de uma vez sem problema. Equivale às migrações em supabase/migrations/.

-- Ligana: leads do pré-lançamento.
--
-- Segurança: RLS ligado e NENHUMA política para os papéis `anon` e `authenticated`.
-- Só o servidor da landing page (com a chave service_role, que ignora RLS) grava,
-- e só quem tem acesso ao painel do Supabase lê. Nunca exponha a service_role no navegador.
--
-- Os valores das colunas de escolha são os `value` de src/content/options.ts.

create table if not exists public.employer_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name text not null check (char_length(name) between 2 and 80),
  company_name text check (char_length(company_name) <= 120),
  whatsapp text not null check (whatsapp ~ '^\+55[1-9]{2}[0-9]{8,9}$'),
  region text not null check (region in ('centro','segredo','prosa','bandeira','anhanduizinho','lagoa','imbirussu','outside','unknown')),
  neighborhood text check (char_length(neighborhood) <= 80),

  categories text[] not null check (
    cardinality(categories) > 0
    and categories <@ array['kitchen','service','delivery','events','cleaning','construction','other']
  ),
  roles_detail text check (char_length(roles_detail) <= 200),
  engagement_types text[] not null check (
    cardinality(engagement_types) > 0 and engagement_types <@ array['freelance','temporary','permanent']
  ),
  frequency text not null check (frequency in ('weekly','monthly','occasional','seasonal')),
  urgency text not null check (urgency in ('same_day','one_two_days','same_week','planned')),
  pay_range text check (pay_range in (
    'day_lt_100','day_100_150','day_150_200','day_200_300','day_gt_300',
    'month_lt_1600','month_1600_2200','month_2200_3000','month_gt_3000','varies'
  )),
  pilot_interest text not null check (pilot_interest in ('yes','maybe','no')),

  consent_processing boolean not null check (consent_processing),
  consent_contact boolean not null default false,
  consent_at timestamptz not null,
  privacy_policy_version text not null,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_path text
);

create table if not exists public.worker_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name text not null check (char_length(name) between 2 and 80),
  whatsapp text not null check (whatsapp ~ '^\+55[1-9]{2}[0-9]{8,9}$'),
  region text not null check (region in ('centro','segredo','prosa','bandeira','anhanduizinho','lagoa','imbirussu','outside','unknown')),
  neighborhood text check (char_length(neighborhood) <= 80),

  categories text[] not null check (
    cardinality(categories) > 0
    and categories <@ array['kitchen','service','delivery','events','cleaning','construction','other']
  ),
  roles_detail text check (char_length(roles_detail) <= 200),
  experience text check (experience in ('none','lt_1y','1_3y','gt_3y')),
  available_days text[] not null check (
    cardinality(available_days) > 0 and available_days <@ array['mon','tue','wed','thu','fri','sat','sun']
  ),
  available_periods text[] not null check (
    cardinality(available_periods) > 0 and available_periods <@ array['morning','afternoon','evening','overnight']
  ),
  engagement_types text[] not null check (
    cardinality(engagement_types) > 0 and engagement_types <@ array['freelance','temporary','permanent']
  ),
  pay_range text check (pay_range in (
    'day_lt_100','day_100_150','day_150_200','day_200_300','day_gt_300',
    'month_lt_1600','month_1600_2200','month_2200_3000','month_gt_3000','varies'
  )),
  pilot_interest text not null check (pilot_interest in ('yes','maybe','no')),

  consent_processing boolean not null check (consent_processing),
  consent_contact boolean not null default false,
  consent_at timestamptz not null,
  privacy_policy_version text not null,

  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  landing_path text
);

create index if not exists employer_leads_created_at_idx on public.employer_leads (created_at);
create index if not exists worker_leads_created_at_idx on public.worker_leads (created_at);

alter table public.employer_leads enable row level security;
alter table public.worker_leads enable row level security;

-- Sem políticas = sem acesso para anon/authenticated. Reforço explícito:
revoke all on public.employer_leads from anon, authenticated;
revoke all on public.worker_leads from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Visões de análise (agregadas, sem dados pessoais). `security_invoker` faz a
-- visão respeitar as permissões de quem consulta, então também ficam fechadas.
-- ---------------------------------------------------------------------------

-- Visão geral por público.
create or replace view public.lead_overview with (security_invoker = true) as
select 'employer' as audience,
       count(*) as total,
       count(*) filter (where pilot_interest = 'yes') as pilot_yes,
       count(*) filter (where pilot_interest = 'maybe') as pilot_maybe,
       count(*) filter (where consent_contact) as contact_allowed
from public.employer_leads
union all
select 'worker',
       count(*),
       count(*) filter (where pilot_interest = 'yes'),
       count(*) filter (where pilot_interest = 'maybe'),
       count(*) filter (where consent_contact)
from public.worker_leads;

-- Procura (contratantes) x oferta (profissionais) por categoria.
create or replace view public.lead_demand_supply_by_category with (security_invoker = true) as
with demand as (
  select c.category, count(*) as employers
  from public.employer_leads, unnest(categories) as c(category) group by c.category
), supply as (
  select c.category, count(*) as workers
  from public.worker_leads, unnest(categories) as c(category) group by c.category
)
select coalesce(d.category, s.category) as category,
       coalesce(d.employers, 0) as employers,
       coalesce(s.workers, 0) as workers
from demand d
full join supply s on s.category = d.category
order by employers desc, workers desc;

-- Procura x oferta por região da cidade.
create or replace view public.lead_demand_supply_by_region with (security_invoker = true) as
with demand as (
  select region, count(*) as employers from public.employer_leads group by 1
), supply as (
  select region, count(*) as workers from public.worker_leads group by 1
)
select coalesce(d.region, s.region) as region,
       coalesce(d.employers, 0) as employers,
       coalesce(s.workers, 0) as workers
from demand d
full join supply s on s.region = d.region
order by employers desc, workers desc;

-- Tipos de vínculo desejados pelos dois lados.
create or replace view public.lead_engagement_types with (security_invoker = true) as
select 'employer' as audience, e.engagement_type, count(*) as total
from public.employer_leads, unnest(engagement_types) as e(engagement_type) group by e.engagement_type
union all
select 'worker', e.engagement_type, count(*)
from public.worker_leads, unnest(engagement_types) as e(engagement_type) group by e.engagement_type;

-- Urgência e frequência das contratações.
create or replace view public.lead_employer_urgency with (security_invoker = true) as
select urgency, frequency, count(*) as total
from public.employer_leads
group by 1, 2
order by total desc;

-- Faixas de remuneração informadas (oferecida x esperada).
create or replace view public.lead_pay_ranges with (security_invoker = true) as
select 'employer' as audience, pay_range, count(*) as total
from public.employer_leads where pay_range is not null group by 1, 2
union all
select 'worker', pay_range, count(*)
from public.worker_leads where pay_range is not null group by 1, 2;

-- Origem das campanhas (UTM).
create or replace view public.lead_campaigns with (security_invoker = true) as
select 'employer' as audience, coalesce(utm_source, '(direto)') as source, utm_medium as medium,
       utm_campaign as campaign, count(*) as total
from public.employer_leads group by 1, 2, 3, 4
union all
select 'worker', coalesce(utm_source, '(direto)'), utm_medium, utm_campaign, count(*)
from public.worker_leads group by 1, 2, 3, 4;

revoke all on public.lead_overview, public.lead_demand_supply_by_category, public.lead_demand_supply_by_region,
  public.lead_engagement_types, public.lead_employer_urgency, public.lead_pay_ranges, public.lead_campaigns
  from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Permissões do servidor (service_role)
-- ---------------------------------------------------------------------------

grant usage on schema public to service_role;
grant select, insert on public.employer_leads, public.worker_leads to service_role;
grant select on public.lead_overview, public.lead_demand_supply_by_category, public.lead_demand_supply_by_region,
  public.lead_engagement_types, public.lead_employer_urgency, public.lead_pay_ranges, public.lead_campaigns
  to service_role;

-- Faz a API do Supabase enxergar as tabelas imediatamente.
notify pgrst, 'reload schema';

-- ---------------------------------------------------------------------------
-- CEP (adicionado em 2026-10-30)
-- ---------------------------------------------------------------------------

alter table public.employer_leads add column if not exists cep text check (cep ~ '^[0-9]{8}$');
alter table public.worker_leads add column if not exists cep text check (cep ~ '^[0-9]{8}$');

-- Procura x oferta por faixa de CEP (5 primeiros dígitos = setor da cidade), sem expor o CEP completo.
create or replace view public.lead_demand_supply_by_cep_area with (security_invoker = true) as
with demand as (
  select left(cep, 5) as cep_area, count(*) as employers from public.employer_leads where cep is not null group by 1
), supply as (
  select left(cep, 5) as cep_area, count(*) as workers from public.worker_leads where cep is not null group by 1
)
select coalesce(d.cep_area, s.cep_area) as cep_area,
       coalesce(d.employers, 0) as employers,
       coalesce(s.workers, 0) as workers
from demand d
full join supply s on s.cep_area = d.cep_area
order by employers desc, workers desc;

revoke all on public.lead_demand_supply_by_cep_area from anon, authenticated;
grant select on public.lead_demand_supply_by_cep_area to service_role;

notify pgrst, 'reload schema';
