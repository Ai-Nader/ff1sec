import { FileText, Settings, Wrench } from "lucide-react"
import { Template } from "@/types/template"
import { PricingTier, PricingTierID } from "@/types/pricing"
import { calculateTierPrice, getTierFeatures } from "@/lib/pricing"

const TIER_CONFIG: Record<PricingTierID, { name: string; description: string; icon: JSX.Element }> = {
  template: {
    name: "Template Only",
    description: "Get instant access to the template",
    icon: <FileText className="h-6 w-6" />
  },
  customized: {
    name: "Customized Template",
    description: "Template customized to your needs",
    icon: <Wrench className="h-6 w-6" />
  },
  'full-service': {
    name: "Full Service Setup",
    description: "Complete setup and implementation",
    icon: <Settings className="h-6 w-6" />
  }
}

export function getPricingTiers(template: Template): PricingTier[] {
  const tiers: PricingTierID[] = ['template', 'customized', 'full-service']
  
  return tiers.map(tierId => ({
    id: tierId,
    ...TIER_CONFIG[tierId],
    price: calculateTierPrice(template.price, tierId),
    features: getTierFeatures(tierId)
  }))
}