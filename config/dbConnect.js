import mongoose, { mongo } from 'mongoose';

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
};

export default dbConnect;
