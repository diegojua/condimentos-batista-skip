import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { mockProducts, mockReviews } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, Plus, Minus, MessageCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/contexts/CartContext'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const product = mockProducts.find((p) => p.id === id)
  const reviews = mockReviews.filter((r) => r.productId === id)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.images[0])
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string
  }>({})
  const { addToCart } = useCart()

  const currentPrice = useMemo(() => {
    if (product?.type !== 'variable' || !product.variations) {
      return product?.promotionalPrice ?? product?.price ?? 0
    }
    let finalPrice = product.price
    product.variations.forEach((variation) => {
      const selectedOption = selectedVariations[variation.name]
      if (selectedOption) {
        finalPrice += variation.options[selectedOption]?.priceModifier || 0
      }
    })
    return finalPrice
  }, [product, selectedVariations])

  if (!product) {
    return (
      <div className="container py-8 text-center">Produto não encontrado.</div>
    )
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const handleVariationChange = (variationName: string, option: string) => {
    setSelectedVariations((prev) => ({ ...prev, [variationName]: option }))
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full rounded-lg shadow-lg mb-4 aspect-square object-cover"
          />
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={cn(
                  'border-2 rounded-md',
                  mainImage === img ? 'border-primary' : 'border-transparent',
                )}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 text-lg mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(product.rating) ? 'fill-current' : ''
                  }
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              ({product.reviewCount} avaliações)
            </span>
          </div>
          <p className="text-4xl font-bold text-primary mb-6">
            R$ {currentPrice.toFixed(2)}
          </p>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          {product.type === 'variable' &&
            product.variations?.map((variation) => (
              <div key={variation.id} className="mb-4">
                <Label className="text-lg font-semibold">
                  {variation.name}
                </Label>
                <RadioGroup
                  className="flex gap-2 mt-2"
                  onValueChange={(value) =>
                    handleVariationChange(variation.name, value)
                  }
                >
                  {Object.keys(variation.options).map((option) => (
                    <RadioGroupItem
                      key={option}
                      value={option}
                      id={`${variation.id}-${option}`}
                      className="sr-only"
                    />
                  ))}
                </RadioGroup>
              </div>
            ))}
          <div className="flex items-center gap-4 my-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                readOnly
                className="w-16 text-center border-0 focus-visible:ring-0"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1 btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
