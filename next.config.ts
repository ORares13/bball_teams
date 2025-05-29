/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // For production deployments (Docker, etc.)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // Replaces deprecated serverComponentsExternalPackages
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],



  // API route configuration
  api: {
    bodyParser: {
      sizeLimit: '1mb'
    },
    externalResolver: true
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ];
  }
};

export default nextConfig;