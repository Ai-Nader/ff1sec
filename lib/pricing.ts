import { Template } from '@/types/template'
import { PricingTier, PricingTierID } from '@/types/pricing'
import { pricingConfig } from './config/pricing'
import { PricingTierID } from '@/types/pricing'

export function calculateTierPrice(basePrice: number, tierId: PricingTierID): number {
  const { additionalPrices, supportDuration } = pricingConfig
  
  switch (tierId) {
    case 'customized':
      return basePrice + additionalPrices.customized
    case 'full-service':
      return basePrice + additionalPrices['full-service']
    default:
      return basePrice
  }
}

export function getTierFeatures(tierId: PricingTierID): string[] {
  const { supportDuration } = pricingConfig
  
  switch (tierId) {
    case 'template':
      return [
        'Full template access',
        'Basic documentation',
        `${supportDuration.template}-day support`,
        'Future updates'
      ]
    case 'customized':
      return [
        'Everything in Template Only',
        'Customization consultation',
        'Branded elements',
        `${supportDuration.customized}-day support`
      ]
    case 'full-service':
      return [
        'Everything in Customized',
        'Full implementation',
        'Team training session',
        `${supportDuration['full-service']}-day priority support`,
        'Workflow optimization'
      ]
  }
}