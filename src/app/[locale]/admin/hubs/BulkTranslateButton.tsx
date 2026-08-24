"use client";

import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { bulkBackfillHubTranslations } from "@/src/actions/hubs";
import { toast } from "react-hot-toast";
import { useRouter } from "@/src/i18n/routing";

export default function BulkTranslateButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBulkTranslate = async () => {
    setLoading(true);
    toast("Translating missing English fields for hubs via AI...");

    try {
      const res = await bulkBackfillHubTranslations();
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message || "Bulk translation complete!");
        router.refresh();
      }
    } catch (e) {
      toast.error("Failed to run bulk translation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBulkTranslate}
      disabled={loading}
      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 shadow-sm"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Languages className="h-4 w-4" />
      )}
      {loading ? "Translating Hubs..." : "Auto-Translate All Hubs"}
    </button>
  );
}
