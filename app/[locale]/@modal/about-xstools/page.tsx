"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function App() {
  const router = useRouter();

  return (
    <Modal
      defaultOpen
      onClose={() => setTimeout(() => router.replace("/"), 300)}
      size="5xl"
      isDismissable={false}
      placement="top"
      backdrop="transparent"
      className="bg-background/90 backdrop-blur md:aspect-video"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-large flex items-center gap-2">
                <Image
                  src="/icons/about-xstools.svg"
                  alt="about xstools icon"
                  className="w-6 h-6"
                />
                About XsTools
              </h1>
              <p className="font-normal text-default-500 text-medium">
                Simply enter your text and choose the case you want to convert
                it to.
              </p>
            </ModalHeader>
            <ModalBody>footer</ModalBody>
            <ModalFooter className="flex flex-col items-end space-y-2">
              footer
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
