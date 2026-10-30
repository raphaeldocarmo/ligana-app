import { describe, expect, it, vi } from 'vitest'

import { formatCepInput, isCampoGrande, lookupCep, normalizeCep } from '@/lib/cep'

const respond = (status: number, body: unknown) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch

describe('CEP', () => {
  it('formata e normaliza', () => {
    expect(formatCepInput('79002')).toBe('79002')
    expect(formatCepInput('790020001234')).toBe('79002-000')
    expect(normalizeCep('79002-000')).toBe('79002000')
    expect(normalizeCep('7900')).toBeNull()
  })

  it('reconhece Campo Grande (MS) com ou sem acento e caixa', () => {
    expect(isCampoGrande('Campo Grande', 'MS')).toBe(true)
    expect(isCampoGrande('campo  grande', 'ms')).toBe(true)
    expect(isCampoGrande('Campo Grande', 'RJ')).toBe(false)
    expect(isCampoGrande('Dourados', 'MS')).toBe(false)
  })

  it('devolve bairro, cidade e UF do ViaCEP', async () => {
    const fetchImpl = respond(200, { bairro: ' Centro ', localidade: 'Campo Grande', uf: 'MS' })
    expect(await lookupCep('79002-000', fetchImpl)).toEqual({
      status: 'found',
      neighborhood: 'Centro',
      city: 'Campo Grande',
      uf: 'MS',
    })
    expect(fetchImpl).toHaveBeenCalledWith('https://viacep.com.br/ws/79002000/json/', expect.anything())
  })

  it('trata CEP inexistente, inválido e falha de rede', async () => {
    expect(await lookupCep('79999999', respond(200, { erro: 'true' }))).toEqual({ status: 'not_found' })
    expect(await lookupCep('123', respond(200, {}))).toEqual({ status: 'not_found' })
    expect(await lookupCep('79002000', respond(500, {}))).toEqual({ status: 'error' })
    const failing = vi.fn(async () => {
      throw new TypeError('fetch failed')
    }) as unknown as typeof fetch
    expect(await lookupCep('79002000', failing)).toEqual({ status: 'error' })
  })
})
