export type CourseCategory = 'GRADUACAO' | 'POS_GRADUACAO' | 'TECNICO' | 'PROFISSIONALIZANTE';
export type Institution = 'IBESC' | 'UNINASSAU' | 'UNIFAEL';

export interface Course {
  id: string;
  name: string;
  slug: string;
  category: CourseCategory;
  type: string;
  institution: Institution | Institution[];
  area: string;
  modality?: string;
  duration?: string;
  description: string;
  image?: string;
  status: string;
  featured?: boolean;
  local?: string;
  startDate?: string;
  whatsapp?: string;
  externalUrl?: string;
}

export const partnerCatalogs = {
  uninassauGraduacao: {
    institution: 'UNINASSAU' as const,
    label: 'Graduação UNINASSAU',
    url: 'https://graduacao.uninassau.digital/nossos-cursos',
  },
  uninassauPos: {
    institution: 'UNINASSAU' as const,
    label: 'Pós-graduação Digital UNINASSAU',
    url: 'https://ead.uninassau.edu.br/pos-digital',
  },
  unifaelPos: {
    institution: 'UNIFAEL' as const,
    label: 'Pós-graduação Digital UNIFAEL — Polo Boa Viagem',
    url: 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital',
  },
};

export const courses: Course[] = [
  {
    id: '1', name: 'Enfermagem', slug: 'enfermagem', category: 'GRADUACAO', type: 'Bacharelado',
    institution: 'UNINASSAU', area: 'Saúde',
    description: 'Formação superior para quem deseja construir uma trajetória profissional na área da saúde.',
    status: 'Ativo', featured: true, externalUrl: partnerCatalogs.uninassauGraduacao.url,
  },
  {
    id: '2', name: 'Administração', slug: 'administracao', category: 'GRADUACAO', type: 'Bacharelado',
    institution: 'UNINASSAU', area: 'Negócios',
    description: 'Formação para desenvolver competências de gestão, negócios e liderança.',
    status: 'Ativo', featured: true, externalUrl: partnerCatalogs.uninassauGraduacao.url,
  },
  {
    id: '3', name: 'Pedagogia', slug: 'pedagogia', category: 'GRADUACAO', type: 'Licenciatura',
    institution: 'UNINASSAU', area: 'Educação',
    description: 'Formação superior para atuação em diferentes contextos educacionais.',
    status: 'Ativo', featured: true, externalUrl: partnerCatalogs.uninassauGraduacao.url,
  },
  {
    id: '4', name: 'Técnico em Enfermagem', slug: 'tecnico-em-enfermagem', category: 'TECNICO', type: 'Curso Técnico',
    institution: 'IBESC', area: 'Saúde',
    description: 'Prepare-se para novas oportunidades profissionais com uma formação técnica e prática.',
    status: 'Ativo', featured: true,
  },
  {
    id: '5', name: 'Técnico em Informática', slug: 'tecnico-em-informatica', category: 'TECNICO', type: 'Curso Técnico',
    institution: 'IBESC', area: 'Tecnologia',
    description: 'Desenvolva conhecimentos técnicos para atuar com tecnologia, suporte e informática.',
    status: 'Ativo', featured: true,
  },
  {
    id: '6', name: 'Pós-graduação', slug: 'pos-graduacao', category: 'POS_GRADUACAO', type: 'Especialização',
    institution: ['UNINASSAU', 'UNIFAEL'], area: 'Diversas áreas',
    description: 'Encontre opções de especialização oferecidas pelas instituições parceiras do IBESC.',
    status: 'Ativo', featured: true,
  },
];

export const areas = ['Saúde', 'Negócios', 'Tecnologia', 'Educação', 'Direito', 'Gestão', 'Comunicação', 'Outras áreas'];
