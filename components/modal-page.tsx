"use client";

import { useRouter } from "@/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

export function ModalPage(props: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Modal
      defaultOpen
      onClose={() => setTimeout(() => router.replace("/"), 300)}
      size="5xl"
      isDismissable={false}
      placement="top"
      backdrop="transparent"
      className="md:aspect-video bg-content1"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {props.header}
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter className="flex flex-col items-end space-y-2">
              {props.footer}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
