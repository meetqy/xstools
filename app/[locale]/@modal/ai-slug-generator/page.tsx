"use client";

import { ModalPage } from "@/components/modal-page";
import { api } from "@/trpc/react";
import { Button, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function App() {
  const t = useTranslations("AiSlugGenerator");
  const [text, setText] = useState("");

  const run = api.aiSlugGenerator.run.useMutation({});

  const result = useMemo(() => {
    if (run.isPending) return "Generating...";
    if (run.data) return run.data.join("").replace(/\//g, "");

    return "generate-content-url-slug";
  }, [run]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success(t("copy-to-clipboard"));
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
      <>
        <div className="grid md:grid-cols-2 gap-4">
          <Textarea
            label="Title"
            placeholder={t("placeholder")}
            value={text}
            variant="faded"
            color="primary"
            size="lg"
            onValueChange={(e) => setText(e)}
          />
          <Textarea
            label="URL SLUG"
            variant="bordered"
            readOnly
            size="lg"
            value={result}
          />
        </div>
        <div className="flex justify-end gap-4 md:flex-row flex-col">
          <Button variant="bordered" color="primary" onClick={copyToClipboard}>
            {t("copy-to-clipboard")}
          </Button>
          <Button
            color="primary"
            isDisabled={!text && !run.isPending}
            onClick={() => run.mutate(text)}
          >
            {t("generator")}
          </Button>
        </div>
      </>
    </ModalPage>
  );
}
