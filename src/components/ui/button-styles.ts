/** Estilos compartilhados dos botões. Texto verde-escuro garante contraste AA no laranja e no verde. */

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-center font-extrabold leading-tight transition-[background-color,border-color,transform] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  hire: 'bg-orange text-ink hover:bg-orange-strong',
  work: 'bg-green text-ink hover:bg-green-strong',
  'work-outline': 'border-2 border-green-text bg-surface text-ink hover:bg-green-soft',
  dark: 'bg-ink text-white hover:bg-ink-deep',
} as const

const sizes = {
  lg: 'min-h-14 px-7 py-3 text-lg',
  sm: 'min-h-11 px-4 py-2 text-base',
} as const

export type ButtonVariant = keyof typeof variants

export function buttonClass(variant: ButtonVariant, size: keyof typeof sizes = 'lg'): string {
  return `${base} ${variants[variant]} ${sizes[size]}`
}
