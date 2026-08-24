'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/cursos?category=GRADUACAO', label: 'Graduação' },
  { href: '/cursos?category=POS_GRADUACAO', label: 'Pós-graduação' },
  { href: '/cursos-tecnicos', label: 'Cursos Técnicos' },
  { href: '/cursos', label: 'Todos os Cursos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="IBESC - início" onClick={closeMenu}>
          <Image className="brand-logo" src="/images/LOGO OFICIAL.jpeg" alt="IBESC - Instituto Brasileiro de Educação, Saúde e Cultura" width={400} height={140} priority />
          <span className="sr-only">IBESC</span>
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>

        <button
          type="button"
          className="mobile-menu"
          aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className={`mobile-navigation${isOpen ? ' is-open' : ''}`} aria-label="Navegação móvel">
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
      </nav>
    </header>
  );
}
