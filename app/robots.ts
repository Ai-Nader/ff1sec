import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://automation.market'

export default function robots(): MetadataRoute.Robots {
  const currentDate = new Date().toISOString()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/checkout/',
          '/success/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/sitemap.xml',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}