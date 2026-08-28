import Link from 'next/link';
import Image from 'next/image';
import { siteInfo } from '@/data/site';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Image className="footer-logo" src="/images/ibesc-logo-white-hq.png" alt="IBESC - Instituto Brasileiro de Educação, Saúde e Cultura" width={1564} height={1032} />
          <p>Sua formação. Seu próximo passo.</p>
        </div>
        <div>
          <h4>Formações</h4>
          <Link href="/cursos?category=GRADUACAO">Graduação</Link>
          <Link href="/cursos?category=POS_GRADUACAO">Pós-graduação</Link>
          <Link href="/cursos-tecnicos">Cursos Técnicos</Link>
          <Link href="/cursos-profissionalizantes">Profissionalizantes e básicos</Link>
          <Link href="/cursos">Todos os Cursos</Link>
        </div>
        <div>
          <h4>Institucional</h4>
          <Link href="/">Home</Link>
          <Link href="/sobre">Sobre o IBESC</Link>
          <Link href="/estrutura">Estrutura</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
        <div>
          <h4>Atendimento</h4>
          <p>{siteInfo.streetAddress}<br />{siteInfo.neighborhood}<br />{siteInfo.city} — {siteInfo.state}</p>
          <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}>{siteInfo.phone}</a>
          <p>Parceiros: UNINASSAU e UNIFAEL</p>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} IBESC. Todos os direitos reservados. As informações acadêmicas dos cursos parceiros devem ser confirmadas nos canais oficiais das instituições responsáveis.</div>
    </footer>
  );
}
