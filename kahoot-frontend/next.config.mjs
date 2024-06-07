/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // webpack5: true,
  images: {
    domains: ["res.cloudinary.com", "cdn-icons-png.flaticon.com"],
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "cdn-icons-png.flaticon.com",
        protocol: "https",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
