export type Feature = {
  id: string
  title: string
  description: string
  bullets: string[]
  image: string
  imageAlt: string
}

export type ModuleItem = {
  title: string
  description: string
}

export type Plan = {
  name: string
  price: string
  note: string
  featured?: boolean
  items: string[]
}

export type FaqItem = {
  question: string
  answer: string
}

export const site = {
  name: 'Sanavita',
  tagline: 'Gestão inteligente para clínicas',
  url: 'https://sanavita.com.br',
  email: 'comercial@sanavita.com.br',
  phone: '(11) 4000-0000',
}

export const stats = [
  { value: '1 sistema', label: 'para toda a operação' },
  { value: 'Multi-clínica', label: 'unidades no mesmo login' },
  { value: '30 min', label: 'slots de agenda padrão' },
  { value: 'Perfis', label: 'recepção, médico e gestão' },
]

export const audiences = [
  {
    title: 'Recepção',
    text: 'Agenda com horários livres, paciente e plano de saúde no mesmo fluxo — sem ligar para confirmar disponibilidade.',
  },
  {
    title: 'Corpo clínico',
    text: 'Agenda por especialidade, valores de consulta e atendimento com visão clara do paciente.',
  },
  {
    title: 'Gestão',
    text: 'Clínicas, usuários, permissões e financeiro centralizados para decidir com dados reais.',
  },
]

export const steps = [
  {
    title: 'Cadastre a clínica e a equipe',
    text: 'Unidades, especialidades, médicos e perfis de acesso em minutos.',
  },
  {
    title: 'Organize a agenda',
    text: 'Defina dias e horários de atendimento. O sistema só oferece slots livres.',
  },
  {
    title: 'Atenda e acompanhe',
    text: 'Do agendamento ao financeiro — status, valores e histórico no mesmo lugar.',
  },
]

export const features: Feature[] = [
  {
    id: 'agenda',
    title: 'Agenda que respeita a rotina da clínica',
    description:
      'Horários livres do médico, bloqueio só do slot ocupado e visão clara do dia. Menos conflito, mais consultas confirmadas.',
    bullets: [
      'Disponibilidade por dia da semana',
      'Slots a cada 30 minutos',
      'Ocupação pontual, sem zerar o dia',
    ],
    image: '/screenshots/agenda.png',
    imageAlt: 'Tela de agenda diária do Sanavita',
  },
  {
    id: 'consultas',
    title: 'Agendamento completo em poucos cliques',
    description:
      'Paciente, plano de saúde, especialidade, médico, valor e horário — tudo no mesmo fluxo, com regras de disponibilidade.',
    bullets: [
      'Plano do paciente ou particular',
      'Valor da especialidade automático',
      'Validação de horário livre',
    ],
    image: '/screenshots/agendar-consulta.png',
    imageAlt: 'Tela de agendar nova consulta',
  },
  {
    id: 'atendimento',
    title: 'Atendimento com visão 360º',
    description:
      'Detalhes da consulta, dados do paciente, médico responsável e informações financeiras em um painel objetivo.',
    bullets: [
      'Status da consulta em tempo real',
      'Dados clínicos e financeiros juntos',
      'Ações de check-in e atendimento',
    ],
    image: '/screenshots/consulta-detalhe.png',
    imageAlt: 'Detalhe da consulta no Sanavita',
  },
  {
    id: 'clinicas',
    title: 'Multi-clínica sem complicação',
    description:
      'Gerencie unidades, especialidades, equipe e operação em um único sistema — com troca rápida de contexto.',
    bullets: [
      'Troca de clínica no topo',
      'Busca e filtros rápidos',
      'Especialidades por unidade',
    ],
    image: '/screenshots/clinicas.png',
    imageAlt: 'Lista de clínicas no Sanavita',
  },
  {
    id: 'usuarios',
    title: 'Usuários e perfis sob controle',
    description:
      'Recepcionista, médico, gestor e proprietário com permissões claras. Segurança sem travar o dia a dia.',
    bullets: [
      'Lista com status e contato',
      'Perfis coloridos e legíveis',
      'Gestão centralizada da equipe',
    ],
    image: '/screenshots/usuarios-lista.png',
    imageAlt: 'Lista de usuários do sistema',
  },
  {
    id: 'acessos',
    title: 'Acessos pensados para o corpo clínico',
    description:
      'Perfis clínicos e administrativos prontos para a realidade da clínica, com vínculo por unidade.',
    bullets: [
      'Administrador, gerente, recepção',
      'Perfis clínicos por especialidade',
      'Vínculo a uma ou mais clínicas',
    ],
    image: '/screenshots/perfis-acesso.png',
    imageAlt: 'Configuração de perfis de acesso',
  },
]

export const modules: ModuleItem[] = [
  {
    title: 'Pacientes',
    description: 'Cadastro, plano de saúde, histórico e prontuário em evolução.',
  },
  {
    title: 'Consultas',
    description: 'Do agendamento ao check-in, atendimento e conclusão.',
  },
  {
    title: 'Corpo clínico',
    description: 'Agenda, especialidades e valores por profissional.',
  },
  {
    title: 'Exames',
    description: 'Solicitação, status e vínculo com o paciente.',
  },
  {
    title: 'Financeiro',
    description: 'Valores de consulta, descontos e contas a receber.',
  },
  {
    title: 'Gestão',
    description: 'Clínicas, usuários, especialidades e configurações.',
  },
]

export const benefits = [
  {
    title: 'Menos retrabalho na recepção',
    text: 'Agenda e disponibilidade do médico já filtradas — a equipe agenda com confiança.',
  },
  {
    title: 'Operação unificada',
    text: 'Pacientes, consultas, equipe e finanças no mesmo ambiente, sem planilhas paralelas.',
  },
  {
    title: 'Pronto para crescer',
    text: 'Multi-unidade e perfis de acesso acompanham a expansão da sua rede de clínicas.',
  },
]

export const plans: Plan[] = [
  {
    name: 'Essencial',
    price: 'Sob consulta',
    note: 'Clínicas em operação enxuta',
    items: [
      '1 unidade',
      'Agendamentos e pacientes',
      'Usuários com perfis',
      'Suporte por e-mail',
    ],
  },
  {
    name: 'Clínica',
    price: 'Sob consulta',
    note: 'O mais escolhido',
    featured: true,
    items: [
      'Multi-clínica',
      'Corpo clínico e agenda',
      'Financeiro básico',
      'Onboarding assistido',
    ],
  },
  {
    name: 'Rede',
    price: 'Sob consulta',
    note: 'Grupos e expansão',
    items: [
      'Várias unidades',
      'Governança de acessos',
      'Prioridade de suporte',
      'Roadmap sob demanda',
    ],
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'O Sanavita substitui planilhas e sistemas separados?',
    answer:
      'Sim. O objetivo é concentrar agenda, pacientes, equipe, consultas e financeiro em um único ambiente web, reduzindo retrabalho e inconsistências.',
  },
  {
    question: 'Funciona para mais de uma unidade?',
    answer:
      'Sim. O sistema é multi-clínica: a equipe troca o contexto da unidade no topo e mantém cadastros, agendas e permissões organizados.',
  },
  {
    question: 'Dá para controlar o que cada perfil acessa?',
    answer:
      'Sim. Há perfis para recepção, gestão, corpo clínico e proprietário, com vínculo por clínica e permissões alinhadas à rotina.',
  },
  {
    question: 'Como funciona a agenda dos médicos?',
    answer:
      'Você cadastra os dias e horários de atendimento. Na hora de agendar, o sistema mostra apenas slots livres — um horário ocupado não bloqueia o restante do dia.',
  },
  {
    question: 'Posso pedir uma demonstração?',
    answer:
      'Pode. Preencha o formulário de contato com os dados da clínica. O time comercial retorna para agendar uma apresentação guiada.',
  },
]
