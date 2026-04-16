"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, MessageSquare, Loader2, LogIn, Edit2, Check, X } from "lucide-react";
import { submitHubReview } from "@/src/actions/hubs";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  user: { id: number; name: string } | null;
  created_at?: string;
}

interface HubReviewsProps {
  hubSlug: string;
  reviews: Review[];
  isAuthenticated: boolean;
  /** The authenticated user's existing review (null if they haven't reviewed yet) */
  myReview: Review | null;
  averageRating?: number;
}

function StarRating({
  value,
  onChange,
  readOnly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const dim = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";
  const display = readOnly ? value : hovered || value;

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={readOnly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`${dim} transition-colors ${
              star <= display
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const locale = useLocale();
  const dateStr = review.created_at
    ? new Date(review.created_at).toLocaleDateString(locale === "ar" ? "ar-PS" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="p-5 rounded-2xl border border-border bg-background shadow-sm space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
            {(review.user?.name || "?")[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{review.user?.name || "Anonymous"}</p>
            {dateStr && <p className="text-[11px] text-muted-foreground">{dateStr}</p>}
          </div>
        </div>
        <StarRating value={review.rating} readOnly size="sm" />
      </div>
      {review.comment && (
        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
      )}
    </div>
  );
}

export default function HubReviews({
  hubSlug,
  reviews,
  isAuthenticated,
  myReview,
  averageRating,
}: HubReviewsProps) {
  const t = useTranslations("HubReviews");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [rating, setRating] = useState(myReview?.rating ?? 0);
  const [comment, setComment] = useState(myReview?.comment ?? "");
  const [isEditing, setIsEditing] = useState(!myReview); // start in edit mode if no review yet

  const avg = averageRating ?? (reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error(t("ratingRequired"));
      return;
    }
    startTransition(async () => {
      const res = await submitHubReview(hubSlug, rating, comment, !!myReview);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(myReview ? t("updated") : t("submitted"));
        setIsEditing(false);
        router.refresh();
      }
    });
  };

  const handleCancel = () => {
    setRating(myReview?.rating ?? 0);
    setComment(myReview?.comment ?? "");
    setIsEditing(false);
  };

  return (
    <section id="reviews" className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{t("title")}</h2>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-2xl">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-700 text-lg">{avg.toFixed(1)}</span>
            <span className="text-amber-600 text-sm">/ 5</span>
            <span className="text-muted-foreground text-xs ms-1">
              ({reviews.length} {t("reviewCount", { count: reviews.length })})
            </span>
          </div>
        )}
      </div>

      {/* ── Review Form / Prompt ── */}
      {isAuthenticated ? (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Form header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">
              {myReview ? t("yourReview") : t("leaveReview")}
            </h3>
            {myReview && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <Edit2 className="h-3.5 w-3.5" />
                {t("edit")}
              </button>
            )}
          </div>

          {/* Existing review (read-only) */}
          {myReview && !isEditing && (
            <div className="px-6 py-5 space-y-3">
              <StarRating value={myReview.rating} readOnly size="lg" />
              {myReview.comment && (
                <p className="text-sm text-muted-foreground leading-relaxed">{myReview.comment}</p>
              )}
            </div>
          )}

          {/* Form (new or editing) */}
          {isEditing && (
            <div className="px-6 py-5 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("yourRating")}
                </label>
                <StarRating value={rating} onChange={setRating} size="lg" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("commentLabel")}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder={t("commentPlaceholder")}
                  className="w-full px-4 py-3 border border-input rounded-xl bg-background text-sm resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div className="flex gap-3 justify-end">
                {myReview && (
                  <button
                    onClick={handleCancel}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    <X className="h-4 w-4" />
                    {t("cancel")}
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isPending || rating === 0}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {myReview ? t("saveChanges") : t("submit")}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── Sign-in prompt ── */
        <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center space-y-3">
          <LogIn className="h-8 w-8 text-muted-foreground mx-auto" />
          <p className="font-medium text-foreground">{t("loginToReview")}</p>
          <p className="text-sm text-muted-foreground">{t("loginDesc")}</p>
          <Link
            href={`/${locale}/signin`}
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
          >
            <LogIn className="h-4 w-4" />
            {t("signIn")}
          </Link>
        </div>
      )}

      {/* ── Reviews list ── */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center space-y-2 text-muted-foreground">
          <MessageSquare className="h-10 w-10 mx-auto opacity-30" />
          <p className="font-medium">{t("noReviews")}</p>
          <p className="text-sm">{t("beFirst")}</p>
        </div>
      )}
    </section>
  );
}
