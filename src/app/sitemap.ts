import type { MetadataRoute } from 'next';
import { courses } from '@/data/courses';
import { siteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/cursos', '/cursos-tecnicos', '/graduacao', '/pos-graduacao', '/sobre', '/estrutura', '/contato'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route}`, changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : 0.8 })),
    ...courses.filter((course) => course.status === 'ATIVO').map((course) => ({ url: `${siteUrl}/curso/${course.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
