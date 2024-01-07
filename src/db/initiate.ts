import mongoose, { ConnectOptions } from 'mongoose';

const initiate = async () => {
  const URI = process.env.MONGO_DB_URI;
  const USER_NAME = process.env.MONGO_DB_USER_NAME;
  const PASSWORD = process.env.MONGO_DB_PASSWORD;

  const DB = `mongodb+srv://${USER_NAME}:${PASSWORD}@${URI}/?retryWrites=true&w=majority`;
  await mongoose.connect(DB, {
    dbName: 'db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  const { readyState } = mongoose.connection;

  if (readyState === 1) {
    console.log('Database is connected');
  } else {
    console.log('Database is not connected');
  }
};

export default initiate;
