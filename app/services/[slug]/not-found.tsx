import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <ShieldCheck className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Service Not Found</h1>
          <p className="text-gray-600">
            The pest control service you're looking for doesn't exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/services">
            <Button className="bg-admin-gradient text-white hover:opacity-90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
          </Link>
          <div>
            <Link 
              href="/" 
              className="text-admin-primary hover:text-admin-secondary transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}