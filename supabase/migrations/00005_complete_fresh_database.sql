-- ============================================================
-- SAFEZONE — COMPLETE FRESH DATABASE
-- Run this ONCE in Supabase SQL Editor
-- It drops all old tables and rebuilds everything from scratch.
-- ============================================================


-- =====================
-- STEP 1: DROP ALL OLD TABLES (order matters due to FKs)
-- =====================
DROP TABLE IF EXISTS public.chat_logs CASCADE;
DROP TABLE IF EXISTS public.chats CASCADE;
DROP TABLE IF EXISTS public.chat_rooms CASCADE;
DROP TABLE IF EXISTS public.emergency_requests CASCADE;
DROP TABLE IF EXISTS public.mood_logs CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();


-- =====================
-- STEP 2: PROFILES (extends auth.users)
-- =====================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    is_peer BOOLEAN DEFAULT FALSE,
    availability_status TEXT DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);


-- =====================
-- STEP 3: MOOD LOGS
-- =====================
CREATE TABLE public.mood_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    mood_score INTEGER CHECK (mood_score BETWEEN 1 AND 10) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood logs"
    ON public.mood_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood logs"
    ON public.mood_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood logs"
    ON public.mood_logs FOR DELETE
    USING (auth.uid() = user_id);


-- =====================
-- STEP 4: EMERGENCY REQUESTS
-- =====================
CREATE TABLE public.emergency_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'cancelled')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own emergency requests"
    ON public.emergency_requests FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create emergency requests"
    ON public.emergency_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own emergency requests"
    ON public.emergency_requests FOR UPDATE
    USING (auth.uid() = user_id);


-- =====================
-- STEP 5: CHAT ROOMS (for peer-to-peer sessions)
-- =====================
CREATE TABLE public.chat_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    initiator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    responder_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ
);

ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rooms"
    ON public.chat_rooms FOR SELECT
    USING (auth.uid() = initiator_id OR auth.uid() = responder_id);

CREATE POLICY "Authenticated users can create rooms"
    ON public.chat_rooms FOR INSERT
    WITH CHECK (auth.uid() = initiator_id);

CREATE POLICY "Participants can update rooms"
    ON public.chat_rooms FOR UPDATE
    USING (auth.uid() = initiator_id OR auth.uid() = responder_id);


-- =====================
-- STEP 6: PEER CHATS (messages inside rooms)
-- =====================
CREATE TABLE public.chats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chats"
    ON public.chats FOR SELECT
    USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
    ON public.chats FOR INSERT
    WITH CHECK (auth.uid() = sender_id);


-- =====================
-- STEP 7: AI CHAT LOGS (for AI Sanctuary conversations)
-- =====================
CREATE TABLE public.chat_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
    message TEXT NOT NULL,
    sentiment JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat logs"
    ON public.chat_logs FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert chat logs"
    ON public.chat_logs FOR INSERT
    TO public
    WITH CHECK (true);


-- =====================
-- STEP 8: AUTO-CREATE PROFILE ON SIGNUP (trigger)
-- =====================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, updated_at)
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'full_name',
            split_part(NEW.email, '@', 1)
        ),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =====================
-- STEP 9: BACKFILL PROFILES FOR EXISTING USERS
-- =====================
INSERT INTO public.profiles (id, username, updated_at)
SELECT
    u.id,
    COALESCE(
        u.raw_user_meta_data->>'full_name',
        split_part(u.email, '@', 1)
    ),
    NOW()
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = u.id
)
ON CONFLICT (id) DO NOTHING;
