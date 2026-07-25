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
  id: string
  category: string
  question: string
  answer: string
  bullets?: string[]
  tip?: string
  image?: string
  imageAlt?: string
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
  { value: 'BI integrado', label: 'indicadores e relatórios' },
  { value: 'Multi-clínica', label: 'unidades no mesmo login' },
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
    text: 'Clínicas, usuários, permissões, financeiro e BI no mesmo lugar — indicadores reais para decidir com segurança.',
  },
]

export type Step = {
  title: string
  subtitle: string
  text: string
  audience: string
  bullets: string[]
  tip: string
  image: string
  imageAlt: string
}

export const howItWorksIntro = {
  eyebrow: 'Como funciona',
  title: 'Simples de implantar. Fácil de usar no dia a dia.',
  lead:
    'Em poucos passos a clínica deixa planilhas e anotações de lado. O Sanavita acompanha o fluxo real: cadastrar, agendar, atender e acompanhar resultados no BI — com telas claras para recepção, médicos e gestão.',
}

export const steps: Step[] = [
  {
    title: 'Prepare a clínica e a equipe',
    subtitle: 'Começo organizado',
    text: 'Cadastre a unidade, especialidades e profissionais. Defina quem é recepcionista, médico ou gestor — cada pessoa entra com o acesso certo, sem complicação.',
    audience: 'Ideal para o gestor na implantação',
    bullets: [
      'Uma ou várias clínicas no mesmo sistema',
      'Perfis prontos: recepção, clínico e administração',
      'Especialidades e valores vinculados à operação',
    ],
    tip: 'Dica amigável: comece por uma unidade e um turno. Em poucos dias a equipe já opera com segurança.',
    image: '/screenshots/clinicas.png',
    imageAlt: 'Lista de clínicas no Sanavita',
  },
  {
    title: 'Configure a agenda dos médicos',
    subtitle: 'Horários que fazem sentido',
    text: 'Informe os dias e períodos em que cada profissional atende. Na hora de marcar, o Sanavita mostra só os horários livres — um horário ocupado não bloqueia o restante do dia.',
    audience: 'Pensado para recepção e corpo clínico',
    bullets: [
      'Agenda por médico e especialidade',
      'Slots a cada 30 minutos',
      'Menos conflito e menos ligação “só para confirmar”',
    ],
    tip: 'Dica amigável: cadastre a rotina real (ex.: seg/qua/sex 8h–17h). O sistema faz o resto.',
    image: '/screenshots/agenda.png',
    imageAlt: 'Agenda diária no Sanavita',
  },
  {
    title: 'Agende a consulta em um fluxo só',
    subtitle: 'Recepção sem fricção',
    text: 'Escolha o paciente, o plano (ou particular), a especialidade, o médico, a data e o horário. O valor da consulta pode vir automaticamente da especialidade — tudo na mesma tela.',
    audience: 'O dia a dia da recepção',
    bullets: [
      'Paciente e plano de saúde no mesmo cadastro',
      'Só horários disponíveis aparecem',
      'Valor e desconto com máscara monetária',
    ],
    tip: 'Dica amigável: em poucos cliques a consulta está marcada e a equipe segue para o próximo atendimento.',
    image: '/screenshots/agendar-consulta.png',
    imageAlt: 'Tela de agendar nova consulta',
  },
  {
    title: 'Atenda com visão completa do paciente',
    subtitle: 'Do check-in ao financeiro',
    text: 'No atendimento, a equipe vê status da consulta, dados do paciente, médico responsável e detalhes financeiros. Check-in, início e conclusão ficam registrados no mesmo painel.',
    audience: 'Atendimento e gestão lado a lado',
    bullets: [
      'Status claros: agendada, em andamento, concluída…',
      'Dados do paciente e do médico na mesma tela',
      'Valores e plano de saúde à vista',
    ],
    tip: 'Dica amigável: menos troca de sistema, mais tempo para cuidar do paciente.',
    image: '/screenshots/consulta-detalhe.png',
    imageAlt: 'Detalhe da consulta no Sanavita',
  },
  {
    title: 'Gerencie acessos e acompanhe a operação',
    subtitle: 'Controle sem burocracia',
    text: 'Acompanhe usuários, perfis e permissões. A gestão enxerga quem está ativo, quem atende e o que cada perfil pode fazer — com segurança e clareza para crescer.',
    audience: 'Para quem lidera a clínica',
    bullets: [
      'Lista de usuários com status e contato',
      'Perfis clínicos e administrativos',
      'Pronto para expandir para novas unidades',
    ],
    tip: 'Dica amigável: permissões certas evitam erro e protegem os dados da clínica.',
    image: '/screenshots/usuarios-lista.png',
    imageAlt: 'Lista de usuários no Sanavita',
  },
  {
    title: 'Acompanhe resultados com BI integrado',
    subtitle: 'Dados que orientam a gestão',
    text: 'Sem planilha paralela: o Sanavita traz Business Intelligence dentro do próprio sistema. Veja ocupação, produtividade, fluxo de caixa e despesas por categoria — e exporte quando precisar apresentar o mês.',
    audience: 'Para gestores e donos de clínica',
    bullets: [
      'Painéis operacional e financeiro na mesma tela',
      'Indicadores de agenda, receita e contas',
      'Exportação de relatórios para Excel e PDF',
    ],
    tip: 'Dica amigável: use o BI na reunião semanal — a conversa muda quando o número aparece na hora.',
    image: '/screenshots/bi-dashboard.png',
    imageAlt: 'Painel de BI do Sanavita com indicadores e gráficos',
  },
]

export const howItWorksClose = {
  title: 'Pronto para ver na prática?',
  text: 'Agende uma demonstração e percorra esse fluxo com a realidade da sua clínica — sem compromisso e com linguagem simples para toda a equipe.',
  cta: 'Quero uma demonstração guiada',
}

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
  {
    id: 'bi',
    title: 'BI integrado para decidir com dados',
    description:
      'Business Intelligence nativo: indicadores de operação e financeiro no mesmo sistema da agenda — sem ferramenta à parte nem planilha solta.',
    bullets: [
      'KPIs de receita, despesas e lucro',
      'Fluxo de caixa e despesas por categoria',
      'Relatórios exportáveis (Excel e PDF)',
    ],
    image: '/screenshots/bi-dashboard.png',
    imageAlt: 'Dashboard de BI do Sanavita com fluxo de caixa e categorias',
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
    description: 'Contas a pagar/receber, despesas, repasses e fluxo de caixa.',
  },
  {
    title: 'BI e relatórios',
    description:
      'Indicadores operacionais e financeiros, gráficos e exportação de relatórios.',
  },
]

export const benefits = [
  {
    title: 'Menos retrabalho na recepção',
    text: 'Agenda e disponibilidade do médico já filtradas — a equipe agenda com confiança.',
  },
  {
    title: 'Operação unificada',
    text: 'Pacientes, consultas, equipe, finanças e BI no mesmo ambiente, sem planilhas paralelas.',
  },
  {
    title: 'Gestão com indicadores',
    text: 'BI integrado mostra ocupação, produtividade e saúde financeira — para decidir com dados, não com feeling.',
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
      'Financeiro + BI integrado',
      'Onboarding assistido',
    ],
  },
  {
    name: 'Rede',
    price: 'Sob consulta',
    note: 'Grupos e expansão',
    items: [
      'Várias unidades',
      'BI e relatórios avançados',
      'Governança de acessos',
      'Prioridade de suporte',
    ],
  },
]

export const faqIntro = {
  eyebrow: 'FAQ',
  title: 'Dúvidas comuns, respostas claras — com print do sistema.',
  lead:
    'Reunimos o que gestores, recepção e médicos mais perguntam na primeira conversa. Abra cada item para ver a explicação em linguagem simples e, quando fizer sentido, a tela real do Sanavita.',
}

export const faqCategories = [
  'Visão geral',
  'Agenda e consultas',
  'Equipe e acessos',
  'Multi-clínica',
  'BI e financeiro',
  'Começar',
] as const

export const faqs: FaqItem[] = [
  {
    id: 'substitui-planilhas',
    category: 'Visão geral',
    question: 'O Sanavita substitui planilhas e vários sistemas?',
    answer:
      'Sim. A ideia é concentrar agenda, pacientes, equipe, consultas, financeiro e BI em um único ambiente web — sem ficar copiando informação de um lugar para o outro.',
    bullets: [
      'Menos retrabalho entre recepção e gestão',
      'Histórico do paciente no mesmo fluxo da consulta',
      'Indicadores e relatórios sem planilha paralela',
    ],
    tip: 'Dica amigável: na demonstração mostramos o seu fluxo real (recepção → consulta → conclusão) para ficar fácil de comparar com o que você usa hoje.',
    image: '/screenshots/consulta-detalhe.png',
    imageAlt: 'Detalhe da consulta com dados do paciente e valores',
  },
  {
    id: 'para-quem',
    category: 'Visão geral',
    question: 'Para quem o Sanavita faz mais sentido?',
    answer:
      'Clínicas que querem organizar a operação sem complicar a equipe: recepção marcando com segurança, médicos com agenda clara e gestão enxergando unidades, acessos e rotina.',
    bullets: [
      'Clínicas com uma ou várias unidades',
      'Equipes mistas (recepção, clínico e administração)',
      'Quem quer sair de planilha / WhatsApp / sistemas soltos',
    ],
    tip: 'Se a sua dor é “agenda bagunçada” ou “ninguém sabe o status da consulta”, você está no público certo.',
  },
  {
    id: 'agenda-medicos',
    category: 'Agenda e consultas',
    question: 'Como funciona a agenda dos médicos?',
    answer:
      'Você cadastra os dias e períodos em que cada profissional atende. Na hora de marcar, o Sanavita mostra só os horários livres. Um slot ocupado não invalida o restante do dia.',
    bullets: [
      'Agenda por médico e especialidade',
      'Slots padrão de 30 minutos',
      'Menos conflito e menos “liga só para confirmar”',
    ],
    tip: 'Dica amigável: cadastre a rotina real (ex.: seg/qua/sex 8h–17h). O sistema faz o filtro dos horários disponíveis.',
    image: '/screenshots/agenda.png',
    imageAlt: 'Agenda diária com horários no Sanavita',
  },
  {
    id: 'agendar-consulta',
    category: 'Agenda e consultas',
    question: 'O agendamento é complicado para a recepção?',
    answer:
      'Não. Em um fluxo só você escolhe paciente, plano (ou particular), especialidade, médico, data e horário. O valor da consulta pode vir automaticamente da especialidade.',
    bullets: [
      'Só aparecem horários disponíveis',
      'Plano de saúde ou particular na mesma tela',
      'Valor e desconto com preenchimento simples',
    ],
    tip: 'A recepção ganha velocidade sem abrir mão do controle — e o médico vê a agenda organizada.',
    image: '/screenshots/agendar-consulta.png',
    imageAlt: 'Tela de agendar nova consulta',
  },
  {
    id: 'status-consulta',
    category: 'Agenda e consultas',
    question: 'Consigo acompanhar o status de cada consulta?',
    answer:
      'Sim. Do agendamento ao atendimento, a equipe vê status claros (agendada, em andamento, concluída…) junto com paciente, médico e detalhes financeiros.',
    bullets: [
      'Check-in e andamento no mesmo painel',
      'Dados do paciente à mão no atendimento',
      'Valores e plano visíveis para a gestão',
    ],
    tip: 'Menos “em qual sistema está?” — tudo no mesmo lugar.',
    image: '/screenshots/consulta-detalhe.png',
    imageAlt: 'Painel de detalhe da consulta',
  },
  {
    id: 'perfis-acesso',
    category: 'Equipe e acessos',
    question: 'Dá para controlar o que cada pessoa acessa?',
    answer:
      'Sim. Existem perfis para recepção, gestão, corpo clínico e proprietário, com vínculo por clínica. Cada pessoa entra com o que precisa — sem expor o que não precisa.',
    bullets: [
      'Perfis alinhados à rotina da clínica',
      'Vínculo de usuário por unidade',
      'Menos risco de erro por acesso indevido',
    ],
    tip: 'Dica amigável: comece com poucos perfis bem definidos; depois refine conforme a equipe cresce.',
    image: '/screenshots/perfis-acesso.png',
    imageAlt: 'Tela de perfis e acessos no Sanavita',
  },
  {
    id: 'usuarios',
    category: 'Equipe e acessos',
    question: 'Como a gestão acompanha a equipe no sistema?',
    answer:
      'Há visão de usuários com status, contato e perfil. Fica claro quem está ativo, quem atende e o que cada um pode fazer — útil na implantação e no dia a dia.',
    bullets: [
      'Lista de usuários com filtros rápidos',
      'Status ativo / inativo',
      'Base pronta para expandir a equipe',
    ],
    image: '/screenshots/usuarios-lista.png',
    imageAlt: 'Lista de usuários da clínica',
  },
  {
    id: 'multi-clinica',
    category: 'Multi-clínica',
    question: 'Funciona para mais de uma unidade?',
    answer:
      'Sim. O Sanavita é multi-clínica: a equipe troca o contexto da unidade no topo e mantém cadastros, agendas, especialidades e permissões organizados por clínica.',
    bullets: [
      'Troca rápida de unidade',
      'Especialidades e operação por clínica',
      'Governança de acessos para redes',
    ],
    tip: 'Ideal para quem tem mais de um endereço ou está planejando crescer sem trocar de sistema.',
    image: '/screenshots/clinicas.png',
    imageAlt: 'Lista de clínicas no Sanavita',
  },
  {
    id: 'bi-integrado',
    category: 'BI e financeiro',
    question: 'O Sanavita tem BI / relatórios de gestão?',
    answer:
      'Sim — e já vem integrado ao sistema. Você acompanha indicadores operacionais e financeiros (receita, despesas, fluxo de caixa, categorias, ocupação) sem contratar outra ferramenta de analytics.',
    bullets: [
      'Painéis com KPIs e gráficos no próprio Sanavita',
      'Visão financeira alinhada a contas a pagar/receber',
      'Exportação de relatórios para Excel e PDF',
    ],
    tip: 'Dica amigável: na demonstração abrimos o BI com o período da sua clínica — fica fácil ver o valor na prática.',
    image: '/screenshots/bi-dashboard.png',
    imageAlt: 'Tela de Business Intelligence do Sanavita',
  },
  {
    id: 'implantacao',
    category: 'Começar',
    question: 'A implantação é demorada ou “pesada”?',
    answer:
      'Não precisa ser. O caminho mais leve é começar por uma unidade, cadastrar especialidades e agendas, e treinar a recepção no fluxo de marcar consulta. Em poucos dias a rotina já anda.',
    bullets: [
      'Comece pequeno e evolua com segurança',
      'Telas pensadas para o dia a dia (não só para TI)',
      'Demonstração guiada com o seu cenário',
    ],
    tip: 'Dica amigável: na demo, traga 1 médico e 1 turno reais — fica muito mais concreto.',
  },
  {
    id: 'demonstracao',
    category: 'Começar',
    question: 'Posso pedir uma demonstração sem compromisso?',
    answer:
      'Pode — e deve. Preencha o formulário de contato com os dados da clínica. O time comercial retorna para agendar uma apresentação guiada, no seu ritmo.',
    bullets: [
      'Sem compromisso comercial na primeira conversa',
      'Foco na operação da sua clínica',
      'Respostas objetivas para gestores e equipe',
    ],
    tip: 'Use o formulário em Contato ou o botão abaixo — respondemos com horário sugerido.',
  },
]

export const faqClose = {
  title: 'Ainda ficou alguma dúvida?',
  text: 'Conte o tamanho da clínica e o que mais dói hoje (agenda, acessos, multi-unidade…). Montamos a demonstração em cima disso.',
  cta: 'Falar com o time Sanavita',
}
