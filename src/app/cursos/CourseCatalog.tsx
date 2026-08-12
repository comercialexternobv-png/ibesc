'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Clock3, Monitor, Building2, CalendarDays, MapPin } from 'lucide-react';
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

  function clearFilters() { setQuery(''); setArea('Todas'); setCategory('Todas'); setInstitution('Todas'); }
  function getTypeLabel(course: typeof courses[number]) { return course.category === 'POS_GRADUACAO' ? 'Pós-graduação Digital' : course.type; }

  return <>
    <div className="search-box"><div className="search-grid">
      <input aria-label="Buscar curso" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite o nome do curso" />
      <select aria-label="Filtrar por área" className="input" value={area} onChange={(e) => setArea(e.target.value)}><option>Todas</option>{[...new Set(courses.map(c => c.area))].map(a => <option key={a}>{a}</option>)}</select>
      <select aria-label="Filtrar por formação" className="input" value={category} onChange={(e) => setCategory(e.target.value)}><option value="Todas">Todas</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      <select aria-label="Filtrar por instituição" className="input" value={institution} onChange={(e) => setInstitution(e.target.value)}><option>Todas</option><option>IBESC</option><option>UNINASSAU</option><option>UNIFAEL</option></select>
    </div></div>

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,margin:'28px 0 18px',flexWrap:'wrap'}}>
      <strong>{filtered.length} formação{filtered.length === 1 ? '' : 'ões'} encontrada{filtered.length === 1 ? '' : 's'}</strong>
      <span style={{color:'var(--muted)',fontSize:14}}><SlidersHorizontal size={15} style={{verticalAlign:'middle',marginRight:5}}/>Filtros aplicados em tempo real</span>
    </div>

    {filtered.length ? <div className="course-grid">{filtered.map(course => {
      const institution = getCourseInstitution(course); const isPost = course.category === 'POS_GRADUACAO'; const isGrad = course.category === 'GRADUACAO';
      return <article className="card course-card" key={course.id}>
        <div className="course-image" style={course.image ? {backgroundImage:`url(${course.image})`,backgroundSize:'cover',backgroundPosition:'center'} : undefined} aria-hidden="true" />
        <span className="tag">{getTypeLabel(course)}</span><h3>{course.name}</h3>
        <div className="course-meta"><Building2 size={14}/> {institution} <span>•</span> {course.area}</div><p>{course.description}</p>
        <div style={{display:'grid',gap:8,margin:'16px 0 20px',fontSize:13,color:'var(--muted)'}}>
          {isPost && <div style={{display:'flex',alignItems:'center',gap:7}}><Monitor size={15}/><span><strong style={{color:'var(--text)'}}>Modalidade:</strong> Digital</span></div>}
          {course.duration && <div style={{display:'flex',alignItems:'center',gap:7}}><Clock3 size={15}/><span><strong style={{color:'var(--text)'}}>Duração:</strong> {course.duration}</span></div>}
          {course.attendanceInfo && <div style={{display:'flex',alignItems:'flex-start',gap:7}}><CalendarDays size={15}/><span><strong style={{color:'var(--text)'}}>Presencial:</strong> {course.attendanceInfo.replace(/^Encontros presenciais\s*/i, '')}</span></div>}
          {!isPost && !course.attendanceInfo && course.local && <div style={{display:'flex',alignItems:'center',gap:7}}><MapPin size={15}/><span><strong style={{color:'var(--text)'}}>Local:</strong> {course.local}</span></div>}
        </div>
        {isPost && <div style={{fontSize:12,lineHeight:1.5,padding:'10px 12px',borderRadius:10,background:'var(--light)',marginBottom:18}}>Informações acadêmicas e condições atuais devem ser confirmadas na página oficial da instituição.</div>}
        <Link className="btn btn-dark" href={`/curso/${course.slug}`}>{isPost ? 'Ver detalhes da pós' : isGrad ? 'Ver detalhes da graduação' : course.institution === 'IBESC' ? 'Saiba mais' : 'Ver formação'}</Link>
      </article>;
    })}</div> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={clearFilters}>Limpar filtros</button></div>}
  </>;
}
