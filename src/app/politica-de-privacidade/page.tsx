import Link from 'next/link';
import { siteInfo } from '@/data/site';

export const metadata = {
  title: 'Política de Privacidade | IBESC',
  description: 'Saiba como o IBESC utiliza os dados enviados pelos formulários do site.',
};

export default function PrivacyPage() {
  return <main>
    <section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Privacidade</span><h1>Como utilizamos seus dados</h1><p>Esta página explica, de forma clara, o tratamento das informações enviadas pelos canais do site.</p></div></section>
    <section className="section"><div className="container legal-content">
      <h2>Dados enviados pelo visitante</h2><p>Os formulários podem solicitar nome, WhatsApp, e-mail, mensagem e o curso de interesse. O e-mail é opcional quando indicado.</p>
      <h2>Finalidade</h2><p>Esses dados são utilizados para responder à solicitação, apresentar informações disponíveis sobre cursos e orientar os próximos passos do atendimento.</p>
      <h2>Compartilhamento e responsabilidade acadêmica</h2><p>Quando o interesse envolver uma instituição parceira, os dados poderão ser utilizados para encaminhar o atendimento relacionado àquela oferta. Informações acadêmicas e regras de matrícula devem ser confirmadas nos canais oficiais da instituição responsável.</p>
      <h2>Segurança e conservação</h2><p>O IBESC adota medidas razoáveis para proteger as informações recebidas e conserva os dados somente pelo período necessário ao atendimento e às obrigações aplicáveis.</p>
      <h2>Seus direitos</h2><p>Você pode solicitar informações, correção ou exclusão dos dados fornecidos entrando em contato pelo telefone e WhatsApp {siteInfo.phone}.</p>
      <h2>Contato</h2><p>{siteInfo.streetAddress}, {siteInfo.neighborhood}, {siteInfo.city} — {siteInfo.state}, {siteInfo.postalCode}.</p>
      <p><Link className="link" href="/contato">Falar com o IBESC</Link></p>
      <p className="legal-note">Este texto descreve o funcionamento atual dos formulários do site e deve ser revisado com orientação jurídica caso os processos de coleta, compartilhamento ou armazenamento sejam alterados.</p>
    </div></section>
  </main>;
}
