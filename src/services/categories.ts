import { supabase } from '@/lib/supabase/client'
import { Category } from '@/types'

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
  return data
}

export const getCategoryById = async (id: string): Promise<Category | null> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching category by id:', error)
    return null
  }
  return data
}

export const createCategory = async (
  category: Omit<Category, 'id'> & { id?: string },
): Promise<Category> => {
  const newCategory = {
    ...category,
    id: category.id || category.name.toLowerCase().replace(/ /g, '-'),
  }
  const { data, error } = await supabase
    .from('categories')
    .insert(newCategory)
    .select()
    .single()
  if (error) {
    console.error('Error creating category:', error)
    throw error
  }
  return data
}

export const updateCategory = async (
  id: string,
  updates: Partial<Category>,
): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) {
    console.error('Error updating category:', error)
    throw error
  }
  return data
}

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}
