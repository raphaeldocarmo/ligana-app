/**
 * Opções dos formulários. Os `value` são gravados no banco e usados nas análises:
 * não mude um valor existente sem migrar os dados. Os `label` podem mudar à vontade.
 */

export type Option<V extends string = string> = { value: V; label: string; hint?: string }

export const CATEGORIES = [
  { value: 'kitchen', label: 'Cozinha e restaurantes', hint: 'Cozinheiro, auxiliar, garçom, chapeiro' },
  { value: 'service', label: 'Atendimento e comércio', hint: 'Caixa, balconista, vendedor, repositor' },
  { value: 'delivery', label: 'Entregas', hint: 'Moto, bike, carro ou a pé' },
  { value: 'events', label: 'Eventos', hint: 'Garçom, recepção, montagem, apoio' },
  { value: 'cleaning', label: 'Limpeza e serviços gerais', hint: 'Faxina, diarista, auxiliar de limpeza' },
  { value: 'construction', label: 'Construção e manutenção', hint: 'Pedreiro, pintor, eletricista, ajudante' },
  { value: 'other', label: 'Outras oportunidades', hint: 'Conte pra gente o que falta aqui' },
] as const satisfies readonly Option[]

/** Regiões urbanas de Campo Grande (MS). */
export const REGIONS = [
  { value: 'centro', label: 'Centro' },
  { value: 'segredo', label: 'Segredo' },
  { value: 'prosa', label: 'Prosa' },
  { value: 'bandeira', label: 'Bandeira' },
  { value: 'anhanduizinho', label: 'Anhanduizinho' },
  { value: 'lagoa', label: 'Lagoa' },
  { value: 'imbirussu', label: 'Imbirussu' },
  { value: 'outside', label: 'Fora de Campo Grande' },
  { value: 'unknown', label: 'Não sei a região' },
] as const satisfies readonly Option[]

/** Regiões em que a pessoa aceita trabalhar: as 7 regiões da cidade ou qualquer uma. */
export const WORK_REGIONS = [
  { value: 'any', label: 'Qualquer região' },
  ...REGIONS.filter((region) => region.value !== 'outside' && region.value !== 'unknown'),
] as const satisfies readonly Option[]

/**
 * As três modalidades da Ligana. Mesmos valores para os dois públicos (o matching vai cruzar
 * os dois lados), com rótulos escritos para cada um.
 */
export const ENGAGEMENT_TYPES = [
  { value: 'freelance', label: 'Freela / diária / turno', hint: 'Eventos, coberturas e reforços de última hora' },
  { value: 'temporary', label: 'Temporário', hint: 'Duração definida, temporadas e projetos' },
  { value: 'permanent', label: 'Permanente', hint: 'Trabalho contínuo, de longo prazo' },
] as const satisfies readonly Option[]

export const WORKER_ENGAGEMENT_TYPES = [
  { value: 'freelance', label: 'Interesse em freelas', hint: 'Diárias, turnos e eventos' },
  { value: 'temporary', label: 'Interesse em trabalhos temporários', hint: 'Por algumas semanas ou meses' },
  { value: 'permanent', label: 'Interesse em oportunidades permanentes', hint: 'Trabalho contínuo' },
] as const satisfies readonly Option[]

/** Funções mais comuns no começo da Ligana. `category` liga cada função a uma área (CATEGORIES). */
export const ROLES = [
  { value: 'waiter', label: 'Garçom / Garçonete', category: 'kitchen' },
  { value: 'cook', label: 'Cozinheiro(a)', category: 'kitchen' },
  { value: 'kitchen_assistant', label: 'Auxiliar de cozinha', category: 'kitchen' },
  { value: 'grill', label: 'Chapeiro(a)', category: 'kitchen' },
  { value: 'dishwasher', label: 'Lavador(a) de louça', category: 'kitchen' },
  { value: 'bartender', label: 'Bartender / Barman', category: 'kitchen' },
  { value: 'cashier', label: 'Atendente / Caixa', category: 'service' },
  { value: 'stock', label: 'Repositor(a) / Estoque', category: 'service' },
  { value: 'delivery', label: 'Entregador(a)', category: 'delivery' },
  { value: 'event_staff', label: 'Apoio em eventos', category: 'events' },
  { value: 'cleaning', label: 'Limpeza / Serviços gerais', category: 'cleaning' },
  { value: 'maintenance', label: 'Manutenção / Reparos', category: 'construction' },
  { value: 'other_role', label: 'Outra função', category: 'other' },
] as const satisfies readonly (Option & { category: (typeof CATEGORIES)[number]['value'] })[]

export type RoleValue = (typeof ROLES)[number]['value']
export type CategoryValue = (typeof CATEGORIES)[number]['value']

/** Áreas (CATEGORIES) que correspondem às funções escolhidas, sem repetir. */
export function categoriesForRoles(roles: readonly string[]): CategoryValue[] {
  const found = ROLES.filter((role) => roles.includes(role.value)).map((role) => role.category)
  return [...new Set(found)]
}

export const SEGMENTS = [
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'burger', label: 'Hamburgueria' },
  { value: 'pizzeria', label: 'Pizzaria' },
  { value: 'bar', label: 'Bar / Choperia' },
  { value: 'bakery_cafe', label: 'Padaria / Cafeteria' },
  { value: 'events_buffet', label: 'Eventos / Buffet' },
  { value: 'retail', label: 'Comércio / Loja' },
  { value: 'other', label: 'Outro' },
] as const satisfies readonly Option[]

export const HEADCOUNTS = [
  { value: '1', label: '1 pessoa' },
  { value: '2_3', label: '2 a 3' },
  { value: '4_5', label: '4 a 5' },
  { value: '6_plus', label: '6 ou mais' },
] as const satisfies readonly Option[]

export const NEED_TIMINGS = [
  { value: 'today_tomorrow', label: 'Hoje ou amanhã' },
  { value: 'next_7_days', label: 'Nos próximos 7 dias' },
  { value: 'future_date', label: 'Numa data mais pra frente' },
  { value: 'no_current_need', label: 'Agora não, mas costumo precisar' },
] as const satisfies readonly Option[]

/** Principal dificuldade da empresa para encontrar profissionais (uma resposta). */
export const MAIN_DIFFICULTIES = [
  { value: 'takes_too_long', label: 'Demora para encontrar alguém' },
  { value: 'short_notice', label: 'Achar alguém em cima da hora' },
  { value: 'no_shows', label: 'Gente que falta ou desiste' },
  { value: 'lack_experience', label: 'Falta de experiência' },
  { value: 'availability', label: 'Ninguém disponível no horário' },
  { value: 'cost', label: 'Valor cobrado' },
  { value: 'other', label: 'Outra' },
] as const satisfies readonly Option[]

/** Como a empresa encontra profissionais hoje (pode marcar mais de um). */
export const CURRENT_SOURCING = [
  { value: 'whatsapp_groups', label: 'Grupos de WhatsApp' },
  { value: 'referrals', label: 'Indicação de conhecidos' },
  { value: 'social_media', label: 'Redes sociais' },
  { value: 'job_sites', label: 'Sites ou apps de vagas' },
  { value: 'agency', label: 'Agência / terceirizada' },
  { value: 'own_contacts', label: 'Minha lista de contatos' },
  { value: 'other', label: 'Outro jeito' },
] as const satisfies readonly Option[]

export const WILLINGNESS_TO_PAY = [
  { value: 'yes', label: 'Sim, se der certo' },
  { value: 'depends', label: 'Depende do valor' },
  { value: 'no', label: 'Não' },
] as const satisfies readonly Option[]

export const FREQUENCIES = [
  { value: 'weekly', label: 'Toda semana' },
  { value: 'monthly', label: 'Algumas vezes por mês' },
  { value: 'occasional', label: 'De vez em quando' },
  { value: 'seasonal', label: 'Só em datas ou eventos específicos' },
] as const satisfies readonly Option[]

export const URGENCIES = [
  { value: 'same_day', label: 'Pra hoje mesmo' },
  { value: 'one_two_days', label: 'Em 1 ou 2 dias' },
  { value: 'same_week', label: 'Na mesma semana' },
  { value: 'planned', label: 'Consigo planejar com mais tempo' },
] as const satisfies readonly Option[]

export const PILOT_INTEREST = [
  { value: 'yes', label: 'Sim, quero participar' },
  { value: 'maybe', label: 'Talvez, quero saber mais' },
  { value: 'no', label: 'Agora não' },
] as const satisfies readonly Option[]

export const EXPERIENCE = [
  { value: 'none', label: 'Ainda não tenho experiência' },
  { value: 'lt_1y', label: 'Menos de 1 ano' },
  { value: '1_3y', label: 'De 1 a 3 anos' },
  { value: 'gt_3y', label: 'Mais de 3 anos' },
] as const satisfies readonly Option[]

export const WEEKDAYS = [
  { value: 'mon', label: 'Seg' },
  { value: 'tue', label: 'Ter' },
  { value: 'wed', label: 'Qua' },
  { value: 'thu', label: 'Qui' },
  { value: 'fri', label: 'Sex' },
  { value: 'sat', label: 'Sáb' },
  { value: 'sun', label: 'Dom' },
] as const satisfies readonly Option[]

export const PERIODS = [
  { value: 'morning', label: 'Manhã' },
  { value: 'afternoon', label: 'Tarde' },
  { value: 'evening', label: 'Noite' },
  { value: 'overnight', label: 'Madrugada' },
] as const satisfies readonly Option[]

/**
 * Faixas de remuneração. Separadas por unidade (dia x mês) porque freela e fixo
 * são pagos de formas diferentes; o prefixo do valor guarda a unidade.
 */
export const PAY_RANGE_GROUPS = [
  {
    unit: 'day',
    label: 'Por dia (diária)',
    options: [
      { value: 'day_lt_100', label: 'Até R$ 100 por dia' },
      { value: 'day_100_150', label: 'R$ 100 a R$ 150 por dia' },
      { value: 'day_150_200', label: 'R$ 150 a R$ 200 por dia' },
      { value: 'day_200_300', label: 'R$ 200 a R$ 300 por dia' },
      { value: 'day_gt_300', label: 'Mais de R$ 300 por dia' },
    ],
  },
  {
    unit: 'month',
    label: 'Por mês (temporário ou permanente)',
    options: [
      { value: 'month_lt_1600', label: 'Até R$ 1.600 por mês' },
      { value: 'month_1600_2200', label: 'R$ 1.600 a R$ 2.200 por mês' },
      { value: 'month_2200_3000', label: 'R$ 2.200 a R$ 3.000 por mês' },
      { value: 'month_gt_3000', label: 'Mais de R$ 3.000 por mês' },
    ],
  },
  {
    unit: 'other',
    label: 'Outro',
    options: [{ value: 'varies', label: 'Varia / depende do trabalho' }],
  },
] as const

type PayRangeOption = (typeof PAY_RANGE_GROUPS)[number]['options'][number]

export const PAY_RANGES = PAY_RANGE_GROUPS.flatMap((group): PayRangeOption[] => [...group.options])

/**
 * Faixas que fazem sentido para o tipo de contratação escolhido: diária mostra valores
 * por dia; temporário/permanente, por mês. Sem escolha ainda, mostra tudo.
 */
export function payRangeGroupsFor(engagementTypes: readonly string[]) {
  if (engagementTypes.length === 0) return PAY_RANGE_GROUPS
  const wantsDay = engagementTypes.includes('freelance')
  const wantsMonth = engagementTypes.includes('temporary') || engagementTypes.includes('permanent')
  return PAY_RANGE_GROUPS.filter(
    (group) => group.unit === 'other' || (group.unit === 'day' && wantsDay) || (group.unit === 'month' && wantsMonth),
  )
}


export const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as unknown as [T[number]['value'], ...T[number]['value'][]]
