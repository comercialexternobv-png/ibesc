'use client';

import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Clock3, Monitor, Building2, X, Info } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { categoryLabels, courses, getCourseImage, getCourseInstitution, type CourseCategory } from '@/data/courses';

const institutions = ['IBESC', 'UNINASSAU', 'UNIFAEL'] as const;
const modalities = ['EAD', 'Semipresencial', 'Digital'] as const;
const allOption = 'Todas';
const categories = Object.keys(categoryLabels) as CourseCategory[];
const pageSize = 18;

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
  const [visibleCount, setVisibleCount] = useState(pageSize);

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

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [query, selectedArea, selectedCategory, selectedInstitution, selectedModality]);

  const visibleCourses = filtered.slice(0, visibleCount);

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
  const activeFilters = [
    filters.query.trim() && { key: 'query', label: `Busca: ${filters.query.trim()}` },
    filters.area !== allOption && { key: 'area', label: filters.area },
    filters.category !== allOption && { key: 'category', label: categoryLabels[filters.category] },
    filters.institution !== allOption && { key: 'institution', label: filters.institution },
    filters.modality !== allOption && { key: 'modality', label: filters.modality },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];
  function removeFilter(key: keyof Filters) {
    updateFilters({ [key]: key === 'query' ? '' : allOption } as Partial<Filters>);
  }
  function getTypeLabel(course: typeof courses[number]) { return course.category === 'POS_GRADUACAO' ? 'Pós-graduação Digital' : course.type; }
  function institutionTheme(value: string) { return value.includes('UNINASSAU') ? 'theme-uninassau' : value.includes('UNIFAEL') ? 'theme-unifael' : 'theme-ibesc'; }

  return <>
    <div className={`search-box catalog-search ${selectedInstitution === allOption ? 'theme-all' : institutionTheme(selectedInstitution)}`}><div className="search-grid">
      <input aria-label="Buscar curso" className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite o nome do curso" />
      <select aria-label="Filtrar por área" className="input" value={filters.area} onChange={(e) => updateFilters({ area: e.target.value })}><option value={allOption}>Todas as áreas</option>{areas.map(a => <option key={a} value={a}>{a}</option>)}</select>
      <select aria-label="Filtrar por formação" className="input" value={filters.category} onChange={(e) => updateFilters({ category: e.target.value as Filters['category'] })}><option value={allOption}>Todas as formações</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
      <select aria-label="Filtrar por instituição" className="input" value={filters.institution} onChange={(e) => updateFilters({ institution: e.target.value as Filters['institution'] })}><option value={allOption}>Todas as instituições</option>{institutions.map(i => <option key={i} value={i}>{i}</option>)}</select>
      <select aria-label="Filtrar por modalidade" className="input" value={filters.modality} onChange={(e) => updateFilters({ modality: e.target.value as Filters['modality'] })}><option value={allOption}>Todas as modalidades</option>{modalities.map(modality => <option key={modality} value={modality}>{modality}</option>)}</select>
    </div></div>

    <div className="catalog-legend" aria-label="Como identificar as ofertas">
      <div><strong>IBESC</strong><span>Cursos próprios e atendimento do instituto.</span></div>
      <div><strong>UNINASSAU / UNIFAEL</strong><span>Formação da instituição indicada, com suporte acadêmico da equipe IBESC.</span></div>
      <div><Info size={18}/><span>Modalidade, disponibilidade e condições devem ser confirmadas na página do curso ou na fonte oficial correspondente.</span></div>
    </div>

    {activeFilters.length > 0 && <div className="active-filters"><strong>Filtros ativos:</strong>{activeFilters.map((filter)=><button type="button" key={filter.key} onClick={()=>removeFilter(filter.key)}>{filter.label}<X size={14}/><span className="sr-only">Remover filtro</span></button>)}<button type="button" className="clear-all" onClick={clearFilters}>Limpar todos</button></div>}

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:15,margin:'28px 0 18px',flexWrap:'wrap'}}>
      <strong>{filtered.length} formação{filtered.length === 1 ? '' : 'ões'} encontrada{filtered.length === 1 ? '' : 's'}</strong>
      <span style={{color:'var(--muted)',fontSize:14}}><SlidersHorizontal size={15} style={{verticalAlign:'middle',marginRight:5}}/>Filtros aplicados em tempo real</span>
    </div>

    {filtered.length ? <><div className="course-grid">{visibleCourses.map(course => {
      const institution = getCourseInstitution(course);
      return <article className={`card course-card catalog-course-card ${institutionTheme(institution)}`} key={course.id}>
        <div className="course-image" style={{backgroundImage:`url(${getCourseImage(course)})`,backgroundSize:'cover',backgroundPosition:'center'}} aria-hidden="true" />
        <span className="tag">{getTypeLabel(course)}</span><h3>{course.name}</h3>
        <div className="course-meta"><Building2 size={14}/> {institution} <span>•</span> {course.area}</div><p className="course-card-description">{course.description}</p>
        <div className="course-card-details">
          {course.modality && <div style={{display:'flex',alignItems:'center',gap:7}}><Monitor size={15}/><span><strong style={{color:'var(--text)'}}>Modalidade:</strong> {course.modality}</span></div>}
          {course.duration && <div style={{display:'flex',alignItems:'center',gap:7}}><Clock3 size={15}/><span><strong style={{color:'var(--text)'}}>Duração:</strong> {course.duration}</span></div>}
        </div>
        <Link className="btn btn-dark" href={`/curso/${course.slug}`}>Conhecer o curso</Link>
      </article>;
    })}</div>{visibleCount < filtered.length && <div className="catalog-load-more"><button className="btn btn-dark" onClick={() => setVisibleCount(count => count + pageSize)}>Carregar mais cursos</button><span>Exibindo {visibleCourses.length} de {filtered.length}</span></div>}</> : <div className="card" style={{textAlign:'center',padding:'55px 25px'}}><Search size={34} color="var(--blue)"/><h3>Nenhuma formação encontrada</h3><p>Tente alterar os filtros ou buscar por outro termo.</p><button className="btn btn-dark" onClick={clearFilters}>Limpar filtros</button></div>}
  </>;
}

export default function CourseCatalog() {
  return (
    <Suspense fallback={<div className="card" style={{padding:'40px 25px',textAlign:'center'}}>Carregando catálogo...</div>}>
      <CourseCatalogContent />
    </Suspense>
  );
}
