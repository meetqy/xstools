"use client";

import { ModalPage } from "@/components/modal-page";
import { api } from "@/trpc/react";
import { useTranslations } from "next-intl";

export default function App() {
  const t = useTranslations("AiSlugGenerator");
  const { data } = api.aiSlugGenerator.hello.useQuery({ text: "123" });

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
    >
      {data?.greeting}
    </ModalPage>
  );
}
