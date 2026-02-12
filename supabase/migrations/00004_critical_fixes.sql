-- ============================================================
-- Critical Fix #3: Fix chat_logs UUID function
-- The old migration used uuid_generate_v4() which requires 
-- the uuid-ossp extension. Using gen_random_uuid() instead
-- (built-in, consistent with all other tables).
-- ============================================================

-- Drop and recreate the chat_logs table with correct UUID function
-- Only drop if it exists (safe for fresh installs)
DROP TABLE IF EXISTS public.chat_logs;

CREATE TABLE public.chat_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
    message TEXT NOT NULL,
    sentiment JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own logs
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'chat_logs' AND policyname = 'Users can view their own chat logs'
    ) THEN
        CREATE POLICY "Users can view their own chat logs" 
        ON public.chat_logs FOR SELECT 
        TO authenticated 
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Allow anonymous/public inserts (required for guest chat)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'chat_logs' AND policyname = 'Allow anonymous inserts'
    ) THEN
        CREATE POLICY "Allow anonymous inserts" 
        ON public.chat_logs FOR INSERT 
        TO public 
        WITH CHECK (true);
    END IF;
END $$;


-- ============================================================
-- Critical Fix #4: Auto-create profile on user signup
-- Without this, mood_logs and emergency_requests FK to 
-- profiles(id) fails because no profile row exists.
-- This trigger fires after each new user in auth.users.
-- ============================================================

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

-- Drop trigger if it already exists (safe re-run)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- Also: Insert profiles for any EXISTING users who don't have one
-- ============================================================
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
