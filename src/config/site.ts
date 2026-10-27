/**
 * Configuração pública do site, vinda de variáveis de ambiente `NEXT_PUBLIC_*`
 * (ver `.env.example`). Nada secreto aqui: tudo isto chega ao navegador.
 */

const env = (value: string | undefined) => (value && value.trim() ? value.trim() : null)

export const siteConfig = {
  name: 'Ligana',
  slogan: 'Conexões que geram renda.',
  city: 'Campo Grande — MS',
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? 'http://localhost:3000',
  description:
    'A Ligana está chegando a Campo Grande para conectar quem precisa contratar com quem quer trabalhar. Cadastre seu interesse e participe do piloto.',
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
