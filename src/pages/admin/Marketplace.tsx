import { useState } from 'react'
import { mockMarketplaces } from '@/lib/mock-data'
import { MarketplaceCard } from '@/components/admin/MarketplaceCard'
import { Marketplace } from '@/types'
import { toast } from '@/hooks/use-toast'

const AdminMarketplace = () => {
  const [marketplaces, setMarketplaces] =
    useState<Marketplace[]>(mockMarketplaces)

  const handleToggleConnection = (id: Marketplace['id'], connect: boolean) => {
    setMarketplaces((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: connect ? 'connected' : 'disconnected' }
          : m,
      ),
    )
    toast({
      title: `Marketplace ${connect ? 'Conectado' : 'Desconectado'}`,
      description: `A integração com ${id} foi ${connect ? 'ativada' : 'desativada'}.`,
    })
  }

  const handleSyncChange = (
    id: Marketplace['id'],
    syncType: keyof Marketplace['sync'],
    value: boolean,
  ) => {
    setMarketplaces((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, sync: { ...m.sync, [syncType]: value } } : m,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Integrações com Marketplaces</h1>
      <p className="text-muted-foreground">
        Conecte sua loja a marketplaces externos para expandir seu alcance.
      </p>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {marketplaces.map((marketplace) => (
          <MarketplaceCard
            key={marketplace.id}
            marketplace={marketplace}
            onToggleConnection={handleToggleConnection}
            onSyncChange={handleSyncChange}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminMarketplace
