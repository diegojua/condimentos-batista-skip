import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import {
  DollarSign,
  ShoppingCart,
  Activity,
  Users,
  TrendingUp,
  UserX,
  PartyPopper,
  CheckCircle,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { DateRangePicker } from '@/components/admin/DateRangePicker'
import { mockPredictiveData } from '@/lib/mock-data'
import { StatCard } from '@/components/admin/StatCard'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/hooks/use-toast'

const salesData = [
  { month: 'Jan', Vendas: 4250 },
  { month: 'Fev', Vendas: 3800 },
  { month: 'Mar', Vendas: 6100 },
  { month: 'Abr', Vendas: 5500 },
  { month: 'Mai', Vendas: 7200 },
  { month: 'Jun', Vendas: 6800 },
  { month: 'Jul', Vendas: 8100, Previsão: 8100 },
  { month: 'Ago', Previsão: 8500 },
  { month: 'Set', Previsão: 9200 },
  { month: 'Out', Previsão: 8800 },
]

const AdminDashboard = () => {
  const [showConclusion, setShowConclusion] = useState(true)
  const { toast } = useToast()

  const conclusionDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const features = [
    'Programa de Fidelidade Avançado',
    'Expansão para Novos Canais de Venda (Pedidos via WhatsApp)',
    'Ferramentas de Análise Preditiva (Dashboard)',
    'Personalização em Tempo Real (Banners Dinâmicos)',
    'Integração com Marketplaces',
    'Melhorias na Experiência do Usuário (UX)',
    'Ferramentas de Marketing Avançadas (Email e Afiliados)',
    'Otimização de Performance',
  ]

  const handleAcknowledge = () => {
    setShowConclusion(false)
    toast({
      title: 'Projeto Formalmente Concluído!',
      description: 'Obrigado por confirmar a entrega. O projeto foi arquivado.',
    })
  }

  return (
    <div className="flex-1 space-y-6">
      {showConclusion && (
        <Card className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <PartyPopper className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <CardTitle className="text-green-800 dark:text-green-200">
                Projeto Concluído!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                A implementação do projeto Condimentos Batista foi finalizada
                com sucesso em {conclusionDate}.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-4 text-green-800 dark:text-green-200">
              Todas as funcionalidades acordadas foram entregues, incluindo:
            </p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-green-700 dark:text-green-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleAcknowledge}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Confirmar Entrega e Arquivar Projeto
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DateRangePicker />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vendas Totais"
          value="R$ 45.231,89"
          description="+20.1% do último mês"
          Icon={DollarSign}
        />
        <StatCard
          title="Pedidos"
          value="+2350"
          description="+180.1% do último mês"
          Icon={ShoppingCart}
        />
        <StatCard
          title="Taxa de Conversão"
          value="3.45%"
          description="+2.5% do último mês"
          Icon={Activity}
        />
        <StatCard
          title="Novos Clientes"
          value="+573"
          description="+20 desde a última hora"
          Icon={Users}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Vendas e Previsões</CardTitle>
              <CardDescription>
                Receita dos últimos meses e previsão para os próximos.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value / 1000}k`}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Vendas"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Previsão"
                    stroke="hsl(var(--primary))"
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Insights Preditivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <UserX className="h-6 w-6 mr-4 text-destructive" />
              <div>
                <p className="font-semibold">Risco de Churn</p>
                <p className="text-sm text-muted-foreground">
                  {mockPredictiveData.churnRisk.high}% dos clientes em alto
                  risco.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-4 text-success" />
              <div>
                <p className="font-semibold">Próximo Mês</p>
                <p className="text-sm text-muted-foreground">
                  Previsão de vendas de R${' '}
                  {mockPredictiveData.salesForecast[0].predicted.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recomendações de Estoque</CardTitle>
          <CardDescription>
            Otimizações proativas baseadas em previsões de demanda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Recomendação</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPredictiveData.stockRecommendations.map((rec) => (
                <TableRow key={rec.productId}>
                  <TableCell className="font-medium">
                    {rec.productName}
                  </TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    {rec.recommendation}
                  </TableCell>
                  <TableCell>{rec.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard
