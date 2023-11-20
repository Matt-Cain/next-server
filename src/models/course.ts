import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

interface ICourse {
  name: string;
  type: string;
  recipe?: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];

  user: any;
}

const ingredient = {
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
};

const courseSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  recipe: { type: String },
  ingredients: [ingredient],

  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

courseSchema.plugin(normalize);

const Course = model<ICourse>('Course', courseSchema);
export default Course;
