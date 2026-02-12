import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables (SUPABASE_URL and SUPABASE_ANON_KEY)');
}

// Global service role client for background/system tasks that bypass RLS
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey);

/**
 * Creates a Supabase client that can be authenticated with a user's JWT.
 * This is essential for RLS policies that rely on auth.uid().
 */
export const getSupabaseClient = (token?: string) => {
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
    });
};


