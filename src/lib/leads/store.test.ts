import { describe, expect, it } from 'vitest'

import { leadSchema, type EmployerLead, type WorkerLead } from '@/lib/leads/schema'
import { toEmployerRow, toWorkerRow } from '@/lib/leads/store'
import { validEmployer, validWorker } from '@/test/fixtures'

describe('mapeamento para as tabelas', () => {
  it('gera as colunas de employer_leads', () => {
    const row = toEmployerRow(leadSchema.parse(validEmployer) as EmployerLead, '2026-10-27T12:00:00.000Z')
    expect(row).toMatchObject({
      name: 'Ana Souza',
      whatsapp: '+5567999998888',
      cep: '79002000',
      company_name: null,
      frequency: 'weekly',
      urgency: 'same_day',
      consent_processing: true,
      consent_at: '2026-10-27T12:00:00.000Z',
      utm_source: 'instagram',
      utm_medium: null,
    })
    expect(row.privacy_policy_version).toBeTruthy()
  })

  it('gera as colunas de worker_leads', () => {
    const row = toWorkerRow(leadSchema.parse(validWorker) as WorkerLead, '2026-10-27T12:00:00.000Z')
    expect(row).toMatchObject({
      available_days: ['sat', 'sun'],
      available_periods: ['morning'],
      experience: '1_3y',
      pay_range: 'day_150_200',
      consent_contact: true,
    })
  })
})
