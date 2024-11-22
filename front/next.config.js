/** @type {import('next').NextConfig} */

const config = require('./config').config

const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    basePath: config.base_url,
    env: {
        ROOTAPI: config.api_url,
        BASE_PATH: config.base_url
    }
}

module.exports = nextConfig
