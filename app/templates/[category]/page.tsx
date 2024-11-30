import { getTemplatesByCategory } from "@/lib/templates"
import { TemplateCard } from "@/components/template-card"
import { notFound } from "next/navigation"
import { Metadata } from 'next'
import { TemplateCategory } from "@/types/template"

const categoryTitles: Record<TemplateCategory, string> = {
  notion: "Premium Notion Templates",
  n8n: "Professional n8n Workflows",
  make: "Advanced Make Scenarios",
  zapier: "Ready-to-Use Zapier Zaps",
  chatgpt: "Expert ChatGPT Prompts"
}

const categoryDescriptions: Record<TemplateCategory, string> = {
  notion: "Enhance your workspace with our collection of premium Notion templates. Boost productivity and streamline your workflow.",
  n8n: "Automate your business processes with our professional n8n workflows. Save time and reduce manual tasks.",
  make: "Transform your business with our advanced Make (Integromat) scenarios. Connect your apps and automate workflows.",
  zapier: "Seamlessly integrate your applications with our ready-to-use Zapier templates. Start automating in minutes.",
  chatgpt: "Optimize your AI interactions with our expert ChatGPT prompts. Get better results from your AI conversations."
}

export function generateStaticParams() {
  return [
    { category: "notion" },
    { category: "n8n" },
    { category: "make" },
    { category: "zapier" },
    { category: "chatgpt" }
  ]
}

export async function generateMetadata({ 
  params 
}: { 
  params: { category: TemplateCategory } 
}): Promise<Metadata> {
  const title = categoryTitles[params.category]
  
  if (!title) {
    return { title: 'Category Not Found - Automation Market' }
  }

  const description = categoryDescriptions[params.category]

  return {
    title: `${title} - Automation Market`,
    description,
    openGraph: {
      title: `${title} - Automation Market`,
      description,
      type: 'website',
      url: `https://automation.market/templates/${params.category}`,
      siteName: 'Automation Market',
      images: [
        {
          url: 'https://automation.market/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${title} - Automation Market`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Automation Market`,
      description,
      creator: '@AutomationMkt',
      site: '@AutomationMkt',
      images: ['https://automation.market/og-image.jpg'],
    },
    alternates: {
      canonical: `https://automation.market/templates/${params.category}`,
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

export default function CategoryPage({
  params
}: {
  params: { category: TemplateCategory }
}) {
  const templates = getTemplatesByCategory(params.category)
  const title = categoryTitles[params.category]

  if (!title) {
    notFound()
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}