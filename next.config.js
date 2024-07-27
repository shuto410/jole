/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos'],
    },
    transpilePackages: ["geist"],
}

module.exports = nextConfig
