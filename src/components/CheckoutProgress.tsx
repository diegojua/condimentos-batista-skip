import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckoutProgressProps {
  currentStep: number
}

const steps = ['Carrinho', 'Informações & Pagamento', 'Confirmação']

export const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = index + 1
          const isCompleted = currentStep > stepIndex
          const isCurrent = currentStep === stepIndex

          return (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary text-primary'
                      : 'border-border bg-muted text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : stepIndex}
              </div>
              <p
                className={cn(
                  'ml-3 font-semibold',
                  isCurrent ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {step}
              </p>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 mx-4 transition-all duration-300',
                    currentStep > stepIndex ? 'bg-primary' : 'bg-border',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
