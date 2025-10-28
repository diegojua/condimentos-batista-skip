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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription as CardDescriptionComponent,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useSettings, Settings } from '@/contexts/SettingsContext'
import { toast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TwoFactorAuthSetup } from '@/components/admin/TwoFactorAuthSetup'
import { useState } from 'react'

const AdminSettings = () => {
  const { settings, updateSettings } = useSettings()
  const [is2faDialogOpen, setIs2faDialogOpen] = useState(false)
  const form = useForm<Settings>({
    defaultValues: settings,
  })

  const onSubmit = (data: Settings) => {
    // We don't update 2FA enabled status directly from form submission
    const settingsToUpdate = { ...data }
    settingsToUpdate.twoFactorAuth.enabled = settings.twoFactorAuth.enabled
    updateSettings(settingsToUpdate)
    toast({
      title: 'Configurações salvas!',
      description: 'Suas configurações de pagamento foram atualizadas.',
    })
  }

  const handleDisable2FA = () => {
    // In a real app, this would require password confirmation
    updateSettings({ twoFactorAuth: { enabled: false } })
    toast({
      variant: 'destructive',
      title: 'Autenticação de Dois Fatores Desativada',
    })
  }

  const getIntegrationStatus = (apiKey: string) => {
    if (apiKey && apiKey.length > 10) {
      return (
        <Badge variant="default" className="bg-success">
          Ativo
        </Badge>
      )
    }
    return <Badge variant="destructive">Erro de Configuração</Badge>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescriptionComponent>
                Gerencie as configurações de segurança da sua conta.
              </CardDescriptionComponent>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Autenticação de Dois Fatores (2FA)
                  </FormLabel>
                  <FormDescription>
                    Adicione uma camada extra de segurança à sua conta.
                  </FormDescription>
                </div>
                {settings.twoFactorAuth.enabled ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDisable2FA}
                  >
                    Desativar
                  </Button>
                ) : (
                  <Dialog
                    open={is2faDialogOpen}
                    onOpenChange={setIs2faDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline">
                        Ativar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <TwoFactorAuthSetup
                        onSetupComplete={() => setIs2faDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Cartão de Crédito (Stripe)</CardTitle>
                  <CardDescriptionComponent>
                    API Key: {settings.creditCard.apiKey}
                  </CardDescriptionComponent>
                </div>
                {getIntegrationStatus(settings.creditCard.apiKey)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="creditCard.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativar</FormLabel>
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>PIX</CardTitle>
                  <CardDescriptionComponent>
                    Chave: {settings.pix.apiKey}
                  </CardDescriptionComponent>
                </div>
                {getIntegrationStatus(settings.pix.apiKey)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pix.enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Ativar</FormLabel>
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

          <Button type="submit" className="btn-primary">
            Salvar Alterações de Pagamento
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AdminSettings
