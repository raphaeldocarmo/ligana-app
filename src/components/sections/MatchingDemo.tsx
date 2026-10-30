import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { matching } from '@/content/landing'

type Status = (typeof matching.profiles)[number]['status']

const statusStyles: Record<Status, { card: string; badge: string; avatar: string }> = {
  recommended: {
    card: 'border-green bg-surface shadow-card ring-4 ring-green/25',
    badge: 'bg-green text-ink',
    avatar: 'bg-green text-ink',
  },
  unavailable: {
    card: 'border-line bg-surface/70',
    badge: 'bg-cream text-ink-soft',
    avatar: 'bg-line text-ink-soft',
  },
  missing: {
    card: 'border-line bg-surface/70',
    badge: 'bg-cream text-ink-soft',
    avatar: 'bg-line text-ink-soft',
  },
}

/** Seta entre as etapas: para baixo no celular, para o lado no desktop. */
function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center self-center text-orange lg:px-1">
      <Icon name="arrowDown" className="size-8 lg:hidden" />
      <Icon name="arrowRight" className="hidden size-8 lg:block" />
    </div>
  )
}

/**
 * Demonstração conceitual do matching: um pedido, o que a Ligana vai analisar e três perfis
 * comparados por critério. É ilustrativa (dados fictícios, sem percentuais) e diz isso na tela.
 */
export function MatchingDemo() {
  return (
    <section
      id="matching"
      aria-labelledby="matching-title"
      className="relative overflow-hidden bg-ink py-14 text-white sm:py-20"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-extrabold tracking-wide text-orange uppercase">{matching.eyebrow}</p>
          <h2 id="matching-title" className="text-3xl leading-tight font-black text-balance sm:text-[2.6rem]">
            {matching.title}
          </h2>
          <p className="mt-4 text-lg text-pretty text-white/80">{matching.subtitle}</p>
        </div>

        <figure className="mt-10 sm:mt-12">
          <figcaption className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-sm font-bold text-white/85">
            <Icon name="spark" className="size-4 text-orange" />
            {matching.disclaimer}
          </figcaption>

          <div className="grid items-start gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr] lg:gap-2">
            {/* 1. O pedido da empresa */}
            <div className="animate-rise-in rounded-card bg-surface p-5 text-ink shadow-card">
              <p className="mb-4 flex items-center gap-2 text-sm font-extrabold tracking-wide text-orange-text uppercase">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-orange" />
                {matching.request.label}
              </p>
              <p className="-mt-2 mb-4 text-[0.85rem] font-semibold text-ink-soft">{matching.example}</p>
              <dl className="space-y-3">
                {matching.request.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-soft text-orange-text">
                      <Icon name={item.icon as IconName} className="size-5" />
                    </span>
                    <div className="leading-tight">
                      <dt className="text-[0.8rem] font-semibold text-ink-soft">{item.label}</dt>
                      <dd className="font-extrabold">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <FlowArrow />

            {/* 2. O que a Ligana vai fazer */}
            <div className="animate-rise-in rounded-card border-2 border-orange/60 bg-ink-deep p-5 [animation-delay:120ms]">
              <p className="mb-4 flex items-center gap-2 text-sm font-extrabold tracking-wide text-orange uppercase">
                <Icon name="spark" className="size-4" />
                {matching.engine.label}
              </p>
              <ol className="space-y-2.5">
                {matching.engine.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-orange text-sm font-black text-ink"
                    >
                      {index + 1}
                    </span>
                    <span className="font-semibold text-white/90">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <FlowArrow />

            {/* 3. Perfis comparados */}
            <div className="animate-rise-in [animation-delay:240ms]">
              <p className="mb-3 text-sm font-extrabold tracking-wide text-green uppercase lg:-mt-7">{matching.profilesLabel}</p>
              <ul className="space-y-3">
                {matching.profiles.map((profile) => {
                  const style = statusStyles[profile.status]
                  return (
                    <li key={profile.name} className={`rounded-2xl border-2 p-4 text-ink ${style.card}`}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`grid size-9 place-items-center rounded-full text-sm font-black ${style.avatar}`}
                          >
                            {profile.name.slice(-1)}
                          </span>
                          <span className="font-black">{profile.name}</span>
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${style.badge}`}>
                          {profile.statusLabel}
                        </span>
                      </div>
                      <ul className="mt-3 grid gap-1.5 text-[0.95rem]">
                        {profile.checks.map((check) => (
                          <li key={check.text} className="flex items-center gap-2">
                            <span
                              className={`grid size-5 shrink-0 place-items-center rounded-full ${check.ok ? 'bg-green-soft text-green-text' : 'bg-danger-soft text-danger'}`}
                            >
                              <Icon name={check.ok ? 'check' : 'x'} className="size-3.5" />
                              <span className="sr-only">{check.ok ? 'Atende:' : 'Não atende:'}</span>
                            </span>
                            <span className={check.ok ? '' : 'font-semibold'}>{check.text}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </figure>

        {/* Critérios por modalidade */}
        <div className="mt-14 sm:mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-black text-balance sm:text-3xl">{matching.criteriaTitle}</h3>
            <p className="mt-3 text-white/80">{matching.criteriaIntro}</p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {matching.criteria.map((group, index) => (
              <li key={group.title} className="rounded-card border border-white/15 bg-white/5 p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className={`mb-4 block h-1.5 w-12 rounded-full ${['bg-orange', 'bg-green', 'bg-white'][index]}`}
                />
                <h4 className="text-xl font-black">{group.title}</h4>
                <p className="mt-1 text-[0.95rem] text-white/70">{group.examples}</p>
                <p className="mt-4 text-sm font-extrabold tracking-wide text-white/60 uppercase">Vai considerar</p>
                <ul className="mt-2 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 font-semibold">
                      <Icon name="check" className="size-4 shrink-0 text-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
