import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { query } = await request.json();

    // Logika untuk memproses query dari pengguna
    const response = await processQuery(query);

    return NextResponse.json({ response });
}

async function processQuery(query: string): Promise<string> {
    // Placeholder untuk memproses query dan mengembalikan respons
    return `Lina received your query: "${query}"`;
}
