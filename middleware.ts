import createMiddleware from "next-intl/middleware";
import { locales } from "./config/locale";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  localePrefix: "as-needed",
  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/([\\w-]+)?/users/(.+)",
    "/(zh|en)/:path*",
  ],
};
