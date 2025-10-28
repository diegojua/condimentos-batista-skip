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
import { mockTickets } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { SupportTicket } from '@/types'

const getStatusVariant = (
  status: SupportTicket['status'],
): 'default' | 'secondary' | 'outline' => {
  switch (status) {
    case 'open':
      return 'default'
    case 'in-progress':
      return 'secondary'
    case 'closed':
      return 'outline'
  }
}

const getPriorityVariant = (
  priority: SupportTicket['priority'],
): 'default' | 'secondary' | 'destructive' => {
  switch (priority) {
    case 'low':
      return 'secondary'
    case 'medium':
      return 'default'
    case 'high':
      return 'destructive'
  }
}

const AdminSupport = () => {
  return (
    <Tabs defaultValue="tickets" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Suporte ao Cliente</h1>
        <TabsList>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="tickets">
        <Card>
          <CardHeader>
            <CardTitle>Tickets de Suporte</CardTitle>
            <CardDescription>
              Gerencie as solicitações de suporte dos seus clientes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>{ticket.customerName}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityVariant(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="live-chat">
        <Card>
          <CardHeader>
            <CardTitle>Conversas do Live Chat</CardTitle>
            <CardDescription>
              Visualize e responda às conversas em tempo real.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Nenhuma conversa ativa no momento.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AdminSupport
