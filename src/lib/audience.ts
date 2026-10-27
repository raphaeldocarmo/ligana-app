import type { Audience } from '@/lib/leads/schema'

/** Âncoras das jornadas de cadastro (usadas nos CTAs e em links de campanha). */
export const AUDIENCE_ANCHORS: Record<Audience, string> = {
  employer: 'quero-contratar',
  worker: 'quero-trabalhar',
}

const EVENT = 'ligana:select-audience'

export function audienceFromHash(hash: string): Audience | null {
  const anchor = hash.replace(/^#/, '')
  if (anchor === AUDIENCE_ANCHORS.employer) return 'employer'
  if (anchor === AUDIENCE_ANCHORS.worker) return 'worker'
  return null
}

/** Avisa a seção de cadastro qual formulário abrir. */
export function selectAudience(audience: Audience): void {
  window.dispatchEvent(new CustomEvent<Audience>(EVENT, { detail: audience }))
}

export function onSelectAudience(listener: (audience: Audience) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<Audience>).detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
