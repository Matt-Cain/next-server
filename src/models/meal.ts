import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const mealSchema = new Schema({
  name: { type: String, required: true },
  entree: { type: Schema.Types.ObjectId, ref: 'Course' },
  sides: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

mealSchema.plugin(normalize);

const Meal = model('Meal', mealSchema);
export default Meal;
