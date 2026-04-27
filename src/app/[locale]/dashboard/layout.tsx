import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from 'next';
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Dashboard' });
 
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/dashboard`,
      languages: {
        en: '/en/dashboard',
        ar: '/ar/dashboard',
      },
    },
  };
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  
  if (!userCookie) {
    redirect(`/${locale}/sign-in`);
  }

  try {
    const user = JSON.parse(userCookie);
    if (user.role !== "hub_owner") {
      redirect(`/${locale}`);
    }
  } catch (e) {
    redirect(`/${locale}`);
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
