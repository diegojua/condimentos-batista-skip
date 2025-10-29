import { supabase } from '@/lib/supabase/client'

export type UserProfile = {
  id: string
  role: 'admin' | 'customer'
}

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data as UserProfile
}
