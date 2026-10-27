import { describe, expect, it, vi } from 'vitest'

import { createLeadHandler, MIN_FILL_TIME_MS, type LeadHandlerDeps } from '@/lib/leads/handler'
import { validEmployer, validWorker } from '@/test/fixtures'

function setup(overrides: Partial<LeadHandlerDeps> = {}) {
  const deps: LeadHandlerDeps = {
    isConfigured: () => true,
    save: vi.fn(async () => {}),
    isAllowed: () => true,
    log: vi.fn(),
    ...overrides,
  }
  return { deps, handle: createLeadHandler(deps) }
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'content-type': 'application/json', host: 'localhost:3000', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

const human = { website: '', elapsedMs: MIN_FILL_TIME_MS + 30_000 }

describe('POST /api/leads', () => {
  it('grava um lead válido e responde 201', async () => {
    const { deps, handle } = setup()
    const response = await handle(post({ ...validWorker, ...human }))
    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({ ok: true })
    expect(deps.save).toHaveBeenCalledWith(expect.objectContaining({ audience: 'worker', whatsapp: '+556733334444' }))
  })

  it('não finge sucesso quando o banco não está configurado', async () => {
    const { deps, handle } = setup({ isConfigured: () => false })
    const response = await handle(post({ ...validEmployer, ...human }))
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ ok: false, error: 'not_configured' })
    expect(deps.save).not.toHaveBeenCalled()
  })

  it('devolve os erros por campo', async () => {
    const { deps, handle } = setup()
    const response = await handle(post({ ...validEmployer, ...human, whatsapp: '123' }))
    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error).toBe('invalid')
    expect(body.fieldErrors.whatsapp).toBeDefined()
    expect(deps.save).not.toHaveBeenCalled()
  })

  it.each([
    ['honeypot preenchido', { website: 'http://spam', elapsedMs: 60_000 }],
    ['envio rápido demais', { website: '', elapsedMs: 300 }],
    ['sem tempo de preenchimento', {}],
  ])('recusa robôs: %s', async (_case, antiSpam) => {
    const { deps, handle } = setup()
    const response = await handle(post({ ...validEmployer, ...antiSpam }))
    expect(response.status).toBe(400)
    expect(deps.save).not.toHaveBeenCalled()
  })

  it('recusa envios de outra origem', async () => {
    const { deps, handle } = setup()
    const response = await handle(post({ ...validEmployer, ...human }, { origin: 'https://malicioso.example' }))
    expect(response.status).toBe(403)
    expect(deps.save).not.toHaveBeenCalled()
  })

  it('limita envios repetidos', async () => {
    const { deps, handle } = setup({ isAllowed: () => false })
    const response = await handle(post({ ...validEmployer, ...human }))
    expect(response.status).toBe(429)
    expect(deps.save).not.toHaveBeenCalled()
  })

  it('recusa JSON inválido e corpo grande demais', async () => {
    const { handle } = setup()
    expect((await handle(post('{nope'))).status).toBe(400)
    expect((await handle(post({ ...validEmployer, ...human, rolesDetail: 'x'.repeat(20_000) }))).status).toBe(413)
  })

  it('não registra dados pessoais quando a gravação falha', async () => {
    const log = vi.fn()
    const { handle } = setup({
      log,
      save: async () => {
        throw new Error('Falha ao gravar lead no Supabase (código 23514).')
      },
    })
    const response = await handle(post({ ...validEmployer, ...human }))
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ ok: false, error: 'unavailable' })
    const logged = log.mock.calls.flat().join(' ')
    expect(logged).not.toContain('99999')
    expect(logged).not.toContain('Ana')
  })
})
