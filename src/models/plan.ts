import { Schema, model, Model, Types } from 'mongoose';
import normalize from 'normalize-mongoose';

interface IPlan {
  startDate: string;
  endDate: string;
  mealPlans: Types.ObjectId[];
  user: Types.ObjectId;
}

const planSchema = new Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  mealPlans: [{ type: Schema.Types.ObjectId, ref: 'MealPlan' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

planSchema.plugin(normalize);

const Plan: Model<IPlan> = model('Plan', planSchema);
export default Plan;
