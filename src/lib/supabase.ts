import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'ngo' | 'admin';
  created_at: string;
  updated_at: string;
};

export type HelpRequest = {
  id: string;
  user_id: string;
  name: string;
  location: string;
  issue_type: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  created_at: string;
  updated_at: string;
};

export type CropAnalysis = {
  id: string;
  user_id: string;
  image_url?: string;
  predicted_disease: string;
  treatment: string;
  confidence: number;
  created_at: string;
};
