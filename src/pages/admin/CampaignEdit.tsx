import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { mockCampaigns } from '@/lib/mock-data'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const campaignSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  subject: z.string().min(5, 'O assunto deve ter pelo menos 5 caracteres.'),
  targetSegment: z.enum(['all', 'new', 'frequent']),
  content: z.string().min(20, 'O conteúdo deve ter pelo menos 20 caracteres.'),
})

const AdminCampaignEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)
  const campaign = isEditing ? mockCampaigns.find((c) => c.id === id) : null

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign
      ? { ...campaign, content: 'Conteúdo do email aqui...' }
      : {
          name: '',
          subject: '',
          targetSegment: 'all',
          content: '',
        },
  })

  function onSubmit(values: z.infer<typeof campaignSchema>) {
    console.log(values)
    toast({
      title: `Campanha ${isEditing ? 'atualizada' : 'criada'}!`,
      description: `A campanha "${values.name}" foi salva como rascunho.`,
    })
    navigate('/admin/marketing')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isEditing ? 'Editar Campanha' : 'Nova Campanha de Email'}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Campanha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Campanha</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Lançamento de Verão" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto do Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Novidades quentes para você!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetSegment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento de Clientes</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todos os Clientes</SelectItem>
                        <SelectItem value="new">Novos Clientes</SelectItem>
                        <SelectItem value="frequent">
                          Clientes Frequentes
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo do Email</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva o conteúdo do seu email aqui..."
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <div className="flex gap-4">
            <Button type="submit" className="btn-primary">
              Salvar Rascunho
            </Button>
            <Button type="button" variant="secondary">
              Enviar Campanha
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AdminCampaignEdit
