/**
 * Textos da landing page de pré-lançamento.
 *
 * Posicionamento: a Ligana está CRIANDO uma forma mais inteligente de conectar empresas e
 * profissionais por compatibilidade (matching), nas três modalidades: freelas e trabalhos
 * pontuais, temporários e permanentes. O diferencial não é a modalidade, é identificar quem é
 * compatível, avisar os mais adequados, confirmar o interesse e facilitar a conexão.
 * O motor de matching ainda não existe.
 *
 * Nunca posicionar a Ligana como só de freelas, só de diárias ou só de empregos fixos.
 *
 * Regras de comunicação:
 * - falar no futuro/planejado: "estamos criando", "a Ligana vai", "participe do lançamento";
 * - nada de "encontre agora", "candidatos imediatos", "temos centenas", "nossa IA já seleciona",
 *   "garantimos", "vagas disponíveis";
 * - nada de depoimentos, contadores, percentuais, escassez artificial ou datas não confirmadas.
 */

export const nav = {
  employer: 'Para empresas',
  employerShort: 'Empresas',
  matching: 'Como combina',
  worker: 'Para profissionais',
  workerShort: 'Profissionais',
  cta: 'Acesso antecipado',
}

export const hero = {
  badge: 'Pré-lançamento em Campo Grande/MS',
  title: 'A pessoa certa. Na hora que você precisa.',
  subtitle:
    'Estamos criando uma maneira mais inteligente de conectar empresas a profissionais compatíveis. Seja para um freela, uma oportunidade temporária ou uma contratação permanente.',
  ctaHire: 'Quero acesso antecipado para contratar',
  ctaWork: 'Quero receber oportunidades',
  note: 'Cadastre seu interesse e participe da primeira fase da Ligana.',
}

export const forCompanies = {
  eyebrow: 'Para empresas',
  title: 'Precisou de alguém? A Ligana encontra.',
  subtitle:
    'De um reforço para hoje a uma contratação permanente, a Ligana está sendo desenvolvida para identificar profissionais compatíveis com o que sua empresa precisa.',
  benefits: [
    {
      icon: 'clock',
      title: 'Menos tempo procurando',
      text: 'A proposta é reduzir o esforço de procurar profissionais em grupos, indicações e listas de contatos.',
    },
    {
      icon: 'check',
      title: 'Profissionais compatíveis',
      text: 'As recomendações vão considerar as habilidades e os requisitos de cada necessidade.',
    },
    {
      icon: 'calendar',
      title: 'Do freela à vaga permanente',
      text: 'Cobertura de ausência, reforço de fim de semana, temporada ou contratação de longo prazo: tudo no mesmo lugar.',
    },
    {
      icon: 'spark',
      title: 'Conexões proativas',
      text: 'A ideia é a Ligana avisar os profissionais mais adequados e confirmar o interesse deles antes de te apresentar.',
    },
  ],
  cta: 'Quero participar do lançamento',
  support: 'Estamos selecionando os primeiros estabelecimentos interessados em testar a Ligana em Campo Grande.',
  formTitle: 'Peça seu acesso antecipado',
  formSubtitle: 'Leva menos de 2 minutos. Suas respostas ajudam a gente a construir a Ligana do jeito que você precisa.',
  submit: 'Quero acesso antecipado',
  successTitle: 'Cadastro recebido!',
  successText:
    'Obrigado por demonstrar interesse na Ligana. Estamos preparando nossa primeira fase de operação em Campo Grande e poderemos entrar em contato para conhecer melhor suas necessidades.',
  successNoContact:
    'Obrigado por demonstrar interesse na Ligana. Como você preferiu não receber mensagens, não vamos te chamar no WhatsApp. Se mudar de ideia, é só preencher de novo marcando a autorização.',
}

export const matching = {
  eyebrow: 'Matching inteligente',
  title: 'Não é sobre encontrar qualquer pessoa. É sobre encontrar a pessoa certa.',
  subtitle:
    'A Ligana está sendo desenvolvida para entender o que cada empresa precisa, identificar os profissionais mais compatíveis, avisar os mais adequados, confirmar o interesse deles e facilitar a conexão.',
  disclaimer: 'Exemplo ilustrativo de como a Ligana funcionará.',
  example: 'Exemplo: um freela de sábado',
  request: {
    label: 'A empresa precisa de',
    items: [
      { icon: 'kitchen', label: 'Função', value: 'Auxiliar de cozinha' },
      { icon: 'calendar', label: 'Quando', value: 'Sábado, das 18h às 23h' },
      { icon: 'pin', label: 'Onde', value: 'Região central' },
      { icon: 'coin', label: 'Pagamento', value: 'R$ 150 a diária' },
    ],
  },
  engine: {
    label: 'Matching Ligana',
    steps: [
      'Analisa os requisitos essenciais',
      'Identifica os profissionais compatíveis',
      'Avisa os mais adequados',
      'Confirma o interesse deles',
      'Facilita a conexão com a empresa',
    ],
  },
  profiles: [
    {
      name: 'Perfil A',
      status: 'recommended',
      statusLabel: 'Recomendado',
      checks: [
        { ok: true, text: 'Experiência em cozinha' },
        { ok: true, text: 'Disponível sábado à noite' },
        { ok: true, text: 'Mora perto do centro' },
      ],
    },
    {
      name: 'Perfil B',
      status: 'unavailable',
      statusLabel: 'Indisponível no horário',
      checks: [
        { ok: true, text: 'Experiência em cozinha' },
        { ok: false, text: 'Não trabalha aos sábados' },
        { ok: true, text: 'Mora perto do centro' },
      ],
    },
    {
      name: 'Perfil C',
      status: 'missing',
      statusLabel: 'Falta um requisito',
      checks: [
        { ok: false, text: 'Sem experiência em cozinha' },
        { ok: true, text: 'Disponível sábado à noite' },
        { ok: true, text: 'Mora perto do centro' },
      ],
    },
  ],
  profilesLabel: 'Profissionais analisados',
  criteriaTitle: 'O que conta em cada modalidade',
  criteriaIntro: 'A compatibilidade vai considerar os critérios que importam para cada tipo de oportunidade.',
  criteria: [
    {
      title: 'Freelas e trabalhos pontuais',
      examples: 'Diárias, turnos, eventos, coberturas e reforços de última hora',
      items: ['Disponibilidade no dia e horário', 'Localização', 'Habilidades para a função'],
    },
    {
      title: 'Temporários',
      examples: 'Duração definida, demandas sazonais e projetos',
      items: ['Disponibilidade para o período', 'Habilidades e experiência', 'Localização'],
    },
    {
      title: 'Permanentes',
      examples: 'Trabalho contínuo e posições de longo prazo',
      items: ['Experiência', 'Habilidades', 'Condições de trabalho', 'Interesses profissionais'],
    },
  ],
} as const

export const forWorkers = {
  eyebrow: 'Para profissionais',
  title: 'As oportunidades certas encontram você.',
  subtitle:
    'Quer fazer freelas, encontrar trabalhos temporários ou conquistar uma oportunidade permanente? Cadastre seu perfil para participar da primeira fase da Ligana.',
  benefits: [
    {
      icon: 'gift',
      title: 'Cadastro gratuito',
      text: 'Mostre seu interesse sem pagar nada para entrar na lista de pré-lançamento.',
    },
    {
      icon: 'spark',
      title: 'Oportunidades mais relevantes',
      text: 'A Ligana pretende recomendar freelas, temporários e vagas permanentes que façam sentido para o seu perfil.',
    },
    {
      icon: 'check',
      title: 'Você escolhe',
      text: 'Do jeito que a Ligana está sendo planejada, você vai ver as condições antes de aceitar.',
    },
    {
      icon: 'clock',
      title: 'Menos tempo procurando',
      text: 'A ideia é te avisar quando surgir uma oportunidade que combina com você.',
    },
  ],
  cta: 'Quero entrar na lista de profissionais',
  support:
    'Estamos formando nossa primeira comunidade de profissionais em Campo Grande/MS. O cadastro não garante trabalho ou contratação.',
  formTitle: 'Entre para a lista de profissionais',
  formSubtitle: 'É rápido. Marque as opções que combinam com você.',
  submit: 'Quero receber novidades e oportunidades futuras',
  successTitle: 'Seu interesse foi registrado!',
  successText:
    'Estamos preparando a Ligana para conectar profissionais a oportunidades compatíveis. Entraremos em contato quando houver novidades relevantes ou oportunidades de participação na fase inicial.',
  successNoContact:
    'Estamos preparando a Ligana para conectar profissionais a oportunidades compatíveis. Como você preferiu não receber mensagens, não vamos te chamar no WhatsApp.',
}

export const howItWorks = {
  eyebrow: 'Como a Ligana vai funcionar',
  title: 'Simples para os dois lados.',
  intro: 'Este é o funcionamento planejado para o lançamento. Hoje estamos na fase de cadastro de interesse.',
  employer: {
    title: 'Para empresas',
    steps: [
      'Informe de quem você precisa: freela, temporário ou permanente.',
      'A Ligana analisa os requisitos e identifica os profissionais compatíveis.',
      'Os mais adequados são avisados e confirmam se têm interesse.',
      'Receba as recomendações, avalie e avance com a contratação.',
    ],
    cta: 'Quero participar do lançamento',
  },
  worker: {
    title: 'Para profissionais',
    steps: [
      'Cadastre seu perfil e diga que tipo de oportunidade te interessa.',
      'Informe suas habilidades e disponibilidade.',
      'Seja avisado quando surgir uma oportunidade compatível.',
      'Confirme interesse nas oportunidades que quiser.',
    ],
    cta: 'Quero entrar na lista de profissionais',
  },
}

export type FaqItem = { question: string; answer: string }

export const faq: { title: string; employer: FaqItem[]; worker: FaqItem[] } = {
  title: 'Perguntas frequentes',
  employer: [
    {
      question: 'A Ligana já está funcionando?',
      answer:
        'Ainda não. Estamos em pré-lançamento em Campo Grande, cadastrando empresas e profissionais interessados em participar da primeira fase.',
    },
    {
      question: 'Como a Ligana vai funcionar?',
      answer:
        'Você vai informar de quem precisa (um freela, um temporário ou uma contratação permanente), quando, onde e em que condições. A Ligana vai cruzar essas informações com o perfil dos profissionais, avisar os mais compatíveis, confirmar o interesse deles e te apresentar quem topou.',
    },
    {
      question: 'A Ligana é só para freelas?',
      answer:
        'Não. A Ligana está sendo criada para as três situações: freelas e trabalhos pontuais (diárias, turnos, eventos, coberturas), trabalhos temporários e contratações permanentes.',
    },
    {
      question: 'Já existem profissionais cadastrados?',
      answer:
        'Estamos formando agora a primeira base de profissionais. Por isso, nesta fase ainda não fazemos indicações nem garantimos que haverá alguém para cada necessidade.',
    },
    {
      question: 'Quanto vai custar?',
      answer:
        'Cadastrar seu interesse é gratuito. O modelo de cobrança ainda está sendo definido, e sua resposta no formulário ajuda nisso. Nada será cobrado sem você saber e concordar antes.',
    },
    {
      question: 'O que acontece depois do cadastro?',
      answer:
        'Podemos entrar em contato pelo WhatsApp, se você autorizar, para entender melhor suas necessidades e convidar você para a primeira fase. Não há prazo definido de contato.',
    },
  ],
  worker: [
    {
      question: 'Preciso pagar para me cadastrar?',
      answer: 'Não. O cadastro é gratuito.',
    },
    {
      question: 'Posso me cadastrar para freelas e para vagas fixas?',
      answer:
        'Pode. No cadastro, você marca tudo o que te interessa: freelas, trabalhos temporários e oportunidades permanentes.',
    },
    {
      question: 'O cadastro garante trabalho?',
      answer:
        'Não. Estamos formando a primeira lista de profissionais. O cadastro não garante trabalho, contratação nem um número de oportunidades.',
    },
    {
      question: 'Como vou ficar sabendo das oportunidades?',
      answer:
        'Pelo WhatsApp que você informar, se você autorizar o contato no formulário. Nesta fase, avisamos sobre novidades e convites para a primeira fase, não sobre vagas abertas.',
    },
    {
      question: 'Vou poder escolher quando trabalhar?',
      answer:
        'Sim. Você informa seus dias e horários, e no produto planejado cada oportunidade será uma escolha sua.',
    },
    {
      question: 'Quem vai definir o pagamento?',
      answer:
        'O valor de cada trabalho será informado pela empresa, e você poderá ver as condições antes de aceitar. A Ligana não paga nem desconta nada nesta fase.',
    },
  ],
}

export const footer = {
  prelaunch:
    'A Ligana está em pré-lançamento em Campo Grande — MS. A plataforma e o matching ainda estão em desenvolvimento: não divulgamos vagas, não fazemos contratações e não garantimos trabalho, profissionais ou prazos.',
}
