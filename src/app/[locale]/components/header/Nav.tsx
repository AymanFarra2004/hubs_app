import React from 'react'
import {Link, usePathname} from '@/src/i18n/routing'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/src/store/authSlice";
import { useRouter } from "@/src/i18n/routing";
import { logoutUser } from "@/src/actions/auth";
const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/services", labelKey: "services" },
  { href: "/contact", labelKey: "contact" },
];

export default function Nav({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (isOpen: boolean) => void}) {
    const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Header");
  const router = useRouter();

 const auth = useSelector((state: any) => state.auth);

const isLoggedIn = !!(auth && auth.isLoggedIn);
const isHubOwner = isLoggedIn && auth?.user?.role === "hub_owner";
const isAdmin = isLoggedIn && auth?.user?.role === "admin";

    const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    localStorage.removeItem("token"); // Fallback for any legacy client storage
    
    router.push("/");
  };
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer ..."
            >
              {/* Translate the label using the key */}
              {t(`nav.${link.labelKey}`)} 
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 border-l border-border pl-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer ..."
            aria-label={t('aria.toggleTheme')}
          >
            {/* Icons remain the same */}
          </button>
          
          {!isLoggedIn && (
            <Link href="/sign-in" className="cursor-pointer ...">
              {t('auth.signIn')}
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/sign-up" className="cursor-pointer ...">
              {t('auth.signUp')}
          </Link>)}
         {isLoggedIn && (
            <div className="flex items-center space-x-4">
              {isHubOwner && (
                <Link 
                  href="/dashboard"
                  className="cursor-pointer px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl transition-colors font-medium text-sm"
                >
                  Dashboard
                </Link>
              )}
              {isAdmin && (
                <Link 
                  href="/admin"
                  className="cursor-pointer px-4 py-2 bg-red-100/50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 rounded-xl transition-colors font-medium text-sm"
                >
                  Admin Dash
                </Link>
              )}
              <span className="text-sm font-medium text-foreground">
                Hello, {auth?.user?.name || "U"}
              </span>
              <button 
                onClick={handleLogout}
                className="cursor-pointer text-red-500 hover:text-red-700"
              >
                Log out 
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation - use the same t('nav.key') and t('auth.key') pattern here */}
    </>
  );
}