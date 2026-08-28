'use client';

import { FormEvent, useRef, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

const whatsappUrl = 'https://wa.me/5588988498031?text=' + encodeURIComponent('Olá! Vim pelo site do IBESC e gostaria de receber informações sobre os cursos.');
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
}

export default function ContactForm() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [assunto, setAssunto] = useState('Informações sobre cursos');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [website, setWebsite] = useState('');
  const formStartedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp,
          email,
          curso: assunto,
          tipo_formacao: assunto === 'Graduação' ? 'GRADUACAO' : assunto === 'Pós-graduação' ? 'POS_GRADUACAO' : assunto === 'Cursos técnicos' ? 'TECNICO' : assunto === 'Profissionalizantes e básicos' ? 'PROFISSIONALIZANTE' : 'CONTATO',
          instituicao: 'IBESC',
          origem: 'Site - Página de Contato',
          mensagem: mensagem ? `Assunto: ${assunto}. ${mensagem}` : `Assunto: ${assunto}.`,
          website,
          form_started_at: formStartedAt.current,
        }),
      });

      if (!response.ok) throw new Error('Não foi possível enviar o contato.');

      setNome('');
      setWhatsapp('');
      setEmail('');
      setMensagem('');
      setAssunto('Informações sobre cursos');
      setWebsite('');
      formStartedAt.current = Date.now();
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return <div className="card">
    <h3>Quero receber informações</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="contact-website">Não preencha este campo</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
      <label htmlFor="contact-name" className="sr-only">Nome</label><input id="contact-name" required name="nome" autoComplete="name" maxLength={120} className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />
      <label htmlFor="contact-whatsapp" className="sr-only">WhatsApp com DDD</label><input id="contact-whatsapp" required name="whatsapp" type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="WhatsApp com DDD" value={whatsapp} onChange={(event) => setWhatsapp(formatPhone(event.target.value))} />
      <label htmlFor="contact-email" className="sr-only">E-mail opcional</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="E-mail (opcional)" value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="contact-subject" className="sr-only">Assunto</label><select id="contact-subject" name="assunto" className="input" style={{ width: '100%', margin: '8px 0' }} value={assunto} onChange={(event)=>setAssunto(event.target.value)}><option>Informações sobre cursos</option><option>Graduação</option><option>Pós-graduação</option><option>Cursos técnicos</option><option>Profissionalizantes e básicos</option><option>Atendimento geral</option></select>
      <label htmlFor="contact-message" className="sr-only">Mensagem</label><textarea id="contact-message" name="mensagem" maxLength={2000} className="input" style={{ width: '100%', minHeight: 112, margin: '8px 0', paddingTop: 14, resize: 'vertical' }} placeholder="Mensagem" value={mensagem} onChange={(event) => setMensagem(event.target.value)} />

      <p className="form-privacy">Ao enviar, você autoriza o IBESC a usar seus dados para responder a esta solicitação. Consulte a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</p>
      {success && <p role="status" aria-live="polite" style={{ margin: '8px 0', color: 'var(--blue)' }}>Solicitação recebida. A equipe utilizará os dados informados para responder ao seu contato.</p>}
      {error && <p role="alert" aria-live="assertive" style={{ margin: '8px 0', color: '#b42318' }}>Não foi possível enviar sua mensagem. Tente novamente.</p>}

      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
        {loading ? 'Enviando...' : <><Send size={18} /> Enviar mensagem</>}
      </button>
    </form>
    <a className="btn btn-dark" style={{ width: '100%', marginTop: 10 }} href={whatsappUrl} target="_blank" rel="noreferrer">
      <MessageCircle size={18} /> Falar no WhatsApp
    </a>
  </div>;
}
