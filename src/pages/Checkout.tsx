import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useSettings } from '@/contexts/SettingsContext'
import { CreditCardForm } from '@/components/CreditCardForm'
import { PixDisplay } from '@/components/PixDisplay'
import { BoletoDisplay } from '@/components/BoletoDisplay'
import { toast } from '@/hooks/use-toast'

const checkoutSchema = z
  .object({
    name: z.string().min(2, 'Nome inválido'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
    cep: z.string().length(8, 'CEP inválido'),
    street: z.string().min(3, 'Rua inválida'),
    number: z.string().min(1, 'Número inválido'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro inválido'),
    city: z.string().min(2, 'Cidade inválida'),
    state: z.string().length(2, 'Estado inválido'),
    paymentMethod: z.enum(['credit-card', 'pix', 'boleto']),
    cardNumber: z.string().optional(),
    cardName: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit-card') {
      if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Número do cartão inválido',
          path: ['cardNumber'],
        })
      }
      if (!data.cardName || data.cardName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nome no cartão inválido',
          path: ['cardName'],
        })
      }
      if (
        !data.cardExpiry ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Data de validade inválida (MM/AA)',
          path: ['cardExpiry'],
        })
      }
      if (!data.cardCvc || !/^\d{3,4}$/.test(data.cardCvc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CVC inválido',
          path: ['cardCvc'],
        })
      }
    }
  })

type CheckoutFormValues = z.infer<typeof checkoutSchema>

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { settings } = useSettings()
  const navigate = useNavigate()
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'credit-card' },
  })

  const selectedPaymentMethod = form.watch('paymentMethod')

  function onSubmit(values: CheckoutFormValues) {
    // Simulate payment failure
    if (
      values.paymentMethod === 'credit-card' &&
      values.cardNumber?.endsWith('1111')
    ) {
      toast({
        variant: 'destructive',
        title: 'Falha no Pagamento',
        description:
          'Seu cartão foi recusado. Por favor, verifique os dados ou tente outro método.',
      })
      form.setError('cardNumber', { message: 'Cartão recusado' })
      return
    }

    const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`
    console.log('Pedido realizado:', { ...values, orderId })
    clearCart()
    navigate('/confirmacao-pedido', { state: { orderId } })
  }

  const paymentMethods = [
    {
      id: 'credit-card',
      label: 'Cartão de Crédito',
      enabled: settings.creditCard.enabled,
      component: <CreditCardForm form={form} />,
    },
    {
      id: 'pix',
      label: 'Pix',
      enabled: settings.pix.enabled,
      component: <PixDisplay />,
    },
    {
      id: 'boleto',
      label: 'Boleto Bancário',
      enabled: settings.boleto.enabled,
      component: <BoletoDisplay />,
    },
  ].filter((method) => method.enabled)

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>1. Informações do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2. Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>3. Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {paymentMethods.map((method) => (
                              <FormItem
                                key={method.id}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={method.id} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {method.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {
                    paymentMethods.find((m) => m.id === selectedPaymentMethod)
                      ?.component
                  }
                </CardContent>
              </Card>
              <Button type="submit" size="lg" className="w-full btn-primary">
                Finalizar Compra
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-semibold">
                    {item.quantity}x {item.name}
                  </span>
                  <span>
                    R${' '}
                    {(
                      (item.promotionalPrice ?? item.price) * item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Checkout
