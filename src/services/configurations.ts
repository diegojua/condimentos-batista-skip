import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export type Configuration = Tables<'configuracoes'>

export const getConfigurations = async (): Promise<Configuration[]> => {
  const { data, error } = await supabase.from('configuracoes').select('*')
  if (error) {
    console.error('Error fetching configurations:', error)
    throw error
  }
  return data
}

export const updateConfiguration = async (
  id: number,
  updates: Partial<Configuration>,
): Promise<Configuration> => {
  const { data, error } = await supabase
    .from('configuracoes')
    .update({ valor: updates.valor, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating configuration:', error)
    throw error
  }
  return data
}
