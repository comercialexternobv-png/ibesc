export type CourseCategory = 'GRADUACAO' | 'POS_GRADUACAO' | 'TECNICO' | 'PROFISSIONALIZANTE';
export type Institution = 'IBESC' | 'UNINASSAU' | 'UNIFAEL';

export interface Course {
  id: string; name: string; slug: string; category: CourseCategory; type: string;
  institution: Institution | Institution[]; area: string; modality?: string; duration?: string;
  description: string; image?: string; status: 'ATIVO' | 'INATIVO' | 'EM_BREVE'; featured?: boolean;
  local?: string; startDate?: string; whatsapp?: string; externalUrl?: string; attendanceInfo?: string;
}

export const partnerCatalogs = {
  uninassauGraduacao: { institution: 'UNINASSAU' as const, label: 'Graduação UNINASSAU', url: 'https://graduacao.uninassau.digital/nossos-cursos' },
  uninassauPos: { institution: 'UNINASSAU' as const, label: 'Pós-graduação Digital UNINASSAU', url: 'https://ead.uninassau.edu.br/pos-digital' },
  unifaelPos: { institution: 'UNIFAEL' as const, label: 'Pós-graduação Digital UNIFAEL — Polo Boa Viagem', url: 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital' },
};

const grad = (id: string, name: string, slug: string, type: string, area: string, description: string, attendanceInfo?: string): Course => ({
  id, name, slug, category: 'GRADUACAO', type, institution: 'UNINASSAU', area, description,
  status: 'ATIVO', externalUrl: partnerCatalogs.uninassauGraduacao.url, attendanceInfo,
});

export const courses: Course[] = [
  grad('grad-001', 'Enfermagem', 'enfermagem', 'Bacharelado', 'Saúde', 'Formação superior para quem deseja construir uma trajetória profissional na área da saúde.'),
  grad('grad-002', 'Administração', 'administracao', 'Bacharelado', 'Negócios', 'Formação para desenvolver competências de gestão, negócios e liderança.'),
  grad('grad-003', 'Pedagogia', 'pedagogia', 'Licenciatura', 'Educação', 'Formação superior para atuação em diferentes contextos educacionais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-004', 'Nutrição', 'nutricao', 'Bacharelado', 'Saúde', 'Formação para atuação na promoção da saúde, alimentação e acompanhamento nutricional.', 'Encontros presenciais semanais.'),
  grad('grad-005', 'Educação Especial', 'educacao-especial', 'Licenciatura', 'Educação', 'Formação para atuação educacional com foco em inclusão e educação especial.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-006', 'Ciências Biológicas', 'ciencias-biologicas', 'Licenciatura', 'Educação', 'Formação para atuação no ensino e em diferentes áreas relacionadas às ciências biológicas.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-007', 'Geografia', 'geografia', 'Licenciatura', 'Educação', 'Formação para atuação no ensino de Geografia e em áreas relacionadas ao território e sociedade.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-008', 'História', 'historia', 'Licenciatura', 'Educação', 'Formação para atuação no ensino de História e na análise dos processos históricos e sociais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-009', 'Letras - Espanhol', 'letras-espanhol', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua e literatura espanhola.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-010', 'Letras - Inglês', 'letras-ingles', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua e literatura inglesa.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-011', 'Letras - Português', 'letras-portugues', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua portuguesa e literatura.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-012', 'Matemática', 'matematica', 'Licenciatura', 'Educação', 'Formação para docência em Matemática e atuação em diferentes contextos educacionais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),

  { id: 'tec-001', name: 'Técnico em Enfermagem', slug: 'tecnico-em-enfermagem', category: 'TECNICO', type: 'Curso Técnico', institution: 'IBESC', area: 'Saúde', description: 'Prepare-se para novas oportunidades profissionais com uma formação técnica e prática.', status: 'ATIVO', featured: true },
  { id: 'tec-002', name: 'Técnico em Informática', slug: 'tecnico-em-informatica', category: 'TECNICO', type: 'Curso Técnico', institution: 'IBESC', area: 'Tecnologia', description: 'Desenvolva conhecimentos técnicos para atuar com tecnologia, suporte e informática.', status: 'ATIVO', featured: true },
  { id: 'pos-001', name: 'Pós-graduação', slug: 'pos-graduacao', category: 'POS_GRADUACAO', type: 'Especialização', institution: ['UNINASSAU', 'UNIFAEL'], area: 'Diversas áreas', description: 'Encontre opções de especialização oferecidas pelas instituições parceiras do IBESC.', status: 'ATIVO', featured: true, externalUrl: partnerCatalogs.uninassauPos.url },
];

export const areas = ['Saúde', 'Negócios', 'Tecnologia', 'Educação', 'Direito', 'Gestão', 'Comunicação', 'Outras áreas'];
export const categoryLabels: Record<CourseCategory, string> = { GRADUACAO: 'Graduação', POS_GRADUACAO: 'Pós-graduação', TECNICO: 'Cursos técnicos', PROFISSIONALIZANTE: 'Cursos profissionalizantes' };
export function getCourseInstitution(course: Course): string { return Array.isArray(course.institution) ? course.institution.join(' / ') : course.institution; }
export function getCoursesByCategory(category: CourseCategory): Course[] { return courses.filter((course) => course.category === category && course.status === 'ATIVO'); }
