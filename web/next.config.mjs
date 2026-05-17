/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      // Redirect www -> non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.bookqubit.com",
          },
        ],
        destination: "https://bookqubit.com/:path*",
        permanent: true,
      },

      // Redirect http -> https
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "bookqubit.com",
          },
        ],
        destination: "https://bookqubit.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;