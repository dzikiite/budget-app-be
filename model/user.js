import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true },
  login: { type: String },
  password: { type: String },
  token: { type: String },
});

export default mongoose.model('user', userSchema);
