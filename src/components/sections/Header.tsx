import { CtaLink } from '@/components/analytics/CtaLink'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { buttonClass } from '@/components/ui/button-styles'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4">
        <a href="#inicio" aria-label="Ligana — voltar ao início" className="rounded-xl">
          <Logo />
        </a>
        <nav aria-label="Cadastro" className="flex items-center gap-2">
          <div className="sm:hidden">
            <a href="#cadastro" className={buttonClass('dark', 'sm')}>
              Participar
            </a>
          </div>
          <div className="hidden gap-2 sm:flex">
            <CtaLink audience="employer" location="header" compact>
              Quero contratar
            </CtaLink>
            <CtaLink audience="worker" location="header" compact>
              Quero trabalhar
            </CtaLink>
          </div>
        </nav>
      </Container>
    </header>
  )
}
