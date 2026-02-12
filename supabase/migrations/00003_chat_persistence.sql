-- Migration to create chat_logs table for AI persistence

CREATE TABLE IF NOT EXISTS chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
    message TEXT NOT NULL,
    sentiment JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own logs
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'chat_logs' AND policyname = 'Users can view their own chat logs'
    ) THEN
        CREATE POLICY "Users can view their own chat logs" 
        ON chat_logs FOR SELECT 
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
        ON chat_logs FOR INSERT 
        TO public 
        WITH CHECK (true);
    END IF;
END $$;
