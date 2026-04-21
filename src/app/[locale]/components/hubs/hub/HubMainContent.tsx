import React from 'react'
import { IHub } from '@/data/hubs'
import { ShieldCheck } from 'lucide-react'
import HubGallery from './HubGallery'
import HubOffers from './HubOffers'
import HubSocialAccounts from './HubSocialAccounts'

export default function HubMainContent({hub, serviceIcons, offers = []}: {hub: IHub, serviceIcons: Record<string, React.ReactNode>, offers?: any[]}) {
  return (
    <div className="lg:col-span-2 space-y-10">
              
              {/* Services */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Available Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {hub.services.map((service) => (
                    <div key={service} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted/30 border border-border/50 text-center transition-all duration-300 hover:bg-muted hover:shadow-md hover:-translate-y-1 aspect-square relative overflow-hidden group">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="h-14 w-14 rounded-2xl bg-background shadow-sm border border-border/50 text-primary flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                        {serviceIcons[service] || <ShieldCheck className="h-6 w-6" />}
                      </div>
                      <span className="font-medium text-sm sm:text-base">{service}</span>
                    </div>
                  ))}
                </div>
              </section>

              {offers.length > 0 && (
                <>
                  <hr className="border-border" />
                  <HubOffers offers={offers} />
                </>
              )}

              {hub.galleryUrls && hub.galleryUrls.length > 0 && (
                <>
                  <hr className="border-border" />
                  <HubGallery hubName={hub.name} galleryUrls={hub.galleryUrls} />
                </>
              )}

              {/* Social Accounts */}
              {hub.socialAccounts && hub.socialAccounts.length > 0 && (
                <>
                  <hr className="border-border" />
                  <HubSocialAccounts socials={hub.socialAccounts} />
                </>
              )}

            </div>
  )
}