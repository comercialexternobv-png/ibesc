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
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rua%20Deputado%20David%20Capistrano%2C%20802%2C%20V%C3%A1rzea%20do%20Canto%2C%20Boa%20Viagem%20-%20CE%2C%2063870-000',
} as const;
