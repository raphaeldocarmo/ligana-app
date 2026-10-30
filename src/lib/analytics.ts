/**
 * Eventos de analytics. Só enviamos o nome do evento e propriedades genéricas
 * (público, posição do botão, código de erro). NUNCA dados pessoais: nada de
 * nome, WhatsApp, bairro ou respostas do formulário.
 *
 * Os eventos vão para `window.dataLayer` (Google Tag Manager) e para o Plausible,
 * se configurados. Sem nenhum dos dois, viram no-op (e aparecem no console em dev).
 */

import type { Audience } from '@/lib/leads/schema'

export type CtaLocation = 'header' | 'hero' | 'section' | 'how_it_works' | 'faq'

/** Nomes dos eventos de conversão (iguais no GTM/GA4 e no Plausible). */
export type AnalyticsEvent =
  | { name: 'page_view' }
  | { name: 'click_hire_cta'; location: CtaLocation }
  | { name: 'click_work_cta'; location: CtaLocation }
  | { name: 'start_company_form' }
  | { name: 'submit_company_form_success'; need_timing: string }
  | { name: 'start_worker_form' }
  | { name: 'submit_worker_form_success' }
  | { name: 'form_submission_error'; form: 'company' | 'worker'; reason: string }

/** Eventos de cada formulário, para quem só sabe o público. */
export const FORM_EVENTS = {
  employer: { start: 'start_company_form', success: 'submit_company_form_success', form: 'company' },
  worker: { start: 'start_worker_form', success: 'submit_worker_form_success', form: 'worker' },
} as const satisfies Record<Audience, { start: string; success: string; form: 'company' | 'worker' }>

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
    (window.dataLayer ||= []).push({ event: name, ...props })
    // O Plausible já conta visualizações sozinho.
    if (name !== 'page_view') window.plausible?.(name, { props: props as Props })
  } catch {
    // analytics nunca pode quebrar a página
  }
}
