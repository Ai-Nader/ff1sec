import { getTemplateById, getAllTemplates } from "@/lib/templates"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from 'next'
import { TemplateContent } from "@/components/templates/template-content"
import { PricingTierCard } from "@/components/templates/pricing-tier-card"
import { getPricingTiers } from "@/components/templates/pricing-tiers"

export function generateStaticParams() {
  const templates = getAllTemplates()
  return templates.map((template) => ({
    category: template.category,
    id: template.id,
  }))
}

type Props = {
  params: { id: string; category: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const template = getTemplateById(params.id)
  
  if (!template) {
    return { 
      title: 'Template Not Found - Automation Market' 
    }
  }

  const metaTitle = `${template.title} - Premium ${template.category.charAt(0).toUpperCase() + template.category.slice(1)} Template`
  const metaDescription = `${template.description} Perfect for ${template.recommendedFor.join(', ')}. Includes ${template.features.slice(0, 3).join(', ')}, and more.`

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      images: [template.image],
      url: `https://automation.market/templates/${template.category}/${template.id}`,
      siteName: 'Automation Market',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [template.image],
      creator: '@AutomationMkt',
      site: '@AutomationMkt',
    },
    alternates: {
      canonical: `https://automation.market/templates/${template.category}/${template.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default function TemplatePage({
  params
}: {
  params: { id: string }
}) {
  const template = getTemplateById(params.id)

  if (!template) {
    notFound()
  }

  const pricingTiers = getPricingTiers(template)

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        <TemplateContent template={template} />
        <div className="space-y-6">
          {pricingTiers.map((tier) => (
            <PricingTierCard
              key={tier.id}
              {...tier}
              templateId={template.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}