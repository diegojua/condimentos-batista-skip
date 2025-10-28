import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'
import { LoyaltySettings, PersonalizationRule } from '@/types'

export interface PaymentMethodSettings {
  enabled: boolean
  apiKey: string
}

export interface TwoFactorAuthSettings {
  enabled: boolean
  secret: string // This would be generated on the backend
}

export interface Settings {
  creditCard: PaymentMethodSettings
  pix: PaymentMethodSettings
  boleto: PaymentMethodSettings
  twoFactorAuth: TwoFactorAuthSettings
  loyalty: LoyaltySettings
  personalization: {
    rules: PersonalizationRule[]
  }
  recommendationAlgorithm: 'related' | 'bought-together' | 'viewed-also-viewed'
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

const initialSettings: Settings = {
  creditCard: {
    enabled: true,
    apiKey: 'pk_test_mock_stripe_key',
  },
  pix: {
    enabled: true,
    apiKey: 'mock_pix_key_12345',
  },
  boleto: {
    enabled: false,
    apiKey: 'mock_boleto_integration_key',
  },
  twoFactorAuth: {
    enabled: false,
    secret: 'JBSWY3DPEHPK3PXP', // Mock secret for QR code generation
  },
  loyalty: {
    enabled: true,
    pointsPerDollar: 10,
    tiers: {
      bronze: {
        name: 'Bronze',
        points: 0,
        multiplier: 1,
        benefits: ['Acesso a promoções básicas'],
      },
      silver: {
        name: 'Silver',
        points: 5000,
        multiplier: 1.2,
        benefits: [
          'Frete grátis em pedidos acima de R$100',
          'Descontos exclusivos',
        ],
      },
      gold: {
        name: 'Gold',
        points: 15000,
        multiplier: 1.5,
        benefits: ['Atendimento prioritário', 'Brindes especiais'],
      },
    },
    rewards: [
      {
        id: 'reward1',
        name: '5% de Desconto',
        pointsRequired: 1000,
        discountPercentage: 5,
      },
      {
        id: 'reward2',
        name: 'R$ 10 de Desconto',
        pointsRequired: 2000,
        discountFixed: 10,
      },
    ],
    challenges: [
      {
        id: 'c1',
        name: 'Primeira Compra',
        description: 'Faça sua primeira compra e ganhe 100 pontos.',
        points: 100,
      },
      {
        id: 'c2',
        name: 'Explorador de Sabores',
        description: 'Compre produtos de 3 categorias diferentes.',
        points: 250,
      },
    ],
  },
  personalization: {
    rules: [
      {
        id: 'time-morning',
        type: 'timeOfDay',
        name: 'Promoção Matinal',
        enabled: true,
        config: {
          timeStart: 6,
          timeEnd: 11,
          bannerImage:
            'https://img.usecurling.com/p/1200/400?q=morning%20coffee%20spices',
          bannerText:
            'Comece o dia com mais sabor! Confira nossas ofertas matinais.',
        },
      },
      {
        id: 'location-sp',
        type: 'location',
        name: 'Frete Grátis SP',
        enabled: true,
        config: {
          location: 'São Paulo',
          bannerImage:
            'https://img.usecurling.com/p/1200/400?q=sao%20paulo%20skyline',
          bannerText:
            'Notícia boa para os paulistanos: Frete grátis para todo o estado de SP!',
        },
      },
    ],
  },
  recommendationAlgorithm: 'related',
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings)

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => {
      const updated = { ...prevSettings, ...newSettings }
      if (newSettings.creditCard)
        updated.creditCard = {
          ...prevSettings.creditCard,
          ...newSettings.creditCard,
        }
      if (newSettings.pix)
        updated.pix = { ...prevSettings.pix, ...newSettings.pix }
      if (newSettings.boleto)
        updated.boleto = { ...prevSettings.boleto, ...newSettings.boleto }
      if (newSettings.twoFactorAuth)
        updated.twoFactorAuth = {
          ...prevSettings.twoFactorAuth,
          ...newSettings.twoFactorAuth,
        }
      if (newSettings.loyalty) {
        updated.loyalty = {
          ...prevSettings.loyalty,
          ...newSettings.loyalty,
          tiers: {
            ...prevSettings.loyalty.tiers,
            ...newSettings.loyalty.tiers,
          },
        }
      }
      if (newSettings.personalization) {
        updated.personalization = {
          ...prevSettings.personalization,
          ...newSettings.personalization,
        }
      }
      return updated
    })
  }, [])

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings, updateSettings],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
