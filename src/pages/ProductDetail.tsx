import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { RecommendedProducts } from '@/components/RecommendedProducts'
import { getProductById, getAllProducts } from '@/services/products'
import { Product } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [recommended, setRecommended] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState<string | undefined>(undefined)
  const [selectedVariations, setSelectedVariations] = useState<{
    [key: string]: string
  }>({})
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      setLoading(true)
      const productId = parseInt(id, 10)
      if (isNaN(productId)) {
        navigate('/not-found')
        return
      }
      const productData = await getProductById(productId)
      if (productData) {
        setProduct(productData)
        setMainImage(productData.images[0])
        const allProducts = await getAllProducts()
        setRecommended(allProducts.filter((p) => p.id !== productData.id))
      } else {
        navigate('/not-found')
      }
      setLoading(false)
    }
    window.scrollTo(0, 0)
    fetchProduct()
  }, [id, navigate])

  const currentPrice = useMemo(() => {
    if (!product) return 0
    if (product.type !== 'variable' || !product.variations) {
      return product.promotionalPrice ?? product.price
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

  if (loading) {
    return (
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Skeleton className="w-full aspect-square mb-4" />
            <div className="flex gap-2">
              <Skeleton className="w-20 h-20" />
              <Skeleton className="w-20 h-20" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
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
    <>
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
                    className={cn(
                      'h-6 w-6',
                      i < Math.round(product.rating)
                        ? 'fill-yellow-500'
                        : 'text-gray-300',
                    )}
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
                    value={selectedVariations[variation.name]}
                  >
                    {Object.keys(variation.options).map((option) => (
                      <div key={option}>
                        <RadioGroupItem
                          value={option}
                          id={`${variation.id}-${option}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`${variation.id}-${option}`}
                          className="cursor-pointer rounded-md border-2 border-muted bg-transparent px-4 py-2 hover:bg-accent hover:text-accent-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        >
                          {option}
                        </Label>
                      </div>
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
      <RecommendedProducts
        title="Clientes também compraram"
        products={recommended}
      />
    </>
  )
}

export default ProductDetail
