import { describe, expect, it } from 'vitest'

import { formatPhoneInput, normalizeBrazilianPhone } from '@/lib/phone'

describe('normalizeBrazilianPhone', () => {
  it.each([
    ['(67) 99999-8888', '+5567999998888'],
    ['67999998888', '+5567999998888'],
    ['+55 67 99999-8888', '+5567999998888'],
    ['(67) 3333-4444', '+556733334444'],
  ])('aceita %s', (input, expected) => {
    expect(normalizeBrazilianPhone(input)).toBe(expected)
  })

  it.each(['', '99999-8888', '(67) 89999-8888', '(01) 99999-8888', '(67) 1333-4444', '123456789012345'])(
    'recusa %s',
    (input) => {
      expect(normalizeBrazilianPhone(input)).toBeNull()
    },
  )
})

describe('formatPhoneInput', () => {
  it('formata enquanto a pessoa digita', () => {
    expect(formatPhoneInput('6')).toBe('(6')
    expect(formatPhoneInput('6799')).toBe('(67) 99')
    expect(formatPhoneInput('6733334444')).toBe('(67) 3333-4444')
    expect(formatPhoneInput('67999998888')).toBe('(67) 99999-8888')
    expect(formatPhoneInput('679999988889999')).toBe('(67) 99999-8888')
  })
})
