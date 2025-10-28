import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { DateRangePicker } from '@/components/admin/DateRangePicker'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockOrders } from '@/lib/mock-data'

const salesData = [
  { month: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Fev', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Abr', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mai', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
]

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Vendas Totais',
      value: 'R$ 45.231,89',
      icon: DollarSign,
      description: '+20.1% do último mês',
    },
    {
      title: 'Pedidos',
      value: '+2350',
      icon: ShoppingCart,
      description: '+180.1% do último mês',
    },
    {
      title: 'Produtos',
      value: '128',
      icon: Package,
      description: 'Total de produtos na loja',
    },
    {
      title: 'Novos Clientes',
      value: '+573',
      icon: Users,
      description: '+20 desde a última hora',
    },
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <DateRangePicker />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral de Vendas</CardTitle>
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
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
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
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>
              Você teve {mockOrders.length} pedidos recentes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?seed=${order.customerName}`}
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {order.customerName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Pedido {order.id}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +R$ {order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
