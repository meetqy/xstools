import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  await InitializeMetadata("purple-star-astrology");

export default InitializePage;
