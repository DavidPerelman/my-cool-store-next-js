/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_SRV:
      'mongodb+srv://m001-student:m001-mongodb-basics@cluster0.6hgde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    JWT_SECRET: '<insert-jwt-secret>',
    CLOUDINARY_URL: '<insert-cloudinary-url>',
    STRIPE_SECRET_KEY: '<insert-stripe-secret-key>',
  },
  images: {
    domains: ['i.dummyjson.com'],
  },
};

module.exports = nextConfig;
