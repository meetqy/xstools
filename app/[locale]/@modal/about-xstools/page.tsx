"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ModalPage } from "@/components/modal-page";
import { Select, SelectItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import { useRouter } from "@/navigation";
import { Locale } from "@/config/locale";

const languages = {
  en: [
    { icon: "🇨🇳", name: "Chinese", abbr: "zh" },
    { icon: "🇺🇸", name: "English", abbr: "en" },
  ],
  zh: [
    { icon: "🇨🇳", name: "中文", abbr: "zh" },
    { icon: "🇺🇸", name: "英文", abbr: "en" },
  ],
};

export default function App() {
  const t = useTranslations("About");
  const params = useParams();
  const locale = (params["locale"] || "en") as Locale;
  const router = useRouter();

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
      <div className="grid grid-cols-3 p-2">
        <div className="flex items-center gap-2">
          <Select
            label={t("language")}
            placeholder="Select language"
            size="lg"
            startContent={
              <Icon icon="lucide:languages" className="w-6 h-6 text-primary" />
            }
            defaultSelectedKeys={[locale]}
            onChange={(e) => {
              const lang = e.target.value as Locale;

              router.replace("/about-xstools", { locale: lang });
            }}
            variant="bordered"
          >
            {languages[locale].map((lang) => (
              <SelectItem
                key={lang.abbr}
                value={lang.abbr}
                startContent={lang.icon}
              >
                {lang.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </ModalPage>
  );
}
