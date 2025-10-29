import { useEffect } from 'react'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/hooks/use-toast'
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from '@/services/categories'

const categorySchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  image: z.string().url('URL da imagem inválida.').optional().or(z.literal('')),
})

const AdminCategoryEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      image: '',
    },
  })

  useEffect(() => {
    if (isEditing && id) {
      const fetchCategory = async () => {
        const category = await getCategoryById(id)
        if (category) {
          form.reset(category)
        } else {
          toast({
            variant: 'destructive',
            title: 'Categoria não encontrada',
          })
          navigate('/admin/categories')
        }
      }
      fetchCategory()
    }
  }, [id, isEditing, form, navigate])

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    try {
      if (isEditing && id) {
        await updateCategory(id, values)
      } else {
        await createCategory(values)
      }
      toast({
        title: `Categoria ${isEditing ? 'atualizada' : 'criada'}!`,
        description: `A categoria "${values.name}" foi salva com sucesso.`,
      })
      navigate('/admin/categories')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a categoria.',
      })
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pimentas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://exemplo.com/imagem.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Button
            type="submit"
            className="btn-primary"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Categoria'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AdminCategoryEdit
