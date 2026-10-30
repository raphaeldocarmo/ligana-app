import { CtaLink } from '@/components/analytics/CtaLink'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { faq, howItWorks, type FaqItem } from '@/content/landing'
import { FORM_ANCHORS } from '@/lib/audience'
import type { Audience } from '@/lib/leads/schema'

function FaqGroup({ audience, title, items }: { audience: Audience; title: string; items: FaqItem[] }) {
  const hire = audience === 'employer'
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-3 text-xl font-black">
        <span aria-hidden="true" className={`h-3 w-8 rounded-full ${hire ? 'bg-orange' : 'bg-green'}`} />
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border-2 border-line bg-surface open:border-ink/30">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-xl leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
      <CtaLink
        audience={audience}
        location="faq"
        anchor={FORM_ANCHORS[audience]}
        variant={hire ? 'hire' : 'work-outline'}
        className="mt-6 w-full sm:w-auto"
      >
        {howItWorks[audience].cta}
      </CtaLink>
    </div>
  )
}

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="bg-surface py-14 sm:py-20">
      <Container>
        <SectionHeading id="perguntas-title" title={faq.title} />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <FaqGroup audience="employer" title="Para empresas" items={faq.employer} />
          <FaqGroup audience="worker" title="Para profissionais" items={faq.worker} />
        </div>
      </Container>
    </section>
  )
}
