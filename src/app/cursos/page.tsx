import { Metadata } from 'next';
import CourseCatalog from './CourseCatalog';

export const metadata: Metadata = {
  title: 'Cursos | IBESC',
  description: 'Encontre graduação, pós-graduação e cursos técnicos em Boa Viagem — CE.',
};

export default function Cursos() {
  return <main>
    <section className="section catalog-section"><div className="container"><div className="section-head"><span className="eyebrow">Catálogo IBESC</span><h1 className="catalog-title">Encontre o curso ideal para você</h1><p>Pesquise por nome, área, formação, instituição ou modalidade. Nos cursos parceiros, você também pode acessar o catálogo oficial da instituição.</p></div><CourseCatalog /></div></section>
  </main>;
}
