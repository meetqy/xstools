"use client";

import { ModalPage } from "@/components/modal-page";
import {
  Button,
  DateInput,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { astro } from "iztro";
import { useState } from "react";
import { CalendarDate } from "@internationalized/date";

const langs = {
  en: "en-US",
  zh: "zh-CN",
};

export default function Page() {
  const t = useTranslations("PurpleStarAstrology");
  const locale = useLocale();

  const [params, setParams] = useState({
    birthday: [2024, 7, 23],
    country: langs[locale as keyof typeof langs],
    gender: "",
  });

  const getAstro = () => {
    const astrolabe = astro.bySolar(
      params.birthday.join("-"),
      2,
      params.gender as "男" | "女",
      true,
      params.country as "en-US" | "zh-CN"
    );
    console.log(params.gender, astrolabe);
  };

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
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 grid gap-4 bg-content2 p-4 shadow-medium rounded-medium">
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
            <Radio value={"女"}>Female</Radio>
            <Radio value={"男"}>Male</Radio>
          </RadioGroup>
          <Button
            className="ml-auto"
            fullWidth
            color="primary"
            onPress={getAstro}
          >
            Get Astro
          </Button>
        </div>

        <div className="col-span-2"></div>
      </div>
    </ModalPage>
  );
}
