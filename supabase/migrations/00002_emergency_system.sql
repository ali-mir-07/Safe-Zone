-- Add peer capability to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_peer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS availability_status TEXT DEFAULT 'offline' CHECK (availability_status IN ('available', 'busy', 'offline'));

-- Create Chat Rooms for organized sessions
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  initiator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  responder_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Nullable until matched
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- Update chats to link to rooms
ALTER TABLE public.chats 
ADD COLUMN IF NOT EXISTS room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE;

-- Enable RLS on chat rooms
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

-- Room RLS Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own rooms') THEN
        CREATE POLICY "Users can view their own rooms" ON public.chat_rooms FOR SELECT USING (auth.uid() = initiator_id OR auth.uid() = responder_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'System can manage rooms') THEN
        CREATE POLICY "System can manage rooms" ON public.chat_rooms FOR ALL USING (true); -- This might need tightening or using service role
    END IF;
END $$;
