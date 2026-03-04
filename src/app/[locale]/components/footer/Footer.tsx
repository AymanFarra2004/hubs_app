import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight text-foreground">
                Habbat
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Empowering communities in Gaza by connecting people to essential 
              hubs that provide internet, electricity, and safe workspaces.
            </p>
            <div className="flex space-x-4 text-muted-foreground">
              <span className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" /> support@habbat.example.com
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/hubs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Hubs
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Submit a Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Hub Owner Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Habbat Connect. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-1">
            Built for Gaza <span className="text-red-500">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}