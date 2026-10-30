'use client'

import { useRef, useState } from 'react'

import { SelectField, TextField } from '@/components/forms/fields'
import { NEIGHBORHOODS, regionForNeighborhood } from '@/content/neighborhoods'
import { REGIONS } from '@/content/options'
import { formatCepInput, isCampoGrande, lookupCep, normalizeCep } from '@/lib/cep'

type LocationFieldsProps = {
  idFor: (field: 'cep' | 'region' | 'neighborhood') => string
  cep: string
  region: string
  neighborhood: string
  onCepChange: (value: string) => void
  onRegionChange: (value: string) => void
  onNeighborhoodChange: (value: string) => void
  errors: Partial<Record<string, string>>
  regionLabel: string
}

type LookupState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'found'; text: string }
  | { kind: 'warning'; text: string }

/**
 * CEP (opcional) que preenche bairro e região sozinho; bairro com sugestões para
 * quem não sabe o CEP; região sempre editável, para a pessoa conferir ou corrigir.
 */
export function LocationFields(props: LocationFieldsProps) {
  const { idFor, errors } = props
  const [lookup, setLookup] = useState<LookupState>({ kind: 'idle' })
  const latest = useRef<string | null>(null)
  // O que o CEP anterior preencheu sozinho: só isso pode ser trocado por uma nova busca.
  // O que a pessoa digitou ou escolheu nunca é apagado.
  const auto = useRef<{ neighborhood: string | null; region: string | null }>({ neighborhood: null, region: null })
  const listId = `${idFor('neighborhood')}-sugestoes`

  const applyNeighborhood = (name: string) => {
    props.onNeighborhoodChange(name)
    const region = regionForNeighborhood(name)
    if (region) props.onRegionChange(region)
  }

  /** Aplica o resultado de uma busca de CEP, sem sobrescrever o que a pessoa preencheu. */
  const autoFill = (neighborhood: string, region: string) => {
    if (!props.neighborhood || props.neighborhood === auto.current.neighborhood) {
      props.onNeighborhoodChange(neighborhood)
      auto.current.neighborhood = neighborhood || null
    }
    if (!props.region || props.region === auto.current.region) {
      props.onRegionChange(region)
      auto.current.region = region || null
    }
  }

  const onCepChange = async (raw: string) => {
    const formatted = formatCepInput(raw)
    props.onCepChange(formatted)
    const cep = normalizeCep(formatted)
    if (!cep) {
      latest.current = null
      setLookup({ kind: 'idle' })
      return
    }
    if (latest.current === cep) return
    latest.current = cep
    setLookup({ kind: 'loading' })

    const result = await lookupCep(cep)
    if (latest.current !== cep) return // a pessoa já digitou outro CEP

    if (result.status !== 'found') autoFill('', '')
    if (result.status === 'not_found') {
      setLookup({ kind: 'warning', text: 'Não achamos esse CEP. Confira os números ou preencha o bairro abaixo.' })
      return
    }
    if (result.status === 'error') {
      setLookup({ kind: 'warning', text: 'Não deu pra buscar o CEP agora. Preencha o bairro e a região abaixo.' })
      return
    }
    if (!isCampoGrande(result.city, result.uf)) {
      autoFill(result.neighborhood, 'outside')
      setLookup({
        kind: 'found',
        text: `Esse CEP é de ${result.city}/${result.uf}. Por enquanto, a Ligana começa por Campo Grande, mas seu interesse conta!`,
      })
      return
    }
    const region = result.neighborhood ? regionForNeighborhood(result.neighborhood) : null
    autoFill(result.neighborhood, region ?? '')
    setLookup({
      kind: 'found',
      text: result.neighborhood
        ? `Achamos: ${result.neighborhood}, Campo Grande/MS.${region ? '' : ' Agora escolha a região abaixo.'}`
        : 'Achamos o CEP em Campo Grande/MS. Preencha o bairro e a região abaixo.',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <TextField
          id={idFor('cep')}
          label="CEP"
          hint="Preenchemos o bairro pra você. Não sabe o CEP? Pode pular."
          optional
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="79000-000"
          value={props.cep}
          onValueChange={onCepChange}
          error={errors.cep}
        />
        <p aria-live="polite" className="mt-1.5 min-h-0 text-[0.95rem]">
          {lookup.kind === 'loading' && <span className="text-ink-soft">Buscando o CEP…</span>}
          {lookup.kind === 'found' && <span className="font-semibold text-green-text">✓ {lookup.text}</span>}
          {lookup.kind === 'warning' && <span className="font-semibold text-orange-text">{lookup.text}</span>}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={idFor('neighborhood')}
          label="Bairro"
          hint={NEIGHBORHOODS.length > 0 ? 'Comece a digitar e escolha na lista.' : undefined}
          optional
          autoComplete="off"
          list={NEIGHBORHOODS.length > 0 ? listId : undefined}
          value={props.neighborhood}
          onValueChange={applyNeighborhood}
          error={errors.neighborhood}
        />
        <SelectField
          id={idFor('region')}
          name="region"
          label={props.regionLabel}
          placeholder="Escolha a região"
          options={REGIONS}
          value={props.region}
          onValueChange={props.onRegionChange}
          error={errors.region}
        />
      </div>
      {NEIGHBORHOODS.length > 0 && (
        <datalist id={listId}>
          {NEIGHBORHOODS.map((item) => (
            <option key={item.name} value={item.name} />
          ))}
        </datalist>
      )}
    </div>
  )
}
