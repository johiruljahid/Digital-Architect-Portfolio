
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvnlwszhuipdjilnrbgb.supabase.co';
const supabaseKey = 'sb_publishable_i4lPXA3LGL0WEt0u7mQV7Q_4kvg_1o5';

export const supabase = createClient(supabaseUrl, supabaseKey);
