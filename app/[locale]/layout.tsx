import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Screen } from "../screen";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import { Dock } from "../dock";
import { TRPCReactProvider } from "@/trpc/react";
import { Head } from "@/components/head";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  modal,
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <Head />
      <body
        className={clsx(
          "h-screen bg-background font-sans antialiased w-screen overflow-hidden bg-cover text-foreground",
          fontSans.variable
        )}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1718348636186-5620c97d4c1f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <TRPCReactProvider>
          <NextIntlClientProvider messages={messages}>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "light" }}
            >
              {children}
              {modal}
              <Screen />
              <Toaster />
              <Dock />
            </Providers>
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
