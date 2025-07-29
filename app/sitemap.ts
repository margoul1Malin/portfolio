import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.margoul1.xyz'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login-challenge`,
      lastModified: currentDate,
      changeFrequency: 'never',
      priority: 0.1,
    },
  ]
} 
