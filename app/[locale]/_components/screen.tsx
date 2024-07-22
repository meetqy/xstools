"use client";

import { Link } from "@/navigation";
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
  return (
    <Card
      radius="md"
      shadow="none"
      isPressable
      className="aspect-square relative w-full z-10 select-none p-1 bg-transparent"
      href={url}
      as={Link}
    >
      <CardHeader className="w-10/12 aspect-square m-auto p-0 sm:p-2 relative">
        <Image src={icon} alt={title + " icon in screen"} draggable={false} />
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
    "weight-unit-converter",
    "ai-generator-fake-user",
  ];

  return (
    <div className="grid grid-cols-4 p-4 gap-x-4 gap-y-6 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
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
