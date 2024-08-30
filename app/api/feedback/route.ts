import { NextRequest, NextResponse } from 'next/server';
import { storeFeedback } from '../../../lib/FeedbackHandler';

export async function POST(request: NextRequest) {
    try {
        const { sessionId, feedback } = await request.json();
        storeFeedback(sessionId, feedback);
        return NextResponse.json({ message: 'Feedback stored' });
    } catch (error) {
        console.error('Error in feedback API route:', error);
        return NextResponse.json({ message: 'Error storing feedback' });
    }
}
