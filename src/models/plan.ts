import { Schema, model, PopulatedDoc, Document, ObjectId } from 'mongoose';
import normalize from 'normalize-mongoose';

import Course from './course';

interface IPlan {
  entree?: PopulatedDoc<Document<ObjectId> & typeof Course>;
  isPlaceholder: boolean;
  name: string;
  sides: PopulatedDoc<Document<ObjectId> & typeof Course>[];
  timestamp: Date;
  user: string;
}

const PlanSchema = new Schema({
  entree: { type: Schema.Types.ObjectId, ref: 'Course' },
  isPlaceholder: { type: Boolean },
  name: { type: String },
  sides: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PlanSchema.plugin(normalize);

const Plan = model<IPlan>('Plan', PlanSchema);
export default Plan;
