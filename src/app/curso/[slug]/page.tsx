import { notFound } from 'next/navigation';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';

const wa = '5588988498031';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = courses.find((x) => x.slug === slug);

  if (!c) return notFound();

  const institution = Array.isArray(c.institution)
    ? c.institution.join(' / ')
    : c.institution;
  const own = c.institution === 'IBESC';
  const msg = encodeURIComponent(
    `Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${c.name}.`
  );
  const catalogUrl = own
    ? ''
    : c.category === 'GRADUACAO'
      ? 'https://graduacao.uninassau.digital/nossos-cursos'
      : c.institution === 'UNIFAEL'
        ? 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital'
        : 'https://ead.uninassau.edu.br/pos-digital';

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span
              className="eyebrow"
              style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}
            >
              {c.type}
            </span>
            <h1 style={{ maxWidth: 850 }}>{c.name}</h1>
            <p>
              {institution} • {c.area}
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`https://wa.me/${wa}?text=${msg}`}>
                {own ? 'Quero me matricular' : 'Falar com um consultor'} <ArrowRight size={17} />
              </a>
              {!own && (
                <a
                  className="btn btn-outline"
                  href={catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver catálogo oficial
                </a>
              )}
            </div>
          </div>
          <div className="hero-card">
            <div className="fake-photo" />
            <strong>
              {own ? 'Formação própria IBESC' : `Formação em parceria com ${institution}`}
            </strong>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Sobre a formação</span>
            <h2>{own ? 'Por que escolher este curso?' : 'Conheça esta oportunidade de formação'}</h2>
            <p>{c.description}</p>

            <div className="card" style={{ marginTop: 25 }}>
              <h3>Informações principais</h3>
              <p>
                <strong>Modalidade:</strong> {c.modality || 'Informação a confirmar pelo consultor'}
              </p>
              <p>
                <strong>Duração:</strong> {c.duration || 'Informação a confirmar pelo consultor'}
              </p>
              <p>
                <strong>Local:</strong> {c.local || 'Boa Viagem — CE'}
              </p>
              <p>
                <strong>Instituição:</strong> {institution}
              </p>
              <p>
                <strong>Próxima turma:</strong> {c.startDate || 'Informação a confirmar pelo consultor'}
              </p>
            </div>
          </div>

          <div className="card">
            <h3>Quero receber informações</h3>
            <LeadForm
              courseName={c.name}
              tipoFormacao={c.type}
              instituicao={institution}
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Conheça melhor</span>
            <h2>{own ? 'Por que escolher o IBESC?' : 'Por que considerar esta formação?'}</h2>
            <p>
              {own
                ? 'Nossa equipe orienta você durante a escolha e os próximos passos da formação.'
                : 'Consulte nossa equipe para confirmar modalidade, duração, disponibilidade e condições atuais.'}
            </p>
          </div>

          <div className="diff-grid">
            {(own
              ? ['Formação direcionada', 'Atendimento próximo', 'Orientação para matrícula', 'Foco no seu próximo passo']
              : ['Informações oficiais', 'Orientação comercial', 'Catálogo atualizado', 'Suporte para matrícula']
            ).map((x) => (
              <div className="card diff-card" key={x}>
                <CheckCircle2 color="var(--green)" />
                <h3>{x}</h3>
                <p>
                  {own
                    ? 'Informação comercial apresentada sem inventar dados acadêmicos não cadastrados.'
                    : 'O consultor IBESC ajuda você a encontrar e encaminhar a opção adequada.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>{own ? 'Quer saber mais sobre este curso?' : 'Quer verificar as opções disponíveis?'}</h2>
            <p>Fale com o IBESC e receba orientação sobre disponibilidade e matrícula.</p>
            <div className="hero-actions">
              <a className="btn btn-dark" href={`https://wa.me/${wa}?text=${msg}`}>
                Falar no WhatsApp
              </a>
              {!own && (
                <a
                  className="btn btn-outline"
                  style={{ background: 'var(--navy)' }}
                  href={catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Acessar catálogo oficial
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link className="link" href={c.category === 'TECNICO' ? '/cursos-tecnicos' : '/cursos'}>
            ← Voltar para cursos
          </Link>
        </div>
      </section>
    </main>
  );
}
