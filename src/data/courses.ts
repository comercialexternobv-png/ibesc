export type CourseCategory = 'GRADUACAO' | 'POS_GRADUACAO' | 'TECNICO' | 'PROFISSIONALIZANTE';
export type Institution = 'IBESC' | 'UNINASSAU' | 'UNIFAEL';

export interface Course {
  id: string; name: string; slug: string; category: CourseCategory; type: string;
  institution: Institution | Institution[]; area: string; modality?: string; duration?: string;
  description: string; image?: string; images?: string[]; status: 'ATIVO' | 'INATIVO' | 'EM_BREVE';
  local?: string; startDate?: string; whatsapp?: string; externalUrl?: string; attendanceInfo?: string;
  audience?: string; learning?: string[]; highlights?: string[]; requirements?: string; featured?: boolean;
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

const pos = (
  id: string, name: string, slug: string, institution: 'UNINASSAU' | 'UNIFAEL', area: string,
  duration = '6 a 12 meses', extra: Partial<Course> = {}
): Course => ({
  id, name, slug, category: 'POS_GRADUACAO', type: 'Especialização', institution, area,
  description: extra.description || `Especialização em ${name}, com formação digital voltada ao desenvolvimento profissional na área de ${area.toLowerCase()}.`,
  duration, modality: 'Digital', status: 'ATIVO',
  externalUrl: institution === 'UNINASSAU' ? partnerCatalogs.uninassauPos.url : partnerCatalogs.unifaelPos.url,
  audience: extra.audience || `Profissionais que desejam ampliar conhecimentos e fortalecer sua atuação em ${area.toLowerCase()}.`,
  learning: extra.learning || [`Fundamentos e conceitos de ${name}.`, `Aplicações práticas relacionadas à área de ${area.toLowerCase()}.`, 'Desenvolvimento profissional e atualização de conhecimentos.'],
  highlights: extra.highlights || ['Modalidade digital', 'Flexibilidade para estudar de onde estiver', institution === 'UNINASSAU' ? 'Aulas gravadas e encontros síncronos mensais' : 'Formação digital com acompanhamento acadêmico'],
  requirements: extra.requirements || 'É necessário possuir diploma de graduação para ingressar em uma pós-graduação.',
});

export const courses: Course[] = [
  grad('grad-001', 'Enfermagem', 'enfermagem', 'Bacharelado', 'Saúde', 'Formação superior para quem deseja construir uma trajetória profissional na área da saúde.'),
  grad('grad-002', 'Administração', 'administracao', 'Bacharelado', 'Negócios', 'Formação para desenvolver competências de gestão, negócios e liderança.'),
  grad('grad-003', 'Pedagogia', 'pedagogia', 'Licenciatura', 'Educação', 'Formação superior para atuação em diferentes contextos educacionais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-004', 'Nutrição', 'nutricao', 'Bacharelado', 'Saúde', 'Formação para atuação na promoção da saúde, alimentação e acompanhamento nutricional.', 'Encontros presenciais semanais.'),
  grad('grad-005', 'Educação Especial', 'educacao-especial', 'Licenciatura', 'Educação', 'Formação para atuação educacional com foco em inclusão e educação especial.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-006', 'Ciências Biológicas', 'ciencias-biologicas', 'Licenciatura', 'Educação', 'Formação para atuação no ensino e em diferentes áreas relacionadas às ciências biológicas.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-007', 'Geografia', 'geografia', 'Licenciatura', 'Educação', 'Formação para atuação no ensino de Geografia e em áreas relacionadas ao território e sociedade.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-008', 'História', 'historia', 'Licenciatura', 'Educação', 'Formação para atuação no ensino e na análise dos processos históricos e sociais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-009', 'Letras - Espanhol', 'letras-espanhol', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua e literatura espanhola.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-010', 'Letras - Inglês', 'letras-ingles', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua e literatura inglesa.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-011', 'Letras - Português', 'letras-portugues', 'Licenciatura', 'Educação', 'Formação para docência e atuação profissional com língua portuguesa e literatura.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),
  grad('grad-012', 'Matemática', 'matematica', 'Licenciatura', 'Educação', 'Formação para docência em Matemática e atuação em diferentes contextos educacionais.', 'Encontros presenciais durante o semestre, conforme calendário acadêmico e atividades do curso.'),

  { id: 'tec-001', name: 'Técnico em Enfermagem', slug: 'tecnico-em-enfermagem', category: 'TECNICO', type: 'Curso Técnico', institution: 'IBESC', area: 'Saúde', description: 'Prepare-se para novas oportunidades profissionais com uma formação técnica e prática na área da enfermagem.', status: 'ATIVO', featured: true, image: '/images/tecnico-enfermagem-1.png', images: ['/images/tecnico-enfermagem-1.png', '/images/tecnico-enfermagem-2.png', '/images/tecnico-enfermagem-3.png', '/images/tecnico-enfermagem-4.png'], audience: 'Pessoas que desejam ingressar ou se desenvolver profissionalmente na área da saúde por meio de uma formação técnica.', learning: ['Fundamentos e práticas de enfermagem.', 'Vivências em laboratório e situações práticas de cuidado.', 'Conhecimentos para atuação responsável em diferentes contextos de assistência.'], highlights: ['Formação técnica e prática', 'Estrutura para atividades de aprendizagem', 'Atendimento e orientação pelo IBESC'], requirements: 'Consulte o IBESC sobre requisitos de ingresso, documentação, duração e condições da turma.' },
  { id: 'tec-002', name: 'Curso Básico de Informática', slug: 'tecnico-em-informatica', category: 'TECNICO', type: 'Curso Técnico', institution: 'IBESC', area: 'Tecnologia', description: 'Desenvolva conhecimentos técnicos para atuar com tecnologia, suporte e informática.', status: 'ATIVO', featured: true },

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

export const areas = ['Saúde', 'Negócios', 'Tecnologia', 'Educação', 'Direito', 'Gestão'];
export const categoryLabels: Record<CourseCategory, string> = { GRADUACAO: 'Graduação', POS_GRADUACAO: 'Pós-graduação', TECNICO: 'Cursos técnicos', PROFISSIONALIZANTE: 'Profissionalizantes' };
export function getCourseInstitution(course: Course) { return Array.isArray(course.institution) ? course.institution.join(' / ') : course.institution; }
