"use client";

import { useSelector } from "react-redux";
import { Link } from "@/src/i18n/routing";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Floating admin edit button – only visible to admin users.
 * Renders on the public hub detail page and links to the admin edit page.
 */
export default function AdminEditHubButton({ hubSlug }: { hubSlug: string }) {
  const auth = useSelector((state: any) => state.auth);
  const isAdmin = !!(auth && auth.isLoggedIn && auth?.user?.role === "admin");
  const t = useTranslations("AdminHubEdit");

  if (!isAdmin) return null;

  return (
    <Link
      href={`/admin/hubs/${hubSlug}/edit`}
      className="cursor-pointer fixed bottom-6 end-6 z-50 flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-red-600 to-rose-500 text-white text-sm font-bold rounded-full shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all duration-200 ring-2 ring-white/20 backdrop-blur-sm"
    >
      <Settings className="h-4.5 w-4.5 animate-[spin_6s_linear_infinite]" />
      {t("editHub")}
    </Link>
  );
}
