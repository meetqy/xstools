"use client";

import { ModalPage } from "@/components/modal-page";
import { Icon } from "@iconify/react";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/utils/cn";
import Color from "color";
import toast from "react-hot-toast";
import { extractColors } from "extract-colors";
import { FinalColor } from "extract-colors/lib/types/Color";

export default function App() {
  const t = useTranslations("ExtractPalettleFromImage");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".png", ".jpg", ".webp"],
    },
  });
  const [palette, setPalette] = useState<FinalColor[]>();

  const file = useMemo(() => {
    if (acceptedFiles.length === 0) return null;
    const file = acceptedFiles[0];

    return URL.createObjectURL(file);
  }, [acceptedFiles]);

  useEffect(() => {
    const getPalette = async () => {
      if (!file) return setPalette(undefined);

      const palette = await extractColors(file);

      setPalette(palette);
    };

    getPalette();
  }, [file]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

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
      <section className="w-full h-full grid grid-cols-3 gap-4">
        <div
          {...getRootProps({ className: "dropzone" })}
          className={cn(
            "w-full overflow-hidden flex flex-col justify-center items-center bg-content2 rounded-medium border-dashed border",
            file ? "border-primary-200" : "border-default-300"
          )}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="max-h-96 overflow-y-auto">
              <Image src={file} className="w-96" />
            </div>
          ) : (
            <>
              <Icon
                icon="ci:add-plus"
                fontSize={56}
                className="text-default-300"
              />

              <p className="text-content2-foreground/70">
                {t("drag-file-s-here-or-click-to-browse")}
              </p>
            </>
          )}
        </div>

        <div className="col-span-2">
          <Table aria-label="color palette">
            <TableHeader>
              <TableColumn className="w-1/4">{t("color-palette")}</TableColumn>
              <TableColumn className="w-2/4">{t("rgb")}</TableColumn>
              <TableColumn className="w-1/4">{t("hex")}</TableColumn>
              <TableColumn>{t("hsl")}</TableColumn>
            </TableHeader>
            <TableBody emptyContent={t("empty")}>
              {!palette
                ? []
                : palette?.map((color, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div
                          className="w/1/2 h-8 rounded-full"
                          style={{
                            backgroundColor: color.hex,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          copyToClipboard(Color(color.hex).rgb().string())
                        }
                      >
                        {Color(color.hex).rgb().string()}
                      </TableCell>
                      <TableCell onClick={() => copyToClipboard(color.hex)}>
                        {color.hex}
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          copyToClipboard(Color(color.hex).hsl().toString())
                        }
                      >
                        {Color(color.hex).hsl().toString()}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          <p className="text-default-400 mt-4 text-center">{t("tips")}</p>
        </div>
      </section>
    </ModalPage>
  );
}
