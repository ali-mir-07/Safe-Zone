import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

import type { Profile } from '../../shared/types.js';
import emergencyRoutes from './routes/emergency.js';
import aiRoutes from './routes/ai.js';
import moodRoutes from './routes/mood.js';

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/emergency', emergencyRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mood', moodRoutes);

app.get('/api/profile-example', (req, res) => {
    const exampleProfile: Profile = {
        id: '123',
        username: 'safezone_user',
        updated_at: new Date().toISOString()
    };
    res.json(exampleProfile);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;

