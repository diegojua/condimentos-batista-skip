import { FileText } from 'lucide-react'

export const BoletoDisplay = () => {
  return (
    <div className="pt-4 text-center space-y-4 p-6 bg-muted rounded-lg">
      <FileText className="h-12 w-12 mx-auto text-primary" />
      <h3 className="font-semibold">Pagamento com Boleto</h3>
      <p className="text-sm text-muted-foreground">
        O boleto bancário será gerado e enviado para o seu e-mail após a
        finalização do pedido.
      </p>
      <p className="text-xs text-muted-foreground">
        O prazo de compensação do boleto é de até 3 dias úteis.
      </p>
    </div>
  )
}
