import { TRPCReactProvider } from "@/trpc/react";
import React from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
