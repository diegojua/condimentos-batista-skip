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
import { LoyaltyInfo } from '@/types'

interface LoyaltyContextType extends LoyaltyInfo {
  addPoints: (amount: number) => void
  redeemPoints: (pointsToRedeem: number) => boolean
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export const LoyaltyProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(6500) // Mock user points to be in Silver tier
  const [badges] = useState(['Primeira Compra']) // Mock earned badges
  const { settings } = useSettings()

  const { tier, tierProgress } = useMemo(() => {
    const { gold, silver, bronze } = settings.loyalty.tiers
    if (points >= gold.points) {
      return { tier: gold.name, tierProgress: 100 }
    }
    if (points >= silver.points) {
      const progress =
        ((points - silver.points) / (gold.points - silver.points)) * 100
      return { tier: silver.name, tierProgress: progress }
    }
    const progress = (points / silver.points) * 100
    return { tier: bronze.name, tierProgress: progress }
  }, [points, settings.loyalty.tiers])

  const addPoints = useCallback(
    (amount: number) => {
      if (!settings.loyalty.enabled || amount <= 0) return
      setPoints((prev) => prev + amount)
      toast({
        title: 'Pontos Ganhos!',
        description: `Você ganhou ${amount} pontos!`,
      })
    },
    [settings.loyalty.enabled],
  )

  const redeemPoints = useCallback(
    (pointsToRedeem: number) => {
      if (!settings.loyalty.enabled) return false
      if (points >= pointsToRedeem) {
        setPoints((prev) => prev - pointsToRedeem)
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
      tier,
      tierProgress,
      badges,
      addPoints,
      redeemPoints,
    }),
    [points, tier, tierProgress, badges, addPoints, redeemPoints],
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
