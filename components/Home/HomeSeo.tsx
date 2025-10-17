"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function HomeSeo() {
  // Use SEO data for home page
  useSEOMeta({
    pageId: 'home',
    fallback: {
      title: 'Perfect Pest Control - Professional Pest Control Services in Tamil Nadu',
      description: 'Professional pest control services in Tamil Nadu. Anti-termite treatment, rat control, bed bug treatment, mosquito control, and disinfection services. Licensed and guaranteed.',
      keywords: 'pest control tamil nadu, anti termite treatment, rat control, bed bug treatment, mosquito control, disinfection services, perfect pest control, tirunelveli pest control, professional pest management'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}