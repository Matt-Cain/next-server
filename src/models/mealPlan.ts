import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const mealPlanSchema = new Schema({
  day: { type: Number, required: true },
  meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
});

mealPlanSchema.plugin(normalize);

const MealPlan = model('MealPlan', mealPlanSchema);
export default MealPlan;
