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
  const highlights = c.highlights || (isGrad ? ['Formação acadêmica da instituição responsável', 'Catálogo oficial para consulta', 'Orientação comercial IBESC'] : isTecnico ? ['Formação técnica', 'Atendimento IBESC', 'Orientação sobre matrícula e próximos passos'] : [isPost ? 'Modalidade digital' : 'Formação profissional', `Oferta pela ${institutionLabel}`, 'Orientação comercial IBESC']);
  const requirements = c.requirements || (isPost ? 'É necessário possuir diploma de graduação para ingressar em uma pós-graduação.' : isGrad ? 'Consulte o consultor IBESC sobre requisitos de ingresso, documentação e condições da turma.' : 'Consulte o IBESC sobre requisitos de ingresso e documentação.');

  const infoItems: [string, string][] = [
    ['Categoria', isPost ? 'Pós-graduação' : c.type],
    ['Área', c.area],
    ['Instituição responsável', institutionLabel],
    ...(c.modality ? [['Modalidade', c.modality] as [string, string]] : []),
    ...(c.duration ? [['Duração', c.duration] as [string, string]] : []),
    ...(c.local ? [['Local informado', c.local] as [string, string]] : []),
    ...(c.attendanceInfo ? [['Atividades presenciais', c.attendanceInfo] as [string, string]] : []),
    ...(isUnicorpCourse ? [['Início', 'Imediato após a matrícula'] as [string, string]] : c.startDate ? [['Disponibilidade informada', c.startDate] as [string, string]] : []),
  ];
  const responsibilityItems = own
    ? [
      ['Oferta e atendimento', isUnicorpCourse ? 'O IBESC realiza a oferta e o atendimento desta formação.' : 'O IBESC é a instituição indicada para a oferta e o atendimento deste curso.'],
      ['Certificação', isUnicorpCourse ? 'A participação da Unicorp está descrita nas observações específicas desta formação.' : 'Confirme com o IBESC a documentação e a certificação correspondentes ao curso.'],
      ['Informações atuais', 'Disponibilidade e condições devem ser confirmadas com a equipe antes da matrícula.'],
    ]
    : [
      ['Responsabilidade acadêmica', `${institutionLabel} responde pela formação, pelas regras acadêmicas e pela oferta oficial.`],
      ['Atendimento IBESC', 'O IBESC oferece orientação comercial e ajuda a localizar o canal adequado para avançar.'],
      ['Fonte oficial', 'Matriz curricular, modalidade, duração e condições atuais devem ser confirmadas nos canais da instituição responsável.'],
    ];
  const faqItems = [
    ['Quem é responsável por esta formação?', own ? institutionLabel : `${institutionLabel} é a instituição academicamente responsável. O IBESC presta orientação comercial.`],
    ['Como confirmar disponibilidade e condições?', own ? 'Fale com a equipe IBESC antes da matrícula.' : 'Consulte a página oficial da instituição e, se necessário, fale com o IBESC.'],
    ['Onde confirmar conteúdos e regras acadêmicas?', own ? 'As informações disponíveis devem ser confirmadas diretamente com o IBESC.' : `Na plataforma e nos canais oficiais da ${institutionLabel}.`],
  ];

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
      <div className={styles.factCard}><h3>Informações essenciais</h3><dl>{infoItems.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
      <div className="card" style={{ marginTop: 18 }}><h3>O que você vai aprender</h3><ul>{learning.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Destaques da formação</h3><ul>{highlights.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Requisitos de ingresso</h3><p>{requirements}</p></div>
      {c.observations && c.observations.length > 0 && <div className="card" style={{ marginTop: 18 }}><h3>Observações</h3>{c.observations.map((observation) => <p key={observation}>{observation}</p>)}</div>}
    </div><div className="card"><h3>Solicite informações sobre este curso</h3><LeadForm courseName={c.name} tipoFormacao={c.category} tipoComercial={c.type} instituicao={institutionLabel} /></div></div></section>

    <section className="section" style={{ background: 'var(--light)' }}><div className="container"><div className="section-head"><span className="eyebrow">Transparência</span><h2>Quem responde por cada etapa</h2><p>Antes de avançar, entenda a responsabilidade acadêmica e o papel do atendimento comercial.</p></div><div className="path-grid">{responsibilityItems.map(([title,text])=><div className={`card ${styles.responsibilityCard}`} key={title}><CheckCircle2/><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">Dúvidas frequentes</span><h2>Antes de solicitar informações</h2></div><div className="faq-list">{faqItems.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><div className="cta" style={{marginTop:40}}><div><h2>{own ? 'Quer receber as informações atuais?' : `Quer consultar esta formação da ${institutionLabel}?`}</h2><p>{own ? 'Fale com o IBESC para confirmar disponibilidade, requisitos e processo de matrícula.' : 'Acesse a fonte oficial para os dados acadêmicos ou procure o IBESC para orientação comercial.'}</p></div><div className="hero-actions">{!own && <a className="btn btn-dark" href={catalogUrl} target="_blank" rel="noreferrer">Acessar fonte oficial <ExternalLink size={17}/></a>}<a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`}>Falar com o IBESC <MessageCircle size={17}/></a></div></div></div></section>
    <section className="section"><div className="container"><Link className="link" href={c.category === 'TECNICO' ? '/cursos-tecnicos' : '/cursos'}>← Voltar para cursos</Link></div></section>
  </main>;
}
