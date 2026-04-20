"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { motion } from "framer-motion";
import { Settings, Construction, ArrowLeft, Sparkles, Rocket } from "lucide-react";

export default function SettingsComingSoonPage() {
  const t = useTranslations("ComingSoon");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-background border border-border rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-primary/5 relative overflow-hidden text-center"
        >
          {/* Animated Gradient Border Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
          
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-10 text-primary/20"
          >
            <Sparkles className="h-12 w-12" />
          </motion.div>

          <div className="relative z-10 space-y-8">
            {/* Icon Section */}
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="bg-primary/10 p-8 rounded-full"
                >
                  <Settings className="h-16 w-16 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -bottom-2 -right-2 bg-background border-4 border-background p-3 rounded-2xl shadow-lg"
                >
                  <Construction className="h-8 w-8 text-orange-500" />
                </motion.div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest"
              >
                <Rocket className="h-3 w-3" />
                {t("settings")}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-6xl font-black text-foreground tracking-tight"
              >
                {t("title")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
              >
                {t("description")}
              </motion.p>
            </div>

            {/* Progress Bar (Visual only) */}
            <div className="max-w-xs mx-auto space-y-2">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Development Progress: 65%</p>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-bold hover:scale-105 transition-all active:scale-95 shadow-xl shadow-foreground/10 group"
              >
                <ArrowLeft className="h-5 w-5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
                {t("back")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
