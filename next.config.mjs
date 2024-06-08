import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',  
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
    ],
  },
};

const bundleAnalyzerConfig = {
  enabled: process.env.ANALYZE === 'true',
};

export default withBundleAnalyzer(bundleAnalyzerConfig)(nextConfig);
