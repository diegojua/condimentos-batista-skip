import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'

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
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings)

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
      // Deep merge for nested objects
      creditCard: {
        ...prevSettings.creditCard,
        ...newSettings.creditCard,
      },
      pix: {
        ...prevSettings.pix,
        ...newSettings.pix,
      },
      boleto: {
        ...prevSettings.boleto,
        ...newSettings.boleto,
      },
      twoFactorAuth: {
        ...prevSettings.twoFactorAuth,
        ...newSettings.twoFactorAuth,
      },
    }))
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
