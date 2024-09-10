/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/impressum',
        destination: '/impressum',
      },
      {
        source: '/datenschutz',
        destination: '/datenschutz',
      },
    ];
  },
  async headers() {
    return [
      {
        // Anwenden auf alle API-Routen
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      },
    ]
  }
};
export default nextConfig;