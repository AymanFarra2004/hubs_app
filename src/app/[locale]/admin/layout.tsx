"use client";

import { Shield, LayoutDashboard, Server, Bell, Settings, LogOut, CheckSquare, AlertTriangle } from "lucide-react";
import { Link } from "@/src/i18n/routing";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = useSelector((state: any) => state.auth);
  const isLoggedIn = !!(auth && auth.isLoggedIn);
  const isAdmin = isLoggedIn && auth?.user?.role === "admin";
  const t = useTranslations("AdminLayout");

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="bg-background p-8 rounded-2xl shadow-lg text-center max-w-md w-full border border-border">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-3">{t("accessDenied")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("accessDeniedDesc")}
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors w-full">
            {t("returnHome")}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Shield className="h-6 w-6 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
          <h1 className="text-xl font-bold text-foreground">Habbat {t("admin")}</h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 relative">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">{t("management")}</div>
          
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-muted text-foreground font-medium">
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
            {t("dashboard")}
          </Link>
          
          <Link href="/admin/hubs" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-muted text-foreground font-medium flex-1">
            <CheckSquare className="h-5 w-5 text-muted-foreground" />
            {t("hubApprovals")}
          </Link>
          
          <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-muted text-foreground font-medium">
            <Server className="h-5 w-5 text-muted-foreground" />
            {t("globalServices")}
          </Link>
          
          <Link href="/admin/notifications" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-muted text-foreground font-medium">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {t("notifications")}
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-red-50 text-red-600 font-medium">
            <LogOut className="h-5 w-5" />
            {t("exitAdmin")}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-background border-b border-border flex items-center px-4 md:hidden justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="font-bold">{t("admin")}</span>
          </div>
          {/* Mobile menu trigger could go here */}
        </header>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
