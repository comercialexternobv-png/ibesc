import Link from 'next/link';
import Image from 'next/image';
import { courses, getCourseImage } from '@/data/courses';
import { ArrowRight, BookOpenCheck, HeartHandshake, MessageCircle, Microscope, ShieldCheck, Stethoscope, Users } from 'lucide-react';

export const metadata = { title: 'Cursos Técnicos | IBESC', description: 'Conheça os cursos técnicos próprios do IBESC em Boa Viagem — CE.' };
const wa = '5588988498031';
const waLink = (name: string) => `https://wa.me/${wa}?text=${encodeURIComponent(`Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${name}.`)}`;

const pedagogicalHighlights = [
  { icon: BookOpenCheck, title: 'Formação por competências', description: 'Conhecimentos, habilidades e atitudes são desenvolvidos de forma integrada ao longo da formação.' },
  { icon: Microscope, title: 'Teoria integrada à prática', description: 'Os conteúdos científicos são relacionados a atividades práticas, estudos de caso e situações profissionais.' },
  { icon: Stethoscope, title: 'Laboratório e simulação', description: 'As atividades práticas apoiam o desenvolvimento progressivo de técnicas, procedimentos e tomada de decisão.' },
  { icon: ShieldCheck, title: 'Segurança e biossegurança', description: 'A formação valoriza prevenção de riscos, boas práticas, protocolos e segurança do paciente.' },
  { icon: HeartHandshake, title: 'Cuidado ético e humanizado', description: 'Ética, empatia, comunicação e respeito à dignidade humana fazem parte do processo formativo.' },
  { icon: Users, title: 'Aprendizagem colaborativa', description: 'Projetos integradores e atividades em equipe fortalecem comunicação, responsabilidade e atuação profissional.' },
];

export default function Page() {
  const list = courses.filter((course) => course.category === 'TECNICO');
  return <main>
    <section className="hero"><div className="container hero-grid"><div><span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>Formação própria IBESC</span><h1>Formação técnica com conhecimento e prática.</h1><p>Conheça os cursos técnicos do IBESC e uma proposta educacional que integra fundamentos científicos, atividades práticas e desenvolvimento profissional.</p><div className="hero-actions"><a className="btn btn-primary" href={`https://wa.me/${wa}?text=${encodeURIComponent('Olá! Vim pelo site do IBESC e quero conhecer os cursos técnicos.')}`}>Falar com um consultor</a></div></div><div className="hero-card"><div className="fake-photo"/><strong>Conhecimento, prática e responsabilidade profissional.</strong></div></div></section>

    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Proposta educacional</span><h2>Como a aprendizagem é desenvolvida</h2><p>A formação técnica articula conhecimentos científicos, experiências práticas e competências profissionais para preparar o estudante para diferentes situações de atuação.</p></div><div className="path-grid">{pedagogicalHighlights.map(({ icon: Icon, title, description }) => <article className="card" key={title}><Icon color="var(--blue)"/><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="section" style={{ background: 'var(--light)' }}><div className="container"><div className="section-head"><span className="eyebrow">Cursos próprios</span><h2>Conheça as formações técnicas</h2><p>As informações acadêmicas e comerciais de cada turma são confirmadas pela equipe IBESC antes da matrícula.</p></div><div className="course-grid">{list.map((course) => <article className="card course-card" key={course.id}><Image className="course-image course-image-element" src={getCourseImage(course)} alt={course.name} width={600} height={400} sizes="(max-width: 800px) 100vw, 33vw"/><span className="tag">{course.type} • IBESC</span><h3>{course.name}</h3><div className="course-meta">Boa Viagem — CE • {course.area}</div><p>{course.description}</p><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><Link className="btn btn-dark" href={`/curso/${course.slug}`}>Saiba mais <ArrowRight size={16}/></Link><a className="btn btn-primary" href={waLink(course.name)}><MessageCircle size={16}/> WhatsApp</a></div></article>)}</div></div></section>

    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Transparência</span><h2>Informações confirmadas antes da matrícula</h2><p>Datas, horários, vagas e condições podem variar entre as ofertas. A equipe IBESC confirma os dados atuais antes de iniciar o processo de matrícula.</p></div><div className="diff-grid">{['Informações para sua escolha', 'Atendimento da equipe IBESC', 'Informações confirmadas', 'Etapas de matrícula claras'].map((item) => <div className="card" key={item}><ShieldCheck color="var(--green)"/><h3>{item}</h3><p>Converse com a equipe IBESC para receber as informações disponíveis sobre o curso.</p></div>)}</div></div></section>
  </main>;
}
