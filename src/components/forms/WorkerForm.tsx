'use client'

import { ChoiceGroup, SelectField, TextField } from '@/components/forms/fields'
import { Consents, FormStep, Honeypot, SubmitArea, SuccessMessage } from '@/components/forms/FormParts'
import { LocationFields } from '@/components/forms/LocationFields'
import { useLeadForm } from '@/components/forms/useLeadForm'
import { forWorkers } from '@/content/landing'
import {
  CATEGORIES,
  EXPERIENCE,
  PERIODS,
  ROLES,
  WEEKDAYS,
  WORKER_ENGAGEMENT_TYPES,
  WORK_REGIONS,
  payRangeGroupsFor,
} from '@/content/options'
import { formatPhoneInput } from '@/lib/phone'

const initialValues = {
  name: '',
  whatsapp: '',
  cep: '',
  region: '',
  neighborhood: '',
  categories: [] as string[],
  roles: [] as string[],
  rolesDetail: '',
  experience: '',
  availableDays: [] as string[],
  availablePeriods: [] as string[],
  workRegions: [] as string[],
  engagementTypes: [] as string[],
  payRange: '',
  consentProcessing: false,
  consentContact: false,
}

export function WorkerForm() {
  const { values, setValue, errors, fieldId, status, submitError, honeypot, setHoneypot, formRef, onSubmit, onStart } =
    useLeadForm('worker', initialValues)

  if (status === 'success') {
    return (
      <SuccessMessage
        title={forWorkers.successTitle}
        text={forWorkers.successText}
        noContactText={forWorkers.successNoContact}
        contactAllowed={values.consentContact}
      />
    )
  }

  // Só mostra as funções das áreas escolhidas, pra lista não ficar enorme.
  const visibleRoles = ROLES.filter((role) => values.categories.includes(role.category))

  const onCategoriesChange = (categories: string[]) => {
    setValue('categories', categories)
    const roles = values.roles.filter((value) => {
      const role = ROLES.find((item) => item.value === value)
      return role && categories.includes(role.category)
    })
    if (roles.length !== values.roles.length) setValue('roles', roles)
    if (!roles.includes('other_role') && !categories.includes('other')) setValue('rolesDetail', '')
  }

  // "Qualquer região" e regiões específicas não fazem sentido juntas.
  const onWorkRegionsChange = (next: string[]) => {
    const pickedAny = next.includes('any') && !values.workRegions.includes('any')
    setValue('workRegions', pickedAny ? ['any'] : next.filter((value) => value !== 'any'))
  }

  // A faixa de pagamento acompanha as modalidades: freela mostra valor por dia; temporário/permanente, por mês.
  const onEngagementChange = (engagementTypes: string[]) => {
    setValue('engagementTypes', engagementTypes)
    const stillValid = payRangeGroupsFor(engagementTypes).some((group) =>
      group.options.some((option) => option.value === values.payRange),
    )
    if (values.payRange && !stillValid) setValue('payRange', '')
  }

  const showDetail = values.roles.includes('other_role') || values.categories.includes('other')

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} noValidate className="relative space-y-8">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <FormStep number={1} title="Sobre você">
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
          regionLabel="Em que região você mora?"
        />
      </FormStep>

      <FormStep number={2} title="O que você sabe fazer">
        <ChoiceGroup
          id={fieldId('categories')}
          name="worker-categories"
          label="Em que área você trabalha?"
          multiple
          options={CATEGORIES}
          value={values.categories}
          onValueChange={onCategoriesChange}
          error={errors.categories}
        />
        {visibleRoles.length > 0 && (
          <ChoiceGroup
            id={fieldId('roles')}
            name="worker-roles"
            label="Quais funções você sabe fazer?"
            optional
            multiple
            layout="grid"
            options={visibleRoles}
            value={values.roles}
            onValueChange={(value) => setValue('roles', value)}
            error={errors.roles}
          />
        )}
        {showDetail && (
          <TextField
            id={fieldId('rolesDetail')}
            label="Conte o que mais você sabe fazer"
            hint="Ex.: pizzaiolo, recepção, confeitaria."
            optional
            maxLength={200}
            value={values.rolesDetail}
            onValueChange={(value) => setValue('rolesDetail', value)}
            error={errors.rolesDetail}
          />
        )}
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
      </FormStep>

      <FormStep number={3} title="Quando e onde você pode trabalhar">
        <ChoiceGroup
          id={fieldId('availableDays')}
          name="worker-availableDays"
          label="Dias"
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
          label="Turnos"
          multiple
          layout="chips"
          options={PERIODS}
          value={values.availablePeriods}
          onValueChange={(value) => setValue('availablePeriods', value)}
          error={errors.availablePeriods}
        />
        <ChoiceGroup
          id={fieldId('workRegions')}
          name="worker-workRegions"
          label="Em que regiões você aceita trabalhar?"
          multiple
          layout="grid"
          options={WORK_REGIONS}
          value={values.workRegions}
          onValueChange={onWorkRegionsChange}
          error={errors.workRegions}
        />
        <ChoiceGroup
          id={fieldId('engagementTypes')}
          name="worker-engagementTypes"
          label="Que oportunidades te interessam?"
          multiple
          options={WORKER_ENGAGEMENT_TYPES}
          value={values.engagementTypes}
          onValueChange={onEngagementChange}
          error={errors.engagementTypes}
        />
        <SelectField
          id={fieldId('payRange')}
          name="payRange"
          label="Quanto você espera receber?"
          hint="Só pra gente entender. Não é promessa de valor."
          optional
          placeholder="Prefiro não informar"
          groups={payRangeGroupsFor(values.engagementTypes)}
          value={values.payRange}
          onValueChange={(value) => setValue('payRange', value)}
          error={errors.payRange}
        />
      </FormStep>

      <Consents
        audience="worker"
        processing={values.consentProcessing}
        contact={values.consentContact}
        onProcessingChange={(value) => setValue('consentProcessing', value)}
        onContactChange={(value) => setValue('consentContact', value)}
        error={errors.consentProcessing}
      />
      <SubmitArea status={status} submitError={submitError} variant="work" label={forWorkers.submit} />
    </form>
  )
}
