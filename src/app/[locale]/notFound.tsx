"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Large 404 text with gradient */}
          <div className="relative inline-block">
            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-9xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/40 select-none"
            >
              {t("error404")}
            </motion.h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 blur-xl">
               <span className="text-9xl md:text-[12rem] font-black text-primary">{t("error404")}</span>
            </div>
          </div>

          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              {t("title")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 group w-full sm:w-auto justify-center"
            >
              <Home className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              {t("backHome")}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-muted text-muted-foreground rounded-2xl font-bold hover:bg-muted/80 hover:text-foreground transition-all active:scale-95 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
              {t("backHome") === "Back to Home" ? "Go Back" : "الرجوع للخلف"}
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Icons for extra flair */}
        <motion.div
           animate={{ 
             y: [0, -15, 0],
             rotate: [0, 5, 0]
           }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-10 -left-10 p-4 bg-background border border-border rounded-2xl shadow-xl hidden lg:block"
        >
           <FileQuestion className="h-8 w-8 text-primary" />
        </motion.div>
      </div>
    </div>
  );
}
