import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'
import { useSettings } from './SettingsContext'
import { toast } from '@/hooks/use-toast'

interface LoyaltyContextType {
  points: number
  addPoints: (amount: number) => void
  redeemPoints: (pointsToRedeem: number) => boolean
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(2500) // Mock user points
  const { settings } = useSettings()

  const addPoints = useCallback(
    (amount: number) => {
      if (!settings.loyalty.enabled || amount <= 0) return
      const newPoints = points + amount
      setPoints(newPoints)
      toast({
        title: 'Pontos Ganhos!',
        description: `Você ganhou ${amount} pontos!`,
      })
    },
    [points, settings.loyalty.enabled],
  )

  const redeemPoints = useCallback(
    (pointsToRedeem: number) => {
      if (!settings.loyalty.enabled) return false
      if (points >= pointsToRedeem) {
        setPoints(points - pointsToRedeem)
        return true
      }
      toast({
        variant: 'destructive',
        title: 'Pontos Insuficientes',
        description: 'Você não tem pontos suficientes para este resgate.',
      })
      return false
    },
    [points, settings.loyalty.enabled],
  )

  const value = useMemo(
    () => ({
      points,
      addPoints,
      redeemPoints,
    }),
    [points, addPoints, redeemPoints],
  )

  return (
    <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>
  )
}

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext)
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider')
  }
  return context
}
