/** Ícones simples de traço, desenhados para a Ligana. Sempre decorativos (o texto ao lado explica). */

const paths = {
  kitchen: 'M4 11h16v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 11h20M9 7.5c0-1.2 1-1.8 1-3.5M14 7.5c0-1.2 1-1.8 1-3.5',
  service: 'M4 10v10h16V10M3.5 6 5 3h14l1.5 3v1.5a2.8 2.8 0 0 1-5.5 0 2.8 2.8 0 0 1-6 0 2.8 2.8 0 0 1-5.5 0zM10 20v-5h4v5',
  delivery: 'M3 7.5 12 3l9 4.5v9L12 21l-9-4.5zM3 7.5l9 4.5 9-4.5M12 12v9M7.5 5.25l9 4.5',
  events: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
  cleaning: 'M6.5 10h11l-1.6 10H8.1zM9 10V7.5a3 3 0 0 1 6 0V10M4 14h2.8M17.2 14H20',
  construction: 'M3 17h18M5 17v-3a7 7 0 0 1 14 0v3M10 7.5V5h4v2.5M12 7v5M4 20h16',
  other: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v8M8 12h8',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  calendar: 'M4 6.5h16v13H4zM4 10.5h16M8.5 3.5v4M15.5 3.5v4M8 14h3M8 17h6',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  chat: 'M4 5.5h16v10H9.5L5 19.5v-4H4zM8 9.5h8M8 12.5h5',
  gift: 'M4 9.5h16v4H4zM5.5 13.5h13v7h-13zM12 9.5v11M12 9.5S10.5 4 8 4.5s-1.5 5 4 5zM12 9.5s1.5-5.5 4-5 1.5 5-4 5z',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className = 'size-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}
