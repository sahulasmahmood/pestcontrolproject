"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ContactPageSeo() {
  // Use SEO data for contact page
  useSEOMeta({
    pageId: 'contact',
    fallback: {
        title: 'Contact Perfect Pest Control - Book Your Pest Control Service Now',
        description: 'Contact Perfect Pest Control for pest control services, termite treatment, and pest management inquiries. Available 24/7 for all your pest control needs.',
        keywords: 'contact perfect pest control, pest control booking, pest inquiry, phone number, whatsapp booking, 24/7 service, customer support'
      }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}