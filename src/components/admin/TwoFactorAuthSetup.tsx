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

  // Proteção contra settings undefined: use optional chaining e fallback.
  const secret = settings?.twoFactorAuth?.secret ?? ''
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/CondimentosBatista:admin@condimentos.com?secret=${secret}&issuer=CondimentosBatista`

  const handleConfirm = () => {
    // Em uma app real: verificar OTP contra o secret (backend ou lib TOTP).
    if (otp.length === 6) {
      // lógica de confirmação...
      toast({ title: 'OTP verificado (simulado).' })
      onSetupComplete?.()
    } else {
      toast({ variant: 'destructive', title: 'OTP inválido.' })
    }
  }

  return (
    <div>
      {secret ? (
        <>
          <img src={qrCodeUrl} alt="QR Code 2FA" />
          <div className="mt-4">
            <InputOTPGroup value={otp} onChange={(v) => setOtp(v)}>
              <InputOTPSlot />
            </InputOTPGroup>
          </div>
          <div className="mt-4">
            <Button onClick={handleConfirm}>Confirmar</Button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            Gerando segredo 2FA... por favor aguarde.
          </p>
        </div>
      )}
    </div>
  )
}