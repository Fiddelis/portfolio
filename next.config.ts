import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "sanity",
    "@sanity/ui",
    "@sanity/vision",
    "@sanity/portable-text-editor",
    "@mux/mux-player-react",
    "@mux/playback-core",
  ],
};

export default nextConfig;
