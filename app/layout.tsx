import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from "@/components/providers/theme"
import { DynamicFavicon } from "@/components/dynamic-favicon"
import { GoogleAuthProvider } from '@/components/providers/google-auth-provider'
import { SEOProvider } from '@/components/providers/seo-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Perfect Pest Control - Professional Pest Control Services in Tamil Nadu",
  description: "Professional pest control services in Tamil Nadu. Specializing in anti-termite, rat control, bed bug treatment, ant control, mosquito control, and disinfection services.",
  keywords: "pest control, anti termite, rat control, bed bug treatment, ant control, mosquito control, disinfection, Tirunelveli, Perfect Pest Control, Tamil Nadu",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider>
          <SEOProvider>
            <DynamicFavicon />
            <GoogleAuthProvider>
              {children}
            </GoogleAuthProvider>
          </SEOProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
