/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl:
      "mongodb+srv://ahmed7x:ie6o16BJ0IXXSi4r@ahmed-azzam.hah55j0.mongodb.net/dev?retryWrites=true&w=majority",
    passwordHash:
      "6e4f4fc5b31b7d9152f943cdb3193a1c088ab083f0ef9f7bc7d313e492ef8ebe",
  },
};

module.exports = nextConfig;
