import { partnerCatalogs } from './partnerCatalogs';
import { unicorpCourses } from './unicorpCourses';

export type CourseCategory = 'GRADUACAO' | 'POS_GRADUACAO' | 'TECNICO' | 'PROFISSIONALIZANTE';
export type Institution = 'IBESC' | 'UNINASSAU' | 'UNIFAEL';

export interface Course {
  id: string; name: string; slug: string; category: CourseCategory; type: string;
  institution: Institution | Institution[]; area: string; modality?: string; duration?: string;
  description: string; image?: string; images?: string[]; status: 'ATIVO' | 'INATIVO' | 'EM_BREVE';
  local?: string; startDate?: string; whatsapp?: string; externalUrl?: string; attendanceInfo?: string;
  audience?: string; learning?: string[]; highlights?: string[]; requirements?: string; observations?: string[]; featured?: boolean;
}

type GraduationModality = 'Semipresencial' | 'EAD';

const graduationDurations: Record<string, string> = {
  'arquitetura-e-urbanismo': '60 meses', 'gestao-ambiental': '24 meses', 'gestao-hospitalar': '36 meses',
  'terapia-ocupacional': '48 meses', biomedicina: '48 meses', 'educacao-fisica-bacharelado': '48 meses',
  'estetica-e-cosmetica': '30 meses', farmacia: '60 meses', fisioterapia: '60 meses', nutricao: '48 meses',
  'educacao-especial': '48 meses', 'educacao-fisica-licenciatura': '48 meses', 'ciencias-biologicas': '48 meses',
  historia: '48 meses', 'letras-ingles': '48 meses', 'letras-portugues': '48 meses', matematica: '48 meses',
  pedagogia: '48 meses', 'engenharia-civil': '60 meses', 'engenharia-de-producao': '60 meses',
  'engenharia-eletrica': '60 meses', 'engenharia-mecanica': '60 meses', administracao: '48 meses',
  'ciencias-aeronauticas': '36 meses', 'ciencias-contabeis': '48 meses', 'ciencias-economicas': '48 meses',
  'analise-e-desenvolvimento-de-sistemas': '30 meses', 'banco-de-dados': '30 meses',
  'design-de-interiores': '24 meses', gastronomia: '24 meses', 'gestao-comercial': '24 meses',
  'gestao-da-qualidade': '24 meses', 'gestao-de-tecnologia-da-informacao': '30 meses',
  'gestao-de-recursos-humanos': '24 meses', 'gestao-de-servicos-juridicos-e-notariais': '24 meses',
  'gestao-de-transito': '24 meses', 'gestao-financeira': '24 meses', 'gestao-publica': '24 meses',
  logistica: '24 meses', marketing: '24 meses', 'negocios-imobiliarios': '24 meses',
  'processos-gerenciais': '24 meses', 'seguranca-da-informacao': '30 meses', 'seguranca-publica': '24 meses',
};

const grad = (
  id: string, name: string, slug: string, type: string, area: string, modality: GraduationModality,
  description = `${type} com formação voltada ao desenvolvimento de competências profissionais em ${area.toLowerCase()}.`,
): Course => ({
  id, name, slug, category: 'GRADUACAO', type, institution: 'UNINASSAU', area, modality,
  duration: graduationDurations[slug], description,
  status: 'ATIVO', local: 'Polo Boa Viagem — CE', externalUrl: partnerCatalogs.uninassauGraduacao.officialUrl,
  attendanceInfo: modality === 'Semipresencial'
    ? 'Atividades presenciais no Polo Boa Viagem — CE, conforme calendário acadêmico e dinâmica do curso.'
    : undefined,
  observations: ['Oferta divulgada para o Polo Boa Viagem — CE. Consulte o IBESC para confirmar disponibilidade, calendário e condições da turma.'],
});

const pos = (
  id: string, name: string, slug: string, institution: 'UNINASSAU' | 'UNIFAEL', area: string,
  duration = '6 a 12 meses', extra: Partial<Course> = {}
): Course => ({
  id, name, slug, category: 'POS_GRADUACAO', type: 'Especialização', institution, area,
  description: extra.description || `Especialização em ${name}, com formação digital voltada ao desenvolvimento profissional na área de ${area.toLowerCase()}.`,
  duration, modality: 'Digital', status: 'ATIVO',
  externalUrl: institution === 'UNINASSAU' ? partnerCatalogs.uninassauPos.officialUrl : partnerCatalogs.unifaelPos.officialUrl,
  audience: extra.audience || `Profissionais que desejam ampliar conhecimentos e fortalecer sua atuação em ${area.toLowerCase()}.`,
  learning: extra.learning || [`Fundamentos e conceitos de ${name}.`, `Aplicações práticas relacionadas à área de ${area.toLowerCase()}.`, 'Desenvolvimento profissional e atualização de conhecimentos.'],
  highlights: extra.highlights || ['Modalidade digital', 'Flexibilidade para estudar de onde estiver', institution === 'UNINASSAU' ? 'Aulas gravadas e encontros síncronos mensais' : 'Formação digital com acompanhamento acadêmico'],
  requirements: extra.requirements || 'É necessário possuir diploma de graduação para ingressar em uma pós-graduação.',
});

export const courses: Course[] = [
  grad('grad-001', 'Arquitetura e Urbanismo', 'arquitetura-e-urbanismo', 'Bacharelado', 'Engenharia', 'Semipresencial'),
  grad('grad-002', 'Gestão Ambiental', 'gestao-ambiental', 'Tecnólogo', 'Gestão', 'Semipresencial'),
  grad('grad-003', 'Gestão Hospitalar', 'gestao-hospitalar', 'Tecnólogo', 'Saúde', 'Semipresencial'),
  grad('grad-004', 'Terapia Ocupacional', 'terapia-ocupacional', 'Bacharelado', 'Saúde', 'Semipresencial'),
  grad('grad-005', 'Biomedicina', 'biomedicina', 'Bacharelado', 'Saúde', 'Semipresencial'),
  grad('grad-006', 'Educação Física - Bacharelado', 'educacao-fisica-bacharelado', 'Bacharelado', 'Saúde', 'Semipresencial'),
  grad('grad-007', 'Estética e Cosmética', 'estetica-e-cosmetica', 'Tecnólogo', 'Saúde', 'Semipresencial'),
  grad('grad-008', 'Farmácia', 'farmacia', 'Bacharelado', 'Saúde', 'Semipresencial'),
  grad('grad-009', 'Fisioterapia', 'fisioterapia', 'Bacharelado', 'Saúde', 'Semipresencial'),
  grad('grad-010', 'Nutrição', 'nutricao', 'Bacharelado', 'Saúde', 'Semipresencial', 'Formação para atuação na promoção da saúde, alimentação e acompanhamento nutricional.'),
  grad('grad-011', 'Podologia', 'podologia', 'Tecnólogo', 'Saúde', 'Semipresencial'),
  grad('grad-012', 'Educação Especial', 'educacao-especial', 'Licenciatura', 'Educação', 'Semipresencial', 'Formação para atuação educacional com foco em inclusão e educação especial.'),
  grad('grad-013', 'Educação Física - Licenciatura', 'educacao-fisica-licenciatura', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-014', 'Ciências Biológicas', 'ciencias-biologicas', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-015', 'Geografia', 'geografia', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-016', 'História', 'historia', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-017', 'Letras - Espanhol', 'letras-espanhol', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-018', 'Letras - Inglês', 'letras-ingles', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-019', 'Letras - Português', 'letras-portugues', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-020', 'Matemática', 'matematica', 'Licenciatura', 'Educação', 'Semipresencial'),
  grad('grad-021', 'Pedagogia', 'pedagogia', 'Licenciatura', 'Educação', 'Semipresencial', 'Formação superior para atuação em diferentes contextos educacionais.'),
  grad('grad-022', 'Engenharia Civil', 'engenharia-civil', 'Bacharelado', 'Engenharia', 'Semipresencial'),
  grad('grad-023', 'Engenharia de Produção', 'engenharia-de-producao', 'Bacharelado', 'Engenharia', 'Semipresencial'),
  grad('grad-024', 'Engenharia Elétrica', 'engenharia-eletrica', 'Bacharelado', 'Engenharia', 'Semipresencial'),
  grad('grad-025', 'Engenharia Mecânica', 'engenharia-mecanica', 'Bacharelado', 'Engenharia', 'Semipresencial'),

  grad('grad-026', 'Administração', 'administracao', 'Bacharelado', 'Negócios', 'EAD', 'Formação para desenvolver competências de gestão, negócios e liderança.'),
  grad('grad-027', 'Ciências Aeronáuticas', 'ciencias-aeronauticas', 'Bacharelado', 'Negócios', 'EAD'),
  grad('grad-028', 'Ciências Contábeis', 'ciencias-contabeis', 'Bacharelado', 'Negócios', 'EAD'),
  grad('grad-029', 'Ciências Econômicas', 'ciencias-economicas', 'Bacharelado', 'Negócios', 'EAD'),
  grad('grad-030', 'Teologia', 'teologia', 'Bacharelado', 'Educação', 'EAD'),
  grad('grad-031', 'Análise e Desenvolvimento de Sistemas', 'analise-e-desenvolvimento-de-sistemas', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-032', 'Banco de Dados', 'banco-de-dados', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-033', 'Coaching e Mentoring', 'coaching-e-mentoring', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-034', 'Design de Interiores', 'design-de-interiores', 'Tecnólogo', 'Engenharia', 'EAD'),
  grad('grad-035', 'Data Science', 'data-science', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-036', 'Gastronomia', 'gastronomia', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-037', 'Gestão Comercial', 'gestao-comercial', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-038', 'Gestão da Qualidade', 'gestao-da-qualidade', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-039', 'Gestão de Tecnologia da Informação', 'gestao-de-tecnologia-da-informacao', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-040', 'Gestão de Recursos Humanos', 'gestao-de-recursos-humanos', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-041', 'Gestão de Serviços Jurídicos e Notariais', 'gestao-de-servicos-juridicos-e-notariais', 'Tecnólogo', 'Direito', 'EAD'),
  grad('grad-042', 'Gestão de Trânsito', 'gestao-de-transito', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-043', 'Gestão Financeira', 'gestao-financeira', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-044', 'Gestão Pública', 'gestao-publica', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-045', 'Jogos Digitais', 'jogos-digitais', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-046', 'Logística', 'logistica', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-047', 'Marketing', 'marketing', 'Tecnólogo', 'Negócios', 'EAD'),
  grad('grad-048', 'Negócios Imobiliários', 'negocios-imobiliarios', 'Tecnólogo', 'Negócios', 'EAD'),
  grad('grad-049', 'Processos Gerenciais', 'processos-gerenciais', 'Tecnólogo', 'Gestão', 'EAD'),
  grad('grad-050', 'Produção Audiovisual', 'producao-audiovisual', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-051', 'Segurança da Informação', 'seguranca-da-informacao', 'Tecnólogo', 'Tecnologia', 'EAD'),
  grad('grad-052', 'Segurança Pública', 'seguranca-publica', 'Tecnólogo', 'Gestão', 'EAD'),

  { id: 'tec-001', name: 'Técnico em Enfermagem', slug: 'tecnico-em-enfermagem', category: 'TECNICO', type: 'Curso Técnico', institution: 'IBESC', area: 'Saúde', description: 'Prepare-se para novas oportunidades profissionais com uma formação técnica e prática na área da enfermagem.', status: 'ATIVO', featured: true, image: '/images/tecnico-enfermagem-1.webp', images: ['/images/tecnico-enfermagem-1.webp', '/images/tecnico-enfermagem-2.webp', '/images/tecnico-enfermagem-3.webp', '/images/tecnico-enfermagem-4.webp'], audience: 'Pessoas que desejam ingressar ou se desenvolver profissionalmente na área da saúde por meio de uma formação técnica.', learning: ['Fundamentos e práticas de enfermagem.', 'Vivências em laboratório e situações práticas de cuidado.', 'Conhecimentos para atuação responsável em diferentes contextos de assistência.'], highlights: ['Formação técnica e prática', 'Estrutura para atividades de aprendizagem', 'Atendimento e orientação pelo IBESC'], requirements: 'Consulte o IBESC sobre requisitos de ingresso, documentação, duração e condições da turma.' },
  { id: 'tec-002', name: 'Curso Básico de Informática', slug: 'curso-basico-de-informatica', category: 'PROFISSIONALIZANTE', type: 'Curso Básico', institution: 'IBESC', area: 'Tecnologia', description: 'Desenvolva conhecimentos básicos para utilizar tecnologia e informática no dia a dia profissional.', status: 'ATIVO', featured: true },

  ...unicorpCourses,

  pos('pos-uni-001', 'Auditoria e Controladoria', 'pos-auditoria-e-controladoria', 'UNINASSAU', 'Negócios'),
  pos('pos-uni-002', 'Administração Pública e Direito Público', 'pos-administracao-publica-e-direito-publico', 'UNINASSAU', 'Negócios'),
  pos('pos-uni-003', 'Gestão da Qualidade e Auditoria', 'pos-gestao-da-qualidade-e-auditoria', 'UNINASSAU', 'Negócios'),
  pos('pos-uni-004', 'Educação Especial e Inclusiva', 'pos-educacao-especial-e-inclusiva', 'UNINASSAU', 'Educação', '6 meses', { description: 'Especialização voltada à atuação com pessoas com deficiência, transtornos do desenvolvimento e altas habilidades, com foco em práticas pedagógicas inclusivas, legislação e acessibilidade.', audience: 'Profissionais da educação e interessados em ampliar a atuação em educação inclusiva.', learning: ['Metodologia de Ensino a Distância', 'Didática do Ensino Superior', 'Inclusão Social na Área Educacional', 'Desenvolvimento da Aprendizagem na Educação Especial', 'Gestão de Carreira'], highlights: ['100% digital', 'Conclusão em 6 meses', 'Aulas gravadas e encontros síncronos mensais'] }),
  pos('pos-uni-005', 'Educação Infantil e Alfabetização', 'pos-educacao-infantil-e-alfabetizacao', 'UNINASSAU', 'Educação', '6 meses'),
  pos('pos-uni-006', 'Docência da Educação Superior', 'pos-docencia-da-educacao-superior', 'UNINASSAU', 'Educação'),
  pos('pos-uni-007', 'Gerenciamento de TI', 'pos-gerenciamento-de-ti', 'UNINASSAU', 'Tecnologia'),
  pos('pos-uni-008', 'Análise e Projeto de Sistemas de Software', 'pos-analise-e-projeto-de-sistemas-de-software', 'UNINASSAU', 'Tecnologia'),
  pos('pos-uni-009', 'Ciências de Dados', 'pos-ciencias-de-dados', 'UNINASSAU', 'Tecnologia'),
  pos('pos-uni-010', 'Direito Civil e Processo Civil', 'pos-direito-civil-e-processo-civil', 'UNINASSAU', 'Direito'),
  pos('pos-uni-011', 'Direito do Trabalho', 'pos-direito-do-trabalho', 'UNINASSAU', 'Direito'),
  pos('pos-uni-012', 'Estética e Cosmetologia', 'pos-estetica-e-cosmetologia', 'UNINASSAU', 'Saúde'),
  pos('pos-uni-013', 'Análises Clínicas', 'pos-analises-clinicas', 'UNINASSAU', 'Saúde'),
  pos('pos-uni-014', 'Enfermagem Oncológica', 'pos-enfermagem-oncologica', 'UNINASSAU', 'Saúde'),
  pos('pos-uni-015', 'Epidemiologia e Vigilância em Saúde', 'pos-epidemiologia-e-vigilancia-em-saude', 'UNINASSAU', 'Saúde'),
  pos('pos-uni-016', 'Gestão Escolar', 'pos-gestao-escolar', 'UNINASSAU', 'Educação', '12 meses', { description: 'Especialização voltada à formação e atualização de profissionais que atuam ou desejam atuar na gestão escolar e educacional.', learning: ['Metodologia de Ensino a Distância', 'Psicologia do Comportamento Escolar', 'Diversidade e Inclusão Educacional', 'Fundamentos da Gestão Escolar', 'Mídia, Tecnologia e Aprendizagem'] }),
  pos('pos-uni-017', 'Psicopedagogia com Ênfase em Educação Especial', 'pos-psicopedagogia-educacao-especial', 'UNINASSAU', 'Educação', '12 meses'),
  pos('pos-uni-018', 'MBA em Gestão de Pessoas', 'mba-gestao-de-pessoas', 'UNINASSAU', 'Gestão', '12 meses'),

  pos('pos-ufa-001', 'Docência do Ensino Superior', 'unifael-docencia-do-ensino-superior', 'UNIFAEL', 'Educação', '12 meses', { description: 'Especialização que capacita profissionais para lecionar no ensino superior, com abordagem crítico-reflexiva sobre as dimensões técnica, político-social e humana da docência.', audience: 'Profissionais que desejam atuar ou se aperfeiçoar na docência em cursos superiores.', learning: ['Metodologia do Ensino a Distância', 'Gestão de Carreira', 'Fundamentos da Educação', 'Psicologia da Aprendizagem e da Avaliação', 'Qualidade na Educação', 'Direito Educacional', 'Planejamento Educacional no Ensino Superior', 'Tecnologias Educacionais', 'Métodos e Técnicas de Ensino', 'Didática do Ensino Superior', 'Avaliação Educacional'], highlights: ['Digital', '12 meses', 'Pós-graduação EaD', 'Formação direcionada à docência no ensino superior'] }),
  pos('pos-ufa-002', 'Psicopedagogia', 'unifael-psicopedagogia', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-003', 'Educação Especial e Inclusiva', 'unifael-educacao-especial-e-inclusiva', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-004', 'Gestão Escolar', 'unifael-gestao-escolar', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-005', 'Educação Infantil', 'unifael-educacao-infantil', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-006', 'Alfabetização e Letramento', 'unifael-alfabetizacao-e-letramento', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-007', 'Educação Inclusiva', 'unifael-educacao-inclusiva', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-008', 'Gestão e Coordenação Pedagógica', 'unifael-gestao-e-coordenacao-pedagogica', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-009', 'Libras', 'unifael-libras', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-010', 'Psicomotricidade', 'unifael-psicomotricidade', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-011', 'Neuroaprendizagem', 'unifael-neuroaprendizagem', 'UNIFAEL', 'Educação', '12 meses'),
  pos('pos-ufa-012', 'Orientação Educacional', 'unifael-orientacao-educacional', 'UNIFAEL', 'Educação', '12 meses'),
];

function validateCourseCatalog(items: Course[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const course of items) {
    if (!course.id || !course.name || !course.slug || !course.description || !course.area) throw new Error(`Curso com dados obrigatórios incompletos: ${course.id || course.slug || 'sem identificação'}`);
    if (ids.has(course.id)) throw new Error(`ID de curso duplicado: ${course.id}`);
    if (slugs.has(course.slug)) throw new Error(`Slug de curso duplicado: ${course.slug}`);
    ids.add(course.id);
    slugs.add(course.slug);
  }
}

validateCourseCatalog(courses);

export const areas = ['Saúde', 'Negócios', 'Tecnologia', 'Educação', 'Direito', 'Gestão'];
export const categoryLabels: Record<CourseCategory, string> = { GRADUACAO: 'Graduação', POS_GRADUACAO: 'Pós-graduação', TECNICO: 'Cursos técnicos', PROFISSIONALIZANTE: 'Profissionalizantes' };
export function getCourseInstitution(course: Course) { return Array.isArray(course.institution) ? course.institution.join(' / ') : course.institution; }

const courseAreaImages: Record<string, string> = {
  Direito: '/images/course-areas/direito.webp',
  Educação: '/images/course-areas/educacao.webp',
  Engenharia: '/images/course-areas/engenharia.webp',
  Gestão: '/images/course-areas/gestao-negocios.webp',
  'Gestão e Negócios': '/images/course-areas/gestao-negocios.webp',
  Negócios: '/images/course-areas/gestao-negocios.webp',
  Psicologia: '/images/course-areas/psicologia.webp',
  Saúde: '/images/course-areas/saude-bem-estar.webp',
  'Saúde e Bem-estar': '/images/course-areas/saude-bem-estar.webp',
  'Serviço Social': '/images/course-areas/servico-social.webp',
  Tecnologia: '/images/course-areas/tecnologia.webp',
  'Tecnologia da Informação e Comunicação': '/images/course-areas/tecnologia.webp',
};

export function getCourseImage(course: Course) {
  return course.image || courseAreaImages[course.area] || '/images/LOGO OFICIAL.jpeg';
}
