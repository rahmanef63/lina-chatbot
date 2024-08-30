import { getGroqChatCompletion } from '../../lib/GroqService';

export async function handleProductInfo(query: string): Promise<string> {
    const prompt = `User is asking about product information: ${query}`;
    const response = await getGroqChatCompletion(prompt);
    return `Informasi produk yang Anda cari adalah: ${response}`;
}
