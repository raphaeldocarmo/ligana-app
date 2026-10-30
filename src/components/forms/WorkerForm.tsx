'use client'

import { ChoiceGroup, SelectField, TextField } from '@/components/forms/fields'
import { Consents, Honeypot, SubmitArea, SuccessMessage } from '@/components/forms/FormParts'
import { LocationFields } from '@/components/forms/LocationFields'
import { useLeadForm } from '@/components/forms/useLeadForm'
import {
  CATEGORIES,
  ENGAGEMENT_TYPES,
  EXPERIENCE,
  PAY_RANGE_GROUPS,
  PERIODS,
  PILOT_INTEREST,
  WEEKDAYS,
} from '@/content/options'
import { formatPhoneInput } from '@/lib/phone'

const initialValues = {
  name: '',
  whatsapp: '',
  cep: '',
  region: '',
  neighborhood: '',
  categories: [] as string[],
  rolesDetail: '',
  experience: '',
  availableDays: [] as string[],
  availablePeriods: [] as string[],
  engagementTypes: [] as string[],
  payRange: '',
  pilotInterest: '',
  consentProcessing: false,
  consentContact: false,
}

export function WorkerForm() {
  const { values, setValue, errors, fieldId, status, submitError, honeypot, setHoneypot, formRef, onSubmit, onStart } =
    useLeadForm('worker', initialValues)

  if (status === 'success') return <SuccessMessage contactAllowed={values.consentContact} />

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} noValidate className="relative space-y-6">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <TextField
        id={fieldId('name')}
        label="Seu nome"
        autoComplete="name"
        value={values.name}
        onValueChange={(value) => setValue('name', value)}
        error={errors.name}
      />
      <TextField
        id={fieldId('whatsapp')}
        label="WhatsApp com DDD"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="(67) 99999-8888"
        value={values.whatsapp}
        onValueChange={(value) => setValue('whatsapp', formatPhoneInput(value))}
        error={errors.whatsapp}
      />
      <LocationFields
        idFor={fieldId}
        cep={values.cep}
        region={values.region}
        neighborhood={values.neighborhood}
        onCepChange={(value) => setValue('cep', value)}
        onRegionChange={(value) => setValue('region', value)}
        onNeighborhoodChange={(value) => setValue('neighborhood', value)}
        errors={errors}
        regionLabel="Em que região você mora?"
      />

      <ChoiceGroup
        id={fieldId('categories')}
        name="worker-categories"
        label="Que tipo de trabalho você sabe fazer?"
        multiple
        options={CATEGORIES}
        value={values.categories}
        onValueChange={(value) => setValue('categories', value)}
        error={errors.categories}
      />
      <TextField
        id={fieldId('rolesDetail')}
        label="Quer contar mais?"
        hint="Ex.: garçom, chapeiro, faxina, entregas de moto."
        optional
        maxLength={200}
        value={values.rolesDetail}
        onValueChange={(value) => setValue('rolesDetail', value)}
        error={errors.rolesDetail}
      />
      <SelectField
        id={fieldId('experience')}
        name="experience"
        label="Quanto tempo de experiência você tem?"
        optional
        placeholder="Prefiro não informar"
        options={EXPERIENCE}
        value={values.experience}
        onValueChange={(value) => setValue('experience', value)}
        error={errors.experience}
      />
      <ChoiceGroup
        id={fieldId('availableDays')}
        name="worker-availableDays"
        label="Em que dias você pode trabalhar?"
        multiple
        layout="chips"
        options={WEEKDAYS}
        value={values.availableDays}
        onValueChange={(value) => setValue('availableDays', value)}
        error={errors.availableDays}
      />
      <ChoiceGroup
        id={fieldId('availablePeriods')}
        name="worker-availablePeriods"
        label="Em que horários?"
        multiple
        layout="chips"
        options={PERIODS}
        value={values.availablePeriods}
        onValueChange={(value) => setValue('availablePeriods', value)}
        error={errors.availablePeriods}
      />
      <ChoiceGroup
        id={fieldId('engagementTypes')}
        name="worker-engagementTypes"
        label="Que tipo de trabalho te interessa?"
        multiple
        options={ENGAGEMENT_TYPES}
        value={values.engagementTypes}
        onValueChange={(value) => setValue('engagementTypes', value)}
        error={errors.engagementTypes}
      />
      <SelectField
        id={fieldId('payRange')}
        name="payRange"
        label="Quanto você espera receber?"
        hint="Só pra gente entender o mercado. Não é promessa de valor."
        optional
        placeholder="Prefiro não informar"
        groups={PAY_RANGE_GROUPS}
        value={values.payRange}
        onValueChange={(value) => setValue('payRange', value)}
        error={errors.payRange}
      />
      <ChoiceGroup
        id={fieldId('pilotInterest')}
        name="worker-pilotInterest"
        label="Quer participar do piloto da Ligana em Campo Grande?"
        hint="O piloto é a primeira fase de testes, com um grupo pequeno de pessoas e empresas."
        options={PILOT_INTEREST}
        value={values.pilotInterest}
        onValueChange={(value) => setValue('pilotInterest', value)}
        error={errors.pilotInterest}
      />

      <Consents
        audience="worker"
        processing={values.consentProcessing}
        contact={values.consentContact}
        onProcessingChange={(value) => setValue('consentProcessing', value)}
        onContactChange={(value) => setValue('consentContact', value)}
        error={errors.consentProcessing}
      />
      <SubmitArea
        status={status}
        submitError={submitError}
        variant="work"
        label="Enviar meu interesse"
      />
    </form>
  )
}
