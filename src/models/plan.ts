import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';
import User from './user';

const planSchema = new Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: User, required: true }
});

planSchema.plugin(normalize);

const Plan = model('Plan', planSchema);
export default Plan;