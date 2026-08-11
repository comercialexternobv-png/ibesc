import { notFound } from 'next/navigation';
import Link from 'next/link';
import { courses, partnerCatalogs } from '@/data/courses';
import { MessageCircle, CheckCircle2, ArrowRight, ExternalLink, BookOpen, Users, Clock3, GraduationCap } from 'lucide-react';
import LeadForm from './LeadForm';

const wa = '5588988498031';
export function generateStaticParams() { return courses.map((c) => ({ slug: c.slug })); }

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);
  if (!c) return notFound();

  const institution = Array.isArray(c.institution) ? c.institution.join(' / ') : c.institution;
  const own = c.institution === 'IBESC';
  const isPost = c.category === 'POS_GRADUACAO';
  const catalogUrl = c.externalUrl || (c.institution === 'UNIFAEL' ? partnerCatalogs.unifaelPos.url : partnerCatalogs.uninassauPos.url);
  const institutionLabel = c.institution === 'UNIFAEL' ? 'UNIFAEL' : c.institution === 'UNINASSAU' ? 'UNINASSAU' : institution;
  const msg = encodeURIComponent(`Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${c.name}${isPost ? ` da ${institutionLabel}` : ''}.`);

  const isGrad = c.category === 'GRADUACAO';
  const isTecnico = c.category === 'TECNICO';
  const audience = c.audience || (isGrad
    ? `Pessoas que desejam iniciar ou fortalecer uma trajetória profissional na área de ${c.area.toLowerCase()}.`
    : isTecnico
      ? `Pessoas que buscam uma formação técnica e prática para ampliar suas oportunidades profissionais em ${c.area.toLowerCase()}.`
      : `Profissionais e interessados que desejam desenvolver conhecimentos na área de ${c.area.toLowerCase()}.`);
  const learning = c.learning || (isGrad
    ? [`Fundamentos da formação em ${c.name}.`, `Conhecimentos técnicos e profissionais relacionados à área de ${c.area.toLowerCase()}.`, 'Desenvolvimento de competências para atuação profissional.']
    : isTecnico
      ? [`Fundamentos de ${c.name}.`, `Conhecimentos práticos relacionados à área de ${c.area.toLowerCase()}.`, 'Preparação para situações do mercado de trabalho.']
      : [`Fundamentos e conceitos de ${c.name}.`, `Aplicações práticas relacionadas à área de ${c.area.toLowerCase()}.`, 'Desenvolvimento profissional e atualização de conhecimentos.']);
  const highlights = c.highlights || (isGrad
    ? [c.attendanceInfo || 'Consulte o consultor sobre a dinâmica presencial e acadêmica do curso.', 'Formação vinculada à instituição parceira', 'Orientação comercial IBESC']
    : isTecnico
      ? ['Formação técnica', 'Atendimento IBESC', 'Orientação sobre matrícula e próximos passos']
      : [isPost ? 'Modalidade digital' : 'Formação profissional', `Oferta pela ${institutionLabel}`, 'Orientação comercial IBESC']);
  const requirements = c.requirements || (isPost ? 'É necessário possuir diploma de graduação para ingressar em uma pós-graduação.' : isGrad ? 'Consulte o consultor IBESC sobre requisitos de ingresso, documentação e condições da turma.' : 'Consulte o IBESC sobre requisitos de ingresso e documentação.');

  const infoItems = isPost
    ? [['Modalidade', c.modality || 'Digital'], ['Instituição', institutionLabel], ['Duração', c.duration || 'A confirmar na instituição'], ['Área', c.area], ['Local de atendimento', 'IBESC — Boa Viagem/CE']]
    : [['Modalidade', c.modality || (isGrad ? 'A confirmar pelo consultor' : 'A confirmar pelo IBESC')], ['Duração', c.duration || 'A confirmar pelo consultor'], ['Local', c.local || 'Boa Viagem — CE'], ['Instituição', institution], ...(c.attendanceInfo ? [['Encontros presenciais', c.attendanceInfo]] : []), ['Próxima turma', c.startDate || 'A confirmar pelo consultor']];

  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>{isPost ? 'Pós-graduação Digital' : c.type}</span>
      <h1 style={{ maxWidth: 850 }}>{c.name}</h1><p>{institutionLabel} • {c.area}</p>
      <div className="hero-actions">
        {isPost ? <a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer">Ver curso na {institutionLabel} <ExternalLink size={17} /></a> : <a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`}>{own ? 'Quero me matricular' : 'Falar com um consultor'} <ArrowRight size={17} /></a>}
        {isPost && <a className="btn btn-outline" href={`https://wa.me/${wa}?text=${msg}`} target="_blank" rel="noreferrer">Falar com um consultor <MessageCircle size={17} /></a>}
        {!own && !isPost && <a className="btn btn-outline" href={catalogUrl} target="_blank" rel="noreferrer">Ver catálogo oficial <ExternalLink size={17} /></a>}
      </div>
    </div><div className="hero-card"><div className="fake-photo" /><strong>{isPost ? `Pós-graduação Digital ${institutionLabel}` : own ? 'Formação própria IBESC' : `Formação em parceria com ${institution}`}</strong></div></div></section>

    <section className="section"><div className="container contact-grid"><div>
      <span className="eyebrow">Sobre a formação</span><h2>{isPost ? `Conheça a especialização em ${c.name}` : own ? 'Conheça esta formação' : `Conheça a formação em ${c.name}`}</h2><p>{c.description}</p>
      <div className="diff-grid" style={{ marginTop: 24 }}>
        <div className="card diff-card"><Clock3 /><h3>{isPost ? 'Modalidade digital' : 'Formato da formação'}</h3><p>{isPost ? 'A formação é disponibilizada digitalmente pela instituição responsável.' : c.modality || 'Consulte o consultor IBESC para confirmar o formato e a dinâmica da turma.'}</p></div>
        <div className="card diff-card"><Users /><h3>Para quem é</h3><p>{audience}</p></div>
        <div className="card diff-card"><BookOpen /><h3>O que você aprende</h3><p>{learning[0]}</p></div>
      </div>

      <div className="card" style={{ marginTop: 25 }}><h3>Informações principais</h3>{infoItems.map(([label, value]) => <p key={label}><strong>{label}:</strong> {value}</p>)}</div>

      <div className="card" style={{ marginTop: 18 }}><h3>O que você vai aprender</h3><ul>{learning.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Destaques da formação</h3><ul>{highlights.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></div>
      <div className="card" style={{ marginTop: 18 }}><h3>Quem pode fazer?</h3><p>{audience}</p><p><strong>Requisitos:</strong> {requirements}</p></div>

      {isPost && <div className="card" style={{ marginTop: 18 }}><h3>Como funciona</h3><p>O IBESC apresenta a formação e realiza o atendimento comercial. Para confirmar matriz curricular, condições, matrícula e regras acadêmicas, consulte a página oficial da instituição responsável.</p><a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer" style={{ marginTop: 8 }}>Acessar página oficial <ExternalLink size={17} /></a></div>}
      {!isPost && <div className="card" style={{ marginTop: 18 }}><h3>Próximos passos</h3><p>Fale com o IBESC para confirmar disponibilidade, modalidade, documentação, condições atuais e o processo de matrícula.</p><a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`} style={{ marginTop: 8 }}>Falar com um consultor <MessageCircle size={17} /></a></div>}
    </div><div className="card"><h3>Quero receber informações</h3><LeadForm courseName={c.name} tipoFormacao={c.category} instituicao={institution} /></div></div></section>

    <section className="section" style={{ background: 'var(--light)' }}><div className="container"><div className="section-head"><span className="eyebrow">Conheça melhor</span><h2>{isPost ? 'Informações oficiais e atendimento IBESC' : own ? 'Por que escolher o IBESC?' : 'Por que considerar esta formação?'}</h2><p>{isPost ? 'As informações desta página foram organizadas a partir das ofertas divulgadas pelas instituições parceiras. Condições comerciais e acadêmicas podem mudar e devem ser confirmadas na página oficial.' : 'O IBESC orienta você sobre disponibilidade, documentação, condições e próximos passos.'}</p></div><div className="diff-grid">{(isPost ? ['Modalidade digital', `Oferta pela ${institutionLabel}`, 'Conteúdo e informações do curso', 'Orientação comercial IBESC'] : own ? ['Formação direcionada', 'Atendimento próximo', 'Orientação para matrícula', 'Foco no seu próximo passo'] : ['Informações oficiais', 'Orientação comercial', 'Catálogo atualizado', 'Suporte para matrícula']).map((x) => <div className="card diff-card" key={x}><CheckCircle2 color="var(--green)" /><h3>{x}</h3><p>{isPost ? 'Consulte a plataforma oficial para confirmar detalhes atualizados da oferta.' : 'O consultor IBESC ajuda você a encontrar e encaminhar a opção adequada.'}</p></div>)}</div></div></section>
    <section className="section"><div className="container"><div className="cta"><h2>{isPost ? `Quer conhecer a oferta da ${institutionLabel}?` : own ? 'Quer saber mais sobre este curso?' : 'Quer verificar as opções disponíveis?'}</h2><p>{isPost ? 'Acesse a página oficial para consultar a oferta completa ou fale com o IBESC.' : 'Fale com o IBESC e receba orientação sobre disponibilidade e matrícula.'}</p><div className="hero-actions">{isPost ? <a className="btn btn-dark" href={catalogUrl} target="_blank" rel="noreferrer">Ver curso na {institutionLabel} <ExternalLink size={17} /></a> : <a className="btn btn-dark" href={`https://wa.me/${wa}?text=${msg}`}>Falar no WhatsApp</a>}<a className="btn btn-outline" style={{ background: 'var(--navy)' }} href={`https://wa.me/${wa}?text=${msg}`} target="_blank" rel="noreferrer">Falar com o IBESC <MessageCircle size={17} /></a></div></div></div></section>
    <section className="section"><div className="container"><Link className="link" href={c.category === 'TECNICO' ? '/cursos-tecnicos' : '/cursos'}>← Voltar para cursos</Link></div></section>
  </main>;
}
