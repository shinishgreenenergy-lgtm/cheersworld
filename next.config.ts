import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inline the page's CSS into the HTML — on slow networks the render-blocking
  // stylesheet request was the biggest chunk of LCP.
  experimental: { inlineCss: true },
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
