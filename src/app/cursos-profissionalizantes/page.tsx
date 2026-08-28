import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { courses, getCourseImage } from '@/data/courses';
import { siteInfo } from '@/data/site';

export const metadata = { title: 'Cursos Profissionalizantes e Básicos | IBESC', description: 'Conheça cursos profissionalizantes e básicos disponíveis pelo IBESC em Boa Viagem — CE.' };
const waLink = (name?: string) => `https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent(name ? `Olá! Vim pelo site do IBESC e gostaria de informações sobre ${name}.` : 'Olá! Vim pelo site do IBESC e quero conhecer os cursos profissionalizantes e básicos.')}`;

export default function ProfessionalizingPage() {
  const list = courses.filter((course) => course.category === 'PROFISSIONALIZANTE' || course.type === 'Curso Básico');
  return <main><section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Formação prática</span><h1>Cursos profissionalizantes e básicos</h1><p>Formações de curta duração para desenvolver conhecimentos específicos. Cada curso possui requisitos, carga horária e forma de certificação próprios.</p><div className="hero-actions"><a className="btn btn-primary" href={waLink()}>Consultar opções <MessageCircle size={17}/></a></div></div></section>
  <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Opções disponíveis</span><h2>Escolha a formação que deseja conhecer</h2><p>Esses cursos não equivalem automaticamente a uma graduação ou a um curso técnico. Consulte os detalhes de cada oferta antes da matrícula.</p></div><div className="course-grid">{list.map((course) => <article className="card course-card home-institution-course home-course-ibesc" key={course.id}><Image className="course-image course-image-element" src={getCourseImage(course)} alt={course.name} width={600} height={400} sizes="(max-width: 800px) 100vw, 33vw"/><span className="tag">{course.type} · IBESC</span><h3>{course.name}</h3><div className="course-meta">{course.area} <span/> Boa Viagem — CE</div><p>{course.description}</p><div className="course-actions"><Link className="btn btn-dark" href={`/curso/${course.slug}`}>Conhecer o curso <ArrowRight size={16}/></Link><a className="btn btn-primary" href={waLink(course.name)}>Solicitar informações</a></div></article>)}</div>{list.length === 0 && <div className="card"><h3>Consulte as opções atuais</h3><p>A equipe IBESC pode informar quais cursos profissionalizantes e básicos estão disponíveis neste momento.</p><a className="btn btn-dark" href={waLink()}>Falar com a equipe</a></div>}</div></section></main>;
}
