import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nome = String(body.nome ?? '').trim();
    const whatsapp = String(body.whatsapp ?? '').trim();
    const email = String(body.email ?? '').trim();
    const curso = String(body.curso ?? '').trim();
    const tipo_formacao = String(body.tipo_formacao ?? '').trim();
    const instituicao = String(body.instituicao ?? '').trim();
    const origem = String(body.origem ?? 'site').trim();
    const mensagem = String(body.mensagem ?? '').trim();

    if (!nome || !whatsapp) {
      return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios.' }, { status: 400 });
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: 'Serviço de leads não configurado.' }, { status: 503 });
    }

    const response = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ nome, whatsapp, email: email || null, curso: curso || null, tipo_formacao: tipo_formacao || null, instituicao: instituicao || null, origem, mensagem: mensagem || null }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Não foi possível registrar o lead.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Não foi possível processar sua solicitação.' }, { status: 500 });
  }
}
