import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const emergencyRequestSchema = z.object({
    description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
});

export const validateRequest = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: error.issues });
        }
        next(error);
    }
};
