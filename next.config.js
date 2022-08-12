/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "https://mm-taupe.vercel.app/" },
                ]
            }
        ]
    },
}

module.exports = nextConfig
