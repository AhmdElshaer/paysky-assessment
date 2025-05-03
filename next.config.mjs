/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    domains: ["fakestoreapi.com", "ui-avatars.com", "placehold.co", "maps.googleapis.com"],
  },
  reactStrictMode: true,
  // Add other configurations here
}

export default nextConfig;