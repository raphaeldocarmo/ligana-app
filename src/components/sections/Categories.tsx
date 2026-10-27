import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { categories } from '@/content/landing'
import { CATEGORIES } from '@/content/options'

const ICONS: Record<(typeof CATEGORIES)[number]['value'], IconName> = {
  kitchen: 'kitchen',
  service: 'service',
  delivery: 'delivery',
  events: 'events',
  cleaning: 'cleaning',
  construction: 'construction',
  other: 'other',
}

export function Categories() {
  return (
    <section aria-labelledby="categorias-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeading id="categorias-title" eyebrow={categories.eyebrow} title={categories.title}>
          <p>{categories.intro}</p>
        </SectionHeading>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category, index) => (
            <li
              key={category.value}
              className="flex w-full items-center gap-4 rounded-card bg-surface p-5 shadow-card min-[480px]:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.5625rem)]"
            >
              <span
                className={`grid size-14 shrink-0 place-items-center rounded-2xl ${index % 2 === 0 ? 'bg-orange-soft text-orange-text' : 'bg-green-soft text-green-text'}`}
              >
                <Icon name={ICONS[category.value]} className="size-7" />
              </span>
              <span>
                <span className="block text-lg leading-tight font-extrabold">{category.label}</span>
                <span className="mt-0.5 block text-[0.92rem] leading-snug text-ink-soft">{category.hint}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
