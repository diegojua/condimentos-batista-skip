import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'

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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">{/* Chart placeholder */}</CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Você fez 265 vendas este mês.</CardDescription>
          </CardHeader>
          <CardContent>{/* Recent sales placeholder */}</CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
