import { MetadataRoute } from 'next'
import { getAllTemplates } from '@/lib/templates'

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://automation.market'
const CURRENT_DATE = new Date().toISOString()

export default function sitemap(): MetadataRoute.Sitemap {
  const templates = getAllTemplates()
  const popularTemplates = templates.filter(t => t.price >= 39)

  // Main pages with high priority
  const mainPages = [
    {
      url: SITE_URL,
      lastModified: CURRENT_DATE,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/custom`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Template category pages
  const categoryPages = [
    'notion',
    'n8n',
    'make',
    'zapier',
    'chatgpt',
  ].map((category) => ({
    url: `${SITE_URL}/templates/${category}`,
    lastModified: CURRENT_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Individual template pages with dynamic priority based on category
  const templatePages = templates
    .sort((a, b) => b.price - a.price) // Higher priced templates get listed first
    .map((template, index) => ({
      url: `${SITE_URL}/templates/${template.category}/${template.id}`,
      lastModified: CURRENT_DATE,
      // Dynamic priority based on price and position
      priority: popularTemplates.includes(template) ? 0.8 - (index * 0.01) : 0.6,
      changeFrequency: 'weekly' as const,
    }))

  // Legal pages with lower priority
  const legalPages = [
    {
      url: `${SITE_URL}/privacy`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: CURRENT_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  return [...mainPages, ...categoryPages, ...templatePages, ...legalPages]
}