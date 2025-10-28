import { useFieldArray, Control } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProductVariationsFormProps {
  control: Control<any>
}

export const ProductVariationsForm = ({
  control,
}: ProductVariationsFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variations',
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variações do Produto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-3">
            <div className="flex justify-between items-center">
              <Label>Variação {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            {/* This is a simplified version. A real implementation would handle multiple options per variation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                {...control.register(`variations.${index}.name`)}
                placeholder="Nome (Ex: Tamanho)"
              />
              <Input
                {...control.register(`variations.${index}.option`)}
                placeholder="Opção (Ex: P)"
              />
              <Input
                {...control.register(`variations.${index}.priceModifier`)}
                type="number"
                placeholder="Modificador de Preço"
              />
              <Input
                {...control.register(`variations.${index}.stock`)}
                type="number"
                placeholder="Estoque"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              name: '',
              option: '',
              priceModifier: 0,
              stock: 0,
            })
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Variação
        </Button>
      </CardContent>
    </Card>
  )
}
