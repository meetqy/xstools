"use client";

import { ModalPage } from "@/components/modal-page";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
  // 公制长度单位
  const [metric, setMetric] = useState({
    km: { value: "", name: "千米", ratio: 1e-3 },
    m: { value: "", name: "米", ratio: 1 },
    dm: { value: "", name: "分米", ratio: 1e1 },
    cm: { value: "", name: "厘米", ratio: 1e2 },
    mm: { value: "", name: "毫米", ratio: 1e3 },
    um: { value: "", name: "微米", ratio: 1e6 },
    nm: { value: "", name: "纳米", ratio: 1e9 },
    pm: { value: "", name: "皮米", ratio: 1e12 },
  });

  // 英制长度单位
  const [british, setBritish] = useState({
    nmi: { value: "", name: "海里", ratio: 1 / 1852 },
    fm: { value: "", name: "英寻", ratio: 1 / 1.8288 },
    ft: { value: "", name: "英尺", ratio: 1 / 0.3048 },
    in: { value: "", name: "英寸", ratio: 1 / 0.0254 },
    mi: { value: "", name: "英里", ratio: 1 / 1609.344 },
    fur: { value: "", name: "弗隆", ratio: 1 / 201.168 },
    yd: { value: "", name: "码", ratio: 1 / 0.9144 },
    mil: { value: "", name: "密尔", ratio: 1 / 0.0000254 },
  });

  type Metric = keyof typeof metric;
  type British = keyof typeof british;

  // 输入时，计算其他长度单位的值
  const handleInputChange = (key: Metric, value: string) => {
    const num = parseFloat(value);

    if (!value) {
      setMetric((prev) => {
        const newMetric = { ...prev };

        Object.keys(newMetric).forEach((k) => {
          newMetric[k as Metric].value = "";
        });

        return newMetric;
      });
    }

    if (isNaN(num)) return;

    setMetric((prev) => {
      const newMetric = { ...prev, [key]: { ...prev[key], value } };

      // 计算其他长度单位的值
      Object.keys(newMetric).forEach((k) => {
        if (k === key) return;

        const item = newMetric[k as Metric];
        item.value = (num / prev[key].ratio) * item.ratio + "";
      });

      return newMetric;
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
            const item = metric[key as Metric];

            return (
              <Input
                key={key}
                label={`${item.name}(${key})`}
                variant="faded"
                value={item.value}
                onValueChange={(value) =>
                  handleInputChange(key as Metric, value)
                }
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
            const item = british[key as British];

            return (
              <Input
                key={key}
                label={`${item.name}(${key})`}
                variant="faded"
                value={item.value}
                onValueChange={(value) =>
                  handleInputChange(key as Metric, value)
                }
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
