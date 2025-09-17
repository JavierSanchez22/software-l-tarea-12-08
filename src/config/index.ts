// src/config/index.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_KEY || ''
  },
  database: {
    url: process.env.DATABASE_URL || ''
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || ''
  }
};