import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ContactSkeleton() {
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

      {/* Contact Form and Info Skeleton */}
      <section className="pt-20 pb-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Form Skeleton */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <Skeleton className="h-8 w-48 mb-6" />
                
                {/* Pest Control Icons Skeleton */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8 p-4 sm:p-5 bg-gray-50 rounded-2xl">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2" />
                      <Skeleton className="h-3 w-12 mx-auto" />
                    </div>
                  ))}
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-10 sm:h-12 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-10 sm:h-12 w-full" />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Skeleton className="h-4 w-28 mb-2" />
                      <Skeleton className="h-10 sm:h-12 w-full" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-10 sm:h-12 w-full" />
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-24 w-full" />
                  </div>

                  <Skeleton className="h-10 sm:h-12 w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Skeleton */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div>
                <div className="flex items-center mb-4 sm:mb-6">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mr-3 sm:mr-4" />
                  <Skeleton className="h-8 w-48" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                
                {/* Features Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 p-5 bg-gray-50 rounded-2xl">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <Skeleton className="w-10 h-10 rounded-lg mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details Skeleton */}
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="shadow-md border-0">
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Skeleton className="h-5 w-24 mb-2" />
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="shadow-sm border border-gray-100">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mx-auto mb-3 sm:mb-4" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Skeleton className="h-6 w-40 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
          </div>

          <div className="max-w-6xl mx-auto">
            <Skeleton className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl sm:rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Emergency Contact Skeleton */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="w-12 h-12 rounded-xl mr-3" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-4 w-96 mx-auto mb-6" />
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
              <Skeleton className="h-10 w-48 rounded-lg" />
              <Skeleton className="h-10 w-48 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}