export type PartnerCatalog = {
  institution: 'UNINASSAU' | 'UNIFAEL';
  category: 'GRADUACAO' | 'POS_GRADUACAO';
  label: string;
  officialUrl: string;
  sourceType: 'catalogo_externo';
  polo?: string;
};

export const partnerCatalogs: Record<string, PartnerCatalog> = {
  uninassauGraduacao: {
    institution: 'UNINASSAU',
    category: 'GRADUACAO',
    label: 'Graduação UNINASSAU',
    officialUrl: 'https://graduacao.uninassau.digital/nossos-cursos',
    sourceType: 'catalogo_externo',
  },
  uninassauPos: {
    institution: 'UNINASSAU',
    category: 'POS_GRADUACAO',
    label: 'Pós-graduação Digital UNINASSAU',
    officialUrl: 'https://ead.uninassau.edu.br/pos-digital',
    sourceType: 'catalogo_externo',
  },
  unifaelPos: {
    institution: 'UNIFAEL',
    category: 'POS_GRADUACAO',
    label: 'Pós-graduação Digital UNIFAEL — Polo Boa Viagem',
    officialUrl: 'https://posgrad.unifael.edu.br/digital?polo=boaviagemcentroii-ce&tipo=digital',
    sourceType: 'catalogo_externo',
    polo: 'boaviagemcentroii-ce',
  },
};

export const partnerCatalogLabels = Object.fromEntries(
  Object.entries(partnerCatalogs).map(([key, catalog]) => [key, catalog.label]),
);
