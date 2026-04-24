import { Header } from "@/components/header/Header";
import ModernHomeView from "./components/home-page/ModernHomeView";
import { Footer } from "@/components/footer/Footer";
import { getAllHubs } from "@/src/actions/hubs";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
// import{APITest} from "@/API tests/APITest";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Index' });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://qareeb.ps';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Qareeb',
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function Home() {
  const locale = await getLocale();
  const res = await getAllHubs(locale);
  let hubs = res.data || [];
  if (!Array.isArray(hubs)) hubs = [];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#050505]">
      {/* 
        Note: The Header and Footer components themselves aren't being redesigned here,
        but we wrap the content in a dark background for continuity. 
        If Header/Footer need dark variants, that can be done at their component level.
      */}
      <div className="relative z-50">
        <Header />
      </div>
      <main className="flex-1">
        <ModernHomeView initialHubs={hubs} />
      </main>

      <div className="relative z-50 bg-white dark:bg-[#0A0A0B] border-t border-border">
        <Footer />
      </div>
    </div>
  );
}