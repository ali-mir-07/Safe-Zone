import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach user to request for use in routes
    (req as any).user = user;
    next();
};

export const optionalAuthenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        (req as any).user = null; // Identify as guest
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        (req as any).user = null;
        return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        (req as any).user = null;
    } else {
        (req as any).user = user;
    }

    next();
};
