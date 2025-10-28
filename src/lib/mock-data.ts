import { Product, Category, Review, Order, Customer, Promotion } from '@/types'

export const mockCategories: Category[] = [
  {
    id: 'pimentas',
    name: 'Pimentas',
    image: 'https://img.usecurling.com/p/400/400?q=chili%20peppers',
  },
  {
    id: 'temperos-secos',
    name: 'Temperos Secos',
    image: 'https://img.usecurling.com/p/400/400?q=dried%20herbs',
  },
  {
    id: 'molhos-especiais',
    name: 'Molhos Especiais',
    image: 'https://img.usecurling.com/p/400/400?q=specialty%20sauce',
  },
  {
    id: 'especiarias',
    name: 'Especiarias',
    image: 'https://img.usecurling.com/p/400/400?q=spices',
  },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pimenta Calabresa em Flocos',
    description:
      'Ideal para dar um toque picante em pizzas, massas e carnes. Sabor intenso e aroma marcante.',
    price: 12.5,
    images: [
      'https://img.usecurling.com/p/600/600?q=calabrian%20chili%20flakes',
      'https://img.usecurling.com/p/600/600?q=spicy%20chili%20flakes',
    ],
    category: 'pimentas',
    stock: 50,
    rating: 4.8,
    reviewCount: 125,
  },
  {
    id: '2',
    name: 'Orégano Desidratado',
    description:
      'Um clássico da culinária mediterrânea, perfeito para molhos, saladas e pratos à base de tomate.',
    price: 8.9,
    promotionalPrice: 7.5,
    images: [
      'https://img.usecurling.com/p/600/600?q=dried%20oregano',
      'https://img.usecurling.com/p/600/600?q=oregano%20spice',
    ],
    category: 'temperos-secos',
    stock: 100,
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: '3',
    name: 'Molho Barbecue Artesanal',
    description:
      'Nosso molho barbecue exclusivo, com um toque defumado e adocicado. Perfeito para churrascos.',
    price: 22.0,
    images: [
      'https://img.usecurling.com/p/600/600?q=artisanal%20barbecue%20sauce',
      'https://img.usecurling.com/p/600/600?q=bbq%20sauce%20bottle',
    ],
    category: 'molhos-especiais',
    stock: 30,
    rating: 5.0,
    reviewCount: 88,
  },
  {
    id: '4',
    name: 'Cúrcuma em Pó (Açafrão-da-terra)',
    description:
      'Especiaria de cor vibrante e sabor terroso, conhecida por suas propriedades anti-inflamatórias.',
    price: 15.75,
    images: [
      'https://img.usecurling.com/p/600/600?q=turmeric%20powder',
      'https://img.usecurling.com/p/600/600?q=turmeric%20spice%20bowl',
    ],
    category: 'especiarias',
    stock: 80,
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: '5',
    name: 'Páprica Doce Defumada',
    description:
      'Pó de pimentão seco e moído com um delicioso aroma defumado. Essencial para pratos espanhóis e húngaros.',
    price: 14.0,
    images: [
      'https://img.usecurling.com/p/600/600?q=smoked%20sweet%20paprika',
      'https://img.usecurling.com/p/600/600?q=paprika%20powder',
    ],
    category: 'especiarias',
    stock: 65,
    rating: 4.9,
    reviewCount: 150,
  },
  {
    id: '6',
    name: 'Mix de Ervas Finas',
    description:
      'Uma combinação equilibrada de salsa, cebolinha, estragão e cerefólio para realçar qualquer prato.',
    price: 18.5,
    images: [
      'https://img.usecurling.com/p/600/600?q=fine%20herbs%20mix',
      'https://img.usecurling.com/p/600/600?q=dried%20herb%20blend',
    ],
    category: 'temperos-secos',
    stock: 0,
    rating: 4.8,
    reviewCount: 77,
  },
  {
    id: '7',
    name: 'Geleia de Pimenta Agridoce',
    description:
      'Perfeita para acompanhar queijos, torradas e carnes assadas. Um equilíbrio perfeito entre doce e picante.',
    price: 25.0,
    images: [
      'https://img.usecurling.com/p/600/600?q=sweet%20chili%20jelly',
      'https://img.usecurling.com/p/600/600?q=pepper%20jelly%20jar',
    ],
    category: 'molhos-especiais',
    stock: 25,
    rating: 5.0,
    reviewCount: 102,
  },
  {
    id: '8',
    name: 'Pimenta do Reino Preta Moída',
    description:
      'A especiaria mais popular do mundo, moída na hora para garantir o máximo de frescor e sabor.',
    price: 11.2,
    images: [
      'https://img.usecurling.com/p/600/600?q=ground%20black%20pepper',
      'https://img.usecurling.com/p/600/600?q=black%20peppercorns',
    ],
    category: 'pimentas',
    stock: 120,
    rating: 4.9,
    reviewCount: 340,
  },
]

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    author: 'João Silva',
    date: '2024-07-15',
    rating: 5,
    comment:
      'Pimenta de excelente qualidade, muito saborosa e picante na medida certa. Recomendo!',
  },
  {
    id: 'r2',
    productId: '1',
    author: 'Maria Oliveira',
    date: '2024-07-10',
    rating: 4,
    comment:
      'Gostei bastante, mas achei que poderia ser um pouco mais forte. Mesmo assim, é um ótimo produto.',
  },
  {
    id: 'r3',
    productId: '3',
    author: 'Carlos Pereira',
    date: '2024-07-20',
    rating: 5,
    comment:
      'O melhor molho barbecue que já provei! Sabor autêntico e defumado. Comprarei sempre.',
  },
]

export const mockOrders: Order[] = [
  {
    id: '#3102',
    customerName: 'Ana Costa',
    date: '2024-07-28',
    total: 150.75,
    status: 'Entregue',
  },
  {
    id: '#3101',
    customerName: 'Bruno Lima',
    date: '2024-07-28',
    total: 88.0,
    status: 'Enviado',
  },
  {
    id: '#3100',
    customerName: 'Carla Dias',
    date: '2024-07-27',
    total: 210.5,
    status: 'Processando',
  },
  {
    id: '#3099',
    customerName: 'Daniel Faria',
    date: '2024-07-26',
    total: 45.9,
    status: 'Pendente',
  },
  {
    id: '#3098',
    customerName: 'Elisa Gomes',
    date: '2024-07-25',
    total: 320.0,
    status: 'Cancelado',
  },
]

export const mockCustomers: Customer[] = [
  {
    id: 'CUST01',
    name: 'Ana Costa',
    email: 'ana@example.com',
    phone: '(11) 98765-4321',
    totalOrders: 5,
    totalSpent: 850.5,
  },
  {
    id: 'CUST02',
    name: 'Bruno Lima',
    email: 'bruno@example.com',
    phone: '(21) 91234-5678',
    totalOrders: 3,
    totalSpent: 430.0,
  },
  {
    id: 'CUST03',
    name: 'Carla Dias',
    email: 'carla@example.com',
    phone: '(31) 99999-8888',
    totalOrders: 8,
    totalSpent: 1250.75,
  },
  {
    id: 'CUST04',
    name: 'Daniel Faria',
    email: 'daniel@example.com',
    phone: '(41) 98888-7777',
    totalOrders: 2,
    totalSpent: 150.2,
  },
]

export const mockPromotions: Promotion[] = [
  {
    id: 'PROMO01',
    name: '10% OFF em Pimentas',
    description: 'Desconto de 10% em todos os produtos da categoria Pimentas.',
    type: 'percentage',
    value: 10,
    scope: 'category',
    applicableIds: ['pimentas'],
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true,
  },
  {
    id: 'PROMO02',
    name: 'R$ 5 de Desconto no Barbecue',
    description: 'Desconto de R$ 5,00 no Molho Barbecue Artesanal.',
    type: 'fixed',
    value: 5,
    scope: 'product',
    applicableIds: ['3'],
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    isActive: true,
  },
  {
    id: 'PROMO03',
    name: 'Promoção de Inverno',
    description: 'Descontos de inverno em produtos selecionados.',
    type: 'percentage',
    value: 15,
    scope: 'product',
    applicableIds: ['4', '5'],
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    isActive: false,
  },
]
