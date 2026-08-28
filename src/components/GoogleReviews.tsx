import { ArrowRight, ExternalLink } from 'lucide-react';
import { siteInfo } from '@/data/site';

const publicReviews = [
  { author: 'Aderaldo Jr', text: 'Faculdade massa demais 😎' },
  { author: 'Lindacy Garcia', text: 'Muito satisfatório, estrutura ampla com laboratório e pessoas especializadas.' },
  { author: 'Macelo Sousa', text: 'E excelente instituição de ensino' },
] as const;

function Stars() {
  return <span className="google-review-stars" aria-label="5 de 5 estrelas">★★★★★</span>;
}

export default function GoogleReviews() {
  return <section className="section review-section" id="avaliacoes"><div className="container">
    <div className="review-heading"><div><span className="eyebrow">Avaliações públicas</span><h2>Experiências compartilhadas sobre a unidade parceira em Boa Viagem.</h2><p>Os comentários abaixo pertencem ao perfil público “Uninassau | Boa Viagem — CE” no Google e não constituem avaliações institucionais do IBESC.</p></div>
      <a className="google-rating-summary" href={siteInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" data-conversion="google-avaliacoes"><strong>5,0</strong><span><Stars/><small>16 avaliações no Google</small></span><ExternalLink size={18}/></a>
    </div>
    <div className="google-reviews-grid">{publicReviews.map(review => <article className="google-review-card" key={review.author}><Stars/><p>“{review.text}”</p><footer><strong>{review.author}</strong><span>Avaliação pública no Google</span></footer></article>)}</div>
    <div className="google-reviews-footer"><span>Fonte: perfil público “Uninassau | Boa Viagem — CE”. Nota e quantidade podem mudar após a publicação.</span><a className="btn btn-dark" href={siteInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" data-conversion="google-avaliacoes">Ver a fonte no Google <ArrowRight size={16}/></a></div>
    <p className="google-attribution">Google e o logotipo do Google são marcas registradas da Google LLC.</p>
  </div></section>;
}
