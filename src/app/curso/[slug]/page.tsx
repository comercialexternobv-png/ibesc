import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { courses, getCourseImage } from '@/data/courses';
import { partnerCatalogs } from '@/data/partnerCatalogs';
import { MessageCircle, CheckCircle2, ArrowRight, ExternalLink, BookOpen, Users, Clock3 } from 'lucide-react';
import LeadForm from './LeadForm';
import styles from './page.module.css';

const wa = '5588988498031';
export function generateStaticParams() { return [...courses.map((c) => ({ slug: c.slug })), { slug: 'tecnico-em-informatica' }]; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return {
    title: course.name,
    description: course.description,
    alternates: { canonical: `/curso/${course.slug}` },
    openGraph: { title: `${course.name} | IBESC`, description: course.description, images: [{ url: getCourseImage(course), alt: course.name }] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'tecnico-em-informatica') redirect('/curso/curso-basico-de-informatica');
  const c = courses.find((x) => x.slug === slug);
  if (!c) return notFound();

  const institution = Array.isArray(c.institution) ? c.institution.join(' / ') : c.institution;
  const own = c.institution === 'IBESC';
  const isPost = c.category === 'POS_GRADUACAO';
  const isPartnerPost = isPost && !own;
  const isGrad = c.category === 'GRADUACAO';
  const isTecnico = c.category === 'TECNICO';
  const isProfessionalizing = c.category === 'PROFISSIONALIZANTE';
  const isUnicorpCourse = c.id.startsWith('ibesc-unicorp-') || Boolean(c.observations?.some((observation) => /Unicorp(?:Tec)?/i.test(observation)));
  const catalogUrl = c.externalUrl || (c.institution === 'UNIFAEL' ? partnerCatalogs.unifaelPos.officialUrl : partnerCatalogs.uninassauPos.officialUrl);
  const institutionLabel = isUnicorpCourse ? 'IBESC em parceria com a Unicorp' : c.institution === 'UNIFAEL' ? 'UNIFAEL' : c.institution === 'UNINASSAU' ? 'UNINASSAU' : institution;
  const themeClass = c.institution === 'UNINASSAU' ? styles.themeUninassau : c.institution === 'UNIFAEL' ? styles.themeUnifael : styles.themeIbesc;
  const institutionLogo = c.institution === 'UNINASSAU' ? '/images/partners/uninassau.svg' : c.institution === 'UNIFAEL' ? '/images/partners/unifael.svg' : '/images/ibesc-logo-transparent.png';
  const msg = encodeURIComponent(`Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${c.name}${isPost ? ` da ${institutionLabel}` : ''}.`);

  const audience = c.audience || (isGrad ? `Pessoas que desejam iniciar ou fortalecer uma trajetória profissional na área de ${c.area.toLowerCase()}.` : isTecnico ? `Pessoas que buscam uma formação técnica e prática para ampliar suas oportunidades profissionais em ${c.area.toLowerCase()}.` : `Profissionais e interessados que desejam desenvolver conhecimentos na área de ${c.area.toLowerCase()}.`);
  const learning = c.learning || (isGrad ? [`Fundamentos da formação em ${c.name}.`, `Conhecimentos técnicos e profissionais relacionados à área de ${c.area.toLowerCase()}.`, 'Desenvolvimento de competências para atuação profissional.'] : isTecnico ? [`Fundamentos de ${c.name}.`, `Conhecimentos práticos relacionados à área de ${c.area.toLowerCase()}.`, 'Preparação para situações do mercado de trabalho.'] : [`Fundamentos e conceitos de ${c.name}.`, `Aplicações práticas relacionadas à área de ${c.area.toLowerCase()}.`, 'Desenvolvimento profissional e atualização de conhecimentos.']);
  const highlights = c.highlights || (isGrad ? [c.attendanceInfo || 'Consulte o consultor sobre a dinâmica presencial e acadêmica do curso.', 'Formação vinculada à instituição parceira', 'Orientação comercial IBESC'] : isTecnico ? ['Formação técnica', 'Atendimento IBESC', 'Orientação sobre matrícula e próximos passos'] : [isPost ? 'Modalidade digital' : 'Formação profissional', `Oferta pela ${institutionLabel}`, 'Orientação comercial IBESC']);
  const requirements = c.requirements || (isPost ? 'É necessário possuir diploma de graduação para ingressar em uma pós-graduação.' : isGrad ? 'Consulte o consultor IBESC sobre requisitos de ingresso, documentação e condições da turma.' : 'Consulte o IBESC sobre requisitos de ingresso e documentação.');

  const infoItems = isPost ? [['Modalidade', c.modality || 'Digital'], ['Instituição', institutionLabel], ['Duração', c.duration || 'A confirmar na instituição'], ['Área', c.area], ['Local de atendimento', 'IBESC — Boa Viagem/CE'], ...(isUnicorpCourse ? [['Início', 'Imediato após a matrícula']] : [])] : [['Modalidade', c.modality || (isGrad ? 'A confirmar pelo consultor' : 'A confirmar pelo IBESC')], ['Duração', c.duration || 'A confirmar pelo consultor'], ['Local', c.local || 'Boa Viagem — CE'], ['Instituição', isUnicorpCourse ? institutionLabel : institution], ...(c.attendanceInfo ? [['Encontros presenciais', c.attendanceInfo]] : []), [isUnicorpCourse ? 'Início' : 'Próxima turma', isUnicorpCourse ? 'Imediato após a matrícula' : c.startDate || 'A confirmar pelo consultor']];

  return <main className={`${styles.coursePage} ${themeClass}`}>
    <section className="hero"><div className="container hero-grid"><div>
      <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>{isPost ? 'Pós-graduação Digital' : c.type}</span>
      <h1 className="course-hero-title" style={{ maxWidth: 850 }}>{c.name}</h1><p>{institutionLabel} • {c.area}</p>
      <div className="hero-actions">
        {isPartnerPost ? <a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer">Ver curso na {institutionLabel} <ExternalLink size={17} /></a> : <a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`}>{own ? 'Quero me matricular' : 'Falar com um consultor'} <ArrowRight size={17} /></a>}
        {isPartnerPost && <a className="btn btn-outline" href={`https://wa.me/${wa}?text=${msg}`}>Falar com um consultor <MessageCircle size={17} /></a>}
        {!own && !isPost && <a className="btn btn-outline" href={catalogUrl} target="_blank" rel="noreferrer">Ver catálogo oficial <ExternalLink size={17} /></a>}
      </div>
    </div><div className="hero-card" style={{overflow:'hidden',padding:0}}><Image src={getCourseImage(c)} alt={`Imagem de ${c.name}`} width={1200} height={800} priority sizes="(max-width: 800px) 100vw, 45vw" style={{width:'100%',height:300,objectFit:'cover',display:'block'}} /><div className={styles.heroInstitution}><Image src={institutionLogo} alt={institutionLabel} width={300} height={100}/><strong>{isPost ? `Pós-graduação Digital ${institutionLabel}` : isProfessionalizing ? `Curso ofertado pelo ${institutionLabel}` : own ? 'Formação própria IBESC' : `Formação em parceria com ${institution}`}</strong></div></div></div></section>

    {c.images && c.images.length > 0 && <section className="section" style={{paddingBottom:0}}><div className="container"><div className="section-head"><span className="eyebrow">Conheça a estrutura</span><h2>Veja o Técnico em Enfermagem de perto</h2><p>Conheça os ambientes e momentos de aprendizagem apresentados pelo IBESC.</p></div><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:18}}>{c.images.map((image, index) => <div key={image} className="card" style={{padding:0,overflow:'hidden',borderRadius:16}}><Image src={image} alt={`${c.name} — imagem ${index + 1}`} width={1200} height={900} sizes="(max-width: 800px) 100vw, 50vw" style={{display:'block',width:'100%',height:280,objectFit:'cover'}} /></div>)}</div></div></section>}

    <section className="section"><div className="container contact-grid"><div>
      <span className="eyebrow">Sobre a formação</span><h2>{isPost ? `Conheça a especialização em ${c.name}` : own ? 'Conheça esta formação' : `Conheça a formação em ${c.name}`}</h2><p>{c.description}</p>
      <div className={styles.courseDetailStack}><div className={`card diff-card ${styles.courseDetailCard}`}><Clock3 /><h3>{isPost ? 'Modalidade digital' : 'Formato da formação'}</h3><p>{isPost ? 'A formação é disponibilizada digitalmente pela instituição responsável.' : c.modality || 'Consulte a equipe IBESC para confirmar o formato e a dinâmica da oferta.'}</p></div><div className={`card diff-card ${styles.courseDetailCard}`}><Users /><h3>Para quem é</h3><p>{audience}</p></div><div className={`card diff-card ${styles.courseDetailCard}`}><BookOpen /><h3>Conteúdos e competências</h3><p>Confira abaixo os conhecimentos informados para esta formação.</p></div></div>
      <div className="card" style={{ marginTop: 25 }}><h3>Informações principais</h3>{infoItems.map(([label, value]) => <p key={label}><strong>{label}:</strong> {value}</p>)}</div>
      <div className="card" style={{ marginTop: 18 }}><h3>O que você vai aprender</h3><ul>{learning.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Destaques da formação</h3><ul>{highlights.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Requisitos de ingresso</h3><p>{requirements}</p></div>
      {c.observations && c.observations.length > 0 && <div className="card" style={{ marginTop: 18 }}><h3>Observações</h3>{c.observations.map((observation) => <p key={observation}>{observation}</p>)}</div>}
      {isPartnerPost && <div className="card" style={{ marginTop: 18 }}><h3>Como funciona</h3><p>O IBESC apresenta a formação e realiza o atendimento comercial. Para confirmar matriz curricular, condições, matrícula e regras acadêmicas, consulte a página oficial da instituição responsável.</p><a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer" style={{ marginTop: 8 }}>Acessar página oficial <ExternalLink size={17} /></a></div>}
      {isPost && own && <div className="card" style={{ marginTop: 18 }}><h3>Como funciona</h3><p>O IBESC apresenta a formação, orienta sobre a matriz curricular e realiza o atendimento para matrícula. Fale com a equipe para confirmar condições, duração e disponibilidade da turma.</p><a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`} style={{ marginTop: 8 }}>Falar com o IBESC <MessageCircle size={17} /></a></div>}
      {!isPost && <div className="card" style={{ marginTop: 18 }}><h3>Próximos passos</h3><p>Fale com o IBESC para confirmar disponibilidade, modalidade, documentação, condições atuais e o processo de matrícula.</p><a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`} style={{ marginTop: 8 }}>Falar com um consultor <MessageCircle size={17} /></a></div>}
    </div><div className="card"><h3>Solicite informações sobre este curso</h3><LeadForm courseName={c.name} tipoFormacao={c.category} tipoComercial={c.type} instituicao={institutionLabel} /></div></div></section>

    <section className="section" style={{ background: 'var(--light)' }}><div className="container"><div className="section-head"><span className="eyebrow">Conheça melhor</span><h2>{isPartnerPost ? 'Informações oficiais e atendimento IBESC' : own ? 'Por que escolher o IBESC?' : 'Por que considerar esta formação?'}</h2><p>{isPartnerPost ? 'As informações desta página foram organizadas a partir das ofertas divulgadas pelas instituições parceiras. Condições comerciais e acadêmicas podem mudar e devem ser confirmadas na página oficial.' : 'O IBESC orienta você sobre disponibilidade, documentação, condições e próximos passos.'}</p></div><div className="diff-grid">{(isPartnerPost ? ['Modalidade digital', `Oferta pela ${institutionLabel}`, 'Conteúdo e informações do curso', 'Orientação comercial IBESC'] : own ? ['Formação direcionada', 'Atendimento próximo', 'Orientação para matrícula', 'Foco no seu próximo passo'] : ['Informações oficiais', 'Orientação comercial', 'Catálogo atualizado', 'Suporte para matrícula']).map((x) => <div className={`card diff-card ${styles.courseDetailCard}`} key={x}><CheckCircle2 /><h3>{x}</h3><p>{isPartnerPost ? 'Consulte a plataforma oficial para confirmar detalhes atualizados da oferta.' : 'O consultor IBESC ajuda você a encontrar e encaminhar a opção adequada.'}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="cta"><h2>{isPartnerPost ? `Quer conhecer a oferta da ${institutionLabel}?` : own ? 'Quer saber mais sobre este curso?' : 'Quer verificar as opções disponíveis?'}</h2><p>{isPartnerPost ? 'Acesse a página oficial para consultar a oferta completa ou fale com o IBESC.' : 'Fale com o IBESC e receba orientação sobre disponibilidade e matrícula.'}</p><div className="hero-actions">{isPartnerPost ? <a className="btn btn-dark" href={catalogUrl} target="_blank" rel="noreferrer">Ver curso na {institutionLabel} <ExternalLink size={17} /></a> : <a className="btn btn-dark" href={`https://wa.me/${wa}?text=${msg}`}>Falar no WhatsApp</a>}<a className="btn btn-outline" style={{ background: 'var(--navy)' }} href={`https://wa.me/${wa}?text=${msg}`}>Falar com o IBESC <MessageCircle size={17} /></a></div></div></div></section>
    <section className="section"><div className="container"><Link className="link" href={c.category === 'TECNICO' ? '/cursos-tecnicos' : '/cursos'}>← Voltar para cursos</Link></div></section>
  </main>;
}
