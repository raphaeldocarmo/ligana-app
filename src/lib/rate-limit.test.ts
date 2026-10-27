import { describe, expect, it } from 'vitest'

import { createRateLimiter } from '@/lib/rate-limit'

describe('createRateLimiter', () => {
  it('libera até o limite e de novo após a janela', () => {
    const isAllowed = createRateLimiter({ limit: 2, windowMs: 1000 })
    expect(isAllowed('ip', 0)).toBe(true)
    expect(isAllowed('ip', 100)).toBe(true)
    expect(isAllowed('ip', 200)).toBe(false)
    expect(isAllowed('outro-ip', 200)).toBe(true)
    expect(isAllowed('ip', 1100)).toBe(true)
  })
})
