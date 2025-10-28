import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { Copy } from 'lucide-react'

export const PixDisplay = () => {
  const pixKey = '00020126580014br.gov.bcb.pix0136... (mock key)'

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey)
    toast({ title: 'Chave PIX copiada!' })
  }

  return (
    <div className="pt-4 text-center space-y-4">
      <p>Escaneie o QR Code para pagar com PIX:</p>
      <img
        src="https://img.usecurling.com/p/256/256?q=qr%20code"
        alt="QR Code PIX"
        className="mx-auto rounded-lg border p-2"
      />
      <p>Ou use a chave copia e cola:</p>
      <div className="flex items-center gap-2 p-2 border rounded-md bg-muted">
        <p className="text-sm text-muted-foreground truncate flex-grow text-left">
          {pixKey}
        </p>
        <Button type="button" size="icon" variant="ghost" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        O pagamento será confirmado automaticamente em alguns instantes.
      </p>
    </div>
  )
}
