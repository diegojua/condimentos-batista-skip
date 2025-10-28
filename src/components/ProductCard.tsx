import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  return (
    <Card className="overflow-hidden transition-all duration-250 ease-out hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <CardHeader className="p-0">
        <Link to={`/produtos/${product.id}`} className="block">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-56 object-cover"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link to={`/produtos/${product.id}`}>
          <CardTitle className="text-lg font-semibold mb-2 hover:text-primary transition-colors h-14">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span>
            {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          {product.promotionalPrice ? (
            <>
              <p className="text-2xl font-bold text-primary">
                R$ {product.promotionalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                R$ {product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full btn-primary" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}
