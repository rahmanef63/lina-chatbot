import { getLLMResponse } from '../../lib/LLMService';

export async function processChatbotQuery(query: string): Promise<string> {
    const response = await getLLMResponse(query);
    return response;
}
