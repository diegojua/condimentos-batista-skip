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
import { MapPin, Phone, Mail } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome inválido'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
})

const Contact = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  })

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log(values)
    toast({
      title: 'Mensagem Enviada!',
      description: 'Obrigado por entrar em contato. Responderemos em breve.',
    })
    form.reset({ name: '', email: '', message: '' })
  }

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Entre em Contato</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-2">
          Tem alguma dúvida ou sugestão? Adoraríamos ouvir você!
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="h-8 w-8 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Nosso Endereço</h3>
              <p className="text-muted-foreground">
                Rua dos Sabores, 123, São Paulo - SP
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-8 w-8 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Telefone</h3>
              <p className="text-muted-foreground">(11) 99999-8888</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-8 w-8 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">
                contato@condimentosbatista.com
              </p>
            </div>
          </div>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full btn-primary">
                Enviar Mensagem
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact
