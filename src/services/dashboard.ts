import { supabase } from '@/lib/supabase/client'

interface DashboardStats {
  productCount: number
  categoryCount: number
  userCount: number
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [
    { count: productCount, error: productError },
    { count: categoryCount, error: categoryError },
    { count: userCount, error: userError },
  ] = await Promise.all([
    supabase.from('produtos').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  if (productError || categoryError || userError) {
    console.error(
      'Error fetching dashboard stats:',
      productError,
      categoryError,
      userError,
    )
    return { productCount: 0, categoryCount: 0, userCount: 0 }
  }

  return {
    productCount: productCount ?? 0,
    categoryCount: categoryCount ?? 0,
    userCount: userCount ?? 0,
  }
}
