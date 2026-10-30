-- Ligana: landing page v2 (foco em empresas). Migração SOMENTE ADITIVA:
-- nada é apagado e os cadastros existentes continuam válidos.
--
-- Impactos:
-- * employer_leads.urgency e pilot_interest (nas duas tabelas) passam a aceitar vazio, porque
--   os novos formulários não perguntam mais isso. Registros antigos mantêm os valores.
-- * Novas colunas, todas opcionais no banco (registros antigos ficam com NULL).
-- Pode rodar mais de uma vez sem problema.

alter table public.employer_leads alter column urgency drop not null;
alter table public.employer_leads alter column pilot_interest drop not null;
alter table public.worker_leads alter column pilot_interest drop not null;

-- Empresas
alter table public.employer_leads add column if not exists segment text check (segment in (
  'restaurant','burger','pizzeria','bar','bakery_cafe','events_buffet','retail','other'
));
alter table public.employer_leads add column if not exists roles text[] check (roles <@ array[
  'waiter','cook','kitchen_assistant','grill','dishwasher','bartender','cashier','stock',
  'delivery','event_staff','cleaning','maintenance','other_role'
]);
alter table public.employer_leads add column if not exists headcount text check (headcount in ('1','2_3','4_5','6_plus'));
alter table public.employer_leads add column if not exists need_timing text check (need_timing in (
  'today_tomorrow','next_7_days','future_date','no_current_need'
));
alter table public.employer_leads add column if not exists willingness_to_pay text check (
  willingness_to_pay in ('yes','depends','no')
);

-- Profissionais
alter table public.worker_leads add column if not exists roles text[] check (roles <@ array[
  'waiter','cook','kitchen_assistant','grill','dishwasher','bartender','cashier','stock',
  'delivery','event_staff','cleaning','maintenance','other_role'
]);
alter table public.worker_leads add column if not exists work_regions text[] check (work_regions <@ array[
  'any','centro','segredo','prosa','bandeira','anhanduizinho','lagoa','imbirussu'
]);

-- ---------------------------------------------------------------------------
-- Novas visões de análise (agregadas, sem dados pessoais)
-- ---------------------------------------------------------------------------

-- Procura (empresas) x oferta (profissionais) por função.
create or replace view public.lead_demand_supply_by_role with (security_invoker = true) as
with demand as (
  select r.role, count(*) as employers
  from public.employer_leads, unnest(roles) as r(role) group by r.role
), supply as (
  select r.role, count(*) as workers
  from public.worker_leads, unnest(roles) as r(role) group by r.role
)
select coalesce(d.role, s.role) as role,
       coalesce(d.employers, 0) as employers,
       coalesce(s.workers, 0) as workers
from demand d
full join supply s on s.role = d.role
order by employers desc, workers desc;

-- Demanda das empresas: quando precisam, quantas pessoas, segmento.
create or replace view public.lead_employer_need with (security_invoker = true) as
select coalesce(need_timing, '(não informado)') as need_timing,
       coalesce(headcount, '(não informado)') as headcount,
       coalesce(segment, '(não informado)') as segment,
       count(*) as total
from public.employer_leads
group by 1, 2, 3
order by total desc;

-- Pesquisa de validação: as empresas pagariam pela intermediação?
create or replace view public.lead_willingness_to_pay with (security_invoker = true) as
select coalesce(willingness_to_pay, '(não informado)') as willingness_to_pay,
       coalesce(segment, '(não informado)') as segment,
       count(*) as total
from public.employer_leads
group by 1, 2
order by total desc;

revoke all on public.lead_demand_supply_by_role, public.lead_employer_need, public.lead_willingness_to_pay
  from anon, authenticated;
grant select on public.lead_demand_supply_by_role, public.lead_employer_need, public.lead_willingness_to_pay
  to service_role;

notify pgrst, 'reload schema';
