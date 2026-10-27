/**
 * Textos da landing page. Tom: brasileiro, simples, próximo e positivo.
 * Regra: nada de prometer emprego, contratação, renda ou profissionais verificados.
 * Tudo que descreve o produto é o funcionamento PLANEJADO: a Ligana ainda está chegando.
 */

export const hero = {
  badge: 'Em breve em Campo Grande — MS',
  title: 'O trabalho certo encontra a pessoa certa.',
  subtitle:
    'A Ligana está chegando a Campo Grande para conectar quem precisa contratar com quem quer trabalhar. De forma simples, rápida e mais próxima de você.',
  ctaHire: 'Quero contratar',
  ctaWork: 'Quero trabalhar',
  note: 'Cadastro gratuito, leva cerca de 2 minutos. Sem senha.',
}

export const problem = {
  title: 'Encontrar alguém para trabalhar não deveria ser tão difícil.',
  perspectives: [
    {
      audience: 'employer',
      who: 'Para quem contrata',
      quote: 'Preciso de alguém para amanhã. Onde encontro?',
      detail: 'Grupo de WhatsApp, indicação de conhecido, cartaz na porta… e a vaga continua aberta.',
    },
    {
      audience: 'worker',
      who: 'Para quem trabalha',
      quote: 'Estou disponível. Onde encontro uma oportunidade?',
      detail: 'Tem gente com vontade e tempo livre que não fica sabendo de quem está precisando.',
    },
  ],
  conclusion: 'A Ligana nasceu para aproximar essas duas necessidades.',
} as const

export const howItWorks = {
  eyebrow: 'Como a Ligana vai funcionar',
  title: 'Simples para os dois lados.',
  intro: 'É assim que estamos planejando a Ligana. Seu cadastro agora ajuda a gente a acertar no piloto.',
  flows: [
    {
      audience: 'employer',
      title: 'Para quem contrata',
      steps: [
        'Conte de quem você precisa.',
        'Informe quando, onde e quanto pretende pagar.',
        'Receba conexões com profissionais compatíveis.',
        'Converse e combine os próximos passos.',
      ],
    },
    {
      audience: 'worker',
      title: 'Para quem trabalha',
      steps: [
        'Conte o que você sabe fazer.',
        'Informe onde e quando pode trabalhar.',
        'Receba oportunidades compatíveis.',
        'Demonstre interesse e combine diretamente com o contratante.',
      ],
    },
  ],
} as const

export const difference = {
  eyebrow: 'Nosso diferencial',
  title: 'Menos procura. Mais conexão.',
  intro:
    'A Ligana não quer ser só mais um mural de vagas. Em vez de publicar e ficar esperando, a ideia é aproximar as pessoas certas logo de cara.',
  traditional: {
    label: 'Do jeito de sempre',
    steps: ['Publicar', 'Esperar', 'Procurar', 'Filtrar', 'Tentar contratar'],
  },
  ligana: {
    label: 'Do jeito Ligana',
    steps: ['Informar a necessidade', 'Encontrar quem combina', 'Conectar', 'Combinar'],
  },
  criteriaTitle: 'Pra aproximar as pessoas certas, a Ligana vai considerar:',
  criteria: [
    'Tipo de trabalho',
    'Experiência e habilidades',
    'Localização',
    'Disponibilidade',
    'Remuneração',
    'Urgência',
  ],
  support: 'Queremos que a tecnologia faça o trabalho de aproximar as pessoas, sem complicar a vida de ninguém.',
}

export const categories = {
  eyebrow: 'Para começar',
  title: 'Oportunidades do dia a dia da cidade.',
  intro:
    'Estas são as áreas que a Ligana quer atender primeiro em Campo Grande. Seu cadastro mostra pra gente onde está a maior necessidade.',
}

export const signup = {
  eyebrow: 'Faça parte do começo',
  title: 'Cadastre seu interesse.',
  intro:
    'A Ligana ainda não está funcionando. Estamos montando a lista do piloto em Campo Grande. Escolha seu caminho:',
  employer: {
    tab: 'Quero contratar',
    tabHint: 'Preciso de profissionais',
    title: 'Quero encontrar profissionais pela Ligana.',
    subtitle: 'Conte o que você costuma precisar. Assim a gente prepara a Ligana pro seu dia a dia.',
  },
  worker: {
    tab: 'Quero trabalhar',
    tabHint: 'Busco oportunidades',
    title: 'Quero receber oportunidades pela Ligana.',
    subtitle: 'Conte o que você sabe fazer e quando pode trabalhar. Leva só uns minutinhos.',
  },
}

export const closing = {
  title: 'Boas oportunidades começam com boas conexões.',
  text: 'Seja para encontrar alguém para trabalhar ou descobrir uma nova forma de ganhar dinheiro, queremos aproximar você da oportunidade certa.',
  tagline: 'Quem precisa encontra. Quem trabalha ganha.',
}

export const footer = {
  prelaunch:
    'A Ligana está em pré-lançamento. Ainda não realizamos contratações, não intermediamos pagamentos e não garantimos vagas ou profissionais.',
}
