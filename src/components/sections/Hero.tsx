import { CtaLink } from '@/components/analytics/CtaLink'
import { HeroIllustration } from '@/components/illustrations/HeroIllustration'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { siteConfig } from '@/config/site'
import { hero } from '@/content/landing'

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-10 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="animate-rise-in">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-bold text-ink shadow-card">
            <Icon name="pin" className="size-4 text-orange-text" />
            {hero.badge}
          </p>
          <p className="mb-3 text-lg font-extrabold text-green-text">Ligana. {siteConfig.slogan}</p>
          <h1 id="hero-title" className="text-[2.6rem] leading-[1.05] font-black tracking-tight text-balance sm:text-6xl">
            O trabalho certo encontra a <span className="text-orange-text">pessoa certa</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-ink-soft sm:text-xl">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink audience="employer" location="hero">
              {hero.ctaHire}
              <Icon name="arrowRight" className="size-5" />
            </CtaLink>
            <CtaLink audience="worker" location="hero">
              {hero.ctaWork}
              <Icon name="arrowRight" className="size-5" />
            </CtaLink>
          </div>
          <p className="mt-4 text-[0.95rem] text-ink-soft">{hero.note}</p>
        </div>
        <HeroIllustration className="mx-auto w-full max-w-md lg:max-w-none" />
      </Container>
    </section>
  )
}
