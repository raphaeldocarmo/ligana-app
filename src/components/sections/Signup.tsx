'use client'

import { useEffect, useState } from 'react'

import { EmployerForm } from '@/components/forms/EmployerForm'
import { WorkerForm } from '@/components/forms/WorkerForm'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { signup } from '@/content/landing'
import { AUDIENCE_ANCHORS, audienceFromHash, onSelectAudience } from '@/lib/audience'
import type { Audience } from '@/lib/leads/schema'

const AUDIENCES: Audience[] = ['employer', 'worker']

/**
 * Duas jornadas de cadastro separadas. Os dois formulários ficam montados (só um
 * visível), para ninguém perder o que já preencheu ao trocar de aba.
 */
export function Signup() {
  const [audience, setAudience] = useState<Audience>('employer')

  useEffect(() => {
    const fromHash = audienceFromHash(window.location.hash)
    // Sincroniza com o link de entrada (ex.: campanha apontando para #quero-trabalhar).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromHash) setAudience(fromHash)
    const onHashChange = () => {
      const next = audienceFromHash(window.location.hash)
      if (next) setAudience(next)
    }
    window.addEventListener('hashchange', onHashChange)
    const stop = onSelectAudience(setAudience)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      stop()
    }
  }, [])

  return (
    <section id="cadastro" aria-labelledby="cadastro-title" className="relative bg-surface py-16 sm:py-24">
      {/* Destinos dos botões "Quero contratar" e "Quero trabalhar". */}
      <span id={AUDIENCE_ANCHORS.employer} className="absolute top-0" />
      <span id={AUDIENCE_ANCHORS.worker} className="absolute top-0" />
      <Container>
        <SectionHeading id="cadastro-title" eyebrow={signup.eyebrow} title={signup.title}>
          <p>{signup.intro}</p>
        </SectionHeading>

        <div className="mx-auto mt-10 max-w-3xl">
          <div role="group" aria-label="Escolha seu caminho" className="grid grid-cols-2 gap-2 rounded-[1.75rem] bg-cream p-2">
            {AUDIENCES.map((item) => {
              const selected = audience === item
              const hire = item === 'employer'
              const copy = signup[item]
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  aria-controls={`painel-${item}`}
                  onClick={() => setAudience(item)}
                  className={`min-h-16 rounded-[1.4rem] px-3 py-2 text-center transition-colors ${
                    selected ? (hire ? 'bg-orange shadow-card' : 'bg-green shadow-card') : 'hover:bg-surface'
                  }`}
                >
                  <span className="block text-base leading-tight font-black sm:text-lg">{copy.tab}</span>
                  <span className={`mt-0.5 block text-xs font-semibold sm:text-sm ${selected ? 'text-ink' : 'text-ink-soft'}`}>
                    {copy.tabHint}
                  </span>
                </button>
              )
            })}
          </div>

          {AUDIENCES.map((item) => {
            const copy = signup[item]
            return (
              <div
                key={item}
                id={`painel-${item}`}
                hidden={audience !== item}
                className="mt-6 rounded-card border-2 border-line p-5 sm:p-8"
              >
                <h3 className="text-2xl leading-tight font-black text-balance">{copy.title}</h3>
                <p className="mt-2 mb-8 text-ink-soft">{copy.subtitle}</p>
                {item === 'employer' ? <EmployerForm /> : <WorkerForm />}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
