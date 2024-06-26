/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staycation.twic.pics',
      },
    ],
  },
};

export default nextConfig;
