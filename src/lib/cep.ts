/**
 * CEP: máscara, validação e consulta no ViaCEP (serviço público e gratuito, sem chave).
 * A consulta roda no navegador da pessoa, só para preencher bairro e região.
 */

import { digitsOnly } from '@/lib/phone'

export function formatCepInput(value: string): string {
  const digits = digitsOnly(value).slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

/** CEP com 8 dígitos, ou `null` se não tiver 8 dígitos. */
export function normalizeCep(value: string): string | null {
  const digits = digitsOnly(value)
  return digits.length === 8 ? digits : null
}

export type CepLookup =
  | { status: 'found'; neighborhood: string; city: string; uf: string }
  | { status: 'not_found' }
  | { status: 'error' }

type ViaCepResponse = { erro?: boolean | string; bairro?: string; localidade?: string; uf?: string }

export async function lookupCep(
  cep: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 6000,
): Promise<CepLookup> {
  const digits = normalizeCep(cep)
  if (!digits) return { status: 'not_found' }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetchImpl(`https://viacep.com.br/ws/${digits}/json/`, { signal: controller.signal })
    if (response.status === 400) return { status: 'not_found' }
    if (!response.ok) return { status: 'error' }
    const data = (await response.json()) as ViaCepResponse
    if (data.erro) return { status: 'not_found' }
    return {
      status: 'found',
      neighborhood: (data.bairro ?? '').trim(),
      city: (data.localidade ?? '').trim(),
      uf: (data.uf ?? '').trim(),
    }
  } catch {
    return { status: 'error' }
  } finally {
    clearTimeout(timer)
  }
}

export function isCampoGrande(city: string, uf: string): boolean {
  return uf.toUpperCase() === 'MS' && simplify(city) === 'campo grande'
}

/** Minúsculas, sem acentos e sem espaços duplos, para comparar nomes. */
export function simplify(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
}
