import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a fully static site (out/) for free static hosting (Netlify).
  output: "export",
  images: {
    // No image-optimization server in a static export.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
