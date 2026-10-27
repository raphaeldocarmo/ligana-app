'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { ConsentCheckbox } from '@/components/forms/fields'
import type { Status, SubmitError } from '@/components/forms/useLeadForm'
import { buttonClass, type ButtonVariant } from '@/components/ui/button-styles'
import { siteConfig } from '@/config/site'
import type { Audience } from '@/lib/leads/schema'

const ERROR_MESSAGES: Record<SubmitError, string> = {
  invalid: 'Confira os campos marcados em vermelho e tente de novo.',
  rejected: 'Não conseguimos confirmar o envio. Espere alguns segundos e tente de novo.',
  too_many_requests: 'Recebemos muitos envios em pouco tempo. Espere alguns minutos e tente de novo.',
  not_configured:
    'O cadastro ainda não está aberto. Seus dados não foram enviados. Tente de novo mais tarde.',
  unavailable: 'Não conseguimos registrar agora. Seus dados não foram enviados. Tente de novo em instantes.',
  network: 'Parece que a internet falhou. Seus dados não foram enviados. Confira a conexão e tente de novo.',
}

type ConsentProps = {
  audience: Audience
  processing: boolean
  contact: boolean
  onProcessingChange: (value: boolean) => void
  onContactChange: (value: boolean) => void
  error?: string
}

/** Dois consentimentos separados e desmarcados: uso dos dados (obrigatório) e contato (opcional). */
export function Consents({ audience, processing, contact, onProcessingChange, onContactChange, error }: ConsentProps) {
  return (
    <div className="space-y-4 rounded-2xl bg-cream p-4">
      <ConsentCheckbox
        id={`${audience}-consentProcessing`}
        checked={processing}
        onCheckedChange={onProcessingChange}
        error={error}
      >
        Tenho 18 anos ou mais e concordo que a Ligana use estas respostas para entender a procura em Campo Grande e
        organizar o piloto, como explica a{' '}
        <Link href="/privacidade" target="_blank" className="font-bold underline underline-offset-2">
          Política de Privacidade
        </Link>
        .
      </ConsentCheckbox>
      <ConsentCheckbox id={`${audience}-consentContact`} checked={contact} onCheckedChange={onContactChange}>
        Quero que a Ligana me chame no WhatsApp para contar novidades e me convidar para o piloto.{' '}
        <span className="text-ink-soft">(opcional — dá pra cancelar quando quiser)</span>
      </ConsentCheckbox>
    </div>
  )
}

/** Campo-armadilha para robôs: invisível para pessoas e leitores de tela. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Deixe este campo vazio
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  )
}

type SubmitProps = { status: Status; submitError: SubmitError | null; variant: ButtonVariant; label: string }

export function SubmitArea({ status, submitError, variant, label }: SubmitProps) {
  const submitting = status === 'submitting'
  const contact = siteConfig.contact.email ?? siteConfig.contact.whatsapp
  return (
    <div className="space-y-4">
      <div role="alert" aria-live="assertive">
        {status === 'error' && submitError && (
          <div className="animate-rise-in rounded-2xl border-2 border-danger bg-danger-soft p-4 font-semibold text-danger">
            {ERROR_MESSAGES[submitError]}
            {(submitError === 'not_configured' || submitError === 'unavailable') && contact && (
              <span className="mt-1 block font-normal text-ink">Se preferir, fale com a gente: {contact}</span>
            )}
          </div>
        )}
      </div>
      <button type="submit" disabled={submitting} className={`${buttonClass(variant)} w-full`}>
        {submitting ? (
          <>
            <span
              aria-hidden="true"
              className="size-5 animate-spin rounded-full border-3 border-current border-t-transparent"
            />
            Enviando…
          </>
        ) : (
          label
        )}
      </button>
      <p className="text-center text-sm text-ink-soft">
        Sem senha, sem cadastro de conta. Não pedimos CPF nem documentos.
      </p>
    </div>
  )
}

export function SuccessMessage({ contactAllowed }: { contactAllowed: boolean }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <div role="status" className="animate-rise-in py-6 text-center">
      <div className="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-green-soft">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-10 fill-none stroke-green-text stroke-3">
          <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-black focus:outline-none">
        Pronto! Seu interesse foi registrado.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft">
        A Ligana ainda está chegando.{' '}
        {contactAllowed
          ? 'Quando tivermos novidades sobre o piloto, poderemos entrar em contato pelo WhatsApp informado, como você autorizou.'
          : 'Como você preferiu não receber mensagens, não vamos te chamar no WhatsApp. Fique de olho por aqui!'}
      </p>
      <p className="mt-4 font-bold text-green-text">Obrigado por fazer parte do começo da Ligana.</p>
    </div>
  )
}
