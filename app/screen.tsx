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
      className="aspect-square relative md:w-28 w-24 z-10 bg-transparent select-none"
      onPress={() => router.push(url)}
    >
      <CardHeader className="pb-0">
        <Image
          src={icon}
          alt={icon.split("-").join(" ")}
          className="w-9/12 aspect-square m-auto shadow-medium"
          draggable={false}
        />
      </CardHeader>
      <CardFooter className="justify-center px-0">
        <p className="capitalize truncate text-small text-default-50">
          {title}
        </p>
      </CardFooter>
    </Card>
  );
};

export function Screen() {
  const t = useTranslations("AppName");

  const apps = [
    "convert-case-text",
    "extract-palette-from-image",
    "ai-slug-generator",
    "check-webcam",
    "length-unit-converter",
  ];

  return (
    <div className="gap-4 flex p-4">
      {apps.map((item) => {
        return (
          <CardItem
            key={item}
            icon={`/icons/${item}.svg`}
            // @ts-ignore
            title={t(item)}
            url={`/${item}`}
          />
        );
      })}
    </div>
  );
}
