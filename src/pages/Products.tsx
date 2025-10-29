import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '@/components/ProductCard'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAllProducts, getCategories } from '@/services/products'
import { Product, Category } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category'),
  )
  const [inStockOnly, setInStockOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ])
      setAllProducts(productsData)
      setCategories(categoriesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const filteredProducts = useMemo(() => {
    let products = allProducts

    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category))
    }
    if (inStockOnly) {
      products = products.filter((p) => p.stock > 0)
    }
    products = products.filter((p) => p.rating >= minRating)
    products = products.filter((p) => {
      const price = p.promotionalPrice ?? p.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    return products.sort((a, b) => {
      const priceA = a.promotionalPrice ?? a.price
      const priceB = b.promotionalPrice ?? b.price
      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB
        case 'price-desc':
          return priceB - priceA
        case 'rating':
          return b.rating - a.rating
        default: // 'popular'
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0)
      }
    })
  }, [
    allProducts,
    selectedCategories,
    inStockOnly,
    minRating,
    priceRange,
    sortBy,
  ])

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(newCategories)
    setSearchParams({ category: newCategories })
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setInStockOnly(false)
    setMinRating(0)
    setPriceRange([0, 100])
    setSearchParams({})
  }

  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <h3 className="text-xl font-bold">Filtros</h3>
            <div>
              <h4 className="font-semibold mb-2">Categorias</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => handleCategoryChange(cat.id)}
                    />
                    <Label htmlFor={cat.id}>{cat.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Preço</h4>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
              />
              <div className="flex justify-between text-sm mt-2">
                <span>R$ {priceRange[0]}</span>
                <span>R$ {priceRange[1]}</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Avaliação Mínima</h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setMinRating(rating === minRating ? 0 : rating)
                    }
                    className={cn(
                      'text-gray-300',
                      minRating >= rating && 'text-yellow-500',
                    )}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(!!checked)}
              />
              <Label htmlFor="in-stock">Apenas em estoque</Label>
            </div>
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Limpar Filtros
            </Button>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p>{filteredProducts.length} produtos encontrados</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Mais Populares</SelectItem>
                <SelectItem value="rating">Melhor Avaliados</SelectItem>
                <SelectItem value="price-asc">
                  Preço (Menor para Maior)
                </SelectItem>
                <SelectItem value="price-desc">
                  Preço (Maior para Menor)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-56 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  )
}

export default Products
