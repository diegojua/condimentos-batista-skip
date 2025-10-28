export interface Product {
  id: string
  name: string
  description: string
  price: number
  promotionalPrice?: number
  images: string[]
  category: string
  stock: number
  rating: number
  reviewCount: number
}

export interface Category {
  id: string
  name: string
  image: string
}

export interface Review {
  id: string
  productId: string
  author: string
  date: string
  rating: number
  comment: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  date: string
  total: number
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado'
}

export interface LoyaltyInfo {
  points: number
  tier: 'Bronze' | 'Silver' | 'Gold'
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  loyalty?: LoyaltyInfo
}

export interface Promotion {
  id: string
  name: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  scope: 'product' | 'category' | 'all'
  applicableIds: string[] // product or category IDs
  startDate: string
  endDate: string
  isActive: boolean
}

export interface LoyaltyReward {
  id: string
  name: string
  pointsRequired: number
  discountPercentage?: number
  discountFixed?: number
}

export interface LoyaltySettings {
  enabled: boolean
  pointsPerDollar: number
  tiers: {
    bronze: { points: number; multiplier: number }
    silver: { points: number; multiplier: number }
    gold: { points: number; multiplier: number }
  }
  rewards: LoyaltyReward[]
}
