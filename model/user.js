import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, unique: true },
  login: { type: String },
  password: { type: String },
  token: { type: String },
  budgets: [{ type: Schema.Types.ObjectId, ref: 'Budget' }],
});

export default mongoose.model('user', userSchema);
