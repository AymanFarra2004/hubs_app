'use client'

import { Link } from '@/src/i18n/routing'
import { MapPin, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Header } from "@/components/header/Header"

export default function SignUpPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      
      <div className="flex-1 flex flex-col md:flex-row-reverse">
        
        {/* Right side - Form Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="w-full max-w-sm">
            
            <Link href="/" className="flex items-center gap-2 mb-10">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight text-foreground">
                Habbat
              </span>
            </Link>

            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Join Habbat to manage a hub or save locations.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">Full Name</label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-input rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-colors"
                    placeholder="Ahmed Al-Masri"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email address</label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-input rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-input rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center justify-center gap-2 p-3 border border-input rounded-xl cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <input type="radio" name="accountType" value="user" className="hidden" defaultChecked />
                    <span className="text-sm font-medium">Regular User</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 border border-input rounded-xl cursor-pointer hover:bg-muted/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <input type="radio" name="accountType" value="owner" className="hidden" />
                    <span className="text-sm font-medium">Hub Owner</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-all"
              >
                Create account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Left side - Image Container */}
        <div className="hidden md:block md:flex-1 relative">
          <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-background/10 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1500&auto=format&fit=crop')" }}
          />
          <div className="absolute inset-0 bg-black/30 z-0" />
          <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
            <blockquote className="text-2xl font-bold leading-relaxed mb-4">
              "We are stronger together. Join the network of resilience."
            </blockquote>
            <p className="text-white/80 font-medium">— Habbat Community</p>
          </div>
        </div>
      </div>
    </div>
  )
}