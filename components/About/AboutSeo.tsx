"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function AboutPageSeo() {
  // Use SEO data for about page
  useSEOMeta({
    pageId: 'about',
    fallback: {
      title: 'About Perfect Pest Control - Your Trusted Pest Management Partner',
      description: 'Learn about Perfect Pest Control, your trusted pest management partner. We provide safe, effective, and eco-friendly pest control solutions for homes and businesses since 2008.',
      keywords: 'about perfect pest control, pest control company, trusted pest service, pest management partner, company history, reliable pest control'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}