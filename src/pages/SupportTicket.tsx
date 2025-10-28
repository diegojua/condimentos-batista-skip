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
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ticketSchema = z.object({
  name: z.string().min(2, 'Nome inválido'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'O assunto deve ter pelo menos 5 caracteres.'),
  department: z.enum(['sales', 'support', 'billing']),
  message: z.string().min(20, 'A mensagem deve ter pelo menos 20 caracteres.'),
})

const SupportTicket = () => {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { department: 'support' },
  })

  function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values)
    toast({
      title: 'Ticket Enviado com Sucesso!',
      description:
        'Seu ticket foi recebido. Nossa equipe responderá o mais breve possível.',
    })
    form.reset({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Abrir um Ticket</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-2">
            Para questões não urgentes, preencha o formulário abaixo.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="support">Suporte Técnico</SelectItem>
                      <SelectItem value="sales">Vendas</SelectItem>
                      <SelectItem value="billing">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full btn-primary">
              Enviar Ticket
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SupportTicket
