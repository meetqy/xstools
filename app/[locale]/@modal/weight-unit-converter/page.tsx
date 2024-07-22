"use client";

import { ModalPage } from "@/components/modal-page";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { round } from "mathjs";
import { useTranslations } from "next-intl";

const _metric = ["t", "kg", "g", "mg", "ug", "pg"];
// 常衡制
const _avoirdupois = ["lb", "oz", "dr", "gr"];
// 中国传统
const _chinese = ["dan", "jin", "liang", "qian"];

export default function Page() {
  const t = useTranslations("WeightUnitConverter");

  const [unit, setUnit] = useState({
    // 公制
    t: { value: "", name: t("ton"), ratio: 0.001 },
    kg: { value: "", name: t("kilogram"), ratio: 1 },
    g: { value: "", name: t("gram"), ratio: 1e3 },
    mg: { value: "", name: t("milligram"), ratio: 1e6 },
    ug: { value: "", name: t("microgram"), ratio: 1e9 },
    pg: { value: "", name: t("picogram"), ratio: 1e12 },
    // 常衡制
    lb: { value: "", name: t("pound"), ratio: 1 / 0.45359237 },
    oz: { value: "", name: t("ounce"), ratio: 1 / 0.028349523125 },
    dr: { value: "", name: t("dram"), ratio: 1 / 0.0017718451953125 },
    gr: { value: "", name: t("grain"), ratio: 1 / 0.00006479891 },
    // 中国传统
    dan: { value: "", name: "担", ratio: 1 / 50 },
    jin: { value: "", name: "斤", ratio: 1 / 0.5 },
    liang: { value: "", name: "两", ratio: 1 / 0.05 },
    qian: { value: "", name: "钱", ratio: 1 / 0.005 },
  });

  type Unit = keyof typeof unit;

  // 在 unit 中筛选公制长度单位
  const metric = Object.fromEntries(
    Object.entries(unit).filter(([key]) => _metric.includes(key))
  ) as typeof unit;

  // 在 unit 中筛选常衡制长度单位
  const avoirdupois = Object.fromEntries(
    Object.entries(unit).filter(([key]) => _avoirdupois.includes(key))
  ) as typeof unit;

  // 在 unit 中筛选中国传统长度单位
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

        <p className="border-b text-primary">{t("avoirdupois-system")}</p>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {Object.keys(avoirdupois).map((key) => {
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

        <p className="border-b text-primary">{t("chinese-unit-of-weight")}</p>
        <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {Object.keys(chinese).map((key) => {
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
      </div>
    </ModalPage>
  );
}
