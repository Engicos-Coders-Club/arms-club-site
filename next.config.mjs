/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "randomuser.me",
          },
          {
            protocol: "https",
            hostname: "cdn.dummyjson.com",
          } ,
          {
            protocol: "https",
            hostname: "cdn.dummyjson.com",
          }
        ],
      },
};

export default nextConfig;
