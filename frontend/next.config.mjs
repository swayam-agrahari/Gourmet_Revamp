/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                // Remove port as it's not necessary for standard HTTPS requests
                pathname: '/**', // Allow all paths from this hostname
            },
        ],
    },
};

export default nextConfig;
