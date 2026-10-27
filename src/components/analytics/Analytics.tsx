'use client'

import Script from 'next/script'
import { useEffect } from 'react'

import { siteConfig } from '@/config/site'
import { track } from '@/lib/analytics'
import { captureTracking } from '@/lib/utm'

/**
 * Guarda a origem da visita (UTM) e registra a visualização da página.
 * Carrega GTM e/ou Plausible só se configurados (`NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`).
 */
export function Analytics() {
  const { gtmId, plausibleDomain } = siteConfig.analytics

  useEffect(() => {
    captureTracking()
    track({ name: 'page_view' })
  }, [])

  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});`}
        </Script>
      )}
      {gtmId && (
        <Script src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`} strategy="afterInteractive" />
      )}
      {plausibleDomain && (
        <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}
    </>
  )
}
