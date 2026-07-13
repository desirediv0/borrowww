/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/emi',
        destination: '/loan-emi-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
