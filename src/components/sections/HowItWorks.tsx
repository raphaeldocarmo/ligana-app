import { CtaLink } from '@/components/analytics/CtaLink'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { howItWorks } from '@/content/landing'
import { FORM_ANCHORS } from '@/lib/audience'
import type { Audience } from '@/lib/leads/schema'

const AUDIENCES: Audience[] = ['employer', 'worker']

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="py-14 sm:py-20">
      <Container>
        <SectionHeading id="como-funciona-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title}>
          <p>{howItWorks.intro}</p>
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {AUDIENCES.map((audience) => {
            const flow = howItWorks[audience]
            const hire = audience === 'employer'
            return (
              <div key={audience} className="flex flex-col rounded-card bg-surface p-6 shadow-card sm:p-8">
                <h3 className="flex items-center gap-3 text-xl font-black">
                  <span aria-hidden="true" className={`h-3 w-8 rounded-full ${hire ? 'bg-orange' : 'bg-green'}`} />
                  {flow.title}
                </h3>
                <ol className="mt-6 flex-1 space-y-5">
                  {flow.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className={`grid size-10 shrink-0 place-items-center rounded-full text-lg font-black ${hire ? 'bg-orange-soft text-orange-text' : 'bg-green-soft text-green-text'}`}
                      >
                        {index + 1}
                      </span>
                      <span className="pt-1.5 text-lg font-semibold">{step}</span>
                    </li>
                  ))}
                </ol>
                <CtaLink
                  audience={audience}
                  location="how_it_works"
                  anchor={FORM_ANCHORS[audience]}
                  variant={hire ? 'hire' : 'work-outline'}
                  className="mt-8 w-full"
                >
                  {flow.cta}
                </CtaLink>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
