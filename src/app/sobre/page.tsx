import { siteInfo } from '@/data/site';

export const metadata = { title: 'Sobre o IBESC | Instituto Brasileiro de Educação, Saúde e Cultura' };

export default function Page() {
  return <main><section className="hero"><div className="container"><span className="eyebrow eyebrow-light">Sobre o IBESC</span><h1>Educação que aproxima você do seu próximo objetivo.</h1><p>O IBESC atua na área educacional oferecendo diferentes caminhos de formação para quem busca desenvolver sua carreira e ampliar suas oportunidades.</p></div></section><section className="section"><div className="container contact-grid"><div><h2>Uma central de formação educacional em Boa Viagem</h2><p>O IBESC — Instituto Brasileiro de Educação, Saúde e Cultura — trabalha com graduação, pós-graduação, cursos técnicos e cursos profissionalizantes.</p><p>Também atua na comercialização e orientação de formações oferecidas em parceria com instituições como UNINASSAU e UNIFAEL.</p></div><div className="card"><h3>Atuação local</h3><p>{siteInfo.streetAddress}</p><p>{siteInfo.neighborhood}</p><p>{siteInfo.city} — {siteInfo.state}</p><p>{siteInfo.postalCode}</p><p><strong>(88) 98849-8031</strong></p></div></div></section></main>;
}
