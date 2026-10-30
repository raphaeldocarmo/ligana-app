import { CtaLink } from '@/components/analytics/CtaLink'
import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { nav } from '@/content/landing'
import { FORM_ANCHORS } from '@/lib/audience'

const linkClass =
  'rounded-full px-1.5 py-2.5 text-[0.92rem] font-extrabold text-ink underline-offset-4 hover:underline min-[400px]:px-2.5 sm:px-3 sm:text-base'

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-2 sm:h-18">
        <a href="#inicio" aria-label="Ligana — voltar ao início" className="shrink-0 rounded-xl">
          <Logo />
        </a>
        <nav aria-label="Principal" className="flex items-center gap-0.5 sm:gap-2">
          <CtaLink audience="employer" location="header" plain className={linkClass}>
            <span className="md:hidden">{nav.employerShort}</span>
            <span className="hidden md:inline">{nav.employer}</span>
          </CtaLink>
          <a href="#matching" className={`${linkClass} hidden lg:inline`}>
            {nav.matching}
          </a>
          <CtaLink audience="worker" location="header" plain className={linkClass}>
            <span className="md:hidden">{nav.workerShort}</span>
            <span className="hidden md:inline">{nav.worker}</span>
          </CtaLink>
          <span className="ml-2 hidden lg:inline-flex">
            <CtaLink audience="employer" location="header" anchor={FORM_ANCHORS.employer} size="sm">
              {nav.cta}
            </CtaLink>
          </span>
        </nav>
      </Container>
    </header>
  )
}
