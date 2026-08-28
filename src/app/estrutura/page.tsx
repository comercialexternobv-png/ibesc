import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { siteInfo } from '@/data/site';

export const metadata = { title: 'Estrutura | IBESC', description: 'Conheça ambientes reais da estrutura do IBESC em Boa Viagem — CE.' };
const spaces = [
  { title: 'Fachada e atendimento', description: 'Ponto de atendimento do IBESC em Boa Viagem, onde a equipe recebe interessados e orienta sobre as opções disponíveis.', image: '/images/local-ibesc-boa-viagem.webp' },
  { title: 'Ambiente de aprendizagem', description: 'Espaço utilizado em atividades relacionadas às formações próprias correspondentes.', image: '/images/tecnico-enfermagem-2.webp' },
  { title: 'Laboratório do Técnico em Enfermagem', description: 'Estrutura de apoio às experiências práticas específicas do curso Técnico em Enfermagem.', image: '/images/tecnico-enfermagem-3.webp' },
  { title: 'Atividade prática de Enfermagem', description: 'Registro de momento de aprendizagem vinculado à formação técnica em Enfermagem.', image: '/images/tecnico-enfermagem-4.webp' },
];

export default function Page() {
  return <main><section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Estrutura real</span><h1>Conheça os ambientes do IBESC</h1><p>Veja espaços de atendimento e registros de atividades relacionadas às formações próprias em Boa Viagem.</p></div></section>
  <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Boa Viagem — CE</span><h2>Espaços apresentados com contexto</h2><p>Os ambientes abaixo pertencem ao IBESC. A estrutura acadêmica de cursos digitais ou de instituições parceiras deve ser consultada nos respectivos canais oficiais.</p></div><div className="area-grid">{spaces.map((space) => <article className="card structure-card" key={space.title}><Image src={space.image} alt={space.title} width={800} height={600} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"/><h3>{space.title}</h3><p>{space.description}</p></article>)}</div></div></section>
  <section className="section" style={{background:'var(--light)'}}><div className="container"><div className="cta"><div><MapPin/><h2>Visite o IBESC em Boa Viagem</h2><p>{siteInfo.streetAddress}, {siteInfo.neighborhood}, {siteInfo.city} — {siteInfo.state}.</p></div><div className="hero-actions"><a className="btn btn-dark" href={siteInfo.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">Como chegar <ArrowRight size={16}/></a><Link className="btn btn-primary" href="/contato">Falar com a equipe</Link></div></div></div></section></main>;
}
