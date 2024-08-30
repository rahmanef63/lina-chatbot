import Groq from 'groq-sdk';
import { buildQuery } from './QueryBuilder';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(userQuery: string): Promise<string> {
    try {
        // Bangun query yang akan dikirim ke Groq LLM
        const finalQuery = buildQuery(userQuery);

        // Kirim query ke Groq LLM
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: finalQuery,
                },
            ],
            model: 'llama-3.1-70b-versatile',
        });

        // Kembalikan respons dari LLM
        return chatCompletion.choices[0]?.message?.content || 'No response received from the LLM';
    } catch (error) {
        console.error('Error getting chat completion from Groq:', error);
        return 'Sorry, something went wrong while communicating with the LLM. Please try again later.';
    }
}
