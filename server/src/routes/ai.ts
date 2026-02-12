import { Router } from 'express';
import { getDeescalationResponse, detectSentiment } from '../lib/gemini.js';
import { optionalAuthenticateUser } from '../middleware/auth.js';

const router = Router();

router.post('/chat', optionalAuthenticateUser, async (req, res) => {
    const { message } = req.body;
    const user = (req as any).user;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // 1. Analyze sentiment
        const sentimentAnalysisRaw = await detectSentiment(message);
        let sentimentAnalysis = sentimentAnalysisRaw;

        // Try to parse JSON if Gemini returns it formatted
        try {
            if (sentimentAnalysisRaw.includes('{')) {
                const jsonStr = sentimentAnalysisRaw.substring(sentimentAnalysisRaw.indexOf('{'), sentimentAnalysisRaw.lastIndexOf('}') + 1);
                sentimentAnalysis = JSON.parse(jsonStr);
            }
        } catch (e) {
            console.warn('Failed to parse sentiment as JSON, storing as string');
        }

        // 2. Generate supportive response
        const response = await getDeescalationResponse(message, user);

        // 3. Persist to Supabase (Non-blocking and fail-safe)
        try {
            const { error: dbError } = await (req as any).supabase.from('chat_logs').insert([
                {
                    user_id: user?.id || null,
                    sender: 'user',
                    message: message,
                    sentiment: typeof sentimentAnalysis === 'object' ? sentimentAnalysis : { raw: sentimentAnalysis }
                },
                {
                    user_id: user?.id || null,
                    sender: 'ai',
                    message: response
                }
            ]);

            if (dbError) {
                console.error('Database logging error (continuing...):', dbError);
            }
        } catch (dbEx) {
            console.error('Database connection exception (continuing...):', dbEx);
        }


        res.json({
            response,
            analysis: sentimentAnalysis,
            is_guest: !user
        });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
});

export default router;
