/**
 * Eventos de analytics. Só enviamos o nome do evento e propriedades genéricas
 * (público, posição do botão, código de erro). NUNCA dados pessoais: nada de
 * nome, WhatsApp, bairro ou respostas do formulário.
 *
 * Os eventos vão para `window.dataLayer` (Google Tag Manager) e para o Plausible,
 * se configurados. Sem nenhum dos dois, viram no-op (e aparecem no console em dev).
 */

import type { Audience } from '@/lib/leads/schema'

export type AnalyticsEvent =
  | { name: 'page_view' }
  | { name: 'cta_click'; audience: Audience; location: 'header' | 'hero' | 'closing' }
  | { name: 'form_start'; audience: Audience }
  | { name: 'form_submit_success'; audience: Audience }
  | { name: 'form_submit_error'; audience: Audience; reason: string }

type Props = Record<string, string>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    plausible?: (event: string, options?: { props?: Props }) => void
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return
  const { name, ...props } = event

  if (process.env.NODE_ENV === 'development') console.info('[analytics]', name, props)

  try {
    (window.dataLayer ||= []).push({ event: `ligana_${name}`, ...props })
    // O Plausible já conta visualizações sozinho.
    if (name !== 'page_view') window.plausible?.(name, { props: props as Props })
  } catch {
    // analytics nunca pode quebrar a página
  }
}
