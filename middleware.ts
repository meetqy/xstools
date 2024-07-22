import { locales } from "./config/locale";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(zh|en)/:path*"],
};
