import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from "@/src/providers/storeProvider";
import AuthHydrator from "@/src/providers/AuthHydrator";
import { ThemeProvider } from "@/src/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Habbat - Connect to Essential Services in Gaza",
  description: "Habbat connects people in Gaza to essential hubs providing internet, electricity, workspaces, and essential services.",
  keywords: ["Gaza", "hubs", "internet", "electricity", "workspace", "Habbat", "Palestine"],
  authors: [{ name: "Habbat Team" }],
  openGraph: {
    title: "Habbat - Connect to Essential Services in Gaza",
    description: "Find the nearest internet, electricity, and workspace hubs in Gaza through Habbat.",
    siteName: "Habbat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habbat - Connect to Essential Services in Gaza",
    description: "Find the nearest internet, electricity, and workspace hubs in Gaza through Habbat.",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch(e) {}
  }

  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <StoreProvider> 
            {token && user && <AuthHydrator user={user} />}
           <NextIntlClientProvider messages={messages} locale={locale}>
             {children}
           </NextIntlClientProvider>
           <Toaster position="top-center" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white rounded-xl' }} />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
