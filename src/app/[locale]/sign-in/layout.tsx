import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignIn' });
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://qareeb.ps';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/sign-in`,
      languages: {
        en: `${baseUrl}/en/sign-in`,
        ar: `${baseUrl}/ar/sign-in`,
      },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
