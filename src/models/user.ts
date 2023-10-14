import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

const User = model('User', userSchema);
export default User;