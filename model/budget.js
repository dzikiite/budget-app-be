import mongoose from 'mongoose';

import { categorySchema } from './category.js';

const { Schema } = mongoose;

const budgetSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  budgetYear: { type: Number },
  budgetMonth: { type: Number },
  totalAmount: { type: Number },
  leftoverAmount: { type: Number },
  currency: { type: String },
  categories: [categorySchema],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('budget', budgetSchema);
