import { MetadataRoute } from "next";
import * as messages from "@/messages/en.json";

const { AppName } = messages;

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(AppName).map((url) => ({
    url: `https://xs.tools/${url}`,
  }));
}
