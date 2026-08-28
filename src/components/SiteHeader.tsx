'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteInfo } from '@/data/site';

const courseNavigation = [
  { href: '/cursos?category=GRADUACAO', label: 'Graduação' },
  { href: '/cursos?category=POS_GRADUACAO', label: 'Pós-graduação' },
  { href: '/cursos-tecnicos', label: 'Cursos Técnicos' },
  { href: '/cursos-profissionalizantes', label: 'Profissionalizantes e básicos' },
  { href: '/cursos', label: 'Todos os Cursos' },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsCoursesOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function closeMenu() {
    setIsOpen(false);
    setIsCoursesOpen(false);
  }

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="IBESC - início" onClick={closeMenu}>
          <Image className="brand-logo" src="/images/ibesc-logo-transparent.png" alt="IBESC - Instituto Brasileiro de Educação, Saúde e Cultura" width={400} height={140} priority />
          <span className="sr-only">IBESC</span>
        </Link>

        <nav className="nav-links" aria-label="Navegação principal">
          <Link href="/">Home</Link>
          <div className={`courses-dropdown${isCoursesOpen ? ' is-open' : ''}`}>
            <button type="button" aria-expanded={isCoursesOpen} aria-controls="desktop-courses-menu" onClick={() => setIsCoursesOpen((open) => !open)}>
              Cursos <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div id="desktop-courses-menu" className="courses-dropdown-menu">
              {courseNavigation.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
            </div>
          </div>
          <Link href="/sobre">Sobre</Link>
          <Link href="/estrutura">Estrutura</Link>
          <Link href="/contato">Contato</Link>
          <a className="nav-cta" href={`https://wa.me/${siteInfo.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site do IBESC e gostaria de receber orientação sobre os cursos.')}`}>Fale com a equipe</a>
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
        <Link href="/" onClick={closeMenu}>Home</Link>
        <button type="button" className="mobile-courses-toggle" aria-expanded={isCoursesOpen} aria-controls="mobile-courses-menu" onClick={() => setIsCoursesOpen((open) => !open)}>
          Cursos <ChevronDown size={17} aria-hidden="true" />
        </button>
        <div id="mobile-courses-menu" className={`mobile-courses-list${isCoursesOpen ? ' is-open' : ''}`}>
          {courseNavigation.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
        </div>
        <Link href="/sobre" onClick={closeMenu}>Sobre</Link>
        <Link href="/estrutura" onClick={closeMenu}>Estrutura</Link>
        <Link href="/contato" onClick={closeMenu}>Contato</Link>
      </nav>
    </header>
  );
}
