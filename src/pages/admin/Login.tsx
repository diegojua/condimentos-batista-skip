import { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import { useSettings } from '@/contexts/SettingsContext'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória.'),
})

const AdminLogin = () => {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [loginStep, setLoginStep] = useState<'credentials' | '2fa'>(
    'credentials',
  )
  const [otp, setOtp] = useState('')

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  function onCredentialSubmit(values: z.infer<typeof loginSchema>) {
    if (values.email !== 'admin@condimentos.com') {
      form.setError('email', {
        message: 'Usuário não encontrado. Por favor, verifique seu e-mail.',
      })
      return
    }
    if (values.password !== 'admin123') {
      form.setError('password', {
        message: 'Senha incorreta. Por favor, tente novamente.',
      })
      return
    }

    if (settings.twoFactorAuth.enabled) {
      setLoginStep('2fa')
    } else {
      navigate('/admin/dashboard')
    }
  }

  function onOtpSubmit() {
    // Mock OTP validation
    if (otp.length === 6) {
      navigate('/admin/dashboard')
    } else {
      // You can add a more specific error message here
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Área Administrativa</CardTitle>
          <CardDescription>
            {loginStep === 'credentials'
              ? 'Faça login para gerenciar a loja.'
              : 'Insira o código de autenticação.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginStep === 'credentials' ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onCredentialSubmit)}
                className="space-y-4"
              >
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
                <div className="text-right">
                  <Button asChild variant="link" className="px-0 h-auto">
                    <Link to="/admin/forgot-password">Esqueci minha senha</Link>
                  </Button>
                </div>
                <Button type="submit" className="w-full btn-primary">
                  Entrar
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6 flex flex-col items-center">
              <FormLabel>Código de Verificação</FormLabel>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button onClick={onOtpSubmit} className="w-full btn-primary">
                Verificar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminLogin
