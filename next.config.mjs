import createNextIntlPlugin from "next-intl/plugin";
import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  //   register: true,
  //   skipWaiting: true,
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(withNextIntl(nextConfig));
