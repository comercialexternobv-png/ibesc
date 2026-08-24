import { MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import { siteInfo } from '@/data/site';

export const metadata = { title: 'Contato | IBESC', description: 'Fale com o IBESC em Boa Viagem — CE.' };

export default function Page() {
  return <main><section className="hero"><div className="container"><span className="eyebrow" style={{ background: 'rgba(255,255,255,.12)', color: '#fff' }}>Contato</span><h1>Fale com o IBESC</h1><p>Estamos em Boa Viagem para ajudar você a encontrar sua próxima formação.</p></div></section><section className="section"><div className="container contact-grid"><div><h2>Vamos conversar?</h2><p>Conte o que você procura e nossa equipe orientará você sobre as opções disponíveis.</p><div className="card"><MapPin /><h3>Endereço</h3><p>{siteInfo.streetAddress}<br />{siteInfo.neighborhood}<br />{siteInfo.city} — {siteInfo.state}<br />{siteInfo.postalCode}</p><h3>Telefone / WhatsApp</h3><p>(88) 98849-8031</p></div></div><ContactForm /></div></section></main>;
}
