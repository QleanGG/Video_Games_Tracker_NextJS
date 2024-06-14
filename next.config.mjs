import withBundleAnalyzer from '@next/bundle-analyzer';


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'game-vault-express.onrender.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'game-vault-express.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.gamevault.live', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.gamevault.live',
        pathname: '/uploads/**',
      },
    ],
  },
};

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'false',
};

export default withBundleAnalyzer(bundleAnalyzerConfig)(nextConfig);
