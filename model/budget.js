import mongoose from 'mongoose';

const { Schema } = mongoose;

const budgetSchema = new Schema({
  budgetPeriod: { type: String },
  allMoney: { type: Number },
  leftoverMoney: { type: Number },
  currency: { type: String },
});

export default mongoose.model('budget', budgetSchema);
