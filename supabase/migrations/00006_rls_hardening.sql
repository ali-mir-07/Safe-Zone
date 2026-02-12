-- SafeZone RLS Hardening: Fix overly permissive policies on chat_rooms
-- Issue #11: chat_rooms allows ANY authenticated user to read ALL rooms

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view their chat rooms" ON chat_rooms;

-- Replace with a proper policy that only allows users to see rooms they participate in
CREATE POLICY "Users can view their own chat rooms"
ON chat_rooms FOR SELECT
USING (
    auth.uid() = initiator_id OR auth.uid() = responder_id
);

-- Also tighten INSERT: users can only create rooms where they are the initiator
DROP POLICY IF EXISTS "Users can create chat rooms" ON chat_rooms;
CREATE POLICY "Users can create chat rooms"
ON chat_rooms FOR INSERT
WITH CHECK (auth.uid() = initiator_id);

-- Tighten UPDATE: only participants can update room status
DROP POLICY IF EXISTS "Users can update their chat rooms" ON chat_rooms;
CREATE POLICY "Users can update their chat rooms"
ON chat_rooms FOR UPDATE
USING (
    auth.uid() = initiator_id OR auth.uid() = responder_id
);
