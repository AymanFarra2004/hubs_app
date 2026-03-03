import React from 'react'
import {Link, usePathname} from '@/src/i18n/routing'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="..."
            >
              {/* Translate the label using the key */}
              {t(`nav.${link.labelKey}`)} 
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 border-l border-border pl-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="..."
            aria-label={t('aria.toggleTheme')}
          >
            {/* Icons remain the same */}
          </button>
          
          <Link href="/sign-in" className="...">
            {t('auth.signIn')}
          </Link>
          <Link href="/sign-up" className="...">
            {t('auth.signUp')}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation - use the same t('nav.key') and t('auth.key') pattern here */}
    </>
  );
}