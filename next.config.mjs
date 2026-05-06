/** @type {import('next').NextConfig} */

// When deploying to Webflow Cloud, set NEXT_PUBLIC_BASE_PATH=/customROI
// so all assets and routes are prefixed correctly. Local dev and Vercel
// deployment leave it unset and serve from root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;
