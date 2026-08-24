import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return { name: 'IBESC — Instituto Brasileiro de Educação, Saúde e Cultura', short_name: 'IBESC', description: 'Formações e atendimento educacional em Boa Viagem — CE.', start_url: '/', display: 'standalone', background_color: '#ffffff', theme_color: '#24579B', lang: 'pt-BR' };
}
