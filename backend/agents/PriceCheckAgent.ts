import { getGroqChatCompletion } from '../../lib/GroqService';

export async function handlePriceCheck(query: string): Promise<string> {
    const prompt = `User is asking about price: ${query}`;
    const response = await getGroqChatCompletion(prompt);
    return `Harga untuk layanan yang Anda tanyakan adalah: ${response}`;
}
