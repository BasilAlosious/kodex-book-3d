/** @type {import('next').NextConfig} */

// When deploying to Webflow Cloud, set NEXT_PUBLIC_BASE_PATH=/customroi
// so all assets and routes are prefixed correctly. Local dev and Vercel
// deployment leave it unset and serve from root.
// Trimmed defensively because dashboard inputs often introduce trailing whitespace.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;
