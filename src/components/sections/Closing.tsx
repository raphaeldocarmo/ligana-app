import { CtaLink } from '@/components/analytics/CtaLink'
import { LigaSymbol } from '@/components/brand/LigaSymbol'
import { Container } from '@/components/ui/Container'
import { closing, hero } from '@/content/landing'

export function Closing() {
  return (
    <section aria-labelledby="encerramento-title" className="pb-16 sm:pb-24">
      <Container>
        <div className="rounded-[2rem] bg-orange-soft px-6 py-12 text-center sm:px-12 sm:py-16">
          <LigaSymbol className="mx-auto h-14 w-auto" />
          <h2 id="encerramento-title" className="mx-auto mt-6 max-w-2xl text-3xl leading-tight font-black text-balance sm:text-5xl">
            {closing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-ink-soft">{closing.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink audience="employer" location="closing">
              {hero.ctaHire}
            </CtaLink>
            <CtaLink audience="worker" location="closing">
              {hero.ctaWork}
            </CtaLink>
          </div>
          <p className="mt-8 font-extrabold text-green-text">{closing.tagline}</p>
        </div>
      </Container>
    </section>
  )
}
