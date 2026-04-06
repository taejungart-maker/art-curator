import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgbrxgbmsywhlnibolxq.supabase.co';
const supabaseAnonKey = 'sb_publishable_aQm244pJx6Xym34ukSqYtA_zu-dqW6F';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
