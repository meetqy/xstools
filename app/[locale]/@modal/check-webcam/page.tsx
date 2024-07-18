"use client";
import { ModalPage } from "@/components/modal-page";
import { useTranslations } from "next-intl";

export default function App() {
  const t = useTranslations("CheckWebcam");

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
