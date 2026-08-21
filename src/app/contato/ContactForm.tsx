'use client';

import { FormEvent, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const whatsappUrl = 'https://wa.me/5588988498031?text=' + encodeURIComponent('Olá! Vim pelo site do IBESC e gostaria de receber informações sobre os cursos.');

export default function ContactForm() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          curso: 'Contato pelo site',
          tipo_formacao: 'CONTATO',
          instituicao: 'IBESC',
          origem: 'Site - Página de Contato',
          mensagem,
        }),
      });

      if (!response.ok) throw new Error('Não foi possível enviar o contato.');

      setNome('');
      setWhatsapp('');
      setEmail('');
      setMensagem('');
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
      <input required name="nome" autoComplete="name" className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />
      <input required name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="WhatsApp" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} />
      <input name="email" type="email" autoComplete="email" className="input" style={{ width: '100%', margin: '8px 0' }} placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
      <textarea name="mensagem" className="input" style={{ width: '100%', minHeight: 112, margin: '8px 0', paddingTop: 14, resize: 'vertical' }} placeholder="Mensagem" value={mensagem} onChange={(event) => setMensagem(event.target.value)} />

      {success && <p role="status" style={{ margin: '8px 0', color: 'var(--blue)' }}>Contato enviado com sucesso. Em breve nossa equipe falará com você.</p>}
      {error && <p role="alert" style={{ margin: '8px 0', color: '#b42318' }}>Não foi possível enviar sua mensagem. Tente novamente.</p>}

      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} disabled={loading}>
        {loading ? 'Enviando...' : <><Send size={18} /> Enviar mensagem</>}
      </button>
    </form>
    <a className="btn btn-dark" style={{ width: '100%', marginTop: 10 }} href={whatsappUrl} target="_blank" rel="noreferrer">
      <MessageCircle size={18} /> Falar no WhatsApp
    </a>
  </div>;
}
