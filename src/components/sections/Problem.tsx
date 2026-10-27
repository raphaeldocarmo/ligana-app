import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { problem } from '@/content/landing'

export function Problem() {
  return (
    <section aria-labelledby="problema-title" className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading id="problema-title" title={problem.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {problem.perspectives.map((item) => {
            const hire = item.audience === 'employer'
            return (
              <figure
                key={item.audience}
                className={`rounded-card p-6 sm:p-8 ${hire ? 'bg-orange-soft' : 'bg-green-soft'}`}
              >
                <figcaption className={`font-extrabold ${hire ? 'text-orange-text' : 'text-green-text'}`}>
                  {item.who}
                </figcaption>
                <blockquote className="mt-3 text-2xl leading-snug font-black text-balance sm:text-[1.75rem]">
                  “{item.quote}”
                </blockquote>
                <p className="mt-3 text-ink-soft">{item.detail}</p>
              </figure>
            )
          })}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-xl font-extrabold text-balance sm:text-2xl">
          {problem.conclusion}
        </p>
      </Container>
    </section>
  )
}
