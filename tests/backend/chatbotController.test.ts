import { processChatbotQuery } from '../../backend/controllers/chatbotController';

describe('Chatbot Controller', () => {
    it('returns a response from the LLM service', async () => {
        const query = 'Hello, Lina!';
        const response = await processChatbotQuery(query);
        expect(response).toContain('simulated response');
    });
});
