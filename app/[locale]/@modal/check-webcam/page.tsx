"use client";

import { ModalPage } from "@/components/modal-page";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const t = useTranslations("CheckWebcam");

  // 用来做选项的
  const [webcam, setWebcam] = useState<MediaDeviceInfo[]>([]);
  const [selectedWebcam, setSelectedWebcam] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream>();

  const getWebcam = async () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices.length > 0) {
        setSelectedWebcam(videoDevices[0].deviceId);
        setWebcam(videoDevices);
      }
    });
  };

  useEffect(() => {
    getWebcam();
  }, []);

  // 判断是否有权限
  const isPermission = webcam.every((item) => item.deviceId);

  // 获取视频流 播放摄像头画面
  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: videoRef.current?.clientWidth,
          height: videoRef.current?.clientHeight,
          deviceId: selectedWebcam,
        },
      });

      setStream(stream);
      return stream;
    } catch (e) {
      console.log(e);
    }
  };

  const getUserMedia = async () => {
    try {
      const stream = await getStream();

      if (videoRef.current && stream) {
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
      <div className="flex flex-col items-start relative">
        {!isPermission && (
          <div className="absolute top-0 left-0 bg-danger w-full text-danger-foreground shadow-large p-4 rounded-medium z-50">
            <p>{t("tips")}</p>
            <p className="text-right">
              <Button
                size="sm"
                className="mt-2"
                variant="solid"
                color="warning"
                onPress={async () => {
                  const stream = await getStream();
                  if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                    getWebcam();
                    setStream(undefined);
                  }
                }}
              >
                {t("tips-btn")}
              </Button>
            </p>
          </div>
        )}
        <div className="flex md:flex-row flex-col-reverse gap-4 max-w-5xl w-full mx-auto">
          <video
            className="flex-1 aspect-video rounded-medium"
            ref={videoRef}
            style={{ background: "#000 url(/check-webcam/noise.gif)" }}
          />
          <div className="flex flex-col gap-4 md:w-3/12 w-full items-center md:items-start">
            <Select
              label={t("select-a-webcam")}
              aria-label={t("select-a-webcam")}
              selectedKeys={[selectedWebcam ?? ""]}
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

            {selectedWebcam && !stream && (
              <Button
                onPress={getUserMedia}
                color="primary"
                isDisabled={!selectedWebcam}
                fullWidth
              >
                {t("check-my-webcam")}
              </Button>
            )}

            {stream && (
              <Button onPress={stopStream} color="warning" fullWidth>
                {t("stop-webcam")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalPage>
  );
}
