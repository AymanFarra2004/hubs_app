"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function HubsHeader() {
  const t = useTranslations("HubsPage");

  return (
    <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl">
            {t("description")}
        </p>
    </div>
  )
}