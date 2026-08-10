export type CourseCategory = 'GRADUACAO' | 'POS_GRADUACAO' | 'TECNICO' | 'PROFISSIONALIZANTE';
export type Institution = 'IBESC' | 'UNINASSAU' | 'UNIFAEL';

export interface Course {
  id: string; name: string; slug: string; category: CourseCategory; type: string;
  institution: Institution | Institution[]; area: string; modality?: string;
  duration?: string; description: string; image?: string; status: string;
  featured?: boolean; local?: string; startDate?: string; whatsapp?: string;
}

export const courses: Course[] = [
  {id:'1',name:'Enfermagem',slug:'enfermagem',category:'GRADUACAO',type:'Bacharelado',institution:'UNINASSAU',area:'Saúde',description:'Formação superior para quem deseja construir uma trajetória profissional na área da saúde.',status:'Ativo',featured:true},
  {id:'2',name:'Administração',slug:'administracao',category:'GRADUACAO',type:'Bacharelado',institution:'UNINASSAU',area:'Negócios',description:'Formação para desenvolver competências de gestão, negócios e liderança.',status:'Ativo',featured:true},
  {id:'3',name:'Pedagogia',slug:'pedagogia',category:'GRADUACAO',type:'Licenciatura',institution:'UNINASSAU',area:'Educação',description:'Formação superior para atuação em diferentes contextos educacionais.',status:'Ativo',featured:true},
  {id:'4',name:'Técnico em Enfermagem',slug:'tecnico-em-enfermagem',category:'TECNICO',type:'Curso Técnico',institution:'IBESC',area:'Saúde',description:'Prepare-se para novas oportunidades profissionais com uma formação técnica e prática.',status:'Ativo',featured:true},
  {id:'5',name:'Técnico em Informática',slug:'tecnico-em-informatica',category:'TECNICO',type:'Curso Técnico',institution:'IBESC',area:'Tecnologia',description:'Desenvolva conhecimentos técnicos para atuar com tecnologia, suporte e informática.',status:'Ativo',featured:true},
  {id:'6',name:'Pós-graduação',slug:'pos-graduacao',category:'POS_GRADUACAO',type:'Especialização',institution:['UNINASSAU','UNIFAEL'],area:'Diversas áreas',description:'Aprofunde conhecimentos e avance profissionalmente com opções de especialização.',status:'Ativo',featured:true},
];

export const areas = ['Saúde','Negócios','Tecnologia','Educação','Direito','Gestão','Comunicação','Outras áreas'];
