import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

export const alt = 'Ligana — Quem precisa de trabalho encontra. Quem precisa de gente também. Começando por Campo Grande, MS.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Imagem de compartilhamento (WhatsApp, redes sociais), gerada no build. */
export default async function OpengraphImage() {
  const fontDir = join(process.cwd(), 'node_modules/@fontsource/nunito/files')
  const [bold, extraBold] = await Promise.all([
    readFile(join(fontDir, 'nunito-latin-700-normal.woff')),
    readFile(join(fontDir, 'nunito-latin-800-normal.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#fff9f3',
          color: '#0b3b2c',
          fontFamily: 'Nunito',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="150" height="105" viewBox="0 0 120 84">
            <circle cx="30" cy="15" r="11" fill="#f26b1d" />
            <circle cx="90" cy="15" r="11" fill="#2fa85a" />
            <path d="M60 53 C 48 34, 13 30, 13 53 C 13 76, 48 72, 60 53" fill="none" stroke="#f26b1d" strokeWidth="13" strokeLinecap="round" />
            <path d="M60 53 C 72 34, 107 30, 107 53 C 107 76, 72 72, 60 53" fill="none" stroke="#2fa85a" strokeWidth="13" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>Ligana</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, maxWidth: 1050 }}>
            Quem precisa de trabalho encontra. Quem precisa de gente também.
          </div>
          <div style={{ fontSize: 36, marginTop: 24, color: '#167a3e', fontWeight: 700 }}>
            Conexões que geram renda.
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              background: '#ff7a2f',
              borderRadius: 999,
              padding: '14px 32px',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            Começando por Campo Grande — MS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Nunito', data: bold, weight: 700, style: 'normal' },
        { name: 'Nunito', data: extraBold, weight: 800, style: 'normal' },
      ],
    },
  )
}
