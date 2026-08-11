import { Metadata } from 'next';
import CourseCatalog from './CourseCatalog';

export const metadata: Metadata = {
  title: 'Cursos | IBESC',
  description: 'Encontre graduação, pós-graduação e cursos técnicos em Boa Viagem — CE.',
};

export default function Cursos() {
  return <main>
    <section className="hero"><div className="container"><span className="eyebrow" style={{background:'rgba(255,255,255,.12)',color:'#fff'}}>Central de formação</span><h1>Encontre sua formação.</h1><p>Explore as opções do IBESC e encontre o caminho que combina com seus objetivos profissionais.</p></div></section>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Catálogo IBESC</span><h2>Encontre o curso ideal para você</h2><p>Pesquise por nome, área, formação ou instituição. Nos cursos parceiros, você também pode acessar o catálogo oficial da instituição.</p></div><CourseCatalog /></div></section>
  </main>;
}
