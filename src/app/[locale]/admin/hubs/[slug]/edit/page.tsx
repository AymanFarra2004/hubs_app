"use client";

import { useState, use, useEffect } from "react";
import { Settings, ArrowLeft, Loader2, Box, Tag, Link as LinkIcon } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { getPrivateHubBySlug } from "@/src/actions/hubs";
import { useTranslations, useLocale } from "next-intl";
import { GeneralTab, ServicesTab, OffersTab, SocialsTab } from "@/src/app/[locale]/dashboard/hubs/[id]/page";

// ─── Main Admin Edit Page Component ──────────────────────────────────────────
export default function AdminHubEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState("general");
  const [hub, setHub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("HubManagement");
  const tAdmin = useTranslations("AdminHubEdit");
  const locale = useLocale();

  useEffect(() => {
    async function fetchHub() {
      setLoading(true);
      const result = await getPrivateHubBySlug(resolvedParams.slug, locale);
      if (result.success && result.data) {
        setHub(result.data);
      } else {
        setError(result.error || "Failed to load hub");
      }
      setLoading(false);
    }
    fetchHub();
  }, [resolvedParams.slug, locale]);

  const tabs = [
    { id: "general", label: t("tabs.general"), icon: Settings },
    { id: "services", label: t("tabs.services"), icon: Box },
    { id: "offers", label: t("tabs.offers"), icon: Tag },
    { id: "socials", label: t("tabs.socials"), icon: LinkIcon },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ms-3 text-muted-foreground">{t("loading")}</span>
      </div>
    );
  }

  if (error || !hub) {
    return (
      <div className="max-w-lg mx-auto py-20 text-center">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
          <p className="font-medium text-red-700">{error || t("hubNotFound")}</p>
          <Link href="/admin/hubs" className="cursor-pointer inline-block mt-4 text-primary hover:underline text-sm">
            {tAdmin("backToHubs")}
          </Link>
        </div>
      </div>
    );
  }

  const hubName = hub.name?.[locale] || hub.name || "Unnamed Hub";

  const fetchHub = async () => {
    const result = await getPrivateHubBySlug(resolvedParams.slug, locale);
    if (result.success && result.data) setHub(result.data);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <Link href={`/admin/hubs/${resolvedParams.slug}/preview`} className="cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {tAdmin("backToPreview")}
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-700 tracking-wider">
                {tAdmin("adminMode")}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">{hubName}</h2>
            <p className="text-muted-foreground mt-1 font-mono text-sm opacity-60">slug: {hub.slug}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            hub.status === "approved" || hub.status === "active" ? "bg-green-100 text-green-700" :
            hub.status === "rejected" ? "bg-red-100 text-red-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {hub.status || "Pending"}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          {activeTab === "general" && <GeneralTab hub={hub} onUpdate={fetchHub} redirectOnDelete="/admin/hubs" />}
          {activeTab === "services" && <ServicesTab hub={hub} onUpdate={fetchHub} />}
          {activeTab === "offers" && <OffersTab hubSlug={hub.slug} />}
          {activeTab === "socials" && <SocialsTab hubSlug={hub.slug} />}
        </div>
      </div>
    </div>
  );
}
