import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { difference } from '@/content/landing'

function Flow({ steps, tone }: { steps: readonly string[]; tone: 'muted' | 'brand' }) {
  const muted = tone === 'muted'
  return (
    <ol className="flex flex-col items-stretch">
      {steps.map((step, index) => (
        <li key={step} className="flex flex-col items-center">
          <span
            className={`w-full rounded-2xl px-4 py-3 text-center text-lg font-bold ${
              muted
                ? 'border-2 border-dashed border-ink/25 text-ink-soft'
                : index % 2 === 0
                  ? 'bg-orange text-ink'
                  : 'bg-green text-ink'
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <Icon name="arrowDown" className={`my-1 size-5 shrink-0 ${muted ? 'text-ink/35' : 'text-ink'}`} />
          )}
        </li>
      ))}
    </ol>
  )
}

export function Difference() {
  return (
    <section aria-labelledby="diferencial-title" className="bg-ink py-16 text-white sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-extrabold tracking-wide text-orange uppercase">{difference.eyebrow}</p>
          <h2 id="diferencial-title" className="text-3xl leading-tight font-black text-balance sm:text-5xl">
            {difference.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-white/80">{difference.intro}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-card bg-surface p-6 text-ink sm:p-8">
            <h3 className="mb-5 text-center text-lg font-black text-ink-soft">{difference.traditional.label}</h3>
            <Flow steps={difference.traditional.steps} tone="muted" />
          </div>
          <div className="rounded-card bg-surface p-6 text-ink ring-4 ring-orange sm:p-8">
            <h3 className="mb-5 text-center text-lg font-black">{difference.ligana.label}</h3>
            <Flow steps={difference.ligana.steps} tone="brand" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="font-bold text-white/90">{difference.criteriaTitle}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {difference.criteria.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold">
                <Icon name="check" className="size-4 text-green" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-extrabold text-balance text-white">{difference.support}</p>
        </div>
      </Container>
    </section>
  )
}
