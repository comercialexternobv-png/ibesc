import { notFound } from 'next/navigation';
import Link from 'next/link';
import { courses, partnerCatalogs } from '@/data/courses';
import { MessageCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import LeadForm from './LeadForm';

const wa = '5588988498031';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

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

  const infoItems = isPost
    ? [
        ['Modalidade', 'Digital'],
        ['Instituição', institutionLabel],
        ['Duração', c.duration || 'A confirmar na instituição'],
        ['Área', c.area],
        ['Local de atendimento', 'IBESC — Boa Viagem/CE'],
      ]
    : [
        ['Modalidade', c.modality || 'Informação a confirmar pelo consultor'],
        ['Duração', c.duration || 'Informação a confirmar pelo consultor'],
        ['Local', c.local || 'Boa Viagem — CE'],
        ['Instituição', institution],
        ['Próxima turma', c.startDate || 'Informação a confirmar pelo consultor'],
      ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>
              {isPost ? 'Pós-graduação Digital' : c.type}
            </span>
            <h1 style={{ maxWidth: 850 }}>{c.name}</h1>
            <p>{institutionLabel} • {c.area}</p>
            <div className="hero-actions">
              {isPost ? (
                <a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer">
                  Ver curso na {institutionLabel} <ExternalLink size={17} />
                </a>
              ) : (
                <a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`}>
                  {own ? 'Quero me matricular' : 'Falar com um consultor'} <ArrowRight size={17} />
                </a>
              )}
              {isPost && (
                <a className="btn btn-outline" href={`https://wa.me/${wa}?text=${msg}`} target="_blank" rel="noreferrer">
                  Falar com um consultor <MessageCircle size={17} />
                </a>
              )}
              {!own && !isPost && (
                <a className="btn btn-outline" href={catalogUrl} target="_blank" rel="noreferrer">
                  Ver catálogo oficial <ExternalLink size={17} />
                </a>
              )}
            </div>
          </div>
          <div className="hero-card">
            <div className="fake-photo" />
            <strong>{isPost ? `Pós-graduação Digital ${institutionLabel}` : own ? 'Formação própria IBESC' : `Formação em parceria com ${institution}`}</strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Sobre a formação</span>
            <h2>{isPost ? `Especialização digital pela ${institutionLabel}` : own ? 'Por que escolher este curso?' : 'Conheça esta oportunidade de formação'}</h2>
            <p>{c.description}</p>

            <div className="card" style={{ marginTop: 25 }}>
              <h3>Informações principais</h3>
              {infoItems.map(([label, value]) => <p key={label}><strong>{label}:</strong> {value}</p>)}
            </div>

            {isPost && (
              <div className="card" style={{ marginTop: 18 }}>
                <h3>Como funciona</h3>
                <p>Você consulta as informações acadêmicas e condições diretamente na plataforma oficial da instituição.</p>
                <p>O IBESC também pode orientar você sobre o próximo passo e encaminhar seu atendimento comercial.</p>
                <a className="btn btn-primary" href={catalogUrl} target="_blank" rel="noreferrer" style={{ marginTop: 8 }}>
                  Acessar página oficial <ExternalLink size={17} />
                </a>
              </div>
            )}
          </div>

          <div className="card">
            <h3>Quero receber informações</h3>
            <LeadForm courseName={c.name} tipoFormacao={c.category} instituicao={institution} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Conheça melhor</span>
            <h2>{isPost ? 'Por que escolher esta opção?' : own ? 'Por que escolher o IBESC?' : 'Por que considerar esta formação?'}</h2>
            <p>{isPost ? 'Informações comerciais e acadêmicas devem ser confirmadas diretamente com a instituição responsável pela oferta.' : own ? 'Nossa equipe orienta você durante a escolha e os próximos passos da formação.' : 'Consulte nossa equipe para confirmar modalidade, duração, disponibilidade e condições atuais.'}</p>
          </div>
          <div className="diff-grid">
            {(isPost
              ? ['Modalidade digital', `Oferta pela ${institutionLabel}`, 'Página oficial da instituição', 'Orientação comercial IBESC']
              : own
                ? ['Formação direcionada', 'Atendimento próximo', 'Orientação para matrícula', 'Foco no seu próximo passo']
                : ['Informações oficiais', 'Orientação comercial', 'Catálogo atualizado', 'Suporte para matrícula']
            ).map((x) => (
              <div className="card diff-card" key={x}>
                <CheckCircle2 color="var(--green)" />
                <h3>{x}</h3>
                <p>{isPost ? 'Consulte a plataforma oficial para detalhes atualizados da oferta.' : own ? 'Informação comercial apresentada sem inventar dados acadêmicos não cadastrados.' : 'O consultor IBESC ajuda você a encontrar e encaminhar a opção adequada.'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>{isPost ? `Pronto para conhecer a ${institutionLabel}?` : own ? 'Quer saber mais sobre este curso?' : 'Quer verificar as opções disponíveis?'}</h2>
            <p>{isPost ? 'Acesse a página oficial para consultar a oferta completa ou fale com o IBESC.' : 'Fale com o IBESC e receba orientação sobre disponibilidade e matrícula.'}</p>
            <div className="hero-actions">
              {isPost ? (
                <a className="btn btn-dark" href={catalogUrl} target="_blank" rel="noreferrer">Ver curso na {institutionLabel} <ExternalLink size={17} /></a>
              ) : (
                <a className="btn btn-dark" href={`https://wa.me/${wa}?text=${msg}`}>Falar no WhatsApp</a>
              )}
              <a className="btn btn-outline" style={{ background: 'var(--navy)' }} href={`https://wa.me/${wa}?text=${msg}`} target="_blank" rel="noreferrer">Falar com o IBESC <MessageCircle size={17} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link className="link" href={c.category === 'TECNICO' ? '/cursos-tecnicos' : '/cursos'}>← Voltar para cursos</Link>
        </div>
      </section>
    </main>
  );
}
