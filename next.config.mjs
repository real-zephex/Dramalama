/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'asianimg.pro',
          pathname: '/cover/**',
        },
        {
          protocol: "https",
          hostname: "www.pngall.com"
        },
        {
          protocol: "https",
          hostname: "gogocdn.net"
        }
      ],
    },
  };
  
export default nextConfig;
  