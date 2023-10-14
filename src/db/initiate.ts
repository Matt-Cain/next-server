import mongoose, { ConnectOptions } from 'mongoose';

const initiate = async () => {
  const address = `mongodb+srv://plan:${process.env.MONGODB_PASSWORD}@plan.cx2dgai.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(address, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);

  const readyState = mongoose.connection.readyState

  if (readyState === 1) {
    console.log('Database is connected');
  } else {
    console.log('Database is not connected');
  }
};

export default initiate;
