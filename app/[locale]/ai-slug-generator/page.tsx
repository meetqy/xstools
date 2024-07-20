import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  InitializeMetadata("ai-slug-generator");
export default InitializePage;
