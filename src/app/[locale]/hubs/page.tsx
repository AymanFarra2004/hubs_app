import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"
import { staticHubs } from "@/data/hubs"
import HubsHeader from "@/components/hubs/HubsHeader"
import HubsFilters from "@/components/hubs/HubsFilters"
import HubsList from "@/components/hubs/HubsList"

export default function HubsDirectory() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <HubsHeader />

          <div className="flex flex-col lg:flex-row gap-8">
            <HubsFilters />

            <HubsList hubsData={staticHubs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}