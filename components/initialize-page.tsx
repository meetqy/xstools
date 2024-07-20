import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

function toCamelCase(str: string) {
  return str
    .split("-")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

function convertToPascalCase(str: string) {
  let camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * 初始化 metadata
 * @param url length-unit-converter
 */
export const InitializeMetadata = async (url: string): Promise<Metadata> => {
  const name = convertToPascalCase(url);

  // @ts-ignore
  const t = await getTranslations(name);

  const host = "https://xs.tools";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: host,
      languages: {
        en: `${host}/en/${url}`,
        zh: `${host}/zh/${url}`,
      },
    },
  };
};

export const InitializePage = () => {
  return null;
};
