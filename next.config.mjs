import { env } from "process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:
      env.NODE_ENV === "development"
        ? env.NEXTAUTH_URL_DEVELOPMENT
        : env.NEXTAUTH_URL_PRODUCTION,
  },
};

export default nextConfig;
