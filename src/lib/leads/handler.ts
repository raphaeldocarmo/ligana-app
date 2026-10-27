import { antiSpamSchema, leadSchema, toFieldErrors, type FieldErrors, type Lead } from '@/lib/leads/schema'

/** Códigos de erro que o formulário sabe explicar para a pessoa. */
export type LeadErrorCode =
  | 'invalid'
  | 'rejected'
  | 'too_many_requests'
  | 'not_configured'
  | 'unavailable'

export type LeadResponse = { ok: true } | { ok: false; error: LeadErrorCode; fieldErrors?: FieldErrors }

export type LeadHandlerDeps = {
  isConfigured: () => boolean
  save: (lead: Lead) => Promise<void>
  isAllowed: (key: string) => boolean
  log: (message: string) => void
}

/** Tempo mínimo entre abrir e enviar o formulário. Robôs costumam enviar na hora. */
export const MIN_FILL_TIME_MS = 2500
const MAX_BODY_BYTES = 16 * 1024

function json(body: LeadResponse, status: number): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || 'unknown'
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function createLeadHandler(deps: LeadHandlerDeps) {
  return async function handleLead(request: Request): Promise<Response> {
    if (!isSameOrigin(request)) return json({ ok: false, error: 'rejected' }, 403)

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'invalid' }, 413)

    let body: unknown
    try {
      body = JSON.parse(raw)
    } catch {
      return json({ ok: false, error: 'invalid' }, 400)
    }

    const antiSpam = antiSpamSchema.safeParse(body)
    const honeypotFilled = antiSpam.success && Boolean(antiSpam.data.website)
    const tooFast =
      !antiSpam.success ||
      antiSpam.data.elapsedMs === undefined ||
      antiSpam.data.elapsedMs < MIN_FILL_TIME_MS
    if (honeypotFilled || tooFast) return json({ ok: false, error: 'rejected' }, 400)

    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return json({ ok: false, error: 'invalid', fieldErrors: toFieldErrors(parsed.error) }, 400)
    }

    if (!deps.isAllowed(clientKey(request))) {
      return json({ ok: false, error: 'too_many_requests' }, 429)
    }

    if (!deps.isConfigured()) {
      deps.log('Lead não gravado: Supabase não configurado (veja o README).')
      return json({ ok: false, error: 'not_configured' }, 503)
    }

    try {
      await deps.save(parsed.data)
    } catch (error) {
      // Nunca registre o lead em si: só o tipo/código do erro.
      deps.log(error instanceof Error ? error.message : 'Falha desconhecida ao gravar lead.')
      return json({ ok: false, error: 'unavailable' }, 500)
    }

    return json({ ok: true }, 201)
  }
}
