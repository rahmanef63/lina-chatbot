import { NextRequest, NextResponse } from 'next/server';
import { processChatbotQuery } from '../../../backend/controllers/chatbotController';

export async function POST(request: NextRequest) {
    try {
        const { query } = await request.json();
        const sessionId = request.headers.get('session-id') || 'default-session-id'; // Gunakan sessionId dari header atau default

        // Proses query dengan Groq LLM
        const response = await processChatbotQuery(sessionId, query);

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error in chatbot API route:', error);
        return NextResponse.json({ response: 'Sorry, something went wrong on the server.' });
    }
}
