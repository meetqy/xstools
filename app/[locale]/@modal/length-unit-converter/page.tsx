"use client";

import { ModalPage } from "@/components/modal-page";
import { Input } from "@nextui-org/react";
import { useState } from "react";

const _metric = ["km", "m", "dm", "cm", "mm", "um", "nm", "pm"];
const _british = ["nmi", "fm", "ft", "in", "mi", "fur", "yd", "mil"];
const _chinese = ["gongli", "zhang", "chi", "cun", "fen", "li", "hao"];

export default function Page() {
  // 长度单位
  const [unit, setUnit] = useState({
    km: { value: "", name: "千米", ratio: 1e-3 },
    m: { value: "", name: "米", ratio: 1 },
    dm: { value: "", name: "分米", ratio: 1e1 },
    cm: { value: "", name: "厘米", ratio: 1e2 },
    mm: { value: "", name: "毫米", ratio: 1e3 },
    um: { value: "", name: "微米", ratio: 1e6 },
    nm: { value: "", name: "纳米", ratio: 1e9 },
    pm: { value: "", name: "皮米", ratio: 1e12 },
    // 英制
    nmi: { value: "", name: "海里", ratio: 1 / 1852 },
    fm: { value: "", name: "英寻", ratio: 1 / 1.8288 },
    ft: { value: "", name: "英尺", ratio: 1 / 0.3048 },
    in: { value: "", name: "英寸", ratio: 1 / 0.0254 },
    mi: { value: "", name: "英里", ratio: 1 / 1609.344 },
    fur: { value: "", name: "弗隆", ratio: 1 / 201.168 },
    yd: { value: "", name: "码", ratio: 1 / 0.9144 },
    mil: { value: "", name: "密尔", ratio: 1 / 0.0000254 },
    // 市制
    gongli: { value: "", name: "公里", ratio: 1 / 500 },
    zhang: { value: "", name: "丈", ratio: 1 / 10 },
    chi: { value: "", name: "尺", ratio: 1 },
    cun: { value: "", name: "寸", ratio: 10 },
    fen: { value: "", name: "分", ratio: 100 },
    li: { value: "", name: "厘", ratio: 1000 },
    hao: { value: "", name: "毫", ratio: 10000 },
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
        item.value = (num / prev[key].ratio) * item.ratio + "";
      });

      return newUnit;
    });
  };

  return (
    <ModalPage
      header={
        <>
          <h1 className="text-large">Length Unit Converter</h1>
          <p className="font-normal text-default-500 text-medium">
            Quickly Convert Between Different Units of Length
          </p>
        </>
      }
    >
      <div className="space-y-4">
        <p className="border-b text-primary">公制</p>
        <section className="grid grid-cols-4 gap-4">
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

        <p className="border-b text-primary">英制</p>
        <section className="grid grid-cols-4 gap-4">
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

        <p className="border-b text-primary">市制</p>
        <section className="grid grid-cols-4 gap-4">
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
