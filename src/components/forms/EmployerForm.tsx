'use client'

import { ChoiceGroup, SelectField, TextField } from '@/components/forms/fields'
import { Consents, Honeypot, SubmitArea, SuccessMessage } from '@/components/forms/FormParts'
import { useLeadForm } from '@/components/forms/useLeadForm'
import {
  CATEGORIES,
  ENGAGEMENT_TYPES,
  FREQUENCIES,
  PAY_RANGE_GROUPS,
  PILOT_INTEREST,
  REGIONS,
  URGENCIES,
} from '@/content/options'
import { formatPhoneInput } from '@/lib/phone'

const initialValues = {
  name: '',
  companyName: '',
  whatsapp: '',
  region: '',
  neighborhood: '',
  categories: [] as string[],
  rolesDetail: '',
  engagementTypes: [] as string[],
  frequency: '',
  urgency: '',
  payRange: '',
  pilotInterest: '',
  consentProcessing: false,
  consentContact: false,
}

export function EmployerForm() {
  const { values, setValue, errors, fieldId, status, submitError, honeypot, setHoneypot, formRef, onSubmit, onStart } =
    useLeadForm('employer', initialValues)

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
        id={fieldId('companyName')}
        label="Nome da empresa ou do negócio"
        hint="Se você contrata como pessoa física, pode deixar em branco."
        optional
        autoComplete="organization"
        value={values.companyName}
        onValueChange={(value) => setValue('companyName', value)}
        error={errors.companyName}
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
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          id={fieldId('region')}
          name="region"
          label="Região da cidade"
          placeholder="Escolha a região"
          options={REGIONS}
          value={values.region}
          onValueChange={(value) => setValue('region', value)}
          error={errors.region}
        />
        <TextField
          id={fieldId('neighborhood')}
          label="Bairro"
          optional
          autoComplete="off"
          value={values.neighborhood}
          onValueChange={(value) => setValue('neighborhood', value)}
          error={errors.neighborhood}
        />
      </div>

      <ChoiceGroup
        id={fieldId('categories')}
        name="employer-categories"
        label="Que tipo de profissional você costuma precisar?"
        multiple
        options={CATEGORIES}
        value={values.categories}
        onValueChange={(value) => setValue('categories', value)}
        error={errors.categories}
      />
      <TextField
        id={fieldId('rolesDetail')}
        label="Quer contar qual função?"
        hint="Ex.: garçom pro fim de semana, auxiliar de cozinha, entregador de moto."
        optional
        maxLength={200}
        value={values.rolesDetail}
        onValueChange={(value) => setValue('rolesDetail', value)}
        error={errors.rolesDetail}
      />
      <ChoiceGroup
        id={fieldId('engagementTypes')}
        name="employer-engagementTypes"
        label="Que tipo de contratação?"
        multiple
        options={ENGAGEMENT_TYPES}
        value={values.engagementTypes}
        onValueChange={(value) => setValue('engagementTypes', value)}
        error={errors.engagementTypes}
      />
      <ChoiceGroup
        id={fieldId('frequency')}
        name="employer-frequency"
        label="Com que frequência você precisa de alguém?"
        options={FREQUENCIES}
        value={values.frequency}
        onValueChange={(value) => setValue('frequency', value)}
        error={errors.frequency}
      />
      <ChoiceGroup
        id={fieldId('urgency')}
        name="employer-urgency"
        label="Quando aparece a necessidade, costuma ser pra quando?"
        options={URGENCIES}
        value={values.urgency}
        onValueChange={(value) => setValue('urgency', value)}
        error={errors.urgency}
      />
      <SelectField
        id={fieldId('payRange')}
        name="payRange"
        label="Quanto você costuma pagar?"
        hint="Só pra gente entender o mercado. Não é compromisso."
        optional
        placeholder="Prefiro não informar"
        groups={PAY_RANGE_GROUPS}
        value={values.payRange}
        onValueChange={(value) => setValue('payRange', value)}
        error={errors.payRange}
      />
      <ChoiceGroup
        id={fieldId('pilotInterest')}
        name="employer-pilotInterest"
        label="Quer participar do piloto da Ligana em Campo Grande?"
        hint="O piloto é a primeira fase de testes, com um grupo pequeno de pessoas e empresas."
        options={PILOT_INTEREST}
        value={values.pilotInterest}
        onValueChange={(value) => setValue('pilotInterest', value)}
        error={errors.pilotInterest}
      />

      <Consents
        audience="employer"
        processing={values.consentProcessing}
        contact={values.consentContact}
        onProcessingChange={(value) => setValue('consentProcessing', value)}
        onContactChange={(value) => setValue('consentContact', value)}
        error={errors.consentProcessing}
      />
      <SubmitArea
        status={status}
        submitError={submitError}
        variant="hire"
        label="Enviar meu interesse"
      />
    </form>
  )
}
