import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Analytics } from '@/components/analytics/Analytics'
import { siteConfig } from '@/config/site'

import './globals.css'

const title = 'Ligana | A pessoa certa, na hora que você precisa'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['Ligana', 'trabalho', 'freela', 'Campo Grande', 'MS', 'oportunidades', 'contratar', 'renda'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#fff9f3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
