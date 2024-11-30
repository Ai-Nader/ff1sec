"use client"

import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CheckoutButton } from "@/components/checkout-button"
import { PricingTier } from "@/types/pricing"

interface PricingTierProps extends Omit<PricingTier, 'id'> {
  templateId: string
  id: PricingTier['id']
}

export function PricingTierCard({
  id,
  templateId,
  name,
  price,
  description,
  features,
  icon,
}: PricingTierProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-lg bg-primary/10" aria-hidden="true">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-2xl font-bold">${price}</p>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">
        {description}
      </p>

      <div className="space-y-3 mb-6">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <CheckoutButton 
        templateId={`${templateId}-${id}`}
        price={price}
      />
    </Card>
  )
}