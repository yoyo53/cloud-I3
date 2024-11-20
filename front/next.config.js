/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: '',
    env: {
        ROOTAPI: 'https://y-back.local',
        BASE_PATH: ''
    }
}

module.exports = nextConfig
