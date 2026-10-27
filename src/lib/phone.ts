/**
 * WhatsApp no padrão brasileiro: DDD + número (10 ou 11 dígitos), com ou sem +55.
 * Gravamos sempre no formato E.164 (+5567999998888) para facilitar contato e deduplicação.
 */

const VALID_DDD = /^[1-9][1-9]$/

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** Retorna o número em E.164 (+55...) ou `null` se não for um telefone brasileiro válido. */
export function normalizeBrazilianPhone(value: string): string | null {
  let digits = digitsOnly(value)
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    digits = digits.slice(2)
  }
  if (digits.length !== 10 && digits.length !== 11) return null

  const ddd = digits.slice(0, 2)
  const number = digits.slice(2)
  if (!VALID_DDD.test(ddd)) return null
  // Celular: 9 dígitos começando com 9. Fixo: 8 dígitos começando com 2 a 5.
  if (number.length === 9 && !number.startsWith('9')) return null
  if (number.length === 8 && !/^[2-5]/.test(number)) return null

  return `+55${digits}`
}

/** Máscara progressiva para o campo: (67) 99999-8888. */
export function formatPhoneInput(value: string): string {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  const ddd = digits.slice(0, 2)
  const rest = digits.slice(2)
  if (rest.length <= 4) return `(${ddd}) ${rest}`
  const splitAt = rest.length === 9 ? 5 : 4
  return `(${ddd}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`
}
