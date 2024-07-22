import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  InitializeMetadata("ai-generator-fake-user");
export default InitializePage;
