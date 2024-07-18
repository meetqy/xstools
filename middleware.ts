import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./config/locale";
import { NextFetchEvent, NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
  localeDetection: false,
});

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/:locale/dashboard(.*)",
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  if (
    request.nextUrl.pathname.includes("/sign-in") ||
    request.nextUrl.pathname.includes("/sign-up") ||
    isProtectedRoute(request)
  ) {
    return clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        const locale =
          req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? "";

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        auth().protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
