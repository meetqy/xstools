"use client";

import { useRouter } from "@/navigation";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Card, Image } from "@nextui-org/react";

export const Dock = () => {
  const router = useRouter();

  return (
    <header className="h-16 fixed bottom-2 left-0 w-full md:px-0 px-4">
      <div className="mx-auto justify-between max-w-xl bg-background/50 backdrop-blur-sm h-full shadow-medium rounded-medium flex items-center p-2 gap-2">
        <Card
          isPressable
          className="w-12 h-12 p-0 bg-transparent"
          aria-label="about xs tools"
          onPress={() => router.push("/about-xstools")}
        >
          <Image src="/icons/about-xstools.svg" className="w-full h-full" />
        </Card>
        <div className="flex justify-center items-center">
          <SignedOut>
            <SignInButton>
              <Card
                aria-label="SignIn button"
                isPressable
                className="w-12 h-12 p-0 bg-transparent"
              >
                <Image
                  alt="SignIn button"
                  src="/icons/profile.svg"
                  className="w-full h-full"
                />
              </Card>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-12 h-12",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
