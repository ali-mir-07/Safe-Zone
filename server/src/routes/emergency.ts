import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { supabase } from '../lib/supabase.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateRequest, emergencyRequestSchema } from '../middleware/validation.js';

const router = Router();

// Rate limit: 3 requests per 15 minutes for emergency trigger
const emergencyRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: { error: 'Too many emergency requests. Please try again later or contact support directly.' },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post(
    '/trigger',
    authenticateUser,
    emergencyRateLimiter,
    validateRequest(emergencyRequestSchema),
    async (req: any, res) => {
        const { description } = req.body;
        const userId = req.user.id;

        try {
            // 1. Create the emergency request
            const { data: emergencyRequest, error: emergencyError } = await supabase
                .from('emergency_requests')
                .insert({
                    user_id: userId,
                    description,
                    status: 'pending'
                })
                .select()
                .single();

            if (emergencyError) throw emergencyError;

            // 2. Find an available peer (strictly anonymous - we only care about their ID and availability)
            const { data: peer, error: peerError } = await supabase
                .from('profiles')
                .select('id')
                .eq('is_peer', true)
                .eq('availability_status', 'available')
                .limit(1)
                .single();

            // Note: If no peer is available, we still create the request but status remains pending
            // Real-time listeners on the client side or a background job could handle later matching

            let roomId = null;
            if (peer) {
                // 3. Create a chat room
                const { data: room, error: roomError } = await supabase
                    .from('chat_rooms')
                    .insert({
                        initiator_id: userId,
                        responder_id: peer.id,
                        status: 'active'
                    })
                    .select()
                    .single();

                if (roomError) throw roomError;
                roomId = room.id;

                // Optionally update peer status to 'busy'
                await supabase
                    .from('profiles')
                    .update({ availability_status: 'busy' })
                    .eq('id', peer.id);

                // Update emergency request status
                await supabase
                    .from('emergency_requests')
                    .update({ status: 'resolved' }) // Or 'active' if you prefer
                    .eq('id', emergencyRequest.id);
            }

            res.status(201).json({
                message: 'Emergency request triggered successfully',
                emergency_request_id: emergencyRequest.id,
                room_id: roomId,
                matched: !!peer,
                anonymous_id: 'user-' + emergencyRequest.id.split('-')[0] // Simulated anonymous handle
            });

        } catch (error: any) {
            console.error('Emergency trigger error:', error);
            res.status(500).json({ error: 'Failed to process emergency request' });
        }
    }
);

export default router;
