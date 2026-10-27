-- Garante que o servidor da landing page (chave service_role / secret) possa gravar
-- os leads. Projetos novos do Supabase nem sempre concedem essas permissões sozinhos.
-- Pode rodar mais de uma vez sem problema. anon e authenticated continuam sem acesso.

grant usage on schema public to service_role;
grant select, insert on public.employer_leads, public.worker_leads to service_role;
grant select on public.lead_overview, public.lead_demand_supply_by_category, public.lead_demand_supply_by_region,
  public.lead_engagement_types, public.lead_employer_urgency, public.lead_pay_ranges, public.lead_campaigns
  to service_role;

-- Faz a API do Supabase enxergar as tabelas imediatamente.
notify pgrst, 'reload schema';
