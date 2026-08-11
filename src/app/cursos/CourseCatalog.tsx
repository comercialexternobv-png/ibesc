'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { categoryLabels, courses, getCourseInstitution } from '@/data/courses';

export default function CourseCatalog() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('Todas');
  const [category, setCategory] = useState('Todas');
  const [institution, setInstitution] = useState('Todas');

  const filtered = useMemo(() => courses.filter((course) => {
    if (course.status !== 'ATIVO') return false;
    const text = `${course.name} ${course.description} ${course.area} ${getCourseInstitution(course)}`.toLowerCase();
    return text.includes(query.trim().toLowerCase())
      && (area === 'Todas' || course.area === area)
      && (category === 'Todas' || course.category === category)
      && (institution === 'Todas' || (Array.isArray(course.institution) ? course.institution : [course.institution]).includes(institution as 'IBESC' | 'UNINASSAU' | 'UNIFAEL'));
  }), [query, area, category, institution]);

  function clearFilters() {
    setQuery(''); setArea('Todas'); setCategory('Todas'); setInstitution('Todas');
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

    {filtered.length ? <div className="course-grid">{filtered.map(course => (
      <article className="card course-card" key={course.id}>
        <div className="course-image"/>
        <span className="tag">{course.category === 'POS_GRADUACAO' ? 'Pós-graduação Digital' : course.type}</span>
        <h3>{course.name}</h3>
        <div className="course-meta">{getCourseInstitution(course)} • {course.area}</div>
        <p>{course.description}</p>
        {course.duration && <p style={{fontSize:13,marginTop:-6}}><strong>Duração:</strong> {course.duration}</p>}
        {course.category === 'POS_GRADUACAO' && <p style={{fontSize:13,marginTop:-6}}>Consulte a instituição para detalhes atualizados.</p>}
        <Link className="btn btn-dark" href={`/curso/${course.slug}`}>
          {course.category === 'POS_GRADUACAO' ? 'Ver detalhes da pós' : course.institution === 'IBESC' ? 'Saiba mais' : 'Ver formação'}
        </Link>
      </article>
    ))}</div> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={clearFilters}>Limpar filtros</button></div>}
  </>;
}
