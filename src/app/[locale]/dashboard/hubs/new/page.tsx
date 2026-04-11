"use client";

import { MapPin, Info, Loader2 } from "lucide-react";
import BasicInfo from "../../../components/submit/BasicInfo";
import ServicesPricing from "../../../components/submit/ServicesPricing";
import UploadPhoto from "../../../components/submit/UploadPhoto";
import { useState } from "react";
import { useRouter } from "@/src/i18n/routing";
import { createHub } from "@/src/actions/hubs";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function SubmitHub() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("NewHub");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await createHub(null, formData);
      if (result?.success) {
        toast.success("Hub created successfully!");
        // Small delay to ensure the toast is seen and server revalidation propagates
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error(result?.error ?? "Something went wrong.");
        setError(result?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
          <MapPin className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg">
          {t("description")}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm p-4 sm:p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <BasicInfo />

          {/* Services & Pricing & Contact */}
          <ServicesPricing />

          {/* Photos */}
          <UploadPhoto />

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 text-sm text-muted-foreground">
            <Info className="h-5 w-5 text-primary flex-shrink-0" />
            <p>
              {t("disclaimer")}
            </p>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3 mt-8">
            <a
              href="/dashboard"
              className="px-6 py-2 rounded-md border border-input text-foreground font-medium hover:bg-muted transition-colors text-center"
            >
              {t("cancel")}
            </a>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex gap-2 items-center"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("submit")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
