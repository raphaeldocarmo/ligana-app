import { simplify } from '@/lib/cep'
import type { REGIONS } from '@/content/options'

type CityRegion = Exclude<(typeof REGIONS)[number]['value'], 'outside' | 'unknown'>

/**
 * Bairros oficiais de Campo Grande e suas regiões urbanas (fonte: Planurb / Prefeitura).
 *
 * Usado para (1) sugerir bairros enquanto a pessoa digita e (2) escolher a região
 * sozinho quando o CEP ou o bairro digitado bate com esta lista. Enquanto a lista
 * estiver vazia, o campo de bairro vira texto livre e a região é escolhida à mão.
 *
 * Formato: { name: 'Nome do bairro', region: 'prosa' }. Os valores de região são os de
 * REGIONS em options.ts. Nomes que o ViaCEP devolve diferente (loteamentos, "Jardim",
 * "Vila") podem entrar em `aliases`.
 */
export const NEIGHBORHOODS: readonly { name: string; region: CityRegion; aliases?: readonly string[] }[] = []

const index = new Map<string, CityRegion>()
for (const item of NEIGHBORHOODS) {
  for (const name of [item.name, ...(item.aliases ?? [])]) index.set(simplify(name), item.region)
}

export function regionForNeighborhood(name: string): CityRegion | null {
  return index.get(simplify(name)) ?? null
}
