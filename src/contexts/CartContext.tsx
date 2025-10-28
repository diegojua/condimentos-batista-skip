import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { CartItem, Product } from '@/types'
import { toast } from '@/hooks/use-toast'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao seu carrinho.`,
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    )
    toast({
      title: 'Produto removido',
      description: 'O produto foi removido do seu carrinho.',
      variant: 'destructive',
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.promotionalPrice ?? item.price
      return total + price * item.quantity
    }, 0)
  }, [cartItems])

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [cartItems, cartCount, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
