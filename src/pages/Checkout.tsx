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
import { useLoyalty } from '@/contexts/LoyaltyContext'
import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

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
  const { points, redeemPoints } = useLoyalty()
  const navigate = useNavigate()
  const [appliedReward, setAppliedReward] = useState<string | null>(null)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'credit-card' },
  })

  const selectedPaymentMethod = form.watch('paymentMethod')

  const availableRewards = settings.loyalty.rewards.filter(
    (r) => r.pointsRequired <= points,
  )

  const discount = useMemo(() => {
    if (!appliedReward || appliedReward === 'none') return 0
    const reward = settings.loyalty.rewards.find((r) => r.id === appliedReward)
    if (!reward) return 0

    if (reward.discountPercentage) {
      return (cartTotal * reward.discountPercentage) / 100
    }
    if (reward.discountFixed) {
      return reward.discountFixed
    }
    return 0
  }, [appliedReward, cartTotal, settings.loyalty.rewards])

  const finalTotal = Math.max(0, cartTotal - discount)

  function onSubmit(values: CheckoutFormValues) {
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

    const reward = appliedReward
      ? settings.loyalty.rewards.find((r) => r.id === appliedReward)
      : null
    if (reward) {
      const success = redeemPoints(reward.pointsRequired)
      if (!success) {
        toast({
          variant: 'destructive',
          title: 'Erro ao resgatar pontos',
          description:
            'Não foi possível aplicar seu desconto. Tente novamente.',
        })
        return
      }
    }

    const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`
    console.log('Pedido realizado:', { ...values, orderId })
    clearCart()
    navigate('/confirmacao-pedido', {
      state: { orderId, orderTotal: finalTotal },
    })
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
                Finalizar Compra por R$ {finalTotal.toFixed(2)}
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
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
              </div>
              {settings.loyalty.enabled && availableRewards.length > 0 && (
                <div className="pt-4 mt-4 border-t">
                  <Label htmlFor="loyalty-reward">
                    Usar pontos de fidelidade
                  </Label>
                  <Select onValueChange={setAppliedReward}>
                    <SelectTrigger id="loyalty-reward" className="mt-2">
                      <SelectValue placeholder="Selecione uma recompensa..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      {availableRewards.map((reward) => (
                        <SelectItem key={reward.id} value={reward.id}>
                          {reward.name} ({reward.pointsRequired} pts)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="border-t pt-4 mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Desconto Fidelidade</span>
                    <span>- R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2)}</span>
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
