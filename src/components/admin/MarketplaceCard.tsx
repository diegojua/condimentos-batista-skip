import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Marketplace } from '@/types'
import { cn } from '@/lib/utils'

interface MarketplaceCardProps {
  marketplace: Marketplace
  onToggleConnection: (id: Marketplace['id'], status: boolean) => void
  onSyncChange: (
    id: Marketplace['id'],
    syncType: keyof Marketplace['sync'],
    value: boolean,
  ) => void
}

export const MarketplaceCard = ({
  marketplace,
  onToggleConnection,
  onSyncChange,
}: MarketplaceCardProps) => {
  const isConnected = marketplace.status === 'connected'

  const getStatusVariant = () => {
    switch (marketplace.status) {
      case 'connected':
        return 'default'
      case 'disconnected':
        return 'outline'
      case 'error':
        return 'destructive'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={marketplace.logo}
              alt={marketplace.name}
              className="h-10 w-10 object-contain"
            />
            <div>
              <CardTitle>{marketplace.name}</CardTitle>
              <CardDescription>{marketplace.description}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusVariant()} className="capitalize">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="font-semibold">Configurações de Sincronização</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor={`sync-products-${marketplace.id}`}>
              Sincronizar Produtos
            </Label>
            <Switch
              id={`sync-products-${marketplace.id}`}
              checked={marketplace.sync.products}
              onCheckedChange={(val) =>
                onSyncChange(marketplace.id, 'products', val)
              }
              disabled={!isConnected}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor={`sync-orders-${marketplace.id}`}>
              Importar Pedidos
            </Label>
            <Switch
              id={`sync-orders-${marketplace.id}`}
              checked={marketplace.sync.orders}
              onCheckedChange={(val) =>
                onSyncChange(marketplace.id, 'orders', val)
              }
              disabled={!isConnected}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor={`sync-inventory-${marketplace.id}`}>
              Sincronizar Estoque
            </Label>
            <Switch
              id={`sync-inventory-${marketplace.id}`}
              checked={marketplace.sync.inventory}
              onCheckedChange={(val) =>
                onSyncChange(marketplace.id, 'inventory', val)
              }
              disabled={!isConnected}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={cn(
            'w-full',
            isConnected ? 'bg-destructive hover:bg-destructive/90' : '',
          )}
          onClick={() => onToggleConnection(marketplace.id, !isConnected)}
        >
          {isConnected ? 'Desconectar' : 'Conectar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
