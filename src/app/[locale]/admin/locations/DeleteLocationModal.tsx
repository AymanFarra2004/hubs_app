"use client";

import { useState } from "react";
import { AlertTriangle, X, Trash2, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<{ success?: boolean; error?: string }>;
  locationName: string;
  hasChildren: boolean;
}

export default function DeleteLocationModal({
  isOpen,
  onClose,
  onConfirm,
  locationName,
  hasChildren
}: DeleteLocationModalProps) {
  const t = useTranslations("AdminLocations");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (hasChildren) return;
    
    setIsDeleting(true);
    setError(null);
    try {
      const result = await onConfirm();
      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Failed to delete");
      }
    } catch (err: any) {
      setError("Network or System Error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-background w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border bg-destructive/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-xl text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {t("confirmDeleteTitle")}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {hasChildren ? (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl flex gap-3 text-orange-800 dark:text-orange-300">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <div className="space-y-1">
                <p className="font-bold">{t("deleteErrorHasChildren")}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed">
              {t("confirmDeleteDesc", { name: locationName })}
            </p>
          )}

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-center gap-3 text-destructive text-sm font-medium">
              <X className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-colors"
            >
              {t("cancel")}
            </button>
            {!hasChildren && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 bg-destructive text-white font-semibold rounded-2xl hover:bg-destructive/90 transition-all disabled:opacity-50 shadow-lg shadow-destructive/20"
              >
                {isDeleting ? "..." : t("deleteLocation")}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
