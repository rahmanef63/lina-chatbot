import { getSession, updateSession } from '../../lib/SessionManager';
import { detectIntent } from '../../lib/IntentionDetector';
import { formatResponse } from '../../lib/ResponseFormatter';
import { handlePriceCheck } from '../agents/PriceCheckAgent';
import { handleProductInfo } from '../agents/ProductInfoAgent';
import { handleComplaint } from '../agents/ComplaintsAgent';
import { getGroqChatCompletion } from '../../lib/GroqService';

export async function processChatbotQuery(sessionId: string, query: string): Promise<string> {
    try {
        console.log('Received query:', query);

        if (typeof query !== 'string' || query.trim() === '') {
            return 'Maaf, saya tidak mengerti maksud Anda. Bisakah Anda jelaskan lebih lanjut? 😊';
        }

        const session = getSession(sessionId);
        console.log('Session Data:', session.data);

        session.data.history = session.data.history || [];
        session.data.history.push({ query, timestamp: new Date() });

        let intent = detectIntent(query, session);

        let response;
        switch (intent) {
            case 'introduce_name':
                const nameMatch = query.match(/nama saya (\w+)/i);
                if (nameMatch) {
                    session.data.name = nameMatch[1];
                    response = `Senang bertemu dengan Anda, ${session.data.name}! Ada yang bisa saya bantu? 😊`;
                } else {
                    response = 'Saya tidak menangkap nama Anda. Bisa ulangi? 😊';
                }
                break;
            case 'price_check':
                response = await handlePriceCheck(query);
                break;
            case 'product_info':
                response = await handleProductInfo(query);
                response += `\n\nHalaman: /services#bedcover`;
                response += `\n\nSuggestions: Apakah Anda ingin tahu lebih lanjut tentang layanan ekspres kami?`;
                break;
            case 'complaint':
                response = await handleComplaint(query);
                break;
            case 'greeting':
                const userName = session.data.name ? `, ${session.data.name}` : '';
                response = `Halo${userName}! Ada yang bisa saya bantu hari ini? 😊`;
                break;
            case 'previous_query':
                response = session.data.lastResponse || 'Maaf, saya tidak bisa mengingat pertanyaan sebelumnya. Bisakah Anda ulangi pertanyaannya? 😊';
                break;
            case 'unknown':
            default:
                response = await getGroqChatCompletion(query);
                if (!response || response.trim() === '') {
                    response = 'Saya belum mengerti maksud Anda, tapi saya di sini untuk membantu. Coba tanyakan sesuatu yang lain! 😊';
                }
                break;
        }

        session.data.lastQuery = query;
        session.data.lastResponse = response;
        updateSession(sessionId, session.data);

        return formatResponse(response);
    } catch (error) {
        console.error('Error processing chatbot query:', error);
        return 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Coba lagi nanti ya. 😊';
    }
}
