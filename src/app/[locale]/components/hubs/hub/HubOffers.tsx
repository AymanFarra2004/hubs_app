"use client";

import { Tag, Clock, Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface Offer {
  id: number;
  title: any;
  description: any;
  type: string;
  price: number;
  duration: number;
  starts_at: string;
  ends_at: string;
}

export default function HubOffers({ offers }: { offers: Offer[] }) {
  const locale = useLocale();
  const t = useTranslations("HubManagement.offers");

  if (!offers || offers.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h2 className="text-2xl font-bold">{t("title")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 hover:border-primary/50 transition-all shadow-sm hover:shadow-md flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                {t(`types.${offer.type}`)}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
              {typeof offer.title === 'string' ? offer.title : (offer.title?.[locale] || offer.title?.en || offer.title?.ar || "Offer")}
            </h3>
            
            <div className="space-y-3 mb-6">
               <div className="flex items-center gap-2">
                 <Tag className="h-4 w-4 text-primary" />
                 <span className="text-sm font-medium">{t("price")}: </span>
                 <span className="text-lg font-bold text-primary">₪{offer.price}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Clock className="h-4 w-4 text-muted-foreground" />
                 <span className="text-sm font-medium">{t("duration")}: </span>
                 <span className="text-sm font-semibold">{offer.duration} {t("hours")}</span>
               </div>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
               <p className="text-sm text-muted-foreground leading-relaxed">
                 {typeof offer.description === 'string' 
                   ? offer.description 
                   : (offer.description?.[locale] || offer.description?.en || offer.description?.ar || "")}
               </p>
            </div>

            <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-4">
              {offer.starts_at && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(offer.starts_at).toLocaleDateString('en-GB')}  </span>
                </div>
              )}
             <span>-</span>
              {offer.ends_at && (
                <div className="flex items-center gap-1.5 text-xs text-red-500/80 font-medium whitespace-nowrap">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(offer.ends_at).toLocaleDateString('en-GB')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
