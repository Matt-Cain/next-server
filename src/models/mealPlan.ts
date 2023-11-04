import { Schema, model, Model, Types } from 'mongoose';
import normalize from 'normalize-mongoose';

interface IMealPlan {
  plan: Types.ObjectId;
  day: number;
  meal?: Types.ObjectId | undefined;
  placeholder?: string | undefined;
}

const mealPlanSchema = new Schema({
  day: { type: Number, required: true },
  meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
  plan: { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  placeholder: { type: String },
});

mealPlanSchema.plugin(normalize);

const MealPlan: Model<IMealPlan> = model('MealPlan', mealPlanSchema);
export default MealPlan;
