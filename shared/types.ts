export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  updated_at: string;
}

export interface MoodLog {
  id: string;
  user_id: string;
  mood_score: number;
  notes?: string;
  created_at: string;
}

export interface EmergencyRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'resolved' | 'cancelled';
  description: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string | null;
  sender: 'user' | 'ai';
  message: string;
  sentiment?: Record<string, unknown> | null;
  created_at: string;
}
