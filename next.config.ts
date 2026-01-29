import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                hostname: '*.pstatic.net',
            },
            {
                hostname: '*.daumcdn.net',
            },
            {
                hostname: '*.kakaocdn.net',
            },
        ],
    },
};

export default nextConfig;
