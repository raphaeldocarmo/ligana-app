-- CEP opcional (8 dígitos, sem traço) nos dois tipos de lead, para aproximar
-- pessoas e oportunidades por distância. Pode rodar mais de uma vez sem problema.

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
