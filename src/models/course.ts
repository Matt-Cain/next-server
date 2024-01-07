import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';
import Item from './item';

interface ICourse {
  name: string;
  type: string;
  recipe?: string;
  ingredients: any;
  user: any;
}

const courseSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  recipe: { type: String },
  ingredients: [{ type: Schema.Types.ObjectId, ref: Item }],

  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

courseSchema.plugin(normalize);

const Course = model<ICourse>('Course', courseSchema);
export default Course;
