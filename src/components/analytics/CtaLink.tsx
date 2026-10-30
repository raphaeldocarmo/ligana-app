'use client'

import type { ReactNode } from 'react'

import { buttonClass, type ButtonVariant } from '@/components/ui/button-styles'
import { track, type CtaLocation } from '@/lib/analytics'
import { AUDIENCE_ANCHORS } from '@/lib/audience'
import type { Audience } from '@/lib/leads/schema'

type CtaLinkProps = {
  audience: Audience
  location: CtaLocation
  children: ReactNode
  /** Âncora de destino. Padrão: a seção do público. */
  anchor?: string
  variant?: ButtonVariant
  size?: 'lg' | 'sm'
  /** Sem estilo de botão (links do menu): usa só `className`. */
  plain?: boolean
  className?: string
}

/** Botão-âncora de uma jornada: rola até a seção/formulário certo e registra o clique. */
export function CtaLink({
  audience,
  location,
  children,
  anchor,
  variant,
  size = 'lg',
  plain = false,
  className = '',
}: CtaLinkProps) {
  const style = plain ? '' : buttonClass(variant ?? (audience === 'employer' ? 'hire' : 'work'), size)
  return (
    <a
      href={`#${anchor ?? AUDIENCE_ANCHORS[audience]}`}
      className={`${style} ${className}`}
      onClick={() => track({ name: audience === 'employer' ? 'click_hire_cta' : 'click_work_cta', location })}
    >
      {children}
    </a>
  )
}
