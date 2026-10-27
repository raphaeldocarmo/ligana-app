/**
 * Duas pessoas ligadas pelo laço da Ligana: quem precisa de alguém e quem está disponível.
 * Decorativa: o texto ao lado já diz tudo, então fica fora da leitura de tela.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <ellipse cx="200" cy="262" rx="175" ry="14" className="fill-ink/6" />
      <circle cx="200" cy="150" r="128" className="fill-orange-soft" />
      <circle cx="270" cy="96" r="60" className="fill-green-soft" />

      {/* Balões de fala */}
      <g>
        <rect x="14" y="26" width="150" height="44" rx="16" className="fill-surface stroke-line" strokeWidth="2" />
        <path d="M70 69 l10 14 l6 -14 z" className="fill-surface" />
        <text x="89" y="54" textAnchor="middle" className="fill-ink text-[15px] font-bold">
          Preciso de alguém!
        </text>
      </g>
      <g>
        <rect x="236" y="26" width="150" height="44" rx="16" className="fill-surface stroke-line" strokeWidth="2" />
        <path d="M314 69 l10 14 l6 -14 z" className="fill-surface" />
        <text x="311" y="54" textAnchor="middle" className="fill-ink text-[15px] font-bold">
          Tô disponível!
        </text>
      </g>

      {/* Pessoa que contrata */}
      <circle cx="88" cy="122" r="28" fill="#c68863" />
      <path d="M68 112 q20 -26 42 -4 q-4 -22 -24 -22 q-20 0 -18 26 z" className="fill-ink-deep" />
      <path d="M38 258 Q38 162 88 162 Q138 162 138 258 Z" className="fill-orange-strong" />

      {/* Pessoa que trabalha */}
      <circle cx="312" cy="122" r="28" fill="#7a4b2f" />
      <path d="M286 118 q4 -32 30 -30 q24 2 24 30 q-8 -14 -26 -14 q-16 0 -28 14 z" className="fill-ink-deep" />
      <path d="M262 258 Q262 162 312 162 Q362 162 362 258 Z" className="fill-green-strong" />

      {/* O laço que une as duas */}
      <path
        d="M200 205 C 186 180, 128 172, 128 205 C 128 238, 186 230, 200 205"
        fill="none"
        strokeWidth="16"
        strokeLinecap="round"
        className="stroke-orange"
      />
      <path
        d="M200 205 C 214 180, 272 172, 272 205 C 272 238, 214 230, 200 205"
        fill="none"
        strokeWidth="16"
        strokeLinecap="round"
        className="stroke-green"
      />

      {/* Renda */}
      <circle cx="200" cy="128" r="24" className="fill-surface stroke-green" strokeWidth="4" />
      <text x="200" y="135" textAnchor="middle" className="fill-green-text text-[18px] font-black">
        R$
      </text>
    </svg>
  )
}
