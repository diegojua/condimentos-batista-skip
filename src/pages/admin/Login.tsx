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
import { useNavigate, Link } from 'react-router-dom'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

const AdminLogin = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    // Mock login logic
    if (
      values.email === 'admin@condimentos.com' &&
      values.password === 'admin123'
    ) {
      navigate('/admin/dashboard')
    } else {
      form.setError('root', { message: 'Email ou senha inválidos.' })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Área Administrativa</CardTitle>
          <CardDescription>Faça login para gerenciar a loja.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <Button type="submit" className="w-full btn-primary">
                Entrar
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link to="#" className="underline">
              Esqueceu a senha?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin
