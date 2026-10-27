import { LigaSymbol } from '@/components/brand/LigaSymbol'

type LogoProps = { className?: string; tone?: 'dark' | 'light'; showSlogan?: boolean }

export function Logo({ className = '', tone = 'dark', showSlogan = false }: LogoProps) {
  const text = tone === 'dark' ? 'text-ink' : 'text-white'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LigaSymbol className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.65rem] font-black tracking-tight ${text}`}>Ligana</span>
        {showSlogan && (
          <span className={`mt-1 text-xs font-semibold ${tone === 'dark' ? 'text-ink-soft' : 'text-white/80'}`}>
            Conexões que geram renda.
          </span>
        )}
      </span>
    </span>
  )
}
