/**
 * Configuração pública do site, vinda de variáveis de ambiente `NEXT_PUBLIC_*`
 * (ver `.env.example`). Nada secreto aqui: tudo isto chega ao navegador.
 */

const env = (value: string | undefined) => (value && value.trim() ? value.trim() : null)

/**
 * Aceita o endereço com ou sem `https://` e com `/` no final. Um valor inválido
 * não pode derrubar o build: cai no endereço da Vercel ou no local.
 */
export function normalizeSiteUrl(value: string | null | undefined): string | null {
  if (!value) return null
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  try {
    return new URL(withProtocol).origin
  } catch {
    return null
  }
}

export const siteConfig = {
  name: 'Ligana',
  slogan: 'Conexões que geram renda.',
  city: 'Campo Grande — MS',
  url:
    normalizeSiteUrl(env(process.env.NEXT_PUBLIC_SITE_URL)) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    'http://localhost:3000',
  description:
    'Conheça a Ligana, a plataforma em desenvolvimento que vai conectar empresas e profissionais por compatibilidade. Participe do pré-lançamento em Campo Grande/MS.',
  contact: {
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    whatsapp: env(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP),
    instagram: env(process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM),
  },
  /** Responsável pelo tratamento dos dados (LGPD). Preencha antes de publicar. */
  controller: {
    name: env(process.env.NEXT_PUBLIC_CONTROLLER_NAME),
    document: env(process.env.NEXT_PUBLIC_CONTROLLER_DOCUMENT),
    email: env(process.env.NEXT_PUBLIC_CONTROLLER_EMAIL),
    address: env(process.env.NEXT_PUBLIC_CONTROLLER_ADDRESS),
  },
  analytics: {
    gtmId: env(process.env.NEXT_PUBLIC_GTM_ID),
    plausibleDomain: env(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
  },
} as const

export function whatsappLink(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}
