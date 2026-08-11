'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { courses } from '@/data/courses';

const partnerLinks = {
  UNINASSAU_GRADUACAO: 'https://graduacao.uninassau.digital/nossos-cursos',
  UNINASSAU_POS: 'https://ead.uninassau.edu.br/pos-digital',
  UNIFAEL_POS: 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital',
};

function partnerUrl(category: string, institution: string | string[]) {
  const institutions = Array.isArray(institution) ? institution : [institution];
  if (category === 'GRADUACAO' && institutions.includes('UNINASSAU')) return partnerLinks.UNINASSAU_GRADUACAO;
  if (category === 'POS_GRADUACAO' && institutions.includes('UNINASSAU')) return partnerLinks.UNINASSAU_POS;
  if (category === 'POS_GRADUACAO' && institutions.includes('UNIFAEL')) return partnerLinks.UNIFAEL_POS;
  return null;
}

export default function CourseCatalog() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [institution, setInstitution] = useState('Todas');

  const filtered = useMemo(() => courses.filter((course) => {
    const text = `${course.name} ${course.description} ${course.area}`.toLowerCase();
    const matchesQuery = text.includes(query.trim().toLowerCase());
    const matchesArea = area === 'Todas' || course.area === area;
    const matchesCategory = category === 'Todas' || course.category === category;
    const institutions = Array.isArray(course.institution) ? course.institution : [course.institution];
    const matchesInstitution = institution === 'Todas' || institutions.includes(institution as never);
    return matchesQuery && matchesArea && matchesCategory && matchesInstitution;
  }), [query, area, category, institution]);

  return <>
    <div className="search-box">
      <div className="search-grid">
        <input aria-label="Buscar curso" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite o nome do curso" />
        <select aria-label="Filtrar por área" className="input" value={area} onChange={(e) => setArea(e.target.value)}><option>Todas</option>{[...new Set(courses.map(c => c.area))].map(a => <option key={a}>{a}</option>)}</select>
        <select aria-label="Filtrar por formação" className="input" value={category} onChange={(e) => setCategory(e.target.value)}><option value="Todas">Todas</option><option value="GRADUACAO">Graduação</option><option value="POS_GRADUACAO">Pós-graduação</option><option value="TECNICO">Técnico</option><option value="PROFISSIONALIZANTE">Profissionalizante</option></select>
        <select aria-label="Filtrar por instituição" className="input" value={institution} onChange={(e) => setInstitution(e.target.value)}><option>Todas</option><option>IBESC</option><option>UNINASSAU</option><option>UNIFAEL</option></select>
      </div>
    </div>

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,margin:'28px 0 18px'}}><strong>{filtered.length} formação{filtered.length === 1 ? '' : 'ões'} encontrada{filtered.length === 1 ? '' : 's'}</strong><span style={{color:'var(--muted)',fontSize:14}}><SlidersHorizontal size={15} style={{verticalAlign:'middle',marginRight:5}}/>Filtros aplicados em tempo real</span></div>

    {filtered.length ? <div className="course-grid">{filtered.map(c => {
      const institutionLabel = Array.isArray(c.institution) ? c.institution.join(' / ') : c.institution;
      const external = partnerUrl(c.category, c.institution);
      return <article className="card course-card" key={c.id}><div className="course-image"/><span className="tag">{c.type}</span><h3>{c.name}</h3><div className="course-meta">{institutionLabel} • {c.area}</div><p>{c.description}</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{c.institution === 'IBESC' ? <Link className="btn btn-dark" href={`/curso/${c.slug}`}>Saiba mais</Link> : <><Link className="btn btn-dark" href={`/curso/${c.slug}`}>Ver formação</Link>{external && <a className="btn" style={{border:'1px solid var(--border)'}} href={external} target="_blank" rel="noopener noreferrer">Catálogo oficial</a>}</>}</div></article>;
    })}</div> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={() => {setQuery('');setArea('Todas');setCategory('Todas');setInstitution('Todas')}}>Limpar filtros</button></div>}
  </>;
}
