import type { Audience } from '@/lib/leads/schema'

/** Âncoras das seções de cada público (usadas no menu, nos CTAs e em links de campanha). */
export const AUDIENCE_ANCHORS: Record<Audience, string> = {
  employer: 'quero-contratar',
  worker: 'quero-trabalhar',
}

/** Âncoras dos formulários dentro de cada seção. */
export const FORM_ANCHORS: Record<Audience, string> = {
  employer: 'formulario-empresa',
  worker: 'formulario-profissional',
}
