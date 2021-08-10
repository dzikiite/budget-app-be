import mongoose from 'mongoose';

const { Schema } = mongoose;

export const categorySchema = new Schema({
  budgetId: { type: Schema.Types.ObjectId, ref: 'Budget' },
  name: { type: String },
  totalAmount: { type: Number },
  totalAmountSpent: { type: Number },
  subcategory: [{ name: String, amount: Number, amountSpent: Number }],
});

export default mongoose.model('Category', categorySchema);
