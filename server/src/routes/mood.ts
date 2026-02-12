import { Router } from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';

const router = Router();

const moodLogSchema = z.object({
    mood_score: z.number().min(1).max(10),
    notes: z.string().max(500).optional(),
});

router.post('/', authenticateUser, validateRequest(moodLogSchema), async (req: any, res) => {
    const { mood_score, notes } = req.body;
    const userId = req.user.id;
    const supabase = req.supabase;

    try {
        const { data, error } = await supabase
            .from('mood_logs')
            .insert({
                user_id: userId,
                mood_score,
                notes: notes || null,
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('Mood logging error:', error);
        res.status(500).json({ error: 'Failed to log mood' });
    }
});

router.get('/history', authenticateUser, async (req: any, res) => {
    const userId = req.user.id;
    const supabase = req.supabase;

    try {
        const { data, error } = await supabase
            .from('mood_logs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('Mood history fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch mood history' });
    }
});

export default router;


