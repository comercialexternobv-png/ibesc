const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000')).replace(/\/$/, '');

export const siteInfo = {
  name: 'IBESC — Instituto Brasileiro de Educação, Saúde e Cultura',
  shortName: 'IBESC',
  phone: '+55 88 98849-8031',
  whatsapp: '5588988498031',
  streetAddress: 'Rua Deputado David Capistrano, 802',
  neighborhood: 'Várzea do Canto',
  city: 'Boa Viagem',
  state: 'CE',
  postalCode: '63870-000',
  country: 'BR',
  googleMapsUrl: 'https://share.google/Zs6JxOuNTB30CFknK',
} as const;
