"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-admin-gradient flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-white/80 mb-8">
            The pest control service you're looking for doesn't exist or has been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/tariff">
            <Button 
              size="lg" 
              className="bg-white text-admin-primary hover:bg-gray-100 px-8 py-3 font-semibold"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Services
            </Button>
          </Link>
          
          <Link href="/">
            <Button 
              variant="outline"
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-admin-primary px-8 py-3 font-semibold"
            >
              Go to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-white/60 text-sm">
          <p>Need help with pest control services?</p>
          <div className="mt-2 space-y-1">
            <div>📞 +91 90037 82966</div>
            <div>📧 info@perfectpestcontrol.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}