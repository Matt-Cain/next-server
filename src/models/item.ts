import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
});

itemSchema.plugin(normalize);

const Item = model('Item', itemSchema);
export default Item;
