import { useState, useEffect } from 'react'
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
import { toast } from '@/hooks/use-toast'
import {
  getConfigurations,
  updateConfiguration,
  Configuration,
} from '@/services/configurations'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

const AdminConfigurations = () => {
  const [configs, setConfigs] = useState<Configuration[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [currentValue, setCurrentValue] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const data = await getConfigurations()
        setConfigs(data)
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar configurações',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchConfigs()
  }, [])

  const handleEdit = (config: Configuration) => {
    setEditingId(config.id)
    setCurrentValue(config.valor || '')
  }

  const handleCancel = () => {
    setEditingId(null)
    setCurrentValue('')
  }

  const handleSave = async (id: number) => {
    try {
      const updatedConfig = await updateConfiguration(id, {
        valor: currentValue,
      })
      setConfigs(configs.map((c) => (c.id === id ? updatedConfig : c)))
      toast({ title: 'Configuração salva!' })
      handleCancel()
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro ao salvar' })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>
            Gerencie as configurações globais do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chave</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-20 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                : configs.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell className="font-mono">
                        {config.chave}
                      </TableCell>
                      <TableCell>
                        {editingId === config.id ? (
                          <Input
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                          />
                        ) : (
                          config.valor
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          config.updated_at || Date.now(),
                        ).toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingId === config.id ? (
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleSave(config.id)}
                            >
                              Salvar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                            >
                              Cancelar
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(config)}
                          >
                            Editar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminConfigurations
