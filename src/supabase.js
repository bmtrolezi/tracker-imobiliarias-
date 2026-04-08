import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zraoshhggyppziynptci.supabase.co'
const supabaseKey = 'sb_publishable_4X0hOnvWaKwPeobR31tgQw_Se5aO1J_'

export const supabase = createClient(supabaseUrl, supabaseKey)
