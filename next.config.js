/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.resolve.fallback = { fs: false, path: false }; // Prevents 'fs' errors in browser
    //     }
    //     return config;
    // },
    output: "export",
    images: {
        unoptimized: true
    }
};

export default nextConfig;
