/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    domains: ["fakestoreapi.com"],
  },
  reactStrictMode: true,
  // Add other configurations here
}

export default nextConfig;