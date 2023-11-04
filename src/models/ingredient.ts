import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

export const ingredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

ingredientSchema.plugin(normalize);

const Ingredient = model('Ingredient', ingredientSchema);
export default Ingredient;
