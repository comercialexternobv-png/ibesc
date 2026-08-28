'use client';

import { FormEvent, useRef, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

const wa = '5588988498031';
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
}

type LeadFormProps = {
  courseName: string;
  tipoFormacao: string;
  tipoComercial: string;
  instituicao: string;
};

export default function LeadForm({ courseName, tipoFormacao, tipoComercial, instituicao }: LeadFormProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [website, setWebsite] = useState('');
  const formStartedAt = useRef(Date.now());

  const tipoLabel =
    tipoComercial === 'Curso Básico'
      ? 'curso básico'
      : tipoComercial === 'Curso Técnico'
        ? 'curso técnico'
        : tipoFormacao === 'GRADUACAO'
      ? 'graduação'
      : tipoFormacao === 'POS_GRADUACAO'
        ? 'pós-graduação'
        : 'curso';

  const mensagemWhatsapp = `Olá! Vim pelo site do IBESC e acabei de solicitar informações sobre o curso de ${courseName} (${tipoLabel}${instituicao ? ` — ${instituicao}` : ''}). Meu nome é ${nome}. Gostaria de receber informações sobre matrícula e próximos passos.`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp,
          email,
          curso: courseName,
          tipo_formacao: tipoFormacao,
          instituicao,
          origem: 'site-curso',
          mensagem: `Lead interessado no curso ${courseName}.`,
          website,
          form_started_at: formStartedAt.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível enviar seus dados.');
      }

      setSuccess(true);
      setWebsite('');
      formStartedAt.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar seus dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor={`course-website-${courseName}`}>Não preencha este campo</label><input id={`course-website-${courseName}`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
      <p>Receba orientação sobre modalidade, disponibilidade e processo de matrícula.</p>

      <label>
        Nome
        <input required name="nome" autoComplete="name" maxLength={120} className="input" value={nome} onChange={(event) => setNome(event.target.value)} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      <label>
        WhatsApp
        <input required name="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} className="input" placeholder="(DDD) número" value={whatsapp} onChange={(event) => setWhatsapp(formatPhone(event.target.value))} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      <label>
        E-mail <small>(opcional)</small>
        <input name="email" type="email" autoComplete="email" maxLength={254} className="input" value={email} onChange={(event) => setEmail(event.target.value)} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      <p className="form-privacy">Ao enviar, você autoriza o IBESC a usar seus dados para responder a esta solicitação. Consulte a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>

      {error && <p role="alert" style={{ margin: '4px 0 14px', color: '#b42318' }}>{error}</p>}

      {success && <div role="status" aria-live="polite" style={{ margin: '4px 0 14px' }}>
        <p style={{ color: 'var(--green)' }}>Seus dados foram enviados com sucesso.</p>
        <a className="btn btn-dark" style={{ width: '100%' }} href={`https://wa.me/${wa}?text=${encodeURIComponent(mensagemWhatsapp)}`} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> Continuar no WhatsApp
        </a>
      </div>}

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Enviando...' : <><Send size={18} /> Quero receber informações</>}
      </button>

      <a className="btn btn-outline" style={{ width: '100%', marginTop: 10 }} href={`https://wa.me/${wa}?text=${encodeURIComponent(`Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${courseName}.`)}`} target="_blank" rel="noreferrer">
        <MessageCircle size={18} /> Falar com um consultor
      </a>
    </form>
  );
}
