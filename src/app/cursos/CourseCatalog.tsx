'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Clock3, Monitor, Building2, CalendarDays, MapPin } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categoryLabels, courses, getCourseImage, getCourseInstitution, type CourseCategory } from '@/data/courses';

const institutions = ['IBESC', 'UNINASSAU', 'UNIFAEL'] as const;
const modalities = ['EAD', 'Semipresencial', 'Digital'] as const;
const allOption = 'Todas';
const categories = Object.keys(categoryLabels) as CourseCategory[];

type Filters = {
  query: string;
  area: string;
  category: CourseCategory | typeof allOption;
  institution: typeof institutions[number] | typeof allOption;
  modality: typeof modalities[number] | typeof allOption;
};

export function normalizeSearchText(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
}

function CourseCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = searchParams.get('query')?.trim() || '';
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery((currentQuery) => currentQuery === urlQuery ? currentQuery : urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (query === urlQuery) return;

    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set('query', query.trim());
      else params.delete('query');
      router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [pathname, query, router, searchParams, urlQuery]);

  const areas = useMemo(() => [...new Set(courses.filter(c => c.status === 'ATIVO').map(c => c.area))].sort((a, b) => a.localeCompare(b, 'pt-BR')), []);
  const selectedArea = areas.includes(searchParams.get('area') || '') ? searchParams.get('area')! : allOption;
  const selectedCategory = categories.includes(searchParams.get('category') as CourseCategory) ? searchParams.get('category') as CourseCategory : allOption;
  const selectedInstitution = institutions.includes(searchParams.get('institution') as typeof institutions[number]) ? searchParams.get('institution') as typeof institutions[number] : allOption;
  const selectedModality = modalities.includes(searchParams.get('modality') as typeof modalities[number]) ? searchParams.get('modality') as typeof modalities[number] : allOption;
  const filters: Filters = {
    query,
    area: selectedArea,
    category: selectedCategory,
    institution: selectedInstitution,
    modality: selectedModality,
  };

  const filtered = useMemo(() => courses.filter((course) => {
    if (course.status !== 'ATIVO') return false;
    const normalizedQuery = normalizeSearchText(query);
    const text = normalizeSearchText(`${course.name} ${course.description} ${course.area} ${getCourseInstitution(course)} ${course.type} ${categoryLabels[course.category]}`);
    return text.includes(normalizedQuery)
      && (selectedArea === allOption || course.area === selectedArea)
      && (selectedCategory === allOption || course.category === selectedCategory)
      && (selectedInstitution === allOption || (Array.isArray(course.institution) ? course.institution : [course.institution]).includes(selectedInstitution))
      && (selectedModality === allOption || course.modality === selectedModality);
  }), [query, selectedArea, selectedCategory, selectedInstitution, selectedModality]);

  function updateFilters(nextFilters: Partial<Filters>) {
    const next = { ...filters, ...nextFilters };
    const params = new URLSearchParams();
    if (next.query.trim()) params.set('query', next.query.trim());
    if (next.area !== allOption) params.set('area', next.area);
    if (next.category !== allOption) params.set('category', next.category);
    if (next.institution !== allOption) params.set('institution', next.institution);
    if (next.modality !== allOption) params.set('modality', next.modality);
    router.push(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }

  function clearFilters() { router.push(pathname, { scroll: false }); }
  function getTypeLabel(course: typeof courses[number]) { return course.category === 'POS_GRADUACAO' ? 'Pós-graduação Digital' : course.type; }

  return <>
    <div className="search-box"><div className="search-grid">
      <input aria-label="Buscar curso" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite o nome do curso" />
      <select aria-label="Filtrar por área" className="input" value={filters.area} onChange={(e) => updateFilters({ area: e.target.value })}><option>{allOption}</option>{areas.map(a => <option key={a} value={a}>{a}</option>)}</select>
      <select aria-label="Filtrar por formação" className="input" value={filters.category} onChange={(e) => updateFilters({ category: e.target.value as Filters['category'] })}><option value={allOption}>{allOption}</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      <select aria-label="Filtrar por instituição" className="input" value={filters.institution} onChange={(e) => updateFilters({ institution: e.target.value as Filters['institution'] })}><option>{allOption}</option>{institutions.map(i => <option key={i} value={i}>{i}</option>)}</select>
      <select aria-label="Filtrar por modalidade" className="input" value={filters.modality} onChange={(e) => updateFilters({ modality: e.target.value as Filters['modality'] })}><option>{allOption}</option>{modalities.map(modality => <option key={modality} value={modality}>{modality}</option>)}</select>
    </div></div>

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,margin:'28px 0 18px',flexWrap:'wrap'}}>
      <strong>{filtered.length} formação{filtered.length === 1 ? '' : 'ões'} encontrada{filtered.length === 1 ? '' : 's'}</strong>
      <span style={{color:'var(--muted)',fontSize:14}}><SlidersHorizontal size={15} style={{verticalAlign:'middle',marginRight:5}}/>Filtros aplicados em tempo real</span>
    </div>

    {filtered.length ? <div className="course-grid">{filtered.map(course => {
      const institution = getCourseInstitution(course); const isPost = course.category === 'POS_GRADUACAO'; const isGrad = course.category === 'GRADUACAO';
      return <article className="card course-card" key={course.id}>
        <div className="course-image" style={{backgroundImage:`url(${getCourseImage(course)})`,backgroundSize:'cover',backgroundPosition:'center'}} aria-hidden="true" />
        <span className="tag">{getTypeLabel(course)}</span><h3>{course.name}</h3>
        <div className="course-meta"><Building2 size={14}/> {institution} <span>•</span> {course.area}</div><p>{course.description}</p>
        <div style={{display:'grid',gap:8,margin:'16px 0 20px',fontSize:13,color:'var(--muted)'}}>
          {course.modality && <div style={{display:'flex',alignItems:'center',gap:7}}><Monitor size={15}/><span><strong style={{color:'var(--text)'}}>Modalidade:</strong> {course.modality}</span></div>}
          {course.duration && <div style={{display:'flex',alignItems:'center',gap:7}}><Clock3 size={15}/><span><strong style={{color:'var(--text)'}}>Duração:</strong> {course.duration}</span></div>}
          {course.attendanceInfo && <div style={{display:'flex',alignItems:'flex-start',gap:7}}><CalendarDays size={15}/><span><strong style={{color:'var(--text)'}}>Presencial:</strong> {course.attendanceInfo.replace(/^Encontros presenciais\s*/i, '')}</span></div>}
          {!isPost && !course.attendanceInfo && course.local && <div style={{display:'flex',alignItems:'center',gap:7}}><MapPin size={15}/><span><strong style={{color:'var(--text)'}}>Local:</strong> {course.local}</span></div>}
        </div>
        {isPost && <div style={{fontSize:12,lineHeight:1.5,padding:'10px 12px',borderRadius:10,background:'var(--light)',marginBottom:18}}>{course.institution === 'IBESC' ? 'Informações acadêmicas, disponibilidade e condições atuais devem ser confirmadas com o IBESC.' : 'Informações acadêmicas e condições atuais devem ser confirmadas na página oficial da instituição.'}</div>}
        <Link className="btn btn-dark" href={`/curso/${course.slug}`}>{isPost ? 'Ver detalhes da pós' : isGrad ? 'Ver detalhes da graduação' : course.institution === 'IBESC' ? 'Saiba mais' : 'Ver formação'}</Link>
      </article>;
    })}</div> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={clearFilters}>Limpar filtros</button></div>}
  </>;
}

export default function CourseCatalog() {
  return (
    <Suspense fallback={<div className="card" style={{padding:'40px 25px',textAlign:'center'}}>Carregando catálogo...</div>}>
      <CourseCatalogContent />
    </Suspense>
  );
}
