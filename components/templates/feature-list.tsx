import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface FeatureListProps {
  features: string[]
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {features.map((feature) => (
        <Card key={feature} className="p-4">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 text-green-500 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium">{feature}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}