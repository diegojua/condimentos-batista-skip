export interface ProductVariation {
  id: string
  name: string // e.g., "Tamanho", "Cor"
  options: {
    // e.g., "P", "M", "G" or "Vermelho", "Azul"
    [optionName: string]: {
      sku: string
      priceModifier: number // Can be positive or negative
      stock: number
      image?: string // Optional image for this specific variation option
    }
  }
}

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
  type?: 'simple' | 'variable'
  variations?: ProductVariation[]
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
  variation?: {
    [variationName: string]: string
  } // e.g., { "Tamanho": "M", "Cor": "Vermelho" }
}

export interface Order {
  id: string
  customerName: string
  date: string
  total: number
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado'
  source?: string // e.g., 'Website', 'Amazon'
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

export interface EmailCampaign {
  id: string
  name: string
  subject: string
  targetSegment: 'all' | 'new' | 'frequent'
  status: 'draft' | 'sent'
  sentDate?: string
  openRate: number
  clickRate: number
}

export interface Affiliate {
  id: string
  name: string
  email: string
  referralCode: string
  commissionRate: number // percentage
  totalReferrals: number
  totalEarnings: number
}

export interface Marketplace {
  id: 'amazon' | 'mercado-livre'
  name: string
  description: string
  logo: string
  status: 'connected' | 'disconnected' | 'error'
  sync: {
    products: boolean
    orders: boolean
    inventory: boolean
  }
}

export interface LiveChatMessage {
  id: string
  sender: 'user' | 'agent'
  text: string
  timestamp: string
}

export interface SupportTicket {
  id: string
  subject: string
  customerName: string
  date: string
  status: 'open' | 'in-progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
}
