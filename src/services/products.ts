import { supabase } from '@/lib/supabase/client'
import { Product, Category } from '@/types'

const PRODUCT_COLUMNS = `
  id,
  name: nome,
  description,
  price: preco,
  promotionalPrice: promotional_price,
  images,
  category: category_id,
  stock,
  rating,
  reviewCount: review_count,
  type,
  variations
`

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data
}

export const getFeaturedProducts = async (limit = 4): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('produtos')
    .select(PRODUCT_COLUMNS)
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  return data as Product[]
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('produtos')
    .select(PRODUCT_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }
  return data as Product[]
}

export const getProductById = async (id: number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('produtos')
    .select(PRODUCT_COLUMNS)
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
  return data as Product
}
