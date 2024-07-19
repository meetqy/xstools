"use client";
import { Setting } from "@/global";
import { useRouter } from "@/navigation";
import { Icon } from "@iconify/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

export function ModalPage(props: {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const router = useRouter();
  const [settings, setSettings] = useLocalStorage<Setting>("settings", {
    modal_full: false,
  });

  return (
    <Modal
      defaultOpen
      onClose={() => setTimeout(() => router.replace("/"), 300)}
      size={settings.modal_full ? "full" : "5xl"}
      isDismissable={false}
      placement="top"
      backdrop="transparent"
      className="md:aspect-video bg-content1/90 backdrop-blur-md"
      scrollBehavior="inside"
      style={props.style}
      classNames={{
        closeButton: "opacity-0 z-10 right-0 top-0 rounded-medium",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="absolute top-0 right-0 flex">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() =>
                    setSettings({ modal_full: !settings.modal_full })
                  }
                >
                  <Icon
                    icon={
                      settings.modal_full
                        ? "material-symbols:fullscreen-exit"
                        : "material-symbols:fullscreen-exit"
                    }
                  />
                </Button>

                <Button isIconOnly size="sm" variant="light" color="danger">
                  <Icon icon="material-symbols:close" />
                </Button>
              </div>
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
