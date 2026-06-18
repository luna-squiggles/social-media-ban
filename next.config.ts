import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static (no server actions, route handlers, next/image or
  // middleware), so we export it to plain HTML/CSS/JS. Netlify serves the `out`
  // directory directly with correct MIME types.
  output: "export",
};

export default nextConfig;
