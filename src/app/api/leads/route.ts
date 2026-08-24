import { NextResponse } from 'next/server';

const limits = {
  nome: 120,
  whatsapp: 24,
  email: 254,
  curso: 160,
  tipoFormacao: 80,
  instituicao: 80,
  origem: 100,
  mensagem: 2000,
};

type LeadPayload = {
  nome: string;
  whatsapp: string;
  email: string | null;
  curso: string | null;
  tipo_formacao: string | null;
  instituicao: string | null;
  origem: string;
  mensagem: string | null;
};

type StoredLead = LeadPayload & {
  id: string;
  created_at: string;
  status: 'NOVO';
};

function text(value: unknown, limit: number) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

function optionalText(value: unknown, limit: number) {
  const sanitized = text(value, limit);
  return sanitized || null;
}

function exceedsLimit(value: unknown, limit: number) {
  return typeof value === 'string' && value.trim().length > limit;
}

function invalid(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function supabaseHeaders(key: string) {
  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };

  // As chaves legadas são JWTs e também precisam do cabeçalho Authorization.
  // As chaves modernas sb_publishable_/sb_secret_ são enviadas apenas em apikey.
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  return headers;
}

async function syncLeadToGoogleSheet(lead: StoredLead) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const syncToken = process.env.GOOGLE_SHEETS_SYNC_TOKEN;
  if (!webhookUrl || !syncToken) return;

  let endpoint: URL;
  try {
    endpoint = new URL(webhookUrl);
  } catch {
    console.error('URL de sincronização da planilha inválida.');
    return;
  }

  if (endpoint.protocol !== 'https:' || endpoint.hostname !== 'script.google.com') {
    console.error('Destino de sincronização da planilha não permitido.');
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, sync_token: syncToken }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

    if (!response.ok || !result?.ok) {
      console.error('Falha ao sincronizar lead com a planilha.', { status: response.status });
    }
  } catch {
    // O registro já está preservado no Supabase. Assim, uma indisponibilidade
    // da planilha não induz o visitante a reenviar e criar duplicidade.
    console.error('Erro de conexão ao sincronizar lead com a planilha.');
  }
}

function validateLeadPayload(body: unknown): LeadPayload | { error: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Dados do formulário inválidos.' };

  const data = body as Record<string, unknown>;
  const honeypot = typeof data.website === 'string' ? data.website.trim() : '';
  const startedAt = typeof data.form_started_at === 'number' ? data.form_started_at : 0;
  const elapsed = Date.now() - startedAt;
  if (honeypot) return { error: 'spam' };
  if (!startedAt || elapsed < 1500 || elapsed > 2 * 60 * 60 * 1000) return { error: 'Formulário expirado. Atualize a página e tente novamente.' };
  if (
    exceedsLimit(data.nome, limits.nome) || exceedsLimit(data.whatsapp, limits.whatsapp) ||
    exceedsLimit(data.email, limits.email) || exceedsLimit(data.curso, limits.curso) ||
    exceedsLimit(data.tipo_formacao, limits.tipoFormacao) || exceedsLimit(data.instituicao, limits.instituicao) ||
    exceedsLimit(data.origem, limits.origem) || exceedsLimit(data.mensagem, limits.mensagem)
  ) return { error: 'Um ou mais campos excedem o limite permitido.' };

  const nome = text(data.nome, limits.nome);
  const whatsapp = text(data.whatsapp, limits.whatsapp).replace(/\D/g, '');
  const email = optionalText(data.email, limits.email);
  const curso = optionalText(data.curso, limits.curso);
  const tipo_formacao = optionalText(data.tipo_formacao, limits.tipoFormacao);
  const instituicao = optionalText(data.instituicao, limits.instituicao);
  const origem = text(data.origem ?? 'site', limits.origem) || 'site';
  const mensagem = optionalText(data.mensagem, limits.mensagem);

  if (nome.length < 2) return { error: 'Informe um nome válido.' };
  if (whatsapp.length < 10 || whatsapp.length > 15) return { error: 'Informe um WhatsApp válido.' };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Informe um e-mail válido.' };

  return { nome, whatsapp, email, curso, tipo_formacao, instituicao, origem, mensagem };
}

async function handleLeadRequest(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return invalid('Dados do formulário inválidos.');
  }

  const payload = validateLeadPayload(body);
  if ('error' in payload) {
    if (payload.error === 'spam') return NextResponse.json({ success: true });
    return invalid(payload.error);
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: 'Serviço de leads indisponível no momento.' }, { status: 503 });
  }

  const storedLead: StoredLead = {
    ...payload,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: 'NOVO',
  };

  try {
    const response = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: supabaseHeaders(key),
      body: JSON.stringify(storedLead),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Falha ao registrar lead no Supabase.', { status: response.status });
      return NextResponse.json({ error: 'Não foi possível registrar o lead.' }, { status: 502 });
    }

    await syncLeadToGoogleSheet(storedLead);

    return NextResponse.json({ success: true });
  } catch {
    console.error('Erro de conexão ao registrar lead no Supabase.');
    return NextResponse.json({ error: 'Não foi possível registrar o lead.' }, { status: 502 });
  }
}

export async function POST(request: Request) {
  try {
    return await handleLeadRequest(request);
  } catch {
    console.error('Erro inesperado ao processar lead.');
    return NextResponse.json({ error: 'Não foi possível processar sua solicitação.' }, { status: 500 });
  }
}
