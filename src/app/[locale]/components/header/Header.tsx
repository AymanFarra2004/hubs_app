"use client";

import * as React from "react";
import {Link} from '@/src/i18n/routing';
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X, MapPin } from "lucide-react";
import Nav from "./Nav";
import { useTranslations } from "next-intl";

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const t = useTranslations("Header"); 

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Habbat
              </span>
            </Link>
          </div>

          <Nav isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

     
    </nav>
  );
}