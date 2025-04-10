import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]
    return config
  },
}

export default MillionLint.next({ rsc: true })(nextConfig);
