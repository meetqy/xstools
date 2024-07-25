"use client";

import { ModalPage } from "@/components/modal-page";
import {
  Button,
  DateInput,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { astro } from "iztro";
import { useEffect, useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { Icon } from "@iconify/react";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const langs = {
  en: "en-US",
  zh: "zh-CN",
};

export default function Page() {
  const t = useTranslations("PurpleStarAstrology");
  const locale = useLocale();

  const run = api.purpleStarAstrology.run.useMutation({
    onSuccess(data) {
      data = data.replace("```json", "").replace("```", "");
      data = JSON.parse(data);
      console.log(data);

      const _astrolabe = astro.bySolar(
        params.birthday.join("-"),
        2,
        params.gender as "男" | "女",
        true,
        params.country as "en-US" | "zh-CN"
      );

      setData(data);
      setAstrolabe(_astrolabe);
    },
  });

  const [data, setData] = useState<{ suitable: string[]; avoid: string[] }>();

  const [params, setParams] = useState({
    birthday: [1990, 1, 1],
    country: langs[locale as keyof typeof langs],
    gender: "",
  });

  const [astrolabe, setAstrolabe] = useState<FunctionalAstrolabe>();

  const getAstro = () => {
    if (!params.gender) return toast.error("Please select Gender");

    run.mutate({
      birth_date: params.birthday.join("-"),
      lang: params.country,
      gender: params.gender,
    });
  };

  useEffect(() => {
    getAstro();
  }, []);

  const dateValue = new CalendarDate(
    params.birthday[0],
    params.birthday[1],
    params.birthday[2]
  );

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
      <div className="grid md:grid-cols-3 max-w-5xl w-full gap-4 mx-auto">
        <div className="md:col-span-1 grid gap-4 bg-content2 p-4 shadow-medium rounded-medium">
          <DateInput
            label="Birthday"
            variant="bordered"
            labelPlacement="outside"
            value={dateValue}
            onChange={(date) => {
              setParams({
                ...params,
                birthday: [date.year, date.month, date.day],
              });
            }}
          />
          <Select
            label="Select Country"
            placeholder="Select Country"
            labelPlacement="outside"
            variant="bordered"
            selectedKeys={[params.country]}
            onChange={(e) => {
              setParams({ ...params, country: e.target.value });
            }}
          >
            <SelectItem key="en-US">{"United States"}</SelectItem>
            <SelectItem key="zh-CN">{"中国"}</SelectItem>
          </Select>
          <RadioGroup
            label="Select Gender"
            orientation="horizontal"
            onChange={(e) => {
              setParams({ ...params, gender: e.target.value });
            }}
          >
            <Radio value={"女"}>{t("female")}</Radio>
            <Radio value={"男"}>{t("male")}</Radio>
          </RadioGroup>
          <Button
            className="ml-auto"
            fullWidth
            color="primary"
            onPress={getAstro}
          >
            {t("get-astro")}
          </Button>
        </div>

        {astrolabe && (
          <div className="md:col-span-2 text-center rounded-medium border p-4 bg-background">
            <h2 className="text-large font-medium border-dashed border-b pb-4">
              <span className="flex items-center">
                <Icon
                  icon={"material-symbols:female"}
                  className="text-secondary w-6 h-6 relative -top-[1px]"
                />{" "}
                {t("basic-information")}
              </span>
            </h2>

            <div className="grid md:grid-cols-2 py-4 gap-2 text-left">
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"五行局"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.fiveElementsClass}
                </span>
              </div>
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"四柱"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.chineseDate.replace(/\s-\s/g, ",")}
                </span>
              </div>
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"农历"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.lunarDate}
                </span>
              </div>
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"阳历"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.solarDate}
                </span>
              </div>
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"年龄"}</span>
                <span className="text-primary col-span-3">
                  {new Date().getFullYear() - params.birthday[0] + 1}
                </span>
              </div>
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"生肖"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.zodiac}
                </span>
              </div>
              {/* <div className="grid grid-cols-4">
                <span className="text-default-500">时辰</span>
                <span className="text-primary col-span-3">
                  {astrolabe.time} {astrolabe.timeRange}
                </span>
              </div> */}
              <div className="grid grid-cols-4">
                <span className="text-default-500">{"星座"}</span>
                <span className="text-primary col-span-3">
                  {astrolabe.sign}
                </span>
              </div>
            </div>

            {data && (
              <p className="text-warning text-left">
                {"忌："}
                {data.avoid.join(", ")}
              </p>
            )}

            {data && (
              <p className="text-success text-left">
                {"宜："}
                {data.suitable.join(", ")}
              </p>
            )}
          </div>
        )}
      </div>
    </ModalPage>
  );
}
