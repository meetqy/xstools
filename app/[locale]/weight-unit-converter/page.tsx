import {
  InitializeMetadata,
  InitializePage,
} from "@/components/initialize-page";

export const generateMetadata = async () =>
  await InitializeMetadata("weight-unit-converter");

export default InitializePage;
