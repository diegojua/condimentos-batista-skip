import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react'
import { useSettings } from './SettingsContext'
import { PersonalizationRule } from '@/types'

interface PersonalizationContextType {
  activeBanner: PersonalizationRule['config'] | null
  userLocation: string | null
}

const PersonalizationContext = createContext<
  PersonalizationContextType | undefined
>(undefined)

export const PersonalizationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { settings } = useSettings()
  const [activeBanner, setActiveBanner] = useState<
    PersonalizationRule['config'] | null
  >(null)
  const [userLocation] = useState<string>('São Paulo') // Mock location

  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()

    const activeRule = settings.personalization.rules.find((rule) => {
      if (!rule.enabled) return false

      switch (rule.type) {
        case 'timeOfDay':
          return (
            currentHour >= (rule.config.timeStart ?? 0) &&
            currentHour < (rule.config.timeEnd ?? 24)
          )
        case 'location':
          return userLocation === rule.config.location
        default:
          return false
      }
    })

    setActiveBanner(activeRule?.config || null)
  }, [settings.personalization.rules, userLocation])

  const value = useMemo(
    () => ({
      activeBanner,
      userLocation,
    }),
    [activeBanner, userLocation],
  )

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  )
}

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext)
  if (context === undefined) {
    throw new Error(
      'usePersonalization must be used within a PersonalizationProvider',
    )
  }
  return context
}
