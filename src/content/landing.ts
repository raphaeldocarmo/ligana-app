/**
 * Textos da landing page. Tom: brasileiro, simples, próximo e confiável.
 *
 * Regras (estamos validando o negócio, não vendendo um marketplace pronto):
 * - nada de prometer emprego, contratação, renda, prazo de atendimento ou comparecimento;
 * - nada de depoimentos, números ou avaliações que não existem;
 * - nada de "matching automático", pagamento integrado ou verificação: a operação é assistida.
 */

export const nav = {
  employer: 'Para empresas',
  employerShort: 'Empresas',
  worker: 'Para profissionais',
  workerShort: 'Profissionais',
  cta: 'Preciso de profissionais',
}

export const hero = {
  badge: 'Começando por Campo Grande — MS',
  title: 'Quem precisa de trabalho encontra. Quem precisa de gente também.',
  subtitle:
    'A Ligana aproxima empresas e profissionais para oportunidades de trabalho por diária, temporárias e agendadas. Estamos começando por Campo Grande/MS.',
  ctaHire: 'Quero contratar profissionais',
  ctaWork: 'Quero encontrar trabalho',
  note: 'Cadastro gratuito e rápido, sem senha.',
}

export const forCompanies = {
  eyebrow: 'Para empresas',
  title: 'Precisando de reforço na sua equipe?',
  subtitle:
    'Encontre profissionais interessados em trabalhar por diária ou em demandas pontuais, sem depender apenas de indicações e grupos de mensagens.',
  benefits: [
    {
      icon: 'clock',
      title: 'Menos tempo procurando',
      text: 'Informe sua necessidade e deixe a Ligana ajudar a identificar profissionais interessados.',
    },
    {
      icon: 'calendar',
      title: 'Contratação conforme sua demanda',
      text: 'Encontre pessoas para diárias, reforços de fim de semana ou períodos específicos.',
    },
    {
      icon: 'list',
      title: 'Mais informações para decidir',
      text: 'Conheça experiência, disponibilidade e expectativas dos profissionais antes de avançar.',
    },
    {
      icon: 'chat',
      title: 'Atendimento próximo',
      text: 'Estamos começando com uma operação assistida para entender e atender melhor cada solicitação.',
    },
  ],
  cta: 'Preciso de profissionais',
  formTitle: 'Conte o que você precisa',
  formSubtitle: 'Leva uns 2 minutos. A gente usa essas respostas para buscar pessoas com o perfil certo.',
  submit: 'Enviar minha solicitação',
  successTitle: 'Pronto! Recebemos sua solicitação.',
  successText:
    'Nossa equipe vai entrar em contato pelo WhatsApp informado conforme a disponibilidade da operação neste começo. Ainda não conseguimos garantir prazo de atendimento.',
  successNoContact:
    'Como você preferiu não receber mensagens, não vamos te chamar no WhatsApp. Se mudar de ideia, é só preencher de novo marcando a autorização.',
}

export const forWorkers = {
  eyebrow: 'Para profissionais',
  title: 'Seu próximo trabalho pode estar mais perto do que você imagina.',
  subtitle:
    'Cadastre seu interesse para receber informações sobre oportunidades de trabalho compatíveis com sua experiência e disponibilidade.',
  benefits: [
    { icon: 'gift', title: 'Cadastro gratuito', text: 'Você não paga nada para mostrar seu interesse.' },
    { icon: 'spark', title: 'Mais oportunidades', text: 'Receba informações sobre trabalhos que combinam com você.' },
    {
      icon: 'check',
      title: 'Você escolhe',
      text: 'Veja local, horário, atividade e pagamento antes de aceitar.',
    },
    { icon: 'clock', title: 'Flexibilidade', text: 'Diga quando e onde você pode trabalhar.' },
  ],
  cta: 'Quero receber oportunidades',
  formTitle: 'Faça seu cadastro',
  formSubtitle: 'É rápido. Marque as opções que combinam com você.',
  submit: 'Quero receber oportunidades',
  successTitle: 'Pronto! Seu cadastro foi registrado.',
  successText:
    'Quando aparecer uma oportunidade que combina com você, podemos te chamar pelo WhatsApp informado. O cadastro não garante trabalho nem contratação imediata.',
  successNoContact:
    'Como você preferiu não receber mensagens, não vamos te chamar no WhatsApp. O cadastro não garante trabalho nem contratação imediata.',
}

export const howItWorks = {
  eyebrow: 'Como funciona',
  title: 'Simples para os dois lados.',
  intro: 'Neste começo, a Ligana funciona de forma assistida: nossa equipe acompanha cada pedido de perto.',
  employer: {
    title: 'Para empresas',
    steps: [
      'Conte o que precisa.',
      'A Ligana busca profissionais compatíveis.',
      'Você avalia as indicações e combina as condições do trabalho.',
    ],
    cta: 'Preciso de profissionais',
  },
  worker: {
    title: 'Para profissionais',
    steps: [
      'Cadastre seu perfil.',
      'Informe sua experiência e disponibilidade.',
      'Receba informações sobre oportunidades e escolha se quer participar.',
    ],
    cta: 'Quero receber oportunidades',
  },
}

export type FaqItem = { question: string; answer: string }

export const faq: { title: string; employer: FaqItem[]; worker: FaqItem[] } = {
  title: 'Perguntas frequentes',
  employer: [
    {
      question: 'Como a Ligana funciona?',
      answer:
        'Você conta de quem precisa, quando e em que condições. Nossa equipe procura, entre as pessoas cadastradas, quem tem o perfil e a disponibilidade certos, e te apresenta pelo WhatsApp. Neste começo, tudo é feito com acompanhamento da equipe.',
    },
    {
      question: 'Já existem profissionais disponíveis?',
      answer:
        'Estamos formando agora a primeira lista de profissionais em Campo Grande. Por isso, ainda não conseguimos garantir que teremos alguém para todo pedido. Cada solicitação ajuda a gente a saber quem procurar.',
    },
    {
      question: 'Quanto custa utilizar?',
      answer:
        'Enviar sua solicitação é gratuito. Ainda estamos definindo se e como a Ligana vai cobrar pela intermediação, e nada será cobrado sem você saber e concordar antes.',
    },
    {
      question: 'Como acontece a contratação?',
      answer:
        'Depois da indicação, você conversa com o profissional e vocês combinam diretamente as condições: dia, horário, atividade e pagamento. A Ligana não é a empregadora e não faz pagamentos nesta fase.',
    },
    {
      question: 'A Ligana garante o comparecimento?',
      answer:
        'Não. Indicamos pessoas que demonstraram interesse e disponibilidade, mas o compromisso é combinado entre você e o profissional.',
    },
  ],
  worker: [
    {
      question: 'Preciso pagar para me cadastrar?',
      answer: 'Não. O cadastro é gratuito.',
    },
    {
      question: 'O cadastro garante trabalho?',
      answer:
        'Não. O cadastro serve para a gente saber o que você sabe fazer e quando pode trabalhar. Quando aparecer algo que combina com você, avisamos.',
    },
    {
      question: 'Como vou receber as oportunidades?',
      answer:
        'Pelo WhatsApp que você informar, se você autorizar o contato no formulário. Não mandamos mensagens para quem não autorizou.',
    },
    {
      question: 'Posso escolher quando trabalhar?',
      answer:
        'Sim. Você informa seus dias e horários, e cada oportunidade é uma escolha sua. Pode recusar sem problema.',
    },
    {
      question: 'Quem define o pagamento?',
      answer:
        'O valor é combinado entre você e a empresa antes do trabalho. Você fica sabendo do pagamento antes de aceitar. A Ligana não paga nem desconta nada nesta fase.',
    },
  ],
}

export const footer = {
  prelaunch:
    'A Ligana está em pré-lançamento, com operação assistida em Campo Grande — MS. Ainda não garantimos vagas, profissionais, prazos ou comparecimento, não somos empregadora e não intermediamos pagamentos.',
}
