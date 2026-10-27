/**
 * Origem da visita (parâmetros UTM). Guardada na sessão no primeiro acesso, para
 * não se perder se a pessoa navegar até a política de privacidade e voltar.
 */

export type Tracking = {
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmTerm?: string | null
  utmContent?: string | null
  referrer?: string | null
  landingPath?: string | null
}

const STORAGE_KEY = 'ligana:tracking'
const PARAMS = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
} as const

export function parseTracking(search: string, referrer: string, pathname: string): Tracking {
  const params = new URLSearchParams(search)
  const tracking: Tracking = {}
  for (const [param, key] of Object.entries(PARAMS)) {
    const value = params.get(param)?.trim().slice(0, 120)
    if (value) tracking[key] = value
  }
  // Só a origem do referrer: o caminho completo pode carregar dados de outra página.
  if (referrer) {
    try {
      tracking.referrer = new URL(referrer).origin
    } catch {
      // referrer inválido: ignora
    }
  }
  tracking.landingPath = pathname.slice(0, 300)
  return tracking
}

export function captureTracking(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const tracking = parseTracking(window.location.search, document.referrer, window.location.pathname)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking))
  } catch {
    // sessionStorage indisponível (modo privado etc.): segue sem origem
  }
}

export function readTracking(): Tracking {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Tracking
  } catch {
    // ignora
  }
  if (typeof window === 'undefined') return {}
  return parseTracking(window.location.search, document.referrer, window.location.pathname)
}
