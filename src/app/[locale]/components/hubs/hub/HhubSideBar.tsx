import React from 'react'
import { IHub } from '@/data/hubs'
import { Clock, Phone } from 'lucide-react'
import HubSocialAccounts from './HubSocialAccounts'
import { useTranslations } from 'next-intl'

export default function HhubSideBar({hub}: {hub: IHub}) {
  const t = useTranslations("HubManagement.general");
  const priceParts = (hub.pricing || '').split('/');
  const priceMain = priceParts[0]?.trim() || t("contact");
  const priceUnit = priceParts.length > 1 ? priceParts.slice(1).join('/').trim() : null;

  return (
    <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-xl">        
            <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center text-primary font-bold text-2xl mb-1">
                    {priceMain}
                </div>
                {priceUnit && (
                  <div className="text-muted-foreground">
                      {t("per") || "per"} {t("hour")}
                  </div>
                )}
            </div>

            <div className="space-y-4 mb-8">
                {hub.operatingHours && (
                  <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                          <div className="font-medium">{t("workingHours")}</div>
                          <div className="text-muted-foreground text-sm">{hub.operatingHours}</div>
                      </div>
                  </div>
                )}
                {hub.contact?.contactNumber && (
                  <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                          <div className="font-medium">{t("contactUs")}</div>
                          <div className="text-muted-foreground text-sm" dir="ltr">{hub.contact.contactNumber}</div>
                      </div>
                  </div>
                )}
            </div>

            <div className="pt-6 border-t border-border">
                <HubSocialAccounts 
                    socials={hub.socialAccounts || []} 
                    title={t("followUs")} 
                    titleClassName="font-medium mb-4"
                />
            </div>
        </div>
    </div>
  )
}