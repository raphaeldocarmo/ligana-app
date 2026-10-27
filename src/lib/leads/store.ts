import 'server-only'

import { createClient } from '@supabase/supabase-js'

import type { EmployerLead, Lead, WorkerLead } from '@/lib/leads/schema'
import { PRIVACY_POLICY_VERSION } from '@/content/privacy'

/**
 * Gravação de leads no Supabase. Roda só no servidor, com a chave `service_role`
 * (que nunca vai para o navegador). As tabelas têm RLS ligado e nenhuma política
 * pública: ninguém lê ou grava leads com a chave anônima.
 */

export class LeadStoreNotConfiguredError extends Error {
  constructor() {
    super('Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.')
    this.name = 'LeadStoreNotConfiguredError'
  }
}

export class LeadStoreError extends Error {
  constructor(code: string | undefined) {
    // Só o código do erro: a mensagem do banco pode conter dados do lead.
    super(`Falha ao gravar lead no Supabase (código ${code ?? 'desconhecido'}).`)
    this.name = 'LeadStoreError'
  }
}

export function isLeadStoreConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function getClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new LeadStoreNotConfiguredError()
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

function commonColumns(lead: Lead, consentAt: string) {
  return {
    name: lead.name,
    whatsapp: lead.whatsapp,
    region: lead.region,
    neighborhood: lead.neighborhood,
    categories: lead.categories,
    roles_detail: lead.rolesDetail,
    engagement_types: lead.engagementTypes,
    pay_range: lead.payRange,
    pilot_interest: lead.pilotInterest,
    consent_processing: lead.consentProcessing,
    consent_contact: lead.consentContact,
    consent_at: consentAt,
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    utm_source: lead.tracking.utmSource ?? null,
    utm_medium: lead.tracking.utmMedium ?? null,
    utm_campaign: lead.tracking.utmCampaign ?? null,
    utm_term: lead.tracking.utmTerm ?? null,
    utm_content: lead.tracking.utmContent ?? null,
    referrer: lead.tracking.referrer ?? null,
    landing_path: lead.tracking.landingPath ?? null,
  }
}

export function toEmployerRow(lead: EmployerLead, consentAt: string) {
  return {
    ...commonColumns(lead, consentAt),
    company_name: lead.companyName,
    frequency: lead.frequency,
    urgency: lead.urgency,
  }
}

export function toWorkerRow(lead: WorkerLead, consentAt: string) {
  return {
    ...commonColumns(lead, consentAt),
    experience: lead.experience,
    available_days: lead.availableDays,
    available_periods: lead.availablePeriods,
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  const client = getClient()
  const consentAt = new Date().toISOString()
  const { error } =
    lead.audience === 'employer'
      ? await client.from('employer_leads').insert(toEmployerRow(lead, consentAt))
      : await client.from('worker_leads').insert(toWorkerRow(lead, consentAt))
  if (error) throw new LeadStoreError(error.code)
}
