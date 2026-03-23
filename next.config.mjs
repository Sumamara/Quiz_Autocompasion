/** @type {import('next').NextConfig} */
const nextConfig = {
    // Output standalone for easier dockerization if needed, but default is fine
    reactStrictMode: true,
    output: 'export',
    basePath: '/Quiz_Autocompasion',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
