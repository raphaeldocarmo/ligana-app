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
      company_name: 'Hamburgueria do Centro',
      segment: 'burger',
      roles: ['waiter', 'grill', 'delivery'],
      categories: ['kitchen', 'delivery'],
      headcount: '2_3',
      need_timing: 'next_7_days',
      frequency: 'weekly',
      main_difficulty: 'short_notice',
      current_sourcing: ['whatsapp_groups', 'referrals'],
      willingness_to_pay: 'depends',
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
      categories: ['kitchen', 'cleaning'],
      roles: ['cook'],
      work_regions: ['prosa', 'centro'],
      available_days: ['sat', 'sun'],
      available_periods: ['morning'],
      experience: '1_3y',
      pay_range: 'day_150_200',
      consent_contact: true,
    })
  })

  it('não grava mais urgência nem interesse no piloto (colunas antigas ficam vazias)', () => {
    const row = toEmployerRow(leadSchema.parse(validEmployer) as EmployerLead, '2026-10-31T12:00:00.000Z')
    expect(row).not.toHaveProperty('urgency')
    expect(row).not.toHaveProperty('pilot_interest')
  })
})
