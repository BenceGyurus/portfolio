import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/homelab-status",
        destination: "https://status.gyurus.hu/api/status-page/heartbeat/homelab",
      },
      {
        source: "/api/homelab-page",
        destination: "https://status.gyurus.hu/api/status-page/homelab",
      },
    ];
  },
};

export default nextConfig;
