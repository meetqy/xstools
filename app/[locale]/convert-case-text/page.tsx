import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  InitializeMetadata("convert-case-text");
export default InitializePage;
