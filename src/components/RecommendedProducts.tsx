import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductCard } from './ProductCard'
import { Product } from '@/types'

interface RecommendedProductsProps {
  title: string
  products: Product[]
}

export const RecommendedProducts = ({
  title,
  products,
}: RecommendedProductsProps) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
}
