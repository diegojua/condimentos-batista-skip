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
