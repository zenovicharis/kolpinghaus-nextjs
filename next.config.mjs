import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
        pathname: "/kolpinghaus/**",
      },
      {
        protocol: "https",
        hostname: "minio-s3.restaurant-im-kolpinghaus.de",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
