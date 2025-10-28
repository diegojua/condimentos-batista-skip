import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
}

export const useScrollAnimation = <T extends HTMLElement>(
  options?: UseScrollAnimationOptions,
) => {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (options?.triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else {
          if (!options?.triggerOnce) {
            setIsVisible(false)
          }
        }
      },
      {
        threshold: options?.threshold || 0.1,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, options])

  return { ref, isVisible }
}
