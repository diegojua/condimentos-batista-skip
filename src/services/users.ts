import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export type Profile = Tables<'profiles'>

export const getAllUsers = async (): Promise<Profile[]> => {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
  return data
}

export const updateUserRole = async (
  id: string,
  role: string,
): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating user role:', error)
    throw error
  }
  return data
}
