"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ModalPage } from "@/components/modal-page";

export default function App() {
  const t = useTranslations("About");

  return (
    <ModalPage
      header={
        <>
          <h1 className="text-large">{t("title")}</h1>
          <p className="font-normal text-default-500 text-medium">
            {t("description")}
          </p>
        </>
      }
    />
  );
}
