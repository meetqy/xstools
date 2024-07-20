import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  InitializeMetadata("extract-palette-from-image");
export default InitializePage;
