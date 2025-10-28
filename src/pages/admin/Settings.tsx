import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useSettings, Settings } from '@/contexts/SettingsContext'
import { toast } from '@/hooks/use-toast'

const AdminSettings = () => {
  const { settings, updateSettings } = useSettings()
  const form = useForm<Settings>({
    defaultValues: settings,
  })

  const onSubmit = (data: Settings) => {
    updateSettings(data)
    toast({
      title: 'Configurações salvas!',
      description: 'Suas configurações de pagamento foram atualizadas.',
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações de Pagamento</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cartão de Crédito (Stripe)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="creditCard.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativar</FormLabel>
                      <FormDescription>
                        Permitir pagamentos com cartão de crédito.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creditCard.apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stripe API Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="pk_test_..."
                        {...field}
                        disabled={!form.watch('creditCard.enabled')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PIX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pix.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativar</FormLabel>
                      <FormDescription>
                        Permitir pagamentos via PIX.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pix.apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave PIX</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sua chave PIX"
                        {...field}
                        disabled={!form.watch('pix.enabled')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Boleto Bancário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="boleto.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativar</FormLabel>
                      <FormDescription>
                        Permitir pagamentos via Boleto.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="boleto.apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chave de Integração do Boleto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sua chave de integração"
                        {...field}
                        disabled={!form.watch('boleto.enabled')}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="btn-primary">
            Salvar Alterações
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AdminSettings
