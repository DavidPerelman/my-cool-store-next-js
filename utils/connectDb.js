import mongoose from 'mongoose';
const connection = {};

const connectDb = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
  });

  console.log('DB Connected');
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;
