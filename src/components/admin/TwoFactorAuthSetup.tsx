import { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/contexts/SettingsContext'
import { toast } from '@/hooks/use-toast'

interface TwoFactorAuthSetupProps {
  onSetupComplete: () => void
}

export const TwoFactorAuthSetup = ({
  onSetupComplete,
}: TwoFactorAuthSetupProps) => {
  const { settings, updateSettings } = useSettings()
  const [otp, setOtp] = useState('')

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/CondimentosBatista:admin@condimentos.com?secret=${settings.twoFactorAuth.secret}&issuer=CondimentosBatista`

  const handleConfirm = () => {
    // In a real app, you'd verify the OTP against the secret
    if (otp.length === 6) {
      updateSettings({ twoFactorAuth: { enabled: true } })
      toast({
        title: 'Autenticação de Dois Fatores Ativada!',
        description: 'Sua conta está mais segura.',
      })
      onSetupComplete()
    } else {
      toast({
        variant: 'destructive',
        title: 'Código Inválido',
        description: 'Por favor, insira um código de 6 dígitos.',
      })
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-lg font-medium">
        Configurar Autenticação de Dois Fatores
      </h3>
      <p className="text-sm text-muted-foreground text-center">
        Escaneie o QR Code com seu aplicativo de autenticação (Google
        Authenticator, Authy, etc).
      </p>
      <img src={qrCodeUrl} alt="QR Code for 2FA" className="rounded-lg" />
      <p className="text-sm text-muted-foreground text-center">
        Depois, insira o código de 6 dígitos gerado pelo aplicativo para
        confirmar.
      </p>
      <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button onClick={handleConfirm} className="w-full btn-primary">
        Confirmar e Ativar
      </Button>
    </div>
  )
}
