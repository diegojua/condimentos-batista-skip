import { useState } from 'react'
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const product = mockProducts.find((p) => p.id === id)
  const reviews = mockReviews.filter((r) => r.productId === id)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.images[0])
  const { addToCart } = useCart()

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

  const handleWhatsAppOrder = () => {
    const message = `Olá! Gostaria de pedir ${quantity}x ${product.name}.`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={mainImage}
            alt={product.name}
            className="w-full rounded-lg shadow-lg mb-4"
          />
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-md ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
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
          <div className="flex items-baseline gap-3 mb-6">
            {product.promotionalPrice ? (
              <>
                <p className="text-4xl font-bold text-primary">
                  R$ {product.promotionalPrice.toFixed(2)}
                </p>
                <p className="text-xl text-muted-foreground line-through">
                  R$ {product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-4xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </p>
            )}
          </div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <Badge
            variant={product.stock > 0 ? 'default' : 'destructive'}
            className={product.stock > 0 ? 'bg-success' : ''}
          >
            {product.stock > 0 ? 'Em Estoque' : 'Esgotado'}
          </Badge>
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
          <Button
            size="lg"
            variant="outline"
            className="w-full btn-whatsapp"
            onClick={handleWhatsAppOrder}
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Comprar via WhatsApp
          </Button>
          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ingredientes</AccordionTrigger>
              <AccordionContent>
                Informações sobre ingredientes aqui.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Informação Nutricional</AccordionTrigger>
              <AccordionContent>Tabela nutricional aqui.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Avaliações de Clientes</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={i < review.rating ? 'fill-current' : ''}
                    />
                  ))}
                </div>
                <p className="ml-4 font-bold">{review.author}</p>
                <p className="ml-auto text-sm text-muted-foreground">
                  {review.date}
                </p>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts
            .filter(
              (p) => p.category === product.category && p.id !== product.id,
            )
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
