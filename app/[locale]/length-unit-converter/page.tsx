import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  await InitializeMetadata("length-unit-converter");

export default InitializePage;
