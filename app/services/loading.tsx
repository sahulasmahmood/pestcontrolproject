import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-gray-200 to-gray-300 py-16 sm:py-20 lg:py-24 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-6" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="shadow-lg border-0">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <Skeleton className="w-12 h-12 rounded-xl mr-4" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}