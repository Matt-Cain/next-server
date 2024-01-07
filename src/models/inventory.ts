import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const inventorySchema = new Schema({
  timestamp: { type: Date, required: true },
  ingredients: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      type: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
  shoppingItems: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'Item' },
      type: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

inventorySchema.plugin(normalize);

const Inventory = model('Inventory', inventorySchema);
export default Inventory;
