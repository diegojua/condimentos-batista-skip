import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLoyalty } from '@/contexts/LoyaltyContext'
import { useSettings } from '@/contexts/SettingsContext'
import { Ticket, Star } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const LoyaltyPage = () => {
  const { points, redeemPoints } = useLoyalty()
  const { settings } = useSettings()

  if (!settings.loyalty.enabled) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold">Programa de Fidelidade</h1>
        <p className="text-muted-foreground mt-4">
          Nosso programa de fidelidade está temporariamente indisponível.
        </p>
      </div>
    )
  }

  const handleRedeem = (reward: (typeof settings.loyalty.rewards)[0]) => {
    const success = redeemPoints(reward.pointsRequired)
    if (success) {
      toast({
        title: 'Recompensa Resgatada!',
        description: `Você resgatou "${reward.name}" com sucesso.`,
      })
    }
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">
          Programa de Fidelidade
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-2">
          Acumule pontos e troque por recompensas incríveis!
        </p>
      </div>

      <Card className="mb-8 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Seu Saldo de Pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <Star className="h-12 w-12 text-yellow-500" />
            <p className="text-5xl font-bold">{points}</p>
          </div>
          <p className="text-muted-foreground mt-2">pontos</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Como Ganhar Pontos</CardTitle>
            <CardDescription>
              É fácil acumular pontos e ganhar recompensas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Faça uma Compra</h3>
                <p className="text-sm text-muted-foreground">
                  A cada R$ 1,00 gasto em nossa loja, você ganha{' '}
                  {settings.loyalty.pointsPerDollar} pontos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Suba de Nível</h3>
                <p className="text-sm text-muted-foreground">
                  Clientes fiéis ganham ainda mais! Alcance novos níveis e
                  multiplique seus pontos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recompensas Disponíveis</CardTitle>
            <CardDescription>
              Troque seus pontos por descontos exclusivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.loyalty.rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{reward.name}</h3>
                  <p className="text-sm text-primary font-bold">
                    {reward.pointsRequired} pontos
                  </p>
                </div>
                <Button
                  onClick={() => handleRedeem(reward)}
                  disabled={points < reward.pointsRequired}
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  Resgatar
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoyaltyPage
