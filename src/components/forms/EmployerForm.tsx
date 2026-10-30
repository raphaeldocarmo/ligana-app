'use client'

import { ChoiceGroup, SelectField, TextField } from '@/components/forms/fields'
import { Consents, FormStep, Honeypot, SubmitArea, SuccessMessage } from '@/components/forms/FormParts'
import { LocationFields } from '@/components/forms/LocationFields'
import { useLeadForm } from '@/components/forms/useLeadForm'
import { forCompanies } from '@/content/landing'
import {
  CURRENT_SOURCING,
  ENGAGEMENT_TYPES,
  FREQUENCIES,
  HEADCOUNTS,
  MAIN_DIFFICULTIES,
  NEED_TIMINGS,
  ROLES,
  SEGMENTS,
  WILLINGNESS_TO_PAY,
  payRangeGroupsFor,
} from '@/content/options'
import { formatPhoneInput } from '@/lib/phone'

const initialValues = {
  name: '',
  companyName: '',
  whatsapp: '',
  segment: '',
  cep: '',
  region: '',
  neighborhood: '',
  roles: [] as string[],
  rolesDetail: '',
  headcount: '',
  engagementTypes: [] as string[],
  needTiming: '',
  frequency: '',
  payRange: '',
  mainDifficulty: '',
  currentSourcing: [] as string[],
  willingnessToPay: '',
  consentProcessing: false,
  consentContact: false,
}

export function EmployerForm() {
  const { values, setValue, errors, fieldId, status, submitError, honeypot, setHoneypot, formRef, onSubmit, onStart } =
    useLeadForm('employer', initialValues)

  if (status === 'success') {
    return (
      <SuccessMessage
        title={forCompanies.successTitle}
        text={forCompanies.successText}
        noContactText={forCompanies.successNoContact}
        contactAllowed={values.consentContact}
      />
    )
  }

  const payGroups = payRangeGroupsFor(values.engagementTypes)

  const onEngagementChange = (engagementTypes: string[]) => {
    setValue('engagementTypes', engagementTypes)
    // Se a faixa escolhida deixou de fazer sentido (ex.: tirou "Diária"), limpa.
    const stillValid = payRangeGroupsFor(engagementTypes).some((group) =>
      group.options.some((option) => option.value === values.payRange),
    )
    if (values.payRange && !stillValid) setValue('payRange', '')
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} noValidate className="relative space-y-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <FormStep number={1} title="Sobre o seu negócio">
        <div className="grid gap-6 sm:grid-cols-2">
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
            label="Nome do estabelecimento"
            autoComplete="organization"
            value={values.companyName}
            onValueChange={(value) => setValue('companyName', value)}
            error={errors.companyName}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
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
          <SelectField
            id={fieldId('segment')}
            name="segment"
            label="Segmento"
            placeholder="Escolha o segmento"
            options={SEGMENTS}
            value={values.segment}
            onValueChange={(value) => setValue('segment', value)}
            error={errors.segment}
          />
        </div>
        <LocationFields
          idFor={fieldId}
          cep={values.cep}
          region={values.region}
          neighborhood={values.neighborhood}
          onCepChange={(value) => setValue('cep', value)}
          onRegionChange={(value) => setValue('region', value)}
          onNeighborhoodChange={(value) => setValue('neighborhood', value)}
          errors={errors}
          regionLabel="Região do estabelecimento"
        />
      </FormStep>

      <FormStep number={2} title="Do que você precisa">
        <ChoiceGroup
          id={fieldId('roles')}
          name="employer-roles"
          label="Que profissional você costuma precisar?"
          multiple
          layout="grid"
          options={ROLES}
          value={values.roles}
          onValueChange={(value) => {
            setValue('roles', value)
            if (!value.includes('other_role')) setValue('rolesDetail', '')
          }}
          error={errors.roles}
        />
        {values.roles.includes('other_role') && (
          <TextField
            id={fieldId('rolesDetail')}
            label="Qual função?"
            hint="Ex.: recepcionista, pizzaiolo, sushiman."
            maxLength={200}
            value={values.rolesDetail}
            onValueChange={(value) => setValue('rolesDetail', value)}
            error={errors.rolesDetail}
          />
        )}
        <ChoiceGroup
          id={fieldId('engagementTypes')}
          name="employer-engagementTypes"
          label="Tipo de trabalho"
          multiple
          options={ENGAGEMENT_TYPES}
          value={values.engagementTypes}
          onValueChange={onEngagementChange}
          error={errors.engagementTypes}
        />
        <SelectField
          id={fieldId('frequency')}
          name="frequency"
          label="Com que frequência você precisa de alguém?"
          placeholder="Escolha uma opção"
          options={FREQUENCIES}
          value={values.frequency}
          onValueChange={(value) => setValue('frequency', value)}
          error={errors.frequency}
        />
        <ChoiceGroup
          id={fieldId('needTiming')}
          name="employer-needTiming"
          label="Qual a urgência hoje?"
          layout="grid"
          options={NEED_TIMINGS}
          value={values.needTiming}
          onValueChange={(value) => setValue('needTiming', value)}
          error={errors.needTiming}
        />
      </FormStep>

      <FormStep number={3} title="Para conhecer melhor seu negócio" optional>
        <ChoiceGroup
          id={fieldId('headcount')}
          name="employer-headcount"
          label="Quantos profissionais você costuma precisar?"
          layout="chips"
          options={HEADCOUNTS}
          value={values.headcount}
          onValueChange={(value) => setValue('headcount', value)}
          error={errors.headcount}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            id={fieldId('payRange')}
            name="payRange"
            label="Quanto costuma pagar?"
              placeholder="Prefiro não informar"
            groups={payGroups}
            value={values.payRange}
            onValueChange={(value) => setValue('payRange', value)}
            error={errors.payRange}
          />
          <SelectField
            id={fieldId('mainDifficulty')}
            name="mainDifficulty"
            label="Maior dificuldade para encontrar gente"
              placeholder="Prefiro não informar"
            options={MAIN_DIFFICULTIES}
            value={values.mainDifficulty}
            onValueChange={(value) => setValue('mainDifficulty', value)}
            error={errors.mainDifficulty}
          />
        </div>
        <ChoiceGroup
          id={fieldId('currentSourcing')}
          name="employer-currentSourcing"
          label="Como você encontra profissionais hoje?"
          multiple
          layout="grid"
          options={CURRENT_SOURCING}
          value={values.currentSourcing}
          onValueChange={(value) => setValue('currentSourcing', value)}
          error={errors.currentSourcing}
        />
        <ChoiceGroup
          id={fieldId('willingnessToPay')}
          name="employer-willingnessToPay"
          label="Você pagaria por uma intermediação que desse certo?"
          hint="Ainda não existe nenhuma cobrança. Sua resposta só ajuda a gente a decidir como a Ligana vai funcionar."
          layout="chips"
          options={WILLINGNESS_TO_PAY}
          value={values.willingnessToPay}
          onValueChange={(value) => setValue('willingnessToPay', value)}
          error={errors.willingnessToPay}
        />
      </FormStep>

      <Consents
        audience="employer"
        processing={values.consentProcessing}
        contact={values.consentContact}
        onProcessingChange={(value) => setValue('consentProcessing', value)}
        onContactChange={(value) => setValue('consentContact', value)}
        error={errors.consentProcessing}
      />
      <SubmitArea status={status} submitError={submitError} variant="hire" label={forCompanies.submit} />
    </form>
  )
}
