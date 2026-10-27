import Link from 'next/link'

import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { siteConfig, whatsappLink } from '@/config/site'
import { footer } from '@/content/landing'

export function Footer() {
  const { email, whatsapp, instagram } = siteConfig.contact
  return (
    <footer className="bg-ink-deep py-12 text-white">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo tone="light" showSlogan />
            <p className="mt-4 font-semibold text-white/80">{siteConfig.city}</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-col gap-3 font-semibold">
            <Link href="/privacidade" className="underline-offset-4 hover:underline">
              Política de Privacidade
            </Link>
            {email && (
              <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">
                {email}
              </a>
            )}
            {whatsapp && (
              <a href={whatsappLink(whatsapp)} className="underline-offset-4 hover:underline" rel="noopener">
                WhatsApp: {whatsapp}
              </a>
            )}
            {instagram && (
              <a
                href={`https://instagram.com/${instagram.replace(/^@/, '')}`}
                className="underline-offset-4 hover:underline"
                rel="noopener"
              >
                Instagram: @{instagram.replace(/^@/, '')}
              </a>
            )}
          </nav>
        </div>
        <p className="mt-10 border-t border-white/15 pt-6 text-[0.95rem] text-white/75">{footer.prelaunch}</p>
        <p className="mt-2 text-sm text-white/60">© {new Date().getFullYear()} Ligana. Todos os direitos reservados.</p>
      </Container>
    </footer>
  )
}
