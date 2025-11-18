import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Skeleton */}
      <div className="bg-admin-gradient text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-3 w-32 bg-white/20" />
              <Skeleton className="h-3 w-32 bg-white/20" />
            </div>
            <Skeleton className="h-3 w-48 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Navbar Skeleton */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Skeleton className="h-12 w-48" />
            <div className="hidden md:flex space-x-8">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-18" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}