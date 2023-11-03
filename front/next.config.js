/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: process.env.NODE_ENV == 'production' ? '/Y' : '',
    env: {
        ROOTAPI: 'https://y-back.fly.dev'
    },
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
