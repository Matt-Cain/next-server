import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

userSchema.plugin(normalize);

const User = model('User', userSchema);
export default User;