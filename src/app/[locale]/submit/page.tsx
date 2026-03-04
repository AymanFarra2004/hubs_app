import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"
import { MapPin, Upload, Info } from "lucide-react"
import BasicInfo from "@/components/submit/BasicInfo"
import ServicesPricing from "@/components/submit/ServicesPricing"
import UploadPhoto from "@/components/submit/UploadPhoto"

export default function SubmitHub() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">List Your Hub</h1>
            <p className="text-muted-foreground text-lg">
              Help your community stay connected. Add your internet or electricity hub to our network.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-10">
            <form className="space-y-8">
              
              {/* Basic Info */}
              <BasicInfo />

              {/* Services & Pricing */}
              <ServicesPricing />

              {/* Photos */}
             < UploadPhoto />

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 text-sm text-muted-foreground">
                <Info className="h-5 w-5 text-primary flex-shrink-0" />
                <p>
                  By submitting this form, you agree that our team will review the information. 
                  Approved listings receive a "Verified Partner" badge.
                </p>
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-3">
                <a href="/" className="px-6 py-2 rounded-md border border-input text-foreground font-medium hover:bg-muted transition-colors">
                  Cancel
                </a>
                <button type="button" className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm">
                  Submit Listing
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}