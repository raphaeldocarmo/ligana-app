import { describe, expect, it } from 'vitest'

import { categoriesForRoles, payRangeGroupsFor } from '@/content/options'

describe('categoriesForRoles', () => {
  it('deduz as áreas das funções, sem repetir', () => {
    expect(categoriesForRoles(['waiter', 'cook', 'delivery'])).toEqual(['kitchen', 'delivery'])
    expect(categoriesForRoles(['other_role'])).toEqual(['other'])
    expect(categoriesForRoles([])).toEqual([])
  })
})

describe('payRangeGroupsFor', () => {
  const units = (types: string[]) => payRangeGroupsFor(types).map((group) => group.unit)

  it('mostra só as faixas que fazem sentido para o tipo de contratação', () => {
    expect(units([])).toEqual(['day', 'month', 'other'])
    expect(units(['freelance'])).toEqual(['day', 'other'])
    expect(units(['permanent'])).toEqual(['month', 'other'])
    expect(units(['freelance', 'temporary'])).toEqual(['day', 'month', 'other'])
  })
})

describe('modalidades', () => {
  it('empresas e profissionais usam os mesmos valores, com rótulos próprios', async () => {
    const { ENGAGEMENT_TYPES, WORKER_ENGAGEMENT_TYPES } = await import('@/content/options')
    expect(WORKER_ENGAGEMENT_TYPES.map((o) => o.value)).toEqual(ENGAGEMENT_TYPES.map((o) => o.value))
    expect(ENGAGEMENT_TYPES.map((o) => o.label)).toEqual(['Freela / diária / turno', 'Temporário', 'Permanente'])
  })
})
