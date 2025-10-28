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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TwoFactorAuthSetup } from '@/components/admin/TwoFactorAuthSetup'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const AdminSettings = () => {
  const { settings, updateSettings } = useSettings()
  const [is2faDialogOpen, setIs2faDialogOpen] = useState(false)
  const form = useForm<Settings>({
    defaultValues: settings,
    values: settings,
  })

  const onSubmit = (data: Settings) => {
    updateSettings(data)
    toast({
      title: 'Configurações salvas!',
      description: 'Suas configurações foram atualizadas.',
    })
  }

  const handleRuleToggle = (ruleId: string, enabled: boolean) => {
    const updatedRules = settings.personalization.rules.map((rule) =>
      rule.id === ruleId ? { ...rule, enabled } : rule,
    )
    updateSettings({ personalization: { rules: updatedRules } })
  }

  const handleDisable2FA = () => {
    updateSettings({
      twoFactorAuth: { ...settings.twoFactorAuth, enabled: false },
    })
    toast({
      variant: 'destructive',
      title: 'Autenticação de Dois Fatores Desativada',
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Autenticação de Dois Fatores (2FA)
                  </FormLabel>
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
              <CardTitle>Motor de Personalização</CardTitle>
              <CardDescriptionComponent>
                Ative ou desative regras de personalização em tempo real.
              </CardDescriptionComponent>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.personalization.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex flex-row items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-0.5">
                    <Label className="text-base">{rule.name}</Label>
                    <p className="text-sm text-muted-foreground">
                      {rule.type === 'timeOfDay'
                        ? 'Baseado na hora do dia'
                        : 'Baseado na localização'}
                    </p>
                  </div>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) =>
                      handleRuleToggle(rule.id, checked)
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações de Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="recommendationAlgorithm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Algoritmo de Recomendação</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o algoritmo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="related">
                          Produtos Relacionados
                        </SelectItem>
                        <SelectItem value="bought-together">
                          Comprados Juntos com Frequência
                        </SelectItem>
                        <SelectItem value="viewed-also-viewed">
                          Clientes Também Viram
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Escolha como as recomendações são geradas.
                    </FormDescription>
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
