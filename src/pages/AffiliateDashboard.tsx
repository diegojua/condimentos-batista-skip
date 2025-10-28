import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, DollarSign, Users, MousePointerClick } from 'lucide-react'
import { StatCard } from '@/components/admin/StatCard'
import { toast } from '@/hooks/use-toast'

const AffiliateDashboard = () => {
  const referralLink = 'https://condimentosbatista.com/ref?code=GOURMET10'

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    toast({ title: 'Link de referência copiado!' })
  }

  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">
            Painel de Afiliado
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-2">
            Acompanhe seu desempenho e ganhos.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Seu Link de Referência</CardTitle>
            <CardDescription>
              Compartilhe este link para começar a ganhar comissões.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input value={referralLink} readOnly />
              <Button size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatCard
            title="Total de Ganhos"
            value="R$ 1.250,40"
            description="Ganhos totais acumulados"
            Icon={DollarSign}
          />
          <StatCard
            title="Referências"
            value="152"
            description="Total de clientes indicados"
            Icon={Users}
          />
          <StatCard
            title="Cliques"
            value="1.879"
            description="Cliques no seu link de referência"
            Icon={MousePointerClick}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Ganhos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              O histórico de ganhos e referências estará disponível aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AffiliateDashboard
