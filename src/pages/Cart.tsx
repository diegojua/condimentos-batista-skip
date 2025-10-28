import { Link } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RecommendedProducts } from '@/components/RecommendedProducts'
import { mockProducts } from '@/lib/mock-data'
import { CheckoutProgress } from '@/components/CheckoutProgress'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } =
    useCart()

  const handleWhatsAppOrder = () => {
    const itemsSummary = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - R$ ${(item.promotionalPrice ?? item.price).toFixed(2)}`,
      )
      .join('\n')
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${itemsSummary}\n\nTotal: R$ ${cartTotal.toFixed(2)}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (cartCount === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">
          Adicione produtos para continuar.
        </p>
        <Button asChild className="btn-primary">
          <Link to="/produtos">Continuar Comprando</Link>
        </Button>
      </div>
    )
  }

  const recommended = mockProducts.filter(
    (p) => !cartItems.some((item) => item.id === p.id),
  )

  return (
    <>
      <div className="container py-12">
        <CheckoutProgress currentStep={1} />
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="flex items-center p-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    R$ {(item.promotionalPrice ?? item.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center border rounded-md mx-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-0 focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="font-semibold w-24 text-right">
                  R${' '}
                  {(
                    (item.promotionalPrice ?? item.price) * item.quantity
                  ).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-4 text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>A calcular</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button asChild size="lg" className="w-full btn-primary">
                  <Link to="/checkout">Finalizar Pedido</Link>
                </Button>
                <Button
                  size="lg"
                  className="w-full btn-whatsapp"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="mr-2 h-5 w-5" /> Comprar via
                  WhatsApp
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/produtos">Continuar Comprando</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <RecommendedProducts
        title="Você também pode gostar"
        products={recommended}
      />
    </>
  )
}

export default Cart
