"use client";
import { ModalPage } from "@/components/modal-page";
import { api } from "@/trpc/react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { User } from "./data";
import { jsonValuesToString } from "@/utils/jsonValuesToString";
import toast from "react-hot-toast";

const options = {
  en: "United States",
  zh: "china",
  ko: "Korea",
  ja: "Japan",
};

export default function Page() {
  const t = useTranslations("AiGeneratorFakeUser");
  const locale = useLocale();

  const run = api.aiGeneratorFakeUser.run.useMutation({
    onSuccess(data) {
      data = data.replace("```json", "").replace("```", "");
      setHistory(JSON.parse(data));
      setData(JSON.parse(data));
    },
  });
  const [country, setCountry] = useState<string>(locale);
  const [history, setHistory] = useLocalStorage<User | undefined>(
    "ai-generator-fake-user",
    undefined
  );
  const [data, setData] = useState<User>();

  useEffect(() => {
    if (history) {
      setData(history);
      return;
    }

    run.mutate(options[country as keyof typeof options]);
  }, []);

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
        <div className="grid grid-cols-4 items-center gap-4 border-b pb-4">
          <Select
            label="Country"
            placeholder="Select a Country"
            variant="bordered"
            selectedKeys={[country]}
            onChange={(e) => setCountry(e.target.value)}
            size="sm"
          >
            <SelectItem key="en">{"United States"}</SelectItem>
            <SelectItem key="zh">{"中国"}</SelectItem>
            <SelectItem key="ko">{"한국어"}</SelectItem>
            <SelectItem key="ja">{"日本語"}</SelectItem>
          </Select>
          <Button
            color="primary"
            isLoading={run.isPending}
            onPress={() => {
              const item = options[country as keyof typeof options];
              run.mutate(item);
            }}
          >
            {run.isPending ? t("generating") : t("generate")}
          </Button>
          <div className="col-span-2 border-l pl-4 flex gap-2">
            <Button
              variant="flat"
              color="secondary"
              onPress={() => {
                if (!data) return;
                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                toast.success("Copied!");
              }}
            >
              {t("copy-json")}
            </Button>
            <Button
              variant="flat"
              color="secondary"
              onPress={() => {
                if (!data) return;
                navigator.clipboard.writeText(jsonValuesToString(data));
                toast.success("Copied!");
              }}
            >
              {t("copy-text")}
            </Button>
          </div>
        </div>

        {data && (
          <>
            {/* 基础信息 */}
            <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <Input
                label={t("name")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.name}
              />
              <Input
                label={t("birthdate")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.birth_date}
              />
              <Input
                label={t("age")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.age.toString()}
              />
              <Input
                label={t("gender")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.gender}
              />
              <Input
                label={t("id-card-number")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.id_card}
              />
              <Input
                label={t("phone")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.phone}
              />
              <Input
                label={"Email"}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.email}
              />
              <Input
                label={t("residence")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.residence}
              />
              <Input
                label={t("hometown")}
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.hometown}
              />
            </section>
            {/* 学业 */}
            <p className="border-b text-primary">{t("schools")}</p>
            <Table aria-label="Fake user schools table" isStriped>
              <TableHeader>
                <TableColumn>{t("schools-stage")}</TableColumn>
                <TableColumn>{t("schools-name")}</TableColumn>
                <TableColumn>{t("school-admission-date")}</TableColumn>
                <TableColumn>{t("school-graduation-date")}</TableColumn>
              </TableHeader>
              <TableBody>
                {["elementary", "middle", "high", "university"].map((stage) => {
                  // @ts-ignore
                  const item = data.schools[stage] as School;

                  return (
                    <TableRow key={stage}>
                      <TableCell>{stage}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.admission_date}</TableCell>
                      <TableCell>{item.graduation_date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </ModalPage>
  );
}
