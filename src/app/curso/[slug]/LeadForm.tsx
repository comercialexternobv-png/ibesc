'use client';

import { FormEvent, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const wa = '5588988498031';

type LeadFormProps = {
  courseName: string;
  tipoFormacao: string;
  instituicao: string;
};

export default function LeadForm({ courseName, tipoFormacao, instituicao }: LeadFormProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const tipoLabel =
    tipoFormacao === 'GRADUACAO'
      ? 'graduação'
      : tipoFormacao === 'POS_GRADUACAO'
        ? 'pós-graduação'
        : tipoFormacao === 'TECNICO'
          ? 'curso técnico'
          : tipoFormacao === 'PROFISSIONALIZANTE'
            ? 'curso profissionalizante'
            : 'curso';

  const mensagemWhatsapp = `Olá! Vim pelo site do IBESC e acabei de solicitar informações sobre o curso de ${courseName} (${tipoLabel}${instituicao ? ` — ${instituicao}` : ''}). Meu nome é ${nome}. Gostaria de receber informações sobre matrícula e próximos passos.`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível enviar seus dados.');
      }

      setSuccess(true);

      window.open(
        `https://wa.me/${wa}?text=${encodeURIComponent(mensagemWhatsapp)}`,
        '_blank',
        'noopener,noreferrer'
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar seus dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Deixe seus dados e fale com nossa equipe sobre o próximo passo.</p>

      <label>
        Nome
        <input required name="nome" autoComplete="name" className="input" value={nome} onChange={(event) => setNome(event.target.value)} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      <label>
        WhatsApp
        <input required name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" className="input" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" className="input" value={email} onChange={(event) => setEmail(event.target.value)} style={{ width: '100%', margin: '7px 0 14px', border: '1px solid var(--border)' }} />
      </label>

      {error && <p role="alert" style={{ margin: '4px 0 14px', color: '#b42318' }}>{error}</p>}

      {success && <p role="status" style={{ margin: '4px 0 14px', color: 'var(--green)' }}>Seus dados foram enviados. Estamos abrindo o WhatsApp para você falar com um consultor.</p>}

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
        {loading ? 'Enviando...' : <><Send size={18} /> Quero receber informações</>}
      </button>

      <a className="btn btn-outline" style={{ width: '100%', marginTop: 10 }} href={`https://wa.me/${wa}?text=${encodeURIComponent(`Olá! Vim pelo site do IBESC e gostaria de receber informações sobre o curso de ${courseName}.`)}`} target="_blank" rel="noreferrer">
        <MessageCircle size={18} /> Falar com um consultor
      </a>
    </form>
  );
}
