/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "musescore.com",
        port: "",
        pathname: "/static/musescore/userdata/{avatar,cover}/**",
      },
    ],
  },
};

module.exports = nextConfig;
