import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import ConversionTracker from '@/components/ConversionTracker';
import { siteInfo, siteUrl } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'IBESC | Sua formação. Seu próximo passo.', template: '%s | IBESC' },
  description: 'Encontre graduação, pós-graduação e cursos técnicos em Boa Viagem, Ceará. Conheça o IBESC e nossas instituições parceiras.',
  alternates: { canonical: '/' },
  applicationName: 'IBESC',
  keywords: ['IBESC', 'cursos em Boa Viagem', 'graduação', 'pós-graduação', 'cursos técnicos'],
  openGraph: {
    title: 'IBESC | Sua formação. Seu próximo passo.',
    description: 'Formação para novos caminhos profissionais em Boa Viagem — CE.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'IBESC',
    url: '/',
    images: [{ url: '/images/LOGO OFICIAL.jpeg', alt: 'IBESC' }],
  },
  twitter: { card: 'summary_large_image', title: 'IBESC | Sua formação. Seu próximo passo.', description: 'Formação para novos caminhos profissionais em Boa Viagem — CE.', images: ['/images/LOGO OFICIAL.jpeg'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteInfo.name,
  url: siteUrl,
  telephone: siteInfo.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteInfo.streetAddress,
    addressLocality: siteInfo.city,
    addressRegion: siteInfo.state,
    postalCode: siteInfo.postalCode,
    addressCountry: siteInfo.country,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /><ConversionTracker /><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
