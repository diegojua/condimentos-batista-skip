import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface CreditCardFormProps {
  form: UseFormReturn<any>
}

export const CreditCardForm = ({ form }: CreditCardFormProps) => {
  return (
    <div className="space-y-4 pt-4">
      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número do Cartão</FormLabel>
            <FormControl>
              <Input placeholder="0000 0000 0000 0000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cardName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome no Cartão</FormLabel>
            <FormControl>
              <Input placeholder="Nome como impresso no cartão" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cardExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validade (MM/AA)</FormLabel>
              <FormControl>
                <Input placeholder="MM/AA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardCvc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVC</FormLabel>
              <FormControl>
                <Input placeholder="123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
