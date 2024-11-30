import { ReactNode } from 'react'

export interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  icon: ReactNode
}

export type PricingTierID = 'template' | 'customized' | 'full-service'

export interface PricingConfig {
  additionalPrices: {
    customized: number
    'full-service': number
  }
  supportDuration: {
    template: number
    customized: number
    'full-service': number
  }
}