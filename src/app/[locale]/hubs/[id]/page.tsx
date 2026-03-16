import Link from "next/link"
import { notFound } from "next/navigation"
import { Wifi, Zap, Monitor, Coffee, ChevronLeft } from "lucide-react"

import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"
import { staticHubs } from "@/data/hubs"
import HubHeroImage from "@/components/hubs/hub/HubHeroImage"
import HubMainContent from "@/components/hubs/hub/HubMainContent"
import HhubSideBar from "@/components/hubs/hub/HhubSideBar"

const serviceIcons: Record<string, React.ReactNode> = {
  Internet: <Wifi className="h-5 w-5" />,
  Electricity: <Zap className="h-5 w-5" />,
  Workspace: <Monitor className="h-5 w-5" />,
  "Coffee/Tea": <Coffee className="h-5 w-5" />,
}

export default async function HubDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const hub = staticHubs.find((h) => h.id === id)

  if (!hub) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/hubs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Hubs
          </Link>

         <HubHeroImage hub={hub} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            <HubMainContent hub={hub} serviceIcons={serviceIcons}/>
            <HhubSideBar hub={hub}/>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}