/**
 * Símbolo da Ligana: duas pessoas unidas por um laço contínuo (como um infinito).
 * Laranja de um lado (oportunidade), verde do outro (renda).
 */
export function LigaSymbol({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 84"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle cx="30" cy="15" r="11" className="fill-orange-strong" />
      <circle cx="90" cy="15" r="11" className="fill-green-strong" />
      <path
        d="M60 53 C 48 34, 13 30, 13 53 C 13 76, 48 72, 60 53"
        fill="none"
        strokeWidth="13"
        strokeLinecap="round"
        className="stroke-orange-strong"
      />
      <path
        d="M60 53 C 72 34, 107 30, 107 53 C 107 76, 72 72, 60 53"
        fill="none"
        strokeWidth="13"
        strokeLinecap="round"
        className="stroke-green-strong"
      />
    </svg>
  )
}
