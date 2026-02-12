import type { Request, Response, NextFunction } from 'express';
import { getSupabaseClient } from '../lib/supabase.js';

// Extend Express Request type to include user and supabase client
declare global {
    namespace Express {
        interface Request {
            user?: any;
            supabase: ReturnType<typeof getSupabaseClient>;
        }
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    // Create an authenticated Supabase client for this request
    const supabaseClient = getSupabaseClient(token);
    const { data: { user }, error } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach user and authenticated client to request
    req.user = user;
    req.supabase = supabaseClient;
    next();
};

export const optionalAuthenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        req.supabase = getSupabaseClient(); // Anonymous client
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        req.user = null;
        req.supabase = getSupabaseClient(); // Anonymous client
        return next();
    }

    const supabaseClient = getSupabaseClient(token);
    const { data: { user }, error } = await supabaseClient.auth.getUser(token);

    if (error || !user) {
        req.user = null;
        req.supabase = getSupabaseClient(); // Fallback to anonymous client
    } else {
        req.user = user;
        req.supabase = supabaseClient;
    }

    next();
};

