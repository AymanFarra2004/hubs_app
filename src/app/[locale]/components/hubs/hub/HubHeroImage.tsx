import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, MapPin } from 'lucide-react'
import { IHub } from '@/data/hubs'

export default function HubHeroImage({hub}: {hub: IHub}) {
  return (
     <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md">
            <Image
              src={hub.imageUrl}
              alt={hub.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {hub.verificationStatus === "Verified" && (
                  <Badge className="bg-emerald-500/90 text-white border-0 shadow-sm flex items-center gap-1.5 py-1 px-3 text-sm">
                    <ShieldCheck className="h-4 w-4" />
                    Verified Partner
                  </Badge>
                )}
                <Badge variant="outline" className="text-white border-white/40 bg-black/40 backdrop-blur-md py-1 px-3 text-sm">
                  {hub.governorate}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                {hub.name}
              </h1>
              <div className="flex items-center text-white/90 text-sm md:text-base">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-1.5 shrink-0" />
                {hub.location}
              </div>
            </div>
          </div>
  )
}