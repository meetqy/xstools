"use client";

import { ModalPage } from "@/components/modal-page";
import {
  Badge,
  Button,
  Chip,
  DateInput,
  // Radio,
  // RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { astro } from "iztro";
import { useEffect, useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { Icon } from "@iconify/react";
import FunctionalAstrolabe from "iztro/lib/astro/FunctionalAstrolabe";

const langs = {
  en: "en-US",
  zh: "zh-CN",
};

export default function Page() {
  const t = useTranslations("PurpleStarAstrology");
  const locale = useLocale();

  const data = {
    suitable: ["沟通", "计划", "理解", "休息", "联络", "锻炼"],
    avoid: ["冲动", "急躁", "超支", "高风险", "忽视", "过劳"],
  };

  const [params, setParams] = useState({
    birthday: [1990, 1, 1],
    country: langs[locale as keyof typeof langs],
    gender: "",
  });

  const [astrolabe, setAstrolabe] = useState<FunctionalAstrolabe>();

  const getAstro = () => {
    const _astrolabe = astro.bySolar(
      params.birthday.join("-"),
      2,
      params.gender as "男" | "女",
      true,
      params.country as "en-US" | "zh-CN"
    );

    setAstrolabe(_astrolabe);
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
          {/* <RadioGroup
            label="Select Gender"
            orientation="horizontal"
            onChange={(e) => {
              setParams({ ...params, gender: e.target.value });
            }}
          >
            <Radio value={"女"}>Female</Radio>
            <Radio value={"男"}>Male</Radio>
          </RadioGroup> */}
          <Button
            className="ml-auto"
            fullWidth
            color="primary"
            onPress={getAstro}
          >
            Get Astro
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
                基本信息
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

            <div className="text-left gap-2 grid">
              <div className="flex flex-wrap gap-2 items-center">
                {"宜"}
                {data.suitable.map((item, index) => (
                  <Chip key={index} variant="flat" color="success">
                    {item}
                  </Chip>
                ))}{" "}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {"忌"}
                {data.avoid.map((item, index) => (
                  <Chip key={index} variant="flat" color="danger">
                    {item}
                  </Chip>
                ))}{" "}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className="p-4 shadow-medium rounded-medium mt-4 max-w-5xl mx-auto">
        <article className="prose max-w-full mx-auto">
          <h3 id="-">总结</h3>
          <p>
            今天的你需要保持冷静和理性，在面对挑战时找到平衡。注意人际关系的处理，财务上保持稳健，健康上要关注身体的需要。通过这些方式，你可以度过一个充实而富有成效的一天。
          </p>
          <p>
            <b>注意事项</b>
          </p>
          <ul>
            <li>
              <strong>情绪管理</strong>
              ：今天可能会有一些情绪波动，尝试找到释放压力的方法，如冥想、运动或与朋友交流。
            </li>
            <li>
              <strong>决策</strong>
              ：在做重要决定之前，多考虑不同的选项，避免冲动行事。
            </li>
            <li>
              <strong>财务</strong>
              ：谨慎处理财务事务，避免高风险投资和冲动消费。
            </li>
          </ul>
        </article>
      </div>

      <div className="grid grid-cols-2 max-w-5xl gap-4 mx-auto w-full">
        <article className="shadow-medium prose rounded-medium p-4">
          <h3 id="-">占星学</h3>
          <p>你的太阳星座是双鱼座：</p>
          <ul>
            <li>
              <strong>性格特点</strong>
              ：双鱼座的人通常非常感性、富有同情心和直觉力。你可能在艺术和创造性的领域中表现出色。
            </li>
            <li>
              <strong>今天的运势</strong>：
              <ul>
                <li>
                  <strong>事业</strong>
                  ：今天你可能会感受到一些挑战，特别是在沟通和合作方面。尝试保持冷静，不要急于做决定。
                </li>
                <li>
                  <strong>财富</strong>
                  ：财务方面可能会有一些小波动，避免冲动消费。今天是适合计划和预算的好时机。
                </li>
                <li>
                  <strong>感情</strong>
                  ：感情生活可能会有一些起伏，尽量多花时间与伴侣沟通，理解彼此的需求和感受。
                </li>
                <li>
                  <strong>健康</strong>：注意饮食和休息，不要让自己过度劳累。
                </li>
              </ul>
            </li>
          </ul>
        </article>

        <article className="shadow-medium prose rounded-medium p-4">
          <h3 id="-">数秘学</h3>
          <p>
            你的生命路径数字是
            8（将1990-02-23的数字相加，1+9+9+0+0+2+2+3=26，2+6=8）：
          </p>
          <ul>
            <li>
              <strong>性格特点</strong>
              ：生命路径数字为8的人通常具有强烈的野心、决心和领导才能。你可能在事业和财富方面有很强的追求。
            </li>
            <li>
              <strong>今天的运势</strong>：
              <ul>
                <li>
                  <strong>事业</strong>
                  ：今天是一个适合展示你领导才能的日子。可能会有机会让你在工作中脱颖而出。
                </li>
                <li>
                  <strong>财富</strong>
                  ：8号人通常财运较好，但今天需要特别注意投资风险，避免高风险的金融决策。
                </li>
                <li>
                  <strong>人际关系</strong>
                  ：今天适合与朋友和家人联络，建立更紧密的关系。
                </li>
                <li>
                  <strong>健康</strong>
                  ：保持锻炼和健康的饮食习惯，有助于提升你的整体状态。
                </li>
              </ul>
            </li>
          </ul>
        </article>
      </div> */}
    </ModalPage>
  );
}
