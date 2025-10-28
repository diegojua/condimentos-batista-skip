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
import { Ticket, Star, Award, CheckCircle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const LoyaltyPage = () => {
  const { points, tier, tierProgress, badges, redeemPoints } = useLoyalty()
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

  const currentTierInfo =
    settings.loyalty.tiers[
      tier.toLowerCase() as keyof typeof settings.loyalty.tiers
    ]
  const nextTierName =
    tier === 'Gold' ? 'Gold' : tier === 'Silver' ? 'Gold' : 'Silver'
  const nextTierInfo =
    settings.loyalty.tiers[
      nextTierName.toLowerCase() as keyof typeof settings.loyalty.tiers
    ]

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">
          Programa de Fidelidade
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-2">
          Sua lealdade, nossa recompensa.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Seu Progresso</CardTitle>
              <CardDescription>Você é um cliente {tier}!</CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                <p className="text-4xl font-bold">{points}</p>
              </div>
              <p className="text-muted-foreground">pontos</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={tierProgress} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {currentTierInfo.name} ({currentTierInfo.points} pts)
            </span>
            {tier !== 'Gold' && (
              <span>
                {nextTierInfo.name} ({nextTierInfo.points} pts)
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="rewards">Recompensas</TabsTrigger>
          <TabsTrigger value="tiers">Níveis</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
        </TabsList>
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Recompensas Disponíveis</CardTitle>
              <CardDescription>
                Troque seus pontos por descontos exclusivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {settings.loyalty.rewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
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
        </TabsContent>
        <TabsContent value="tiers">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(settings.loyalty.tiers).map((t) => (
              <Card
                key={t.name}
                className={cn(t.name === tier && 'border-primary border-2')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award /> {t.name}
                  </CardTitle>
                  <CardDescription>{t.points}+ pontos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Desafios e Conquistas</CardTitle>
              <CardDescription>
                Complete desafios para ganhar mais pontos e emblemas.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {settings.loyalty.challenges.map((challenge) => (
                <div key={challenge.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{challenge.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {challenge.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary">
                      +{challenge.points} pontos
                    </span>
                    {badges.includes(challenge.name) ? (
                      <Badge variant="default">Concluído</Badge>
                    ) : (
                      <Badge variant="outline">Pendente</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoyaltyPage
