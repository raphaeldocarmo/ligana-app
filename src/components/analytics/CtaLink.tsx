'use client'

import type { ReactNode } from 'react'

import { buttonClass } from '@/components/ui/button-styles'
import { AUDIENCE_ANCHORS, selectAudience } from '@/lib/audience'
import { track } from '@/lib/analytics'
import type { Audience } from '@/lib/leads/schema'

type CtaLinkProps = {
  audience: Audience
  location: 'header' | 'hero' | 'closing'
  children: ReactNode
  className?: string
  compact?: boolean
}

/** "Quero contratar" / "Quero trabalhar": leva à jornada de cadastro certa e registra o clique. */
export function CtaLink({ audience, location, children, className = '', compact = false }: CtaLinkProps) {
  const style = buttonClass(audience === 'employer' ? 'hire' : 'work', compact ? 'sm' : 'lg')
  return (
    <a
      href={`#${AUDIENCE_ANCHORS[audience]}`}
      className={`${style} ${className}`}
      onClick={() => {
        track({ name: 'cta_click', audience, location })
        selectAudience(audience)
      }}
    >
      {children}
    </a>
  )
}
