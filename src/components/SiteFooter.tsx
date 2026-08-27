import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Image className="footer-logo" src="/images/ibesc-logo-white.png" alt="IBESC - Instituto Brasileiro de Educação, Saúde e Cultura" width={400} height={140} />
          <p>Sua formação. Seu próximo passo.</p>
        </div>
        <div>
          <h4>Formações</h4>
          <Link href="/cursos?category=GRADUACAO">Graduação</Link>
          <Link href="/cursos?category=POS_GRADUACAO">Pós-graduação</Link>
          <Link href="/cursos-tecnicos">Cursos Técnicos</Link>
          <Link href="/cursos">Todos os Cursos</Link>
        </div>
        <div>
          <h4>Institucional</h4>
          <Link href="/">Home</Link>
          <Link href="/sobre">Sobre o IBESC</Link>
          <Link href="/estrutura">Estrutura</Link>
          <Link href="/contato">Contato</Link>
        </div>
        <div>
          <h4>Atendimento</h4>
          <p>Boa Viagem — CE</p>
          <p>(88) 98849-8031</p>
          <p>Parceiros: UNINASSAU e UNIFAEL</p>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 IBESC. Todos os direitos reservados.</div>
    </footer>
  );
}
