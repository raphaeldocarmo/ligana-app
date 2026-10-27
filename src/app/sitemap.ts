import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/privacidade`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
