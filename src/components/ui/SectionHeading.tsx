import type { ReactNode } from 'react'

type SectionHeadingProps = {
  id: string
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
}

export function SectionHeading({ id, eyebrow, title, children, align = 'center' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-extrabold tracking-wide text-orange-text uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl leading-tight font-black text-balance sm:text-4xl">
        {title}
      </h2>
      {children && <div className="mt-4 text-lg text-pretty text-ink-soft">{children}</div>}
    </div>
  )
}
