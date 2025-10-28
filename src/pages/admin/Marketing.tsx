import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockCampaigns, mockAffiliates } from '@/lib/mock-data'
import { PlusCircle, BadgePercent, Users, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/admin/StatCard'

const Marketing = () => {
  return (
    <Tabs defaultValue="campaigns" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketing</h1>
        <TabsList>
          <TabsTrigger value="campaigns">Campanhas de Email</TabsTrigger>
          <TabsTrigger value="affiliates">Programa de Afiliados</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="campaigns">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Gerencie suas campanhas de email marketing.</p>
            <Button asChild>
              <Link to="/admin/campaigns/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Campanha
              </Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Campanhas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Taxa de Abertura</TableHead>
                    <TableHead>Taxa de Clique</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        {campaign.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === 'sent' ? 'default' : 'outline'
                          }
                        >
                          {campaign.status === 'sent' ? 'Enviada' : 'Rascunho'}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.openRate.toFixed(1)}%</TableCell>
                      <TableCell>{campaign.clickRate.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="affiliates">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total de Afiliados"
              value="12"
              description="+2 este mês"
              Icon={Users}
            />
            <StatCard
              title="Total de Ganhos"
              value="R$ 2.230,60"
              description="Ganhos totais dos afiliados"
              Icon={DollarSign}
            />
            <StatCard
              title="Comissão Média"
              value="11.5%"
              description="Taxa de comissão média"
              Icon={BadgePercent}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Comissão</TableHead>
                    <TableHead>Referências</TableHead>
                    <TableHead className="text-right">Ganhos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-medium">
                        {affiliate.name}
                      </TableCell>
                      <TableCell>{affiliate.commissionRate}%</TableCell>
                      <TableCell>{affiliate.totalReferrals}</TableCell>
                      <TableCell className="text-right">
                        R$ {affiliate.totalEarnings.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Marketing
