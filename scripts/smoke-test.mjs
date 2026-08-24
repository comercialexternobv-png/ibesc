const baseUrl = (process.env.SMOKE_BASE_URL || 'https://ibesc.vercel.app').replace(/\/$/, '');

const pages = [
  ['/', 'Sua próxima conquista'],
  ['/graduacao', 'Encontre sua graduação'],
  ['/pos-graduacao', 'Sua graduação abriu uma porta'],
  ['/cursos-tecnicos', 'Cursos Técnicos'],
  ['/cursos', 'formações'],
  ['/sobre', 'Sobre o IBESC'],
  ['/estrutura', 'Nossa estrutura'],
  ['/contato', 'Fale com o IBESC'],
  ['/curso/curso-basico-de-informatica', 'Curso Básico de Informática'],
];

const failures = [];

for (const [path, expectedText] of pages) {
  const response = await fetch(`${baseUrl}${path}`);
  const html = await response.text();
  if (response.status !== 200 || !html.includes(expectedText)) {
    failures.push(`${path}: esperado HTTP 200 e texto “${expectedText}”; recebido HTTP ${response.status}`);
  }
}

const homeResponse = await fetch(`${baseUrl}/`);
const homeHtml = await homeResponse.text();
if (!homeHtml.includes('https://www.google.com/maps/dir/?api=1')) {
  failures.push('/: link de rotas do Google Maps não encontrado');
}

const missingResponse = await fetch(`${baseUrl}/pagina-inexistente-teste-automatico`);
if (missingResponse.status !== 404) {
  failures.push(`/pagina-inexistente-teste-automatico: esperado HTTP 404; recebido HTTP ${missingResponse.status}`);
}

if (failures.length) {
  console.error(`Smoke test falhou:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Smoke test aprovado: ${pages.length} páginas, Google Maps e resposta 404 verificados em ${baseUrl}.`);
