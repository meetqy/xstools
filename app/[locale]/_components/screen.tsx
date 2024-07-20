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
      className="aspect-square relative w-full z-10 bg-transparent select-none p-1"
      onPress={() => router.push(url)}
    >
      <CardHeader className="p-0">
        <Image
          src={icon}
          alt={icon.split("-").join(" ")}
          className="w-10/12 md:w-8/12 aspect-square m-auto"
          draggable={false}
        />
      </CardHeader>
      <CardFooter className="justify-center px-2">
        <p className="capitalize truncate text-xs md:text-small text-default-800">
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
    <div className="grid grid-cols-4 p-4 gap-x-4 gap-y-6 md:grid-cols-12">
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
