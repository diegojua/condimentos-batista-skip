import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Activity,
  Download,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { DateRangePicker } from '@/components/admin/DateRangePicker'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockOrders, mockProducts } from '@/lib/mock-data'
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

const salesData = [
  { month: 'Jan', total: 4250 },
  { month: 'Fev', total: 3800 },
  { month: 'Mar', total: 6100 },
  { month: 'Abr', total: 5500 },
  { month: 'Mai', total: 7200 },
  { month: 'Jun', total: 6800 },
  { month: 'Jul', total: 8100 },
]

const AdminDashboard = () => {
  return (
    <div className="flex-1 space-y-6">
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
              <CardTitle>Visão Geral de Vendas</CardTitle>
              <CardDescription>
                Receita total nos últimos 7 meses.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={salesData}>
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
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="total"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Os produtos mais populares da sua loja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Vendas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts
                  .slice(0, 5)
                  .sort((a, b) => b.reviewCount - a.reviewCount)
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.reviewCount * 5 + 20}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
