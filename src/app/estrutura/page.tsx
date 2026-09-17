import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, HeartPulse, MapPin, MessagesSquare, Microscope } from 'lucide-react';
import { siteInfo } from '@/data/site';

export const metadata = { title: 'Estrutura | IBESC', description: 'Conheça os ambientes de atendimento, aprendizagem e prática do IBESC em Boa Viagem — CE.' };

const spaces = [
  { title: 'Fachada e atendimento', description: 'Ponto de atendimento do IBESC em Boa Viagem, onde interessados e estudantes recebem informações e suporte da equipe.', image: '/images/local-ibesc-boa-viagem.webp' },
  { title: 'Ambiente de aprendizagem', description: 'Espaço destinado a atividades formativas, estudos orientados e integração dos conteúdos científicos com a realidade profissional.', image: '/images/tecnico-enfermagem-2.webp' },
  { title: 'Laboratório de Enfermagem', description: 'Ambiente de apoio ao desenvolvimento de habilidades, procedimentos, biossegurança e segurança do paciente.', image: '/images/tecnico-enfermagem-3.webp' },
  { title: 'Atividades práticas', description: 'Experiências de aprendizagem que aproximam teoria e prática, com acompanhamento e objetivos pedagógicos definidos.', image: '/images/tecnico-enfermagem-4.webp' },
];

const learningSpaces = [
  { icon: BookOpenCheck, title: 'Fundamentação científica', description: 'Os ambientes de aprendizagem apoiam o estudo dos conhecimentos necessários à formação técnica.' },
  { icon: Microscope, title: 'Desenvolvimento de habilidades', description: 'O laboratório permite trabalhar técnicas e procedimentos de forma progressiva e supervisionada.' },
  { icon: HeartPulse, title: 'Segurança e humanização', description: 'As práticas valorizam biossegurança, prevenção de riscos, comunicação e cuidado humanizado.' },
  { icon: MessagesSquare, title: 'Atendimento acadêmico', description: 'A equipe IBESC presta informações e suporte acadêmico ao estudante durante sua trajetória formativa.' },
];

export default function Page() {
  return <main>
    <section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Estrutura real</span><h1>Ambientes que apoiam o aprendizado</h1><p>Conheça os espaços de atendimento, aprendizagem e prática utilizados pelo IBESC em Boa Viagem.</p></div></section>

    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Boa Viagem — CE</span><h2>Estrutura apresentada com finalidade acadêmica</h2><p>Cada ambiente contribui de uma forma específica para o atendimento, o desenvolvimento de conhecimentos e as experiências práticas dos estudantes.</p></div><div className="area-grid">{spaces.map((space) => <article className="card structure-card" key={space.title}><Image src={space.image} alt={space.title} width={800} height={600} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"/><h3>{space.title}</h3><p>{space.description}</p></article>)}</div></div></section>

    <section className="section" style={{ background: 'var(--light)' }}><div className="container"><div className="section-head"><span className="eyebrow">Formação técnica</span><h2>Como os espaços apoiam a formação</h2><p>A estrutura é utilizada para relacionar fundamentos científicos, desenvolvimento de habilidades e responsabilidades da atuação profissional.</p></div><div className="diff-grid">{learningSpaces.map(({ icon: Icon, title, description }) => <article className="card" key={title}><Icon color="var(--blue)"/><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="section"><div className="container"><div className="cta"><div><MapPin/><h2>Visite o IBESC em Boa Viagem</h2><p>{siteInfo.streetAddress}, {siteInfo.neighborhood}, {siteInfo.city} — {siteInfo.state}.</p></div><div className="hero-actions"><a className="btn btn-dark" href={siteInfo.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight size={16}/></a><Link className="btn btn-primary" href="/contato">Falar com a equipe</Link></div></div></div></section>
  </main>;
}
