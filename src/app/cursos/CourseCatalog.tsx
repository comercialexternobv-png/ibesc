'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categoryLabels, courses, getCourseInstitution, type Course } from '@/data/courses';

const partnerLinks = {
  UNINASSAU_GRADUACAO: 'https://graduacao.uninassau.digital/nossos-cursos',
  UNINASSAU_POS: 'https://ead.uninassau.edu.br/pos-digital',
  UNIFAEL_POS: 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital',
};

function catalogLinks(course: Course) {
  const institutions = Array.isArray(course.institution) ? course.institution : [course.institution];
  const links: { label: string; url: string }[] = [];

  if (course.category === 'GRADUACAO' && institutions.includes('UNINASSAU')) {
    links.push({ label: 'Catálogo UNINASSAU', url: partnerLinks.UNINASSAU_GRADUACAO });
  }
  if (course.category === 'POS_GRADUACAO' && institutions.includes('UNINASSAU')) {
    links.push({ label: 'Pós UNINASSAU', url: partnerLinks.UNINASSAU_POS });
  }
  if (course.category === 'POS_GRADUACAO' && institutions.includes('UNIFAEL')) {
    links.push({ label: 'Pós UNIFAEL', url: partnerLinks.UNIFAEL_POS });
  }

  return links;
}

export default function CourseCatalog() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [institution, setInstitution] = useState('Todas');

  const filtered = useMemo(() => courses.filter((course) => {
    if (course.status !== 'ATIVO') return false;
    const text = `${course.name} ${course.description} ${course.area} ${getCourseInstitution(course)}`.toLowerCase();
    const matchesQuery = text.includes(query.trim().toLowerCase());
    const matchesArea = area === 'Todas' || course.area === area;
    const matchesCategory = category === 'Todas' || course.category === category;
    const institutions = Array.isArray(course.institution) ? course.institution : [course.institution];
    const matchesInstitution = institution === 'Todas' || institutions.includes(institution as 'IBESC' | 'UNINASSAU' | 'UNIFAEL');
    return matchesQuery && matchesArea && matchesCategory && matchesInstitution;
  }), [query, area, category, institution]);

  function clearFilters() {
    setQuery('');
    setArea('Todas');
    setCategory('Todas');
    setInstitution('Todas');
  }

  return <>
    <div className="search-box">
      <div className="search-grid">
        <input aria-label="Buscar curso" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite o nome do curso" />
        <select aria-label="Filtrar por área" className="input" value={area} onChange={(e) => setArea(e.target.value)}><option>Todas</option>{[...new Set(courses.map(c => c.area))].map(a => <option key={a}>{a}</option>)}</select>
        <select aria-label="Filtrar por formação" className="input" value={category} onChange={(e) => setCategory(e.target.value)}><option value="Todas">Todas</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        <select aria-label="Filtrar por instituição" className="input" value={institution} onChange={(e) => setInstitution(e.target.value)}><option>Todas</option><option>IBESC</option><option>UNINASSAU</option><option>UNIFAEL</option></select>
      </div>
    </div>

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,margin:'28px 0 18px',flexWrap:'wrap'}}>
      <strong>{filtered.length} formação{filtered.length === 1 ? '' : 'ões'} encontrada{filtered.length === 1 ? '' : 's'}</strong>
      <span style={{color:'var(--muted)',fontSize:14}}><SlidersHorizontal size={15} style={{verticalAlign:'middle',marginRight:5}}/>Filtros aplicados em tempo real</span>
    </div>

    {filtered.length ? <div className="course-grid">{filtered.map(course => {
      const links = catalogLinks(course);
      return <article className="card course-card" key={course.id}>
        <div className="course-image"/>
        <span className="tag">{course.type}</span>
        <h3>{course.name}</h3>
        <div className="course-meta">{getCourseInstitution(course)} • {course.area}</div>
        <p>{course.description}</p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <Link className="btn btn-dark" href={`/curso/${course.slug}`}>{course.institution === 'IBESC' ? 'Saiba mais' : 'Ver formação'}</Link>
          {links.map(link => <a key={link.url} className="btn" style={{border:'1px solid var(--border)'}} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
        </div>
      </article>;
    })}</div> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={clearFilters}>Limpar filtros</button></div>}
  </>;
}
