"use client";

import { ModalPage } from "@/components/modal-page";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { round } from "mathjs";
import { useTranslations } from "next-intl";

const _metric = ["km", "m", "dm", "cm", "mm", "um", "nm", "pm"];
const _british = ["nmi", "fm", "ft", "in", "mi", "fur", "yd", "mil"];
const _chinese = ["gongli", "zhang", "chi", "cun", "fen", "li", "hao"];

export default function Page() {
  const t = useTranslations("LengthUnitConverter");

  // 长度单位
  const [unit, setUnit] = useState({
    km: { value: "", name: t("kilometre"), ratio: 1e-3 },
    m: { value: "", name: t("meter"), ratio: 1 },
    dm: { value: "", name: t("decimeter"), ratio: 1e1 },
    cm: { value: "", name: t("centimeter"), ratio: 1e2 },
    mm: { value: "", name: t("millimeter"), ratio: 1e3 },
    um: { value: "", name: t("micrometer"), ratio: 1e6 },
    nm: { value: "", name: t("nanometer"), ratio: 1e9 },
    pm: { value: "", name: t("picometer"), ratio: 1e12 },
    // British
    nmi: { value: "", name: t("nautical-mile"), ratio: 1 / 1852 },
    fm: { value: "", name: t("fathom"), ratio: 1 / 1.8288 },
    ft: { value: "", name: t("foot"), ratio: 1 / 0.3048 },
    in: { value: "", name: t("inch"), ratio: 1 / 0.0254 },
    mi: { value: "", name: t("mile"), ratio: 1 / 1609.344 },
    fur: { value: "", name: t("furlong"), ratio: 1 / 201.168 },
    yd: { value: "", name: t("yard"), ratio: 1 / 0.9144 },
    mil: { value: "", name: t("mil"), ratio: 1 / 0.0000254 },
    // Chinese
    gongli: { value: "", name: t("gong-li"), ratio: 1e-3 },
    zhang: { value: "", name: t("zhang"), ratio: 1 / 10 },
    chi: { value: "", name: t("chi"), ratio: 1 },
    cun: { value: "", name: t("cun"), ratio: 10 },
    fen: { value: "", name: t("fen"), ratio: 100 },
    li: { value: "", name: t("li"), ratio: 1000 },
    hao: { value: "", name: t("hao"), ratio: 10000 },
  });

  type Unit = keyof typeof unit;

  // 在 unit 中筛选公制长度单位
  const metric = Object.fromEntries(
    Object.entries(unit).filter(([key]) => _metric.includes(key))
  ) as typeof unit;

  // 在 unit 中筛选英制长度单位
  const british = Object.fromEntries(
    Object.entries(unit).filter(([key]) => _british.includes(key))
  ) as typeof unit;

  // 在 unit 中筛选市制长度单位
  const chinese = Object.fromEntries(
    Object.entries(unit).filter(([key]) => _chinese.includes(key))
  ) as typeof unit;

  // 输入时，计算其他长度单位的值
  const handleInputChange = (key: Unit, value: string) => {
    const num = parseFloat(value);

    if (!value) {
      setUnit((prev) => {
        const newUnit = { ...prev };

        Object.keys(newUnit).forEach((k) => {
          newUnit[k as Unit].value = "";
        });

        return newUnit;
      });
    }

    if (isNaN(num)) return;

    setUnit((prev) => {
      const newUnit = { ...prev, [key]: { ...prev[key], value } };

      // 计算其他长度单位的值
      Object.keys(newUnit).forEach((k) => {
        if (k === key) return;

        const item = newUnit[k as Unit];
        item.value = round((num / prev[key].ratio) * item.ratio, 6).toString();
      });

      return newUnit;
    });
  };

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
      <div className="space-y-4">
        <p className="border-b text-primary">{t("metric-system")}</p>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {Object.keys(metric).map((key) => {
            const item = unit[key as Unit];

            return (
              <Input
                key={key}
                label={`${item.name}(${key})`}
                variant="faded"
                value={item.value}
                onValueChange={(value) => handleInputChange(key as Unit, value)}
                labelPlacement="outside"
                placeholder=" "
                type="number"
              />
            );
          })}
        </section>

        <p className="border-b text-primary">{t("british-system")}</p>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {Object.keys(british).map((key) => {
            const item = british[key as Unit];

            return (
              <Input
                key={key}
                label={`${item.name}(${key})`}
                variant="faded"
                value={item.value}
                onValueChange={(value) => handleInputChange(key as Unit, value)}
                labelPlacement="outside"
                placeholder=" "
                type="number"
              />
            );
          })}
        </section>

        <p className="border-b text-primary">
          {t("the-chinese-system-of-weights-and-measures")}
        </p>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {Object.keys(chinese).map((key) => {
            const item = chinese[key as Unit];

            return (
              <Input
                key={key}
                label={`${item.name}(${key})`}
                variant="faded"
                value={item.value}
                onValueChange={(value) => handleInputChange(key as Unit, value)}
                labelPlacement="outside"
                placeholder=" "
                type="number"
              />
            );
          })}
        </section>
      </div>
    </ModalPage>
  );
}
