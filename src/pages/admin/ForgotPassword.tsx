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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

const AdminForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log('Password reset requested for:', values.email)
    // Simulate sending email
    toast({
      title: 'Link de recuperação enviado!',
      description:
        'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.',
    })
    setIsSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
          <CardDescription>
            Digite seu e-mail para receber um link de recuperação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Verifique sua caixa de entrada e siga as instruções para criar
                uma nova senha.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/login">Voltar para o Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@condimentos.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full btn-primary">
                  Enviar Link de Recuperação
                </Button>
                <Button asChild variant="link" className="w-full">
                  <Link to="/admin/login">Lembrou a senha?</Link>
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminForgotPassword
