import { MapPin } from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata = { title: 'Contato | IBESC', description: 'Fale com o IBESC em Boa Viagem — CE.' };

export default function Page() {
  return <main><section className="hero"><div className="container"><span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>Contato</span><h1>Fale com o IBESC</h1><p>Estamos em Boa Viagem para ajudar você a encontrar sua próxima formação.</p></div></section><section className="section"><div className="container contact-grid"><div><h2>Vamos conversar?</h2><p>Conte o que você procura e nossa equipe orientará você sobre as opções disponíveis.</p><div className="card"><MapPin /><h3>Endereço</h3><p>Rua David Capistrano, 802<br />Várzea do Canto — Centro<br />Boa Viagem — CE<br />63870-000</p><h3>Telefone / WhatsApp</h3><p>(88) 98849-8031</p></div></div><ContactForm /></div></section></main>;
}
