import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { ProductCard } from '@/components/ProductCard'
import { mockProducts, mockCategories } from '@/lib/mock-data'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { cn } from '@/lib/utils'

const AnimatedSection = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    triggerOnce: true,
  })
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className,
      )}
    >
      {children}
    </div>
  )
}

const Index = () => {
  const heroSlides = [
    {
      title: 'Sabores que Inspiram',
      description:
        'Descubra nossa seleção de condimentos artesanais e transforme suas receitas.',
      image: 'https://img.usecurling.com/p/1920/800?q=spices%20market',
      buttonText: 'Ver Produtos',
      link: '/produtos',
    },
    {
      title: 'Promoção de Pimentas',
      description:
        'As melhores pimentas do mundo com até 20% de desconto. Aproveite!',
      image:
        'https://img.usecurling.com/p/1920/800?q=chili%20peppers%20collection',
      buttonText: 'Comprar Agora',
      link: '/produtos?category=pimentas',
    },
  ]

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
          className="w-full h-full"
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4 animate-fade-in-up">
                      <h1 className="text-4xl md:text-6xl font-display font-bold">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                        {slide.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="mt-8 btn-primary text-lg px-8 py-6"
                      >
                        <Link to={slide.link}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </section>

      <AnimatedSection>
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nossos Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            Categorias Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                to={`/produtos?category=${category.id}`}
                key={category.id}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="bg-secondary py-16">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Sobre a Condimentos Batista
              </h2>
              <p className="text-muted-foreground mb-6">
                Nascemos da paixão por sabores autênticos e ingredientes de alta
                qualidade. Nossa missão é levar até a sua cozinha os melhores
                condimentos, selecionados com cuidado para transformar cada
                prato em uma experiência inesquecível.
              </p>
              <Button asChild className="btn-secondary">
                <Link to="/sobre">Saiba Mais</Link>
              </Button>
            </div>
            <div>
              <img
                src="https://img.usecurling.com/p/600/400?q=fresh%20herbs%20and%20spices"
                alt="Ingredientes frescos"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Explore Nosso Catálogo Completo
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Encontre o tempero perfeito para cada ocasião.
          </p>
          <Button asChild size="lg" className="btn-primary text-lg px-8 py-6">
            <Link to="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </section>
      </AnimatedSection>
    </div>
  )
}

export default Index
