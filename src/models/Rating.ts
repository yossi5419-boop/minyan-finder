import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  userId: string;
  ratedBy: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

const ratingSchema = new Schema({
  userId: { type: String, required: true },
  ratedBy: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRating>('Rating', ratingSchema);