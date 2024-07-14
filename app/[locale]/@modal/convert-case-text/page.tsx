"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import React from "react";

export default function App() {
  const router = useRouter();
  const t = useTranslations("ConvertCaseText");

  const [text, setText] = React.useState<string>("");
  const [placeholder, setPlaceholder] = React.useState<string>(
    "Type or paste your content here."
  );

  const sentenceCase = (str = "") => {
    // 每个段落首字母大写，保留原有的换行符
    return str
      .toLowerCase()
      .split("\n")
      .map((line) =>
        line
          .split(". ")
          .map((sentence) => {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1);
          })
          .join(". ")
      )
      .join("\n");
  };

  const lowerCase = (str = "") => {
    return str.toLowerCase();
  };

  const upperCase = (str = "") => {
    return str.toUpperCase();
  };

  const capitalizedCase = (str = "") => {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
  };

  const aLtErNaTiNgCase = (str = "") => {
    return str
      .split("")
      .map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase()))
      .join("");
  };

  const titleCase = (str = "") => {
    return str.toLowerCase().replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
  };

  const inVeRsECaSe = (str = "") => {
    return str
      .split("")
      .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
      .join("");
  };

  return (
    <>
      <Modal
        defaultOpen
        onClose={() => setTimeout(() => router.replace("/"), 300)}
        size="5xl"
        isDismissable={false}
        placement="top"
        backdrop="transparent"
        className="bg-content1/90 backdrop-blur-md md:aspect-video"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-large">{t("title")}</h1>
                <p className="font-normal text-default-500 text-medium">
                  {t("description")}
                </p>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder={placeholder}
                  minRows={14}
                  maxRows={14}
                  className="h-full"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  size="lg"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter className="flex flex-col items-end space-y-2">
                <div className="flex flex-wrap gap-1">
                  <Button
                    size="sm"
                    onPress={() => {
                      setText(sentenceCase(text));
                      setPlaceholder(sentenceCase(placeholder));
                    }}
                  >
                    {t("sentence-case")}
                  </Button>
                  <Button
                    size="sm"
                    onPress={() => {
                      setText(lowerCase(text));
                      setPlaceholder(lowerCase(placeholder));
                    }}
                  >
                    {t("lower-case")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setText(upperCase(text));
                      setPlaceholder(upperCase(placeholder));
                    }}
                  >
                    {t("upper-case")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setText(capitalizedCase(text));
                      setPlaceholder(capitalizedCase(placeholder));
                    }}
                  >
                    {t("capitalized-case")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setText(aLtErNaTiNgCase(text));
                      setPlaceholder(aLtErNaTiNgCase(placeholder));
                    }}
                  >
                    {t("alternating-case")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setText(titleCase(text));
                      setPlaceholder(titleCase(placeholder));
                    }}
                  >
                    {t("title-case")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setText(inVeRsECaSe(text));
                      setPlaceholder(inVeRsECaSe(placeholder));
                    }}
                  >
                    {t("inverse-case")}
                  </Button>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    color="secondary"
                    variant="ghost"
                    onClick={() => {
                      if (!text) return toast.error("No text to download.");

                      const element = document.createElement("a");
                      const file = new Blob([text], { type: "text/plain" });

                      element.href = URL.createObjectURL(file);
                      element.download = "converted-text.txt";
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      toast.success("Text downloaded.");
                    }}
                  >
                    {t("download-text")}
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    variant="ghost"
                    onClick={() => {
                      if (!text) return toast.error("No text to copy.");
                      navigator.clipboard.writeText(text);
                      toast.success("Text copied to clipboard.");
                    }}
                  >
                    {t("copy-to-clipboard")}
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {
                      setText("");
                      setPlaceholder("Type or paste your content here.");
                    }}
                  >
                    {t("clear")}
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
