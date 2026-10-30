import type { ReactNode } from 'react'

import { CtaLink } from '@/components/analytics/CtaLink'
import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { AUDIENCE_ANCHORS, FORM_ANCHORS } from '@/lib/audience'
import type { Audience } from '@/lib/leads/schema'

type Benefit = { icon: string; title: string; text: string }

type AudienceSectionProps = {
  audience: Audience
  content: {
    eyebrow: string
    title: string
    subtitle: string
    benefits: readonly Benefit[]
    cta: string
    formTitle: string
    formSubtitle: string
  }
  form: ReactNode
}

const tones = {
  employer: {
    section: 'bg-surface',
    eyebrow: 'text-orange-text',
    icon: 'bg-orange-soft text-orange-text',
    card: 'border-orange/40 bg-surface',
    bar: 'bg-orange',
  },
  worker: {
    section: 'bg-green-soft',
    eyebrow: 'text-green-text',
    icon: 'bg-surface text-green-text',
    card: 'border-green/40 bg-surface',
    bar: 'bg-green',
  },
} as const

/**
 * Seção exclusiva de um público: proposta, benefícios e o formulário dele.
 * No celular, um CTA leva direto ao formulário; no desktop, o formulário fica ao lado.
 */
export function AudienceSection({ audience, content, form }: AudienceSectionProps) {
  const tone = tones[audience]
  const titleId = `${AUDIENCE_ANCHORS[audience]}-titulo`
  return (
    <section
      id={AUDIENCE_ANCHORS[audience]}
      aria-labelledby={titleId}
      className={`${tone.section} py-14 sm:py-20`}
    >
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className={`mb-3 text-sm font-extrabold tracking-wide uppercase ${tone.eyebrow}`}>{content.eyebrow}</p>
          <h2 id={titleId} className="text-3xl leading-tight font-black text-balance sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-ink-soft">{content.subtitle}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {content.benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-4">
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone.icon}`}>
                  <Icon name={benefit.icon as IconName} className="size-6" />
                </span>
                <span>
                  <span className="block text-lg leading-snug font-extrabold">{benefit.title}</span>
                  <span className="mt-0.5 block text-ink-soft">{benefit.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <CtaLink
            audience={audience}
            location="section"
            anchor={FORM_ANCHORS[audience]}
            className="mt-8 w-full sm:w-auto lg:hidden"
          >
            {content.cta}
            <Icon name="arrowDown" className="size-5 shrink-0" />
          </CtaLink>
        </div>

        <div id={FORM_ANCHORS[audience]} className={`rounded-card border-2 p-5 shadow-card sm:p-8 ${tone.card}`}>
          <div aria-hidden="true" className={`mb-5 h-1.5 w-14 rounded-full ${tone.bar}`} />
          <h3 className="text-2xl leading-tight font-black text-balance">{content.formTitle}</h3>
          <p className="mt-2 mb-8 text-ink-soft">{content.formSubtitle}</p>
          {form}
        </div>
      </Container>
    </section>
  )
}
