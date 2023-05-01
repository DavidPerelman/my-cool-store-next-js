/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: true,
  env: {
    // MONGO_SRV:
    //   'mongodb+srv://m001-student:m001-mongodb-basics@cluster0.6hgde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    // JWT_SECRET: '<insert-jwt-secret>',
    // CLOUDINARY_URL: '<insert-cloudinary-url>',
    STRIPE_PUBLISHABLE_KEY:
      'pk_test_51LMHebHwuFGjgD9FMmRH7NI5bEHperWkMoj16LBUtb8dsSOHrTvzNHWPivT7BMMwdi7SPhhUtbV8CIoawQfPwgzj00wFX0StK2',
    STRIPE_SECRET_KEY:
      'sk_test_51LMHebHwuFGjgD9FeguMghb3tewcEOB0XtvMeQyi3v5AlyJ39EDx3Ts97M0kO4xX1q8i5AcP0leaH0VoVUF1GTS200NBhJjp2q',
    STRIPE_WEBHOOK_SECRET: 'whsec_v3hqIB6FqLb5FP8VcLsKdILGfBlKY0St',
    SECRET: 'SECRET',
  },
  images: {
    domains: ['i.dummyjson.com', 'd3t32hsnjxo7q6.cloudfront.net'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://my-cool-store-next-js.netlify.app/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
