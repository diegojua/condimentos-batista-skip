import {
  Product,
  Category,
  Review,
  Order,
  Customer,
  Promotion,
  EmailCampaign,
  Affiliate,
  Marketplace,
  SupportTicket,
  PredictiveData,
} from '@/types'

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
    type: 'simple',
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
    type: 'simple',
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
    type: 'variable',
    variations: [
      {
        id: 'v1',
        name: 'Tamanho',
        options: {
          '250ml': {
            sku: 'BBQ-250',
            priceModifier: 0,
            stock: 20,
          },
          '500ml': {
            sku: 'BBQ-500',
            priceModifier: 8,
            stock: 10,
          },
        },
      },
    ],
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
    type: 'simple',
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
]

export const mockOrders: Order[] = [
  {
    id: '#3102',
    customerName: 'Ana Costa',
    date: '2024-07-28',
    total: 150.75,
    status: 'Entregue',
    source: 'Website',
  },
  {
    id: '#3101',
    customerName: 'Bruno Lima',
    date: '2024-07-28',
    total: 88.0,
    status: 'Enviado',
    source: 'Website',
  },
  {
    id: 'AMZ-101',
    customerName: 'Carlos Souza',
    date: '2024-07-27',
    total: 22.0,
    status: 'Processando',
    source: 'Amazon',
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
]

export const mockCampaigns: EmailCampaign[] = [
  {
    id: 'CAMP01',
    name: 'Lançamento de Verão',
    subject: 'Novos molhos para o seu churrasco!',
    targetSegment: 'all',
    status: 'sent',
    sentDate: '2024-07-15',
    openRate: 25.5,
    clickRate: 4.2,
  },
  {
    id: 'CAMP02',
    name: 'Boas-vindas',
    subject: 'Um presente para você, novo cliente!',
    targetSegment: 'new',
    status: 'draft',
    openRate: 0,
    clickRate: 0,
  },
]

export const mockAffiliates: Affiliate[] = [
  {
    id: 'AFF01',
    name: 'Gourmet em Casa',
    email: 'parceria@gourmetemcasa.com',
    referralCode: 'GOURMET10',
    commissionRate: 10,
    totalReferrals: 152,
    totalEarnings: 1250.4,
  },
  {
    id: 'AFF02',
    name: 'Receitas do Chef',
    email: 'contato@receitaschef.com',
    referralCode: 'CHEFVIP',
    commissionRate: 12,
    totalReferrals: 88,
    totalEarnings: 980.2,
  },
]

export const mockMarketplaces: Marketplace[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Venda seus produtos no maior varejista online do mundo.',
    logo: 'https://img.usecurling.com/i?q=amazon&color=solid-black',
    status: 'connected',
    sync: {
      products: true,
      orders: true,
      inventory: true,
    },
  },
  {
    id: 'mercado-livre',
    name: 'Mercado Livre',
    description: 'Conecte-se ao maior marketplace da América Latina.',
    logo: 'https://img.usecurling.com/i?q=mercado%20libre&color=yellow',
    status: 'disconnected',
    sync: {
      products: false,
      orders: false,
      inventory: false,
    },
  },
]

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Dúvida sobre o pedido #3101',
    customerName: 'Bruno Lima',
    date: '2024-07-29',
    status: 'open',
    priority: 'medium',
  },
  {
    id: 'TKT-002',
    subject: 'Produto chegou danificado',
    customerName: 'Ana Costa',
    date: '2024-07-29',
    status: 'in-progress',
    priority: 'high',
  },
]

export const mockPredictiveData: PredictiveData = {
  salesForecast: [
    { month: 'Ago', predicted: 8500 },
    { month: 'Set', predicted: 9200 },
    { month: 'Out', predicted: 8800 },
  ],
  churnRisk: {
    high: 15, // percentage
    medium: 35,
    low: 50,
  },
  stockRecommendations: [
    {
      productId: '1',
      productName: 'Pimenta Calabresa',
      recommendation: 'Aumentar estoque em 20%',
      reason: 'Aumento de demanda previsto',
    },
    {
      productId: '3',
      productName: 'Molho Barbecue',
      recommendation: 'Manter estoque atual',
      reason: 'Demanda estável',
    },
  ],
}
