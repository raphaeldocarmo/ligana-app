import { describe, expect, it } from 'vitest'

import { parseTracking } from '@/lib/utm'

describe('parseTracking', () => {
  it('lê os parâmetros UTM e guarda só o domínio de origem', () => {
    expect(
      parseTracking(
        '?utm_source=instagram&utm_medium=social&utm_campaign=pre-lancamento&fbclid=abc',
        'https://l.instagram.com/caminho?com=dados',
        '/',
      ),
    ).toEqual({
      utmSource: 'instagram',
      utmMedium: 'social',
      utmCampaign: 'pre-lancamento',
      referrer: 'https://l.instagram.com',
      landingPath: '/',
    })
  })

  it('funciona sem campanha nem origem', () => {
    expect(parseTracking('', '', '/')).toEqual({ landingPath: '/' })
  })
})
