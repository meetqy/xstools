import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  await InitializeMetadata("apple-flag-emoji-list");

export default InitializePage;
