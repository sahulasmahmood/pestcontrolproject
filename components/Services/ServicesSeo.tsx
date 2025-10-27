"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ServicesPageSeo() {
  // Use SEO data for services page from SEO Manager
  useSEOMeta({
    pageId: 'services',
    fallback: {
      title: 'Pest Control Services - Perfect Pest Control',
      description: 'Complete pest control services: anti-termite treatment, rodent control, bed bug elimination, cockroach & mosquito control, professional disinfection services.',
      keywords: 'pest control services, anti termite, rodent control, bed bug treatment, cockroach control, mosquito control, disinfection, commercial pest control'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}