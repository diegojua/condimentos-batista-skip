import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useLoyalty } from '@/contexts/LoyaltyContext'
import { useSettings } from '@/contexts/SettingsContext'
import { useEffect } from 'react'
import { CheckoutProgress } from '@/components/CheckoutProgress'

const OrderConfirmation = () => {
  const location = useLocation()
  const { orderId, orderTotal } = location.state || {
    orderId: '#123456',
    orderTotal: 0,
  }
  const { addPoints } = useLoyalty()
  const { settings } = useSettings()

  const pointsEarned = Math.floor(orderTotal * settings.loyalty.pointsPerDollar)

  useEffect(() => {
    if (pointsEarned > 0) {
      addPoints(pointsEarned)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container py-16 flex flex-col items-center justify-center">
      <CheckoutProgress currentStep={3} />
      <Card className="w-full max-w-2xl text-center p-8">
        <CardHeader>
          <div className="mx-auto bg-success text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl">
            Seu pedido foi realizado com sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            O número do seu pedido é{' '}
            <span className="font-bold text-primary">{orderId}</span>.
          </p>
          {pointsEarned > 0 && (
            <p className="text-muted-foreground">
              Você ganhou{' '}
              <span className="font-bold text-primary">{pointsEarned}</span>{' '}
              pontos de fidelidade com esta compra!
            </p>
          )}
          <p className="text-muted-foreground">
            Você receberá um e-mail de confirmação em breve com todos os
            detalhes da sua compra.
          </p>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Próximos Passos:</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside text-left max-w-md mx-auto">
              <li>Aguarde o e-mail de confirmação.</li>
              <li>Seu pedido será preparado para envio.</li>
              <li>Você será notificado quando o pedido for enviado.</li>
            </ul>
          </div>
          <Button asChild size="lg" className="mt-8 btn-primary">
            <Link to="/">Voltar para o Início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderConfirmation
