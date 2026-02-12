import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { authenticateUser } from '../middleware/auth.js';
import { z } from 'zod';
import { validateRequest } from '../middleware/validation.js';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const moodLogSchema = z.object({
    mood_score: z.number().min(1).max(10),
    notes: z.string().max(500).optional(),
});

// Create a Supabase client that is authenticated as the requesting user.
// This is needed because RLS policies use auth.uid() to gate access.
const getUserSupabase = (req: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    return client;
};

router.post('/', authenticateUser, validateRequest(moodLogSchema), async (req: any, res) => {
    const { mood_score, notes } = req.body;
    const userId = req.user.id;
    const userSupabase = getUserSupabase(req);

    try {
        const { data, error } = await userSupabase
            .from('mood_logs')
            .insert({
                user_id: userId,
                mood_score,
                notes,
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
    const userSupabase = getUserSupabase(req);

    try {
        const { data, error } = await userSupabase
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

