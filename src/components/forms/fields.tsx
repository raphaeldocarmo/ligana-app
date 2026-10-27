'use client'

import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'

import type { Option } from '@/content/options'

/**
 * Campos de formulário acessíveis: rótulo sempre visível, dica e erro ligados ao campo
 * por `aria-describedby`, alvos de toque com pelo menos 48px.
 */

type BaseProps = {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

const inputClass =
  'block min-h-13 w-full rounded-2xl border-2 bg-surface px-4 text-lg text-ink placeholder:text-ink-soft/70 transition-colors focus:border-ink focus:outline-none aria-invalid:border-danger'

function describedBy(id: string, hint?: string, error?: string) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
}

function Label({ id, label, optional }: { id: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={id} className="mb-1.5 block font-bold">
      {label}
      {optional && <span className="font-semibold text-ink-soft"> (opcional)</span>}
    </label>
  )
}

function Hint({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null
  return (
    <p id={`${id}-hint`} className="mb-2 text-[0.95rem] text-ink-soft">
      {children}
    </p>
  )
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 font-semibold text-danger">
      <span aria-hidden="true">⚠</span>
      {error}
    </p>
  )
}

type TextFieldProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'onChange' | 'value'> & {
    value: string
    onValueChange: (value: string) => void
  }

export function TextField({ id, label, hint, error, optional, value, onValueChange, ...input }: TextFieldProps) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <Hint id={id}>{hint}</Hint>
      <input
        id={id}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${inputClass} ${error ? '' : 'border-line'}`}
        {...input}
      />
      <FieldError id={id} error={error} />
    </div>
  )
}

type SelectGroup = { label: string; options: readonly Option[] }

type SelectFieldProps = BaseProps & {
  name: string
  value: string
  onValueChange: (value: string) => void
  placeholder: string
} & ({ options: readonly Option[]; groups?: never } | { groups: readonly SelectGroup[]; options?: never })

export function SelectField({
  id,
  name,
  label,
  hint,
  error,
  optional,
  value,
  onValueChange,
  placeholder,
  options,
  groups,
}: SelectFieldProps) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <Hint id={id}>{hint}</Hint>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${inputClass} appearance-none pr-12 ${error ? '' : 'border-line'} ${value ? '' : 'text-ink-soft'}`}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {groups?.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 fill-ink"
        >
          <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
        </svg>
      </div>
      <FieldError id={id} error={error} />
    </div>
  )
}

type ChoiceGroupProps = BaseProps & {
  name: string
  options: readonly Option[]
  layout?: 'list' | 'chips'
} & (
    | { multiple: true; value: string[]; onValueChange: (value: string[]) => void }
    | { multiple?: false; value: string; onValueChange: (value: string) => void }
  )

/** Grupo de opções clicáveis (rádio ou caixa de seleção), pra quase ninguém precisar digitar. */
export function ChoiceGroup(props: ChoiceGroupProps) {
  const { id, name, label, hint, error, optional, options, layout = 'list' } = props
  const isChecked = (value: string) =>
    props.multiple ? props.value.includes(value) : props.value === value

  const toggle = (value: string) => {
    if (props.multiple) {
      props.onValueChange(
        props.value.includes(value) ? props.value.filter((item) => item !== value) : [...props.value, value],
      )
    } else {
      props.onValueChange(value)
    }
  }

  const grid =
    layout === 'chips' ? 'flex flex-wrap gap-2' : 'grid gap-2 sm:grid-cols-2'

  return (
    <fieldset id={id} aria-describedby={describedBy(id, hint, error)} tabIndex={-1} className="focus:outline-none">
      <legend className="mb-1.5 font-bold">
        {label}
        {optional && <span className="font-semibold text-ink-soft"> (opcional)</span>}
        {props.multiple && <span className="font-semibold text-ink-soft"> — pode marcar mais de um</span>}
      </legend>
      <Hint id={id}>{hint}</Hint>
      <div className={grid}>
        {options.map((option) => (
          <label key={option.value} className="block cursor-pointer">
            <input
              type={props.multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={() => toggle(option.value)}
              aria-invalid={error ? true : undefined}
              className="peer sr-only"
            />
            <span
              className={`flex min-h-12 items-center gap-3 rounded-2xl border-2 bg-surface px-4 py-2.5 transition-colors peer-checked:border-ink peer-checked:bg-green-soft peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-strong hover:border-ink/50 ${error ? 'border-danger' : 'border-line'} ${layout === 'chips' ? 'justify-center px-5' : ''}`}
            >
              {layout === 'list' && (
                <span
                  aria-hidden="true"
                  className={`grid size-6 shrink-0 place-items-center border-2 border-ink/40 bg-surface text-sm font-black text-transparent transition-colors ${props.multiple ? 'rounded-md' : 'rounded-full'} ${isChecked(option.value) ? 'border-ink bg-ink text-white' : ''}`}
                >
                  ✓
                </span>
              )}
              <span className="leading-snug">
                <span className="block font-bold">{option.label}</span>
                {option.hint && <span className="block text-[0.9rem] text-ink-soft">{option.hint}</span>}
              </span>
            </span>
          </label>
        ))}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  )
}

type CheckboxProps = {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
  children: ReactNode
}

/** Caixa de consentimento. Sempre começa desmarcada. */
export function ConsentCheckbox({ id, checked, onCheckedChange, error, children }: CheckboxProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 cursor-pointer accent-ink"
        />
        <span className="text-[0.98rem] leading-snug">{children}</span>
      </label>
      <FieldError id={id} error={error} />
    </div>
  )
}
