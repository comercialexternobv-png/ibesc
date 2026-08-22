import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'IBESC | Sua formação. Seu próximo passo.',
  description: 'Encontre graduação, pós-graduação e cursos técnicos em Boa Viagem, Ceará. Conheça o IBESC e nossas instituições parceiras.',
  openGraph: {
    title: 'IBESC | Sua formação. Seu próximo passo.',
    description: 'Formação para novos caminhos profissionais em Boa Viagem — CE.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
