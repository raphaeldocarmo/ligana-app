'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'

import { FORM_EVENTS, track } from '@/lib/analytics'
import type { LeadErrorCode, LeadResponse } from '@/lib/leads/handler'
import { employerLeadSchema, toFieldErrors, workerLeadSchema, type Audience, type FieldErrors } from '@/lib/leads/schema'
import { readTracking } from '@/lib/utm'

export type FormValue = string | string[] | boolean
export type Status = 'idle' | 'submitting' | 'success' | 'error'
export type SubmitError = LeadErrorCode | 'network'

const schemas = { employer: employerLeadSchema, worker: workerLeadSchema } as const

/**
 * Estado, validação e envio de um formulário de interesse.
 * Valida no navegador com o mesmo schema do servidor; o servidor valida de novo.
 */
export function useLeadForm<V extends Record<string, FormValue>>(audience: Audience, initialValues: V) {
  const [values, setValues] = useState<V>(initialValues)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState<SubmitError | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef<number | null>(null)
  const tracked = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  /** Registra o início do formulário uma única vez (primeiro foco ou primeira resposta). */
  const onStart = useCallback(() => {
    if (tracked.current) return
    tracked.current = true
    track({ name: FORM_EVENTS[audience].start })
  }, [audience])

  const setValue = useCallback(<K extends keyof V>(field: K, value: V[K]) => {
    onStart()
    setValues((current) => ({ ...current, [field]: value }))
    // Some o erro do campo assim que a pessoa mexe nele.
    setErrors((current) => (current[field as string] ? { ...current, [field]: undefined } : current))
  }, [onStart])

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const form = formRef.current
    if (!form) return
    const first = Object.keys(fieldErrors)[0]
    if (!first) return
    const target = form.querySelector<HTMLElement>(`#${audience}-${first}`)
    target?.focus()
    target?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }

  const fail = (reason: SubmitError) => {
    setStatus('error')
    setSubmitError(reason)
    track({ name: 'form_submission_error', form: FORM_EVENTS[audience].form, reason })
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const payload = {
      audience,
      ...values,
      tracking: readTracking(),
      website: honeypot,
      elapsedMs: startedAt.current === null ? 0 : Date.now() - startedAt.current,
    }

    const local = schemas[audience].safeParse(payload)
    if (!local.success) {
      const fieldErrors = toFieldErrors(local.error)
      setErrors(fieldErrors)
      setStatus('idle')
      setSubmitError(null)
      track({ name: 'form_submission_error', form: FORM_EVENTS[audience].form, reason: 'validation' })
      focusFirstError(fieldErrors)
      return
    }

    setStatus('submitting')
    setSubmitError(null)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => null)) as LeadResponse | null
      if (response.ok && result?.ok) {
        setStatus('success')
        track({ name: FORM_EVENTS[audience].success })
        return
      }
      if (result && !result.ok && result.fieldErrors) {
        setErrors(result.fieldErrors)
        focusFirstError(result.fieldErrors)
      }
      fail(result && !result.ok ? result.error : 'unavailable')
    } catch {
      fail('network')
    }
  }

  return {
    values,
    setValue,
    errors,
    status,
    submitError,
    honeypot,
    setHoneypot,
    formRef,
    onSubmit,
    onStart,
    fieldId: (field: keyof V & string) => `${audience}-${field}`,
  }
}
