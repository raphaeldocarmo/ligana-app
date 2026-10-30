import { CtaLink } from '@/components/analytics/CtaLink'
import { HeroIllustration } from '@/components/illustrations/HeroIllustration'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { siteConfig } from '@/config/site'
import { hero } from '@/content/landing'

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-10 pt-8 pb-14 sm:pt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="animate-rise-in">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-bold text-ink shadow-card">
            <Icon name="pin" className="size-4 text-orange-text" />
            {hero.badge}
          </p>
          <h1
            id="hero-title"
            className="text-[2.3rem] leading-[1.08] font-black tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            Quem precisa de trabalho encontra. <span className="text-orange-text">Quem precisa de gente também.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-ink-soft sm:text-xl">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:[&>a]:whitespace-nowrap">
            <CtaLink audience="employer" location="hero">
              {hero.ctaHire}
              <Icon name="arrowRight" className="hidden size-5 shrink-0 min-[400px]:block" />
            </CtaLink>
            <CtaLink audience="worker" location="hero" variant="work-outline">
              {hero.ctaWork}
            </CtaLink>
          </div>
          <p className="mt-4 text-[0.95rem] text-ink-soft">
            {hero.note} <span className="font-bold text-green-text">Ligana. {siteConfig.slogan}</span>
          </p>
        </div>
        <HeroIllustration className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none" />
      </Container>
    </section>
  )
}
