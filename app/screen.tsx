"use client";

import { useRouter } from "@/navigation";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const CardItem = ({
  icon,
  title,
  url,
}: {
  icon: string;
  title: string;
  url: string;
}) => {
  const router = useRouter();

  return (
    <Card
      radius="md"
      shadow="none"
      isPressable
      className="aspect-square relative w-28 z-10 bg-transparent select-none group hover:bg-content2/70 cursor-default transition-all"
      onPress={() => router.push(url)}
    >
      <CardHeader className="pb-0">
        <Image
          src={icon}
          className="w-8/12 aspect-square m-auto"
          draggable={false}
        />
      </CardHeader>
      <CardFooter className="justify-center px-0">
        <p className="capitalize truncate text-small text-default-50 group-hover:text-default-foreground transition-all">
          {title}
        </p>
      </CardFooter>
    </Card>
  );
};

export function Screen() {
  const t = useTranslations("AppName");

  return (
    <div className="gap-4 flex flex-col p-4">
      <CardItem
        icon="/icons/convert-case-text.svg"
        title={t("convert-case-text")}
        url="/convert-case-text"
      />

      <CardItem
        icon="/icons/about-xstools.svg"
        title="About XsTools"
        url="/about-xstools"
      />
    </div>
  );
}
