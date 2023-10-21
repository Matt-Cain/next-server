import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const planSchema = new Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  meals: [{ type: Schema.Types.ObjectId, ref: 'MealPlan' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

planSchema.plugin(normalize);

const Plan = model('Plan', planSchema);
export default Plan;
