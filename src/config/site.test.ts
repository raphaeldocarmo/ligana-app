import { describe, expect, it } from 'vitest'

import { normalizeSiteUrl } from '@/config/site'

describe('normalizeSiteUrl', () => {
  it.each([
    ['https://ligana.com.br', 'https://ligana.com.br'],
    ['ligana-app.vercel.app', 'https://ligana-app.vercel.app'],
    ['https://ligana.com.br/', 'https://ligana.com.br'],
    ['  https://ligana.com.br/privacidade ', 'https://ligana.com.br'],
    ['http://localhost:3000', 'http://localhost:3000'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeSiteUrl(input.trim())).toBe(expected)
  })

  it('devolve null para valores inválidos ou vazios', () => {
    expect(normalizeSiteUrl('https://')).toBeNull()
    expect(normalizeSiteUrl('')).toBeNull()
    expect(normalizeSiteUrl(undefined)).toBeNull()
  })
})
