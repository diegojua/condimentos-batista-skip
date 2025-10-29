import { supabase } from '@/lib/supabase/client'
import { Product, Category } from '@/types'
import { TablesInsert, TablesUpdate } from '@/lib/supabase/types'

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

type ProductInsert = TablesInsert<'produtos'>
type ProductUpdate = TablesUpdate<'produtos'>

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
  return data as unknown as Product[]
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
  return data as unknown as Product[]
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
  return data as unknown as Product
}

export const createProduct = async (
  product: Partial<Product>,
): Promise<Product> => {
  const productToInsert: ProductInsert = {
    nome: product.name!,
    description: product.description,
    preco: product.price!,
    promotional_price: product.promotionalPrice,
    images: product.images,
    category_id: product.category,
    stock: product.stock,
    type: product.type,
    variations: product.variations as any,
  }
  const { data, error } = await supabase
    .from('produtos')
    .insert(productToInsert)
    .select(PRODUCT_COLUMNS)
    .single()

  if (error) throw error
  return data as unknown as Product
}

export const updateProduct = async (
  id: number,
  updates: Partial<Product>,
): Promise<Product> => {
  const productToUpdate: ProductUpdate = {
    nome: updates.name,
    description: updates.description,
    preco: updates.price,
    promotional_price: updates.promotionalPrice,
    images: updates.images,
    category_id: updates.category,
    stock: updates.stock,
    type: updates.type,
    variations: updates.variations as any,
  }
  const { data, error } = await supabase
    .from('produtos')
    .update(productToUpdate)
    .eq('id', id)
    .select(PRODUCT_COLUMNS)
    .single()

  if (error) throw error
  return data as unknown as Product
}

export const deleteProduct = async (id: number): Promise<void> => {
  const { error } = await supabase.from('produtos').delete().eq('id', id)
  if (error) throw error
}
