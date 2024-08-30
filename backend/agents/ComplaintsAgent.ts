import { getGroqChatCompletion } from '../../lib/GroqService';

export async function handleComplaint(query: string): Promise<string> {
    const prompt = `User is submitting a complaint: ${query}`;
    const response = await getGroqChatCompletion(prompt);
    return `Terima kasih atas keluhan Anda, kami akan menindaklanjutinya: ${response}`;
}
