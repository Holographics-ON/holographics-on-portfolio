/** @type {import('next').NextConfig} */

// Checks for github action and appned prefix
const isGithubActions = process.env.GITHUB_ACTIONS || false;

// Init base Path
let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  webpack(config) {
    config.cache = true;
    return config;
  },
};

module.exports = nextConfig;
