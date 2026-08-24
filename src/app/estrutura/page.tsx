import Image from 'next/image';

export const metadata = { title: 'Estrutura | IBESC', description: 'Conheça a estrutura do IBESC em Boa Viagem — CE.' };

const spaces = [
  { title: 'Fachada e atendimento', description: 'Local de atendimento do IBESC em Boa Viagem.', image: '/images/local-ibesc-boa-viagem.webp' },
  { title: 'Ambientes de aprendizagem', description: 'Espaços utilizados em atividades práticas e momentos de formação.', image: '/images/tecnico-enfermagem-2.webp' },
  { title: 'Laboratório', description: 'Estrutura de apoio para experiências práticas do Técnico em Enfermagem.', image: '/images/tecnico-enfermagem-3.webp' },
  { title: 'Formação prática', description: 'Momentos de aprendizagem acompanhados pela equipe do IBESC.', image: '/images/tecnico-enfermagem-4.webp' },
];

export default function Page() {
  return <main><section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Nossa estrutura</span><h1>Um espaço para você começar seu próximo capítulo.</h1><p>Conheça ambientes reais do IBESC e conte com uma equipe preparada para acompanhar sua jornada.</p></div></section><section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Conheça o IBESC</span><h2>Estrutura para aprender e avançar</h2><p>Veja alguns dos espaços e momentos de formação disponíveis em Boa Viagem.</p></div><div className="area-grid">{spaces.map((space) => <article className="card structure-card" key={space.title}><Image src={space.image} alt={space.title} width={800} height={600} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"/><h3>{space.title}</h3><p>{space.description}</p></article>)}</div></div></section></main>;
}
