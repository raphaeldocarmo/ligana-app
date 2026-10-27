import { z } from 'zod'

import {
  CATEGORIES,
  ENGAGEMENT_TYPES,
  EXPERIENCE,
  FREQUENCIES,
  PAY_RANGES,
  PERIODS,
  PILOT_INTEREST,
  REGIONS,
  URGENCIES,
  WEEKDAYS,
  values,
} from '@/content/options'
import { normalizeBrazilianPhone } from '@/lib/phone'

/**
 * Validação única dos formulários, usada no navegador (feedback imediato) e no
 * servidor (fonte da verdade). Nada de CPF, documentos ou dados bancários aqui.
 */

const choose = 'Escolha uma opção.'
const chooseAtLeastOne = 'Escolha pelo menos uma opção.'

const name = z
  .string({ error: 'Conte pra gente seu nome.' })
  .trim()
  .min(2, { error: 'Conte pra gente seu nome.' })
  .max(80, { error: 'Use no máximo 80 letras.' })

const whatsapp = z
  .string({ error: 'Informe seu WhatsApp com DDD.' })
  .trim()
  .transform((value, ctx) => {
    const normalized = normalizeBrazilianPhone(value)
    if (!normalized) {
      ctx.addIssue({ code: 'custom', message: 'Confira o número. Ex.: (67) 99999-8888.' })
      return z.NEVER
    }
    return normalized
  })

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { error: `Use no máximo ${max} caracteres.` })
    .optional()
    .transform((value) => (value ? value : null))

const oneOf = <T extends readonly { value: string }[]>(options: T) =>
  z.enum(values(options), { error: choose })

const someOf = <T extends readonly { value: string }[]>(options: T) =>
  z
    .array(z.enum(values(options)), { error: chooseAtLeastOne })
    .min(1, { error: chooseAtLeastOne })
    .transform((list) => [...new Set(list)])

const optionalOneOf = <T extends readonly { value: string }[]>(options: T) =>
  z
    .union([z.enum(values(options)), z.literal('')])
    .optional()
    .transform((value) => (value ? value : null))

const tracking = z
  .object({
    utmSource: z.string().max(120).nullish(),
    utmMedium: z.string().max(120).nullish(),
    utmCampaign: z.string().max(120).nullish(),
    utmTerm: z.string().max(120).nullish(),
    utmContent: z.string().max(120).nullish(),
    referrer: z.string().max(300).nullish(),
    landingPath: z.string().max(300).nullish(),
  })
  .partial()
  .optional()
  .default({})

const common = {
  name,
  whatsapp,
  region: oneOf(REGIONS),
  neighborhood: optionalText(80),
  categories: someOf(CATEGORIES),
  rolesDetail: optionalText(200),
  engagementTypes: someOf(ENGAGEMENT_TYPES),
  payRange: optionalOneOf(PAY_RANGES),
  pilotInterest: oneOf(PILOT_INTEREST),
  consentProcessing: z.literal(true, {
    error: 'Pra registrar seu interesse, precisamos que você concorde com o uso dos dados.',
  }),
  consentContact: z.boolean().default(false),
  tracking,
}

export const employerLeadSchema = z.object({
  audience: z.literal('employer'),
  ...common,
  companyName: optionalText(120),
  frequency: oneOf(FREQUENCIES),
  urgency: oneOf(URGENCIES),
})

export const workerLeadSchema = z.object({
  audience: z.literal('worker'),
  ...common,
  experience: optionalOneOf(EXPERIENCE),
  availableDays: someOf(WEEKDAYS),
  availablePeriods: someOf(PERIODS),
})

export const leadSchema = z.discriminatedUnion('audience', [employerLeadSchema, workerLeadSchema])

export type EmployerLead = z.output<typeof employerLeadSchema>
export type WorkerLead = z.output<typeof workerLeadSchema>
export type Lead = z.output<typeof leadSchema>
export type Audience = Lead['audience']
export type LeadInput = z.input<typeof leadSchema>

/** Campos anti-spam que acompanham o envio, mas nunca são gravados. */
export const antiSpamSchema = z.object({
  website: z.string().optional(),
  elapsedMs: z.number().optional(),
})

/** Primeiro erro de cada campo, no formato que os formulários exibem. */
export type FieldErrors = Partial<Record<string, string>>

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !errors[field]) errors[field] = issue.message
  }
  return errors
}
