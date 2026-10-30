import { describe, expect, it } from 'vitest'

import { leadSchema, toFieldErrors } from '@/lib/leads/schema'
import { validEmployer, validWorker } from '@/test/fixtures'

describe('leadSchema', () => {
  it('normaliza um contratante válido', () => {
    const lead = leadSchema.parse(validEmployer)
    expect(lead).toMatchObject({
      audience: 'employer',
      name: 'Ana Souza',
      companyName: null,
      whatsapp: '+5567999998888',
      cep: '79002000',
      categories: ['kitchen', 'events'],
      payRange: null,
      consentContact: false,
      tracking: { utmSource: 'instagram' },
    })
  })

  it('normaliza um profissional válido, sem origem de campanha', () => {
    const lead = leadSchema.parse(validWorker)
    expect(lead).toMatchObject({
      audience: 'worker',
      whatsapp: '+556733334444',
      cep: null,
      neighborhood: 'Mata do Jacinto',
      rolesDetail: null,
      experience: '1_3y',
      tracking: {},
    })
  })

  it('exige o consentimento de uso dos dados, mas não o de contato', () => {
    const result = leadSchema.safeParse({ ...validWorker, consentProcessing: false, consentContact: false })
    expect(result.success).toBe(false)
    if (!result.success) expect(Object.keys(toFieldErrors(result.error))).toEqual(['consentProcessing'])
  })

  it('aponta cada campo obrigatório que faltou', () => {
    const result = leadSchema.safeParse({ audience: 'worker', consentProcessing: true })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(Object.keys(toFieldErrors(result.error)).sort()).toEqual(
        [
          'availableDays',
          'availablePeriods',
          'categories',
          'engagementTypes',
          'name',
          'pilotInterest',
          'region',
          'whatsapp',
        ].sort(),
      )
    }
  })

  it('recusa valores fora das opções', () => {
    const result = leadSchema.safeParse({ ...validEmployer, categories: ['hacker'], urgency: 'ontem' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(toFieldErrors(result.error)).toMatchObject({
        categories: expect.any(String),
        urgency: 'Escolha uma opção.',
      })
    }
  })

  it('recusa WhatsApp inválido com mensagem amigável', () => {
    const result = leadSchema.safeParse({ ...validEmployer, whatsapp: '9999' })
    expect(result.success).toBe(false)
    if (!result.success) expect(toFieldErrors(result.error).whatsapp).toContain('Confira o número')
  })

  it('não aceita público desconhecido', () => {
    expect(leadSchema.safeParse({ ...validEmployer, audience: 'admin' }).success).toBe(false)
  })

  it('aceita CEP vazio e recusa CEP incompleto', () => {
    expect(leadSchema.parse({ ...validEmployer, cep: '' })).toMatchObject({ cep: null })
    const result = leadSchema.safeParse({ ...validEmployer, cep: '7900' })
    expect(result.success).toBe(false)
    if (!result.success) expect(toFieldErrors(result.error).cep).toContain('8 números')
  })
})
