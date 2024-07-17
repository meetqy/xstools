"use client";

import { Head } from "@/components/head";
import { ModalPage } from "@/components/modal-page";
import { Link } from "@/navigation";
import dynamic from "next/dynamic";

function NotFound() {
  return (
    <html lang="en">
      <Head />
      <body>
        <main className="relative isolate min-h-screen">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1718348636186-5620c97d4c1f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          />
          <ModalPage
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75)`,
              backgroundSize: "cover",
            }}
          >
            <div className="text-center">
              <p className="text-base font-semibold leading-8 text-white">
                {404}
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {"Page not found"}
              </h1>
              <p className="mt-4 text-base text-white/70 sm:mt-6">
                {"Sorry, we couldn’t find the page you’re looking for."}
              </p>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/"
                  className="text-sm font-semibold leading-7 text-white"
                >
                  <span
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: "&larr;" }}
                  />{" "}
                  {"Back to home"}
                </Link>
              </div>
            </div>
          </ModalPage>
        </main>
      </body>
    </html>
  );
}

export default dynamic(() => Promise.resolve(NotFound), { ssr: false });
