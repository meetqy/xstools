"use client";

import { ModalPage } from "@/components/modal-page";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function App() {
  const t = useTranslations("CheckWebcam");
  const [webcam, setWebcam] = useState<MediaDeviceInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream>();
  const [selectedWebcam, setSelectedWebcam] = useState<string>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((_stream) => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          setWebcam(devices.filter((device) => device.kind === "videoinput"));
        });
      })
      .catch(() => {
        toast.error("Please allow the camera access to continue.");
      });
  }, []);

  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedWebcam },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStream(stream);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const stopStream = () => {
    if (videoRef.current && stream) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      stream.getTracks().forEach((track) => track.stop());
      setStream(undefined);
    }
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
      <div className="flex md:flex-row flex-col-reverse gap-4 max-w-5xl w-full mx-auto">
        <video
          className="flex-1 aspect-video rounded-medium"
          ref={videoRef}
          style={{ background: "#000 url(/check-webcam/noise.gif)" }}
        />
        <div className="flex flex-col gap-4 md:w-3/12 w-full items-center md:items-start">
          <Select
            label="Select a webcam"
            value={selectedWebcam}
            onChange={(e) => setSelectedWebcam(e.target.value)}
            size="sm"
            variant="bordered"
            fullWidth
          >
            {webcam.map((item) => (
              <SelectItem key={item.deviceId}>
                {item.label.replace(/\((.*?)+/g, "")}
              </SelectItem>
            ))}
          </Select>
          {stream ? (
            <Button onPress={stopStream} color="warning" fullWidth>
              {t("stop-webcam")}
            </Button>
          ) : (
            <Button
              onPress={getUserMedia}
              color="primary"
              isDisabled={!selectedWebcam}
              fullWidth
            >
              {t("check-my-webcam")}
            </Button>
          )}
        </div>
      </div>
    </ModalPage>
  );
}
