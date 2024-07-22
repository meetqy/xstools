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
import { User } from "./data";
import { useState } from "react";

const options = {
  en: "United States",
  zh: "china",
};

export default function Page() {
  const t = useTranslations("AiGeneratorFakeUser");
  const locale = useLocale();

  const run = api.aiGeneratorFakeUser.run.useMutation();
  const [country, setCountry] = useState<string>(locale);

  const data = run.data as User | undefined;

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
            <SelectItem key="en">United States</SelectItem>
            <SelectItem key="zh">中国</SelectItem>
          </Select>
          <Button
            color="primary"
            onPress={() => {
              const item = options[country as keyof typeof options];
              run.mutate(item);
            }}
          >
            Generator
          </Button>
        </div>

        {data && (
          <>
            {/* 基础信息 */}
            <section className="grid md:grid-cols-4 grid-cols-2 gap-4">
              <Input
                label="Name"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.name}
              />
              <Input
                label="Birthdate"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.birth_date}
              />
              <Input
                label="Age"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.age.toString()}
              />
              <Input
                label="Gender"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.gender}
              />
              <Input
                label="ID Card Number"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.id_card}
              />
              <Input
                label="Phone"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.phone}
              />
              <Input
                label="Residence"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.residence}
              />
              <Input
                label="Hometown"
                variant="faded"
                labelPlacement="outside"
                placeholder=" "
                value={data.hometown}
              />
            </section>
            {/* 学业 */}
            <p className="border-b text-primary">Schools</p>
            <Table aria-label="Fake user schools table" isStriped>
              <TableHeader>
                <TableColumn>Stage</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>Admission Date</TableColumn>
                <TableColumn>Graduation Date</TableColumn>
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
